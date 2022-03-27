import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, ref } from 'firebase/database'

const config = {
  appName: 'Sunday Class Notes',
  authDomain: process.env.authDomain,
  databaseURL: process.env.dbUrl,
  storageBucket: process.env.storageBucket,
}

const app = initializeApp(config)
const db = ref(getDatabase(app))

const login = (req, res) => {
  const body = JSON.parse(req.body)

  get(child(db, `login/${body.name}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const password = snapshot.val()
        if (password === body.password) {
          res.statusCode = 200
          res.json({ message: 'Login validated' })
        } else {
          res.statusCode = 401
          res.json({ message: 'Unauthorized' })
        }
      } else {
        res.statusCode = 404
        res.json({ message: 'User not found' })
      }
    })
    .catch((error) => {
      console.error(error)
      res.statusCode = 500
      res.json({ message: 'Something went wrong' })
    })
}

export default login
