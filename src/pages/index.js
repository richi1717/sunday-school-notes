import fetch from 'node-fetch'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import Header from '../components/Header'
import Lessons from '../components/Lessons'

export default function Home ({ lessons }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const getCookie = (cookieName) => {
      const cookieArr = document.cookie.split(';')
      const found = cookieArr.find((cookie) => cookie.includes(cookieName))

      return found?.split('=')[1]
    }

    const cookie = getCookie('loggedIn')
    console.log({ cookie })

    setIsAdmin(cookie === 'true')
  }, [isAdmin])
  console.log('got it!')
  return (
    <Stack>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      {/* <Lessons lessons={lessons} isAdmin={isAdmin} /> */}
    </Stack>
  )
}

Home.propTypes = {
  lessons: PropTypes.object.isRequired,
}

export async function getServerSideProps ({ params }) {
  console.log(process.env.dbItems)
  const lessons = await (await fetch(process.env.dbItems)).json()

  return {
    props: {
      lessons,
    },
  }
}
