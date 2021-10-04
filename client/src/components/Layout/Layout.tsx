import React, { FC } from 'react'
import { Box, Container, useColorModeValue, VStack } from '@chakra-ui/react'
import { Header } from 'components/Header'

export const Layout: FC = ({ children }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800') // 'gray.900'

  return (
    <Box borderTop='6px solid' borderTopColor='#FFF059' h='100vh' bgColor={bgColor}>
      <VStack maxW={{ xl: '1200px' }} m='0 auto'>
        <Header />
        <Container as='section' py='10' maxW='4xl' centerContent>
          {children}
        </Container>
        {/** <Footer /> */}
      </VStack>
    </Box>
  )
}
