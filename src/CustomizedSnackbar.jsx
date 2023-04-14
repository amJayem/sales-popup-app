import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import { Box } from '@mui/system'
import { Link, Typography } from '@mui/material'
import axios from 'axios'

export default function CustomizedSnackbar() {
  const [open, setOpen] = React.useState(false)
  const [popUpInfo, setPopUpInfo] = React.useState(null)

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
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getShopDomain = () => {
    if ('object' == typeof Shopify && Shopify.hasOwnProperty('shop')) {
      return Shopify.shop
    } else {
      Array.from(document.getElementsByTagName('script')).forEach((element) => {
        if (
          element.hasAttribute('src') &&
          element.src.includes('jayem') &&
          element.src.includes('shop=')
        ) {
          return element.src.slice('shop=')[1]
        }
      })
    }
    return document.domain
  }

  // console.log(getShopDomain())
  const server = 'https://salespopup-server-772o8g9aj-amjayem.vercel.app'

  if (!popUpInfo) {
    axios(`${server}/get-data?shop=${getShopDomain()}`)
      .then((data) => {
        setPopUpInfo(data.data[0])
        // console.log(data.data[0])
      })
      .catch((e) => console.error(e.message))
  }

  // console.log(popUpInfo)

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
              {popUpInfo?.title}
            </Typography>
            <Typography>{popUpInfo?.subTitle}</Typography>
            <div>
              <Typography component='div' paddingY={2}>
                <Link
                  sx={{
                    '&:hover': {
                      color: 'yellow',
                      backgroundColor: 'red'
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
