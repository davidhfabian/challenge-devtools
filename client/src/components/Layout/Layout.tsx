import React, { FC } from 'react'
import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react'
import { Header } from 'components/Header'

export const Layout: FC = ({ children }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800') // 'gray.900'

  return (
    <Box borderTop='6px solid' borderTopColor='#FFF059' bgColor={bgColor}>
      <Flex direction='column' maxW={{ xl: '1200px' }} m='0 auto'>
        <Header />
        <Container as='section' h={2000}>
          {children}
        </Container>
        {/** <Footer /> */}
      </Flex>
    </Box>
  )
}
