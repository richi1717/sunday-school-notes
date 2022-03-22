import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import MuiMarkdown from 'markdown-to-jsx'
import EditIcon from '@mui/icons-material/Edit'

export default function Lessons ({ lessons }) {
  const [lesson, setLesson] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [currentLessons, setCurrentLessons] = useState(lessons)
  // const [isAdmin, setIsAdmin] = useState(true)
  const isAdmin = true

  const updateLessons = async () => {
    try {
      await fetch(`${process.env.appUrl}/api/updateLessons`, {
        method: 'POST',
        body: JSON.stringify({
          id: updateId ?? Date.now(),
          lesson,
        }),
      })
      const temp = await (await fetch(process.env.dbItems)).json()

      setCurrentLessons(temp)
      setLesson('')
    } catch (err) {
      console.error(err)
    }
    setUpdateId('')
  }

  const deleteLessons = async (id) => {
    try {
      await fetch(`${process.env.appUrl}/api/deleteLessons`, {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      })
      const temp = await (await fetch(process.env.dbItems)).json()

      setCurrentLessons(temp)
    } catch (err) {
      console.error(err)
    }
    setUpdateId('')
  }

  return (
    <Stack spacing={2} padding={5}>
      {Object.entries(currentLessons).map((item) => {
        const date = new Date(Number(item[0]))?.toLocaleDateString()

        return (
          <Stack key={item[0]} direction="row" spacing={2}>
            {isAdmin && (
              <Stack direction="row" alignContent="center">
                <Button
                  type="button"
                  sx={{
                    textTransform: 'none',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    p: 0,
                  }}
                  onClick={() => deleteLessons(item[0])}
                >
                  x
                </Button>
                <Button
                  type="button"
                  sx={{
                    textTransform: 'none',
                    cursor: 'pointer',
                    p: 0,
                  }}
                  onClick={() => {
                    setLesson(item[1])
                    setUpdateId(item[0])
                  }}
                >
                  <EditIcon sx={{ p: 0, height: 12 }} />
                </Button>
              </Stack>
            )}
            {date && <Typography sx={{ color: 'black' }}>{date}: </Typography>}
            <Typography
              component={MuiMarkdown}
              sx={{ color: 'black', wordBreak: 'break-all' }}
            >
              {item[1]}
            </Typography>
          </Stack>
        )
      })}
      {isAdmin && (
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
              placeholder="https://www.markdownguide.org/cheat-sheet/ to learn how to use markdown"
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
      )}
    </Stack>
  )
}

Lessons.propTypes = {
  lessons: PropTypes.object.isRequired,
}
