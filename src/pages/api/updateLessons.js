import { initializeApp } from 'firebase/app'
import { getDatabase, ref, update } from 'firebase/database'

const config = {
  appName: 'Sunday Class Notes',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

const app = initializeApp(config)
const db = getDatabase(app)

const updateLessons = (req, res) => {
  const body = JSON.parse(req.body)

  update(ref(db, 'studies/'), {
    [body.id]: body.lesson,
  })

  res.statusCode = 200
  res.json({ message: 'Update complete' })
}

export default updateLessons
