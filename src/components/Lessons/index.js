import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import MuiMarkdown from 'markdown-to-jsx'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { filterByDate } from './helpers'

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
          id: updateId || Date.now(),
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
      {filterByDate(currentLessons).map((item) => {
        const { date, notes } = item

        return (
          <Stack key={date} spacing={2}>
            <Typography sx={{ fontSize: { mobile: 16, tablet: 18 }, fontWeight: 700 }}>
              {date}
            </Typography>
            {notes.map((note, idx) => (
              <Stack direction="row" key={idx} spacing={2}>
                <Stack direction={{ mobile: 'row', tablet: 'row' }} spacing={2}>
                  {isAdmin && (
                    <Stack direction="row" sx={{ alignSelf: 'flex-start', pt: 0.5 }}>
                      <IconButton
                        type="button"
                        sx={{
                          textTransform: 'none',
                          cursor: 'pointer',
                          p: 0,
                        }}
                        onClick={() => deleteLessons(note[0])}
                      >
                        <CloseIcon sx={{ height: 16 }} />
                      </IconButton>
                      <IconButton
                        type="button"
                        sx={{
                          textTransform: 'none',
                          cursor: 'pointer',
                          p: 0,
                        }}
                        onClick={() => {
                          setLesson(note[1])
                          setUpdateId(note[0])
                        }}
                      >
                        <EditIcon sx={{ height: 12 }} />
                      </IconButton>
                    </Stack>
                  )}
                  <Stack direction={{ mobile: 'column', tablet: 'row' }} spacing={2}>
                    <Typography
                      component={MuiMarkdown}
                      sx={{ wordBreak: 'break-all' }}
                      onClick={() => {
                        setLesson(note[1])
                        setUpdateId(note[0])
                      }}
                    >
                      {note[1]}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
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
              multiline
              minRows={4}
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
