import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AdminText = React.forwardRef(
  ({ lesson, setLesson, setCurrentLessons, updateId, setUpdateId }, ref) => {
    const [chapter, setChapter] = useState('')

    useEffect(() => {
      setChapter(updateId?.split('-')?.[1] || '')
    }, [updateId])

    const updateLessons = async () => {
      try {
        const updateIdMatches = updateId?.split('-')?.[1] === chapter
        await fetch('/api/updateLessons', {
          method: 'POST',
          body: JSON.stringify({
            id: (updateIdMatches && updateId) || `${Date.now()}-${chapter}`,
            lesson,
          }),
        })
        const temp = await (await fetch(process.env.dbItems)).json()

        setCurrentLessons(temp)
        setLesson('')
        setChapter('')
      } catch (err) {
        console.error(err)
      }
      setUpdateId('')
    }

    return (
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          lesson && updateLessons()
        }}
      >
        <Stack spacing={2}>
          {(lesson || chapter) && (
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button
                type="button"
                variant="outlined"
                sx={{ textTransform: 'none', cursor: 'pointer' }}
                onClick={() => {
                  setLesson('')
                  updateId && setUpdateId('')
                }}
              >
                {updateId ? 'Cancel' : 'Clear'}
              </Button>
              <Button
                type="button"
                variant="contained"
                sx={{ textTransform: 'none', cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault()
                  lesson && updateLessons()
                }}
              >
                {updateId ? 'Update' : 'Add'}
              </Button>
            </Stack>
          )}
          <TextField
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value)
            }}
            label="Bible chapter"
            placeholder="Bible chapter"
          />
          <TextField
            inputRef={ref}
            value={lesson}
            multiline
            minRows={4}
            label="Your notes"
            onChange={(e) => {
              setLesson(e.target.value)
            }}
            placeholder="https://www.markdownguide.org/cheat-sheet/ to learn how to use markdown"
          />
          {(lesson || chapter) && (
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button
                type="button"
                variant="outlined"
                sx={{ textTransform: 'none', cursor: 'pointer' }}
                onClick={() => {
                  setLesson('')
                  setChapter('')
                  updateId && setUpdateId('')
                }}
              >
                {updateId ? 'Cancel' : 'Clear'}
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: 'none', cursor: 'pointer' }}
              >
                {updateId ? 'Update' : 'Add'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    )
  }
)

AdminText.displayName = 'AdminText'

AdminText.propTypes = {
  setCurrentLessons: PropTypes.func.isRequired,
  setLesson: PropTypes.func.isRequired,
  lesson: PropTypes.string.isRequired,
  updateId: PropTypes.string.isRequired,
  setUpdateId: PropTypes.func.isRequired,
}

export default AdminText
