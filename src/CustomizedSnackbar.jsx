import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function CustomizedSnackbar() {
  const [open, setOpen] = React.useState(true)
  const [popUpInfo, setPopUpInfo] = React.useState(null)
  const [randomProduct, setRandomProduct] = useState([])

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
      }, 5000)
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

  const server = 'https://salespopup-server-772o8g9aj-amjayem.vercel.app'
  if (!popUpInfo) {
    axios(`${server}/get-data?shop=${getShopDomain()}`)
      .then((data) => {
        setPopUpInfo(data.data[0])
      })
      .catch((e) => console.error(e.message))
  }

  useEffect(() => {
    if (popUpInfo) {
      const products = popUpInfo?.product
      const randomIndex = Math.floor(Math.random() * products?.length)
      setRandomProduct(products[randomIndex])
    }
  }, [open])

  let img = ''

  if (randomProduct?.image) {
    img = randomProduct?.image
  }

  return (
    <>
      {img && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open}>
            <Box
              display={'flex'}
              bgcolor={popUpInfo?.bgColor}
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
              paddingX={2}
              width={'auto'}
              height={115}
              borderRadius={2}>
              <Box>
                {img && <img width={80} height={80} src={img} alt='img' />}
              </Box>
              <Box>
                <Typography color={popUpInfo?.textColor} fontWeight={'bold'}>
                  {randomProduct?.title}
                </Typography>
                <Typography color={popUpInfo?.textColor} fontSize={'15px'}>
                  ${randomProduct?.price}
                </Typography>
              </Box>
            </Box>
          </Snackbar>
        </Stack>
      )}
    </>
  )
}
