import type { Level, Question } from './questions.ts';

export type Attempt = { id: string; at: string; correct: number; total: number; book: string; level: string };
export function parseHistory(raw: string): Attempt[] {
  const history: unknown = JSON.parse(raw);
  if (!Array.isArray(history) || !history.every((attempt: Partial<Attempt> | null) =>
    attempt && typeof attempt.id === 'string' && attempt.id.length > 0
    && typeof attempt.at === 'string' && Number.isFinite(Date.parse(attempt.at))
    && typeof attempt.book === 'string' && typeof attempt.level === 'string'
    && typeof attempt.total === 'number' && Number.isSafeInteger(attempt.total) && attempt.total > 0
    && typeof attempt.correct === 'number' && Number.isSafeInteger(attempt.correct)
    && attempt.correct >= 0 && attempt.correct <= attempt.total
  ) || new Set(history.map(attempt => attempt.id)).size !== history.length) {
    throw new Error('Histórico inválido.');
  }
  return history;
}

export const selectQuestions = (questions: Question[], book: string, level: '' | Level) =>
  questions.filter(question => (!book || question.book === book) && (!level || question.level === level));

export function shuffle<T>(items: T[], random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function score(questions: Question[], answers: Record<string, number>) {
  return questions.reduce((total, question) => total + Number(answers[question.id] === question.answer), 0);
}

export function reviewAnswer(question: Question, answer: number | undefined) {
  return {
    correctOption: question.options[question.answer],
    selectedOption: answer === undefined ? undefined : question.options[answer],
    expired: answer === -1,
    correct: answer === question.answer,
  };
}

export function summarize(history: Attempt[]) {
  const total = history.reduce((sum, item) => sum + item.total, 0);
  const correct = history.reduce((sum, item) => sum + item.correct, 0);
  return { rounds: history.length, total, average: total ? Math.round(correct * 100 / total) : 0 };
}

export function timeLeft(deadline: number | null, now: number) {
  return deadline === null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
}
