const bp = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const twilio = require('twilio');

const config = require('./config');
const logger = require('./services/logger');

const app = express();
const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(helmet());
app.use((req, res, next) => {
  logger.info({ method: req.method, path: req.path });
  next();
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500 || err.status).send({ message: err.message });
});

app.post('/token', (req, res) => {
  const { name: identity } = req.body;

  const token = new AccessToken(
    config.TACCOUNT_SID,
    config.TAPI_KEY,
    config.TAPI_SECRET,
    { ttl: config.MAX_SESSION, identity }
  );

  console.log(token.identity);
  
  token.addGrant(new VideoGrant());

  res.status(200).send({
    identity,
    token: token.toJwt()
  });
});

app.listen(3001, () => logger.info('Server started at 3001'));
