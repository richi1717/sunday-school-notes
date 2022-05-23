import { useState } from 'react'
import fetch from 'node-fetch'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import PropTypes from 'prop-types'

export default function Header ({ isAdmin, setIsAdmin }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('tablet'))

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          name,
          password,
        }),
      })

      if (response.ok) {
        document.cookie = 'loggedIn=true; expires=Thu, 31 Dec 2099 23:59:59 GMT'
        setPassword('')
        setOpen(false)
        setIsAdmin(true)
      } else {
        setError(`${response.status} ${response.statusText}`)
      }
    } catch (err) {
      setError(err.statusText)
    }
  }

  const handleClick = () => {
    if (isAdmin) {
      setIsAdmin(false)
      document.cookie = 'loggedIn=false'
    } else {
      setOpen(true)
    }
  }

  return (
    <Stack
      direction={{ mobile: 'column-reverse', tablet: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          p: { tablet: 4 },
          fontSize: { mobile: 40, tablet: 64 },
        }}
      >
        Sunday School Notes
      </Typography>
      <Button sx={{ textTransform: 'none', p: 2 }} onClick={handleClick}>
        {isAdmin ? 'Logout' : 'Login'}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen={matches}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: { mobile: 30, tablet: 44 } }}>
          Login to edit
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {error && (
          <Alert severity="error" sx={{ mx: 3 }}>
            {error}
          </Alert>
        )}
        <DialogContent>
          <Stack
            sx={{ minWidth: { mobile: 1, tablet: 400 }, pt: 1 }}
            spacing={2}
            component="form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            <DialogActions sx={{ p: 0 }}>
              <Button
                type="submit"
                sx={{ textTransform: 'none', width: 1 }}
                variant="contained"
              >
                Login
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

Header.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
}
