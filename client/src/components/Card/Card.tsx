import React, { FC } from 'react'
import { Box, Heading, useColorModeValue } from '@chakra-ui/react'

interface OwnProps {
  title?: string
}

type Props = OwnProps

export const Card: FC<Props> = ({ children, title = '' }) => {
  const bgColor = useColorModeValue('white', 'gray.700')
  const colorHeading = useColorModeValue('gray.700', 'white')
  const colorHeadingHover = useColorModeValue('gray.600', 'gray.200')

  return (
    <Box
      mx='auto'
      px={8}
      py={4}
      bg={bgColor}
      rounded='base'
      shadow='base'
      w='full'
      h='xxl'
    >
      <Box mt={2}>
        <Heading
          as='h4'
          size='md'
          color={colorHeading}
          fontWeight='700'
          _hover={{
            color: colorHeadingHover,
            textDecor: 'underline'
          }}
        >
          {title}
        </Heading>
      </Box>
      <Box mt={4}>
        {children}
      </Box>
    </Box>
  )
}
