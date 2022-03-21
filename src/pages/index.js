import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import Header from '../components/Header'
import Lessons from '../components/Lessons'

export default function Location ({ lessons }) {
  return (
    <Stack>
      <Header />
      <Lessons lessons={lessons} />
    </Stack>
  )
}

Location.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export async function getServerSideProps ({ params }) {
  const lessons = await (await fetch(process.env.dbItems)).json()

  return {
    props: {
      lessons,
    },
  }
}
