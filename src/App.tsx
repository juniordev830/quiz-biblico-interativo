import { useEffect, useState } from 'react';
import { score, selectQuestions, shuffle, summarize, timeLeft } from './game.ts';
import type { Attempt } from './game.ts';
import { levels, questions } from './questions.ts';
import type { Level, Question } from './questions.ts';
import { useLocalState } from './storage.ts';

type Round = { id: string; items: Question[]; position: number; answers: Record<string, number>;
  book: string; level: string; timed: boolean; deadline: number | null; finished: boolean };
const books = [...new Set(questions.map(item => item.book))];
const secondsPerQuestion = 25;

export default function App() {
  const [book, setBook] = useState('');
  const [level, setLevel] = useState<'' | Level>('');
  const [timed, setTimed] = useState(false);
  const [round, setRound] = useState<Round>();
  const [clock, setClock] = useState(Date.now);
  const [history, setHistory, storageError] = useLocalState<Attempt[]>('quiz-v1', []);
  const pool = selectQuestions(questions, book, level);
  const question = round?.items[round.position];
  const answer = question && round ? round.answers[question.id] : undefined;
  const left = timeLeft(round?.deadline ?? null, clock);
  const stats = summarize(history);

  useEffect(() => {
    if (round?.deadline == null) return;
    const timer = window.setInterval(() => setClock(Date.now()), 200);
    return () => window.clearInterval(timer);
  }, [round?.deadline]);
  useEffect(() => {
    if (!question || left !== 0) return;
    setRound(previous => previous && previous.items[previous.position].id === question.id && previous.deadline !== null
      ? { ...previous, answers: { ...previous.answers, [question.id]: -1 }, deadline: null } : previous);
  }, [question, left]);

  function start() {
    const now = Date.now();
    setClock(now);
    setRound({ id: crypto.randomUUID(), items: shuffle(pool).slice(0, 10).map(item => {
      const options = shuffle(item.options);
      return { ...item, options, answer: options.indexOf(item.options[item.answer]) };
    }), position: 0, answers: {}, book, level, timed, deadline: timed ? now + secondsPerQuestion * 1000 : null, finished: false });
  }

  function choose(chosen: number) {
    if (!question) return;
    setRound(previous => {
      if (!previous || previous.items[previous.position].id !== question.id || question.id in previous.answers) return previous;
      const value = previous.deadline !== null && Date.now() >= previous.deadline ? -1 : chosen;
      return { ...previous, answers: { ...previous.answers, [question.id]: value }, deadline: null };
    });
  }

  function advance() {
    if (!round || !question || answer === undefined || round.finished) return;
    if (round.position < round.items.length - 1) {
      const now = Date.now();
      setClock(now);
      setRound({ ...round, position: round.position + 1, deadline: round.timed ? now + secondsPerQuestion * 1000 : null });
      return;
    }
    const result = { id: round.id, at: new Date().toISOString(), correct: score(round.items, round.answers),
      total: round.items.length, book: round.book, level: round.level };
    setHistory(previous => previous.some(item => item.id === result.id) ? previous : [result, ...previous].slice(0, 100));
    setRound({ ...round, finished: true });
  }

  return <div className="split">
    <section className="panel stack">
      {!round && <form className="form" onSubmit={e => { e.preventDefault(); if (pool.length) start(); }}>
        <h2>Configurar rodada</h2>
        <div className="two collapse">
          <label>Livro<select value={book} onChange={e => setBook(e.target.value)}><option value="">Todos os livros</option>{books.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Dificuldade<select value={level} onChange={e => setLevel(e.target.value as typeof level)}><option value="">Todas as dificuldades</option>{levels.map(item => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label className="check"><input type="checkbox" checked={timed} onChange={e => setTimed(e.target.checked)} /> Cronômetro de {secondsPerQuestion} segundos por pergunta</label>
        <p className="muted">{Math.min(pool.length, 10)} pergunta(s) nesta rodada · {pool.length} no filtro.</p>
        <button className="primary" disabled={!pool.length}>Começar quiz</button>
      </form>}
      {round?.finished && <>
        <h2>Resultado da rodada</h2><p className="quiz-score" role="status">{score(round.items, round.answers)} de {round.items.length}</p>
        <ul className="list">{round.items.map(item => <li className="subtle" key={item.id}>
          <strong>{round.answers[item.id] === item.answer ? 'Acertou' : 'Revisar'} · {item.reference}</strong><p>{item.prompt}</p>
        </li>)}</ul>
        <button className="primary" onClick={() => setRound(undefined)}>Jogar outra rodada</button>
      </>}
      {round && !round.finished && question && <>
        <div className="row between"><span>{round.position + 1} de {round.items.length} · {question.level}</span>
          {left !== null && <span className={'tag ' + (left <= 5 ? 'error' : '')} aria-label="Tempo restante">{left} s</span>}
        </div>
        <progress aria-label="Perguntas percorridas" value={round.position + Number(answer !== undefined)} max={round.items.length} />
        <h2>{question.prompt}</h2>
        <div className="two collapse">{question.options.map((option, index) => <button
          className={'selection ' + (answer !== undefined && question.answer === index ? 'correct-answer' : '')}
          key={option} disabled={answer !== undefined} onClick={() => choose(index)}>{option}</button>)}</div>
        {answer !== undefined && <>
          <div className="subtle" role="status">
            <strong>{answer === -1 ? 'Tempo esgotado' : answer === question.answer ? 'Resposta correta' : 'Resposta incorreta'} · {question.options[question.answer]}</strong>
            <p>{question.reasoning}</p><small>{question.reference}</small>
          </div>
          <button className="primary" onClick={advance}>{round.position === round.items.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}</button>
        </>}
      </>}
      {storageError && <p role="alert" className="error">{storageError}</p>}
    </section>
    <aside className="stack">
      <section className="panel stack">
        <h2>Seu desempenho</h2>
        <div className="three">
          <div className="stat">Rodadas<strong>{stats.rounds}</strong></div>
          <div className="stat">Perguntas<strong>{stats.total}</strong></div>
          <div className="stat">Acertos<strong>{stats.average}%</strong></div>
        </div>
        <p className="muted">Banco inicial com {questions.length} perguntas comentadas.</p>
      </section>
      <section className="panel stack">
        <h2>Histórico</h2>
        {!history.length && <p className="muted">Complete uma rodada para registrar sua pontuação.</p>}
        <ul className="list">{history.map(attempt => <li key={attempt.id} className="subtle">
          <strong>{attempt.correct}/{attempt.total} · {attempt.book || 'Todos os livros'}</strong>
          <p className="muted">{new Date(attempt.at).toLocaleDateString('pt-BR')}{attempt.level && ' · ' + attempt.level}</p>
        </li>)}</ul>
      </section>
    </aside>
  </div>;
}
