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
      }, 2000)
    }, 5000)

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
  // console.log(popUpInfo)

  useEffect(() => {
    if (popUpInfo) {
      const products = popUpInfo?.product
      const randomIndex = Math.floor(Math.random() * products?.length)
      setRandomProduct(products[randomIndex])
    }
  }, [open])

  let img = ''
  let textColor = ''
  let bgColor = ''

  if (randomProduct?.image) {
    img = randomProduct?.image
    textColor = popUpInfo?.textColor
    bgColor = popUpInfo?.bgColor
  }

  // console.log(textColor, bgColor)
  return (
    <>
      {img && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open}>
            <Box
              display={'flex'}
              bgcolor={bgColor}
              justifyContent={'flex-start'}
              gap={2}
              padding={2}
              // height={150}
              width={370}
              borderRadius={2}>
              <Box height={100}>
                {img && <img width={130} height={100} src={img} alt='img' />}
              </Box>
              <Box>
                <Typography noWrap color={textColor} fontSize={25}>
                  {`${randomProduct?.title.toUpperCase()}`}
                </Typography>
                <Typography color={textColor} fontSize={20}>
                  Price: ${randomProduct?.price}
                </Typography>
                <Box
                  bgcolor={'white'}
                  my={1}
                  borderRadius={1}
                  padding={'.1rem'}
                  width={150}>
                  <Typography>Ordered Just Now</Typography>
                </Box>
              </Box>
            </Box>
          </Snackbar>
        </Stack>
      )}
    </>
  )
}
