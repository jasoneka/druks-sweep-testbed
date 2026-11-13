const express = require('express');
const { mergeSettings, renderGreeting, verifyToken, fetchAvatar } = require('./settings');

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'dev-secret';

app.get('/hello', (req, res) => res.send(renderGreeting(req.query.name || 'there')));

app.post('/settings', (req, res) => {
  try {
    verifyToken(req.get('authorization')?.replace('Bearer ', ''), SECRET);
  } catch {
    return res.status(401).end();
  }
  res.json(mergeSettings(req.body));
});

app.get('/avatar', async (req, res) => res.send(await fetchAvatar(req.query.url)));

if (require.main === module) app.listen(process.env.PORT || 3000);

module.exports = app;
