import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SHOTS,
  TOTAL_DURATION,
  getActiveShotIndex,
  getActiveShot,
  getShotProgress,
  formatTime,
  formatTimeWithTenths
} from './timeline.js';

test('timeline configuration contains exactly 12 shots summing to 48s', () => {
  assert.equal(SHOTS.length, 12);
  assert.equal(SHOTS[0].startTime, 0);
  assert.equal(SHOTS[SHOTS.length - 1].endTime, TOTAL_DURATION);
  assert.equal(TOTAL_DURATION, 48.0);
});

test('shot numbers 2 through 11 correspond to numbers 1 through 10', () => {
  for (let num = 1; num <= 10; num++) {
    const shot = SHOTS[num]; // index 1 is Shot 2 (number 1)
    assert.equal(shot.number, num);
    assert.equal(shot.objectCount, num);
    assert.equal(shot.fingersCount, num);
  }
});

test('shot titles match Mongolian requirements for 1 to 10', () => {
  assert.equal(SHOTS[0].text, 'Хуруугаараа тоолъё!');
  assert.equal(SHOTS[1].text, 'Нэг');
  assert.equal(SHOTS[2].text, 'Хоёр');
  assert.equal(SHOTS[3].text, 'Гурав');
  assert.equal(SHOTS[4].text, 'Дөрөв');
  assert.equal(SHOTS[5].text, 'Тав');
  assert.equal(SHOTS[6].text, 'Зургаа');
  assert.equal(SHOTS[7].text, 'Долоо');
  assert.equal(SHOTS[8].text, 'Найм');
  assert.equal(SHOTS[9].text, 'Ес');
  assert.equal(SHOTS[10].text, 'Арав');
  assert.equal(SHOTS[11].text, 'Баяр хүргэе!');
});

test('getActiveShotIndex maps timestamps correctly to shots across 48s', () => {
  assert.equal(getActiveShotIndex(0.0), 0);
  assert.equal(getActiveShotIndex(3.5), 1);
  assert.equal(getActiveShotIndex(8.0), 2);
  assert.equal(getActiveShotIndex(12.0), 3);
  assert.equal(getActiveShotIndex(24.0), 6); // Shot 7 (Зургаа)
  assert.equal(getActiveShotIndex(40.0), 10); // Shot 11 (Арав)
  assert.equal(getActiveShotIndex(45.0), 11); // Shot 12 (Баяр хүргэе)
});

test('formatTime formats minutes and seconds cleanly', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(48), '00:48');
  assert.equal(formatTimeWithTenths(3.5), '3.5s');
});
