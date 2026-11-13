const test = require('node:test');
const assert = require('node:assert');
const jwt = require('jsonwebtoken');
const { mergeSettings, renderGreeting, verifyToken } = require('../src/settings');

test('mergeSettings keeps defaults and applies input', () => {
  const merged = mergeSettings({ theme: 'dark' });
  assert.strictEqual(merged.theme, 'dark');
  assert.strictEqual(merged.notifications.email, true);
});

test('renderGreeting escapes nothing and greets', () => {
  assert.strictEqual(renderGreeting('Ada'), 'Hello, Ada!');
});

test('verifyToken accepts a signed token', () => {
  const token = jwt.sign({ sub: '42' }, 'k');
  assert.strictEqual(verifyToken(token, 'k').sub, '42');
});

test('verifyToken rejects a wrong secret', () => {
  const token = jwt.sign({ sub: '42' }, 'k');
  assert.throws(() => verifyToken(token, 'other'));
});
