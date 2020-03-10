require('dotenv').config();

module.exports = {
  TACCOUNT_SID: process.env.TACCOUNT_SID,
  TAPI_KEY: process.env.TAPI_KEY,
  TAPI_SECRET: process.env.TAPI_SECRET,
  MAX_SESSION: 14400,
}
