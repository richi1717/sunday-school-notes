import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
// const battleScenes = ['boss', 'beach', 'desert', 'forest', 'grass'] // use to redirect to different tests

export default function Lessons ({ lessons }) {
  const [lesson, setLesson] = useState('')
  const [update, setUpdate] = useState(false)
  const [currentLessons, setCurrentLessons] = useState(lessons)

  const updateLessons = async () => {
    await fetch(`${process.env.appUrl}/api/updateLessons`, {
      method: 'POST',
      body: JSON.stringify({
        id: Date.now(),
        lesson,
      }),
    })
    try {
      const temp = await (await fetch(process.env.dbItems)).json()
      const keys = Object.keys(temp)
      alert(`${keys[keys.length - 1]}: ${temp[keys[keys.length - 1]]}`)

      setCurrentLessons(temp)
      setUpdate(false)
      setLesson('')
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    if (update && lesson) {
      updateLessons()
    }
  }, [update])

  return (
    <Stack spacing={2} padding={5}>
      {Object.entries(currentLessons).map((item, idx) => {
        const date = new Date(Number(item[0]))?.toLocaleDateString()

        return (
          <Stack key={item[0]} direction="row" spacing={2}>
            {date && <Typography sx={{ color: 'black' }}>{date}: </Typography>}
            <Typography key={idx} sx={{ color: 'black' }}>
              {item[1]}
            </Typography>
          </Stack>
        )
      })}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          lesson && updateLessons()
        }}
      >
        <Stack spacing={2}>
          <TextField
            value={lesson}
            onChange={(e) => {
              setLesson(e.target.value)
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: 'none', cursor: 'pointer' }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

Lessons.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
}
