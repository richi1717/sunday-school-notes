import { initializeApp } from 'firebase/app'
import { getDatabase, ref, update } from 'firebase/database'
import NextCors from 'nextjs-cors'

const config = {
  appName: 'Sunday Class Notes',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

const app = initializeApp(config)
const db = getDatabase(app)

const updateLessons = async (req, res) => {
  const body = JSON.parse(req.body)
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  await update(ref(db, 'studies/'), {
    [body.id]: body.lesson,
  })

  res.json({ message: 'Update complete' })
}

export default updateLessons
