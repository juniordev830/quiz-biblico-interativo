import { test } from 'node:test';
import assert from 'node:assert/strict';
import { score, selectQuestions, shuffle, summarize, timeLeft } from '../src/game.ts';
import { levels, questions } from '../src/questions.ts';

test('banco contém alternativas únicas, gabarito válido e referências', () => {
  assert.equal(new Set(questions.map(question => question.id)).size, questions.length);
  assert.equal(questions.length, 24);
  assert.equal(new Set(questions.map(question => question.level)).size, levels.length);
  assert.ok(questions.every(question => new Set(question.options).size === 4 && question.options[question.answer] && question.reference && question.reasoning));
});
test('combina categoria e dificuldade', () => {
  const found = selectQuestions(questions, 'João', 'Avançado');
  assert.equal(found.length, 1);
  assert.equal(found[0].reference, 'João 1:40–42');
  assert.deepEqual(selectQuestions(questions, 'Ausente', ''), []);
});
test('embaralhamento não altera entrada nem perde elementos', () => {
  const input = [1, 2, 3];
  assert.deepEqual(shuffle(input, () => 0), [2, 3, 1]);
  assert.deepEqual(input, [1, 2, 3]);
});
test('pontuação ignora respostas fora da rodada, ausentes e expiradas', () => {
  assert.equal(score(questions.slice(0, 2), { [questions[0].id]: questions[0].answer, [questions[1].id]: -1, abc: 0 }), 1);
  assert.equal(score(questions, {}), 0);
});
test('cronômetro arredonda o valor mostrado e para em zero', () => {
  assert.equal(timeLeft(null, 100), null);
  assert.equal(timeLeft(1500, 600), 1);
  assert.equal(timeLeft(1500, 1600), 0);
});
test('estatísticas ponderam rodadas de tamanhos diferentes', () => {
  const base = { id: '', at: '', book: '', level: '' };
  assert.deepEqual(summarize([]), { rounds: 0, total: 0, average: 0 });
  assert.deepEqual(summarize([{ ...base, correct: 1, total: 1 }, { ...base, correct: 1, total: 3 }]), { rounds: 2, total: 4, average: 50 });
});
