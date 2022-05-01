import fetch from 'node-fetch'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRef, useState } from 'react'
import MuiMarkdown from 'markdown-to-jsx'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { filterByDate } from './helpers'
import AdminText from './AdminText'

export default function Lessons ({ lessons, isAdmin }) {
  const inputEl = useRef(null)
  const [lesson, setLesson] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [currentLessons, setCurrentLessons] = useState(lessons)

  const lastIndex = filterByDate(currentLessons)?.length - 1
  const expandedDefault = filterByDate(currentLessons)?.[lastIndex]?.date
  const [expanded, setExpanded] = useState(expandedDefault)

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
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
    <Stack spacing={2} padding={{ mobile: 3, tablet: 5 }}>
      {filterByDate(currentLessons).map((item, index) => {
        const { date, notes } = item

        return (
          <Accordion key={date} expanded={expanded === date} onChange={handleChange(date)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{date}</AccordionSummary>
            {notes.map((note, idx) => (
              <AccordionDetails key={idx}>
                <Stack direction="row" spacing={2}>
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
                            inputEl.current.focus()
                          }}
                        >
                          <EditIcon sx={{ height: 12 }} />
                        </IconButton>
                      </Stack>
                    )}
                    <Stack direction={{ mobile: 'column', tablet: 'row' }} spacing={2}>
                      <Typography
                        component={MuiMarkdown}
                        sx={{ 'p:first-child': { mt: 0 } }}
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
              </AccordionDetails>
            ))}
          </Accordion>
        )
      })}
      {isAdmin && (
        <AdminText
          setCurrentLessons={setCurrentLessons}
          lesson={lesson}
          setLesson={setLesson}
          updateId={updateId}
          setUpdateId={setUpdateId}
          ref={inputEl}
        />
      )}
    </Stack>
  )
}

Lessons.propTypes = {
  lessons: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}
