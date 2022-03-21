import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
// const battleScenes = ['boss', 'beach', 'desert', 'forest', 'grass'] // use to redirect to different tests

export default function Location ({ lessons }) {
  const [lesson, setLesson] = useState('')
  const [update, setUpdate] = useState(false)
  const [currentLessons, setCurrentLessons] = useState(lessons)
  console.log(
    Object.keys(lessons).forEach((lessonFun) => {
      if (lessonFun.length === 13) {
        console.log(new Date(Number(lessonFun)).toLocaleDateString())
      }
    })
  )
  const updateLessons = async () => {
    await fetch(`${process.env.appUrl}/api/updateLessons`, {
      method: 'POST',
      body: JSON.stringify({
        id: Date.now(),
        lesson,
      }),
    })
    const temp = await (await fetch(process.env.dbItems)).json()
    setCurrentLessons(temp)
    setUpdate(false)
    setLesson('')
  }
  useEffect(() => {
    if (update) {
      updateLessons()
    }
  }, [update])

  return (
    <Stack>
      <Header />
      {Object.entries(currentLessons).map((item, idx) => (
        <Typography key={idx} sx={{ color: 'black' }}>
          {item[1]}
        </Typography>
      ))}
      <Box component="form" onClick={() => setUpdate(true)}>
        <Stack>
          <TextField
            value={lesson}
            onChange={(e) => {
              console.log(e.target.value)
              setLesson(e.target.value)
            }}
          />
          <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>
            Save it!
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

Location.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export async function getServerSideProps ({ params }) {
  console.log(process.env.dbItems)
  const lessons = await (await fetch(process.env.dbItems)).json()
  console.log({ lessons })
  // const monsters = await (await fetch(process.env.dbEnemies)).json()
  // const items = await (await fetch(process.env.dbItems)).json()
  // const areaEnemies = monsters.filter((enemy) =>
  //   enemy.sections.includes(params.battleScene)
  // )
  // const enemies = sampleSize(areaEnemies, random(1, 5))

  return {
    props: {
      lessons,
    },
  }
}
