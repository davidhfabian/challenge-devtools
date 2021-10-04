import React, { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { Layout } from 'components/Layout'

export const Home: FC = () => {
  return (
    <Layout title='Mercado Libre Challenge'>
      <Heading as='h4' size='md'>Buscador de servicios</Heading>
    </Layout>
  )
}
