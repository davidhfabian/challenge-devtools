import React, { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { Header } from 'components/Header'

interface OwnProps {
  title?: string
}

type Props = OwnProps

export const Layout: FC<Props> = ({ title = '', children }) => {
  return (
    <Flex direction='column' align='center' maxW={{ xl: '1200px' }} m='0 auto'>
      <Header title={title} />
      {children}
      {/** <Footer /> */}
    </Flex>
  )
}
