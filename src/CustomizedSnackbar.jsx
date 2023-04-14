import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import { image } from '../assets'
import { Box } from '@mui/system'
import { Link, Typography } from '@mui/material'

export default function CustomizedSnackbar() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleOpen()
      setTimeout(() => {
        handleClose()
      }, 2000)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} onClose={handleClose}>
        <Box
          bgcolor={'#1E2028'}
          display={'flex'}
          flexDirection='row'
          gap={4}
          padding={2}
          borderRadius={2}
          alignItems='center'>
          <Box height={'50px'} width={'50px'} display={'flex'}>
            <img
              src='https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt=''
            />
          </Box>
          <Box color={'white'}>
            <Typography fontSize={18} fontWeight={'bold'}>
              This product is sold
            </Typography>
            <Typography>XYZ bought the product!</Typography>
            <div>
              {/* This could be a heading (eg. h2) depends on your use case. */}
              <Typography component='div' paddingY={2}>
                <Link
                  sx={{
                    '&:hover': {
                      color: 'yellow'
                      // backgroundColor: 'red'
                    }
                  }}
                  href='#with-card'
                  underline='none'
                  color='yellowgreen'
                  fontWeight='md'>
                  See Product
                </Link>
              </Typography>
            </div>
          </Box>
        </Box>
      </Snackbar>
    </Stack>
  )
}
