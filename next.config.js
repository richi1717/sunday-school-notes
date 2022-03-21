require('dotenv').config()
console.log({
  env: {
    dbItems: `${process.env.DB_URL}/studies`,
    debug: true,
    playAudio: false,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    dbUrl: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messageSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
    appUrl: process.env.APP_URL,
  },
})
module.exports = {
  env: {
    dbItems: `${process.env.DB_URL}/studies.json`,
    debug: true,
    playAudio: false,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    dbUrl: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messageSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
    appUrl: process.env.APP_URL,
  },
}
