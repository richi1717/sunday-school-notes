const firebase = require('firebase')

const config = {
  appName: 'Sunday Class Notes',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const database = firebase.app().database()

const deleteLessons = (req, res) => {
  const body = JSON.parse(req.body)
  database.ref(`studies/${body.id}`).remove()
  res.statusCode = 200
  res.json({ message: 'Delete complete' })
}

export default deleteLessons
