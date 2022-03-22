import { initializeApp } from 'firebase/app'
import { getDatabase, ref, remove } from 'firebase/database'

const config = {
  appName: 'Sunday Class Notes',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

const app = initializeApp(config)
const db = getDatabase(app)

const deleteLessons = (req, res) => {
  const body = JSON.parse(req.body)

  remove(ref(db, `studies/${body.id}`))

  res.statusCode = 200
  res.json({ message: 'Delete complete' })
}

export default deleteLessons
