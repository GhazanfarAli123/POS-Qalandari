'use client'

import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Cookies from 'js-cookie'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function RecipeReviewCard({ name, group, user, date, image, price, status, id }) {
  const [expanded, setExpanded] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  let users
  const userCookie = Cookies.get('user')
  if (userCookie) {
    users = JSON.parse(userCookie)
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: '20px', marginBottom: '20px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {user.charAt(0)}
          </Avatar>
        }
        title={`${group} from ${user}`}
        subheader={`${date}`}
      />
      <CardMedia component='img' onClick={handleOpen} height='200' image={`${image}`} />
      {/* <button onClick={handleOpen}>Open modal</button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CardMedia component='img' height='500' width='800' image={`${image}`} />
        </Box>
      </Modal>
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {price}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {status}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          <a href={`update-mkitm/${id}`}>Edit</a>
        </Typography>
      </CardContent>
    </Card>
  )
}
