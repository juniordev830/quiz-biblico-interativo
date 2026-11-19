import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseHistory } from '../src/game.ts';

const attempt = { id: 'a1', at: '2026-11-19T00:00:00.000Z', book: 'João', level: '', correct: 3, total: 4 };

test('o histórico válido continua legível', () => {
  assert.deepEqual(parseHistory(JSON.stringify([attempt])), [attempt]);
});

test('pontuação inconsistente e IDs duplicados não são carregados', () => {
  for (const value of [{}, [null], [attempt, attempt], [{ ...attempt, correct: 9 }]]) {
    assert.throws(() => parseHistory(JSON.stringify(value)), /Histórico inválido/);
  }
});
