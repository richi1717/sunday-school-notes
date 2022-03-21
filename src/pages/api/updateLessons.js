const firebase = require('firebase')

const config = {
  appName: 'Ellies Quest',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const database = firebase.app().database()

const updateLessons = (req, res) => {
  const body = JSON.parse(req.body)
  database.ref('studies/').update({
    [body.id]: body.lesson,
  })
  res.statusCode = 200
  res.json({ message: 'Update complete' })
}

export default updateLessons
