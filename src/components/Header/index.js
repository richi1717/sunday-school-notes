import { Typography } from '@mui/material'

export default function Header () {
  return (
    <Typography
      variant="h1"
      sx={{ textAlign: 'center', p: 4, fontSize: { mobile: 40, tablet: 64 } }}
    >
      Sunday School Notes
    </Typography>
  )
}
