import { initializeApp } from 'firebase/app'
import { getDatabase, ref, remove } from 'firebase/database'
import NextCors from 'nextjs-cors'

const config = {
  appName: 'Sunday Class Notes',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

const app = initializeApp(config)
const db = getDatabase(app)

const deleteLessons = async (req, res) => {
  const body = JSON.parse(req.body)
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  remove(ref(db, `studies/${body.id}`))

  res.json({ message: 'Delete complete' })
}

export default deleteLessons
