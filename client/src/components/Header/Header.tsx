import React, { FC } from 'react'
import { Heading } from '@chakra-ui/react'

interface OwnProps {
  title: string
}

type Props = OwnProps

export const Header: FC<Props> = ({ title = '' }) => {
  return (
    <Heading>{title}</Heading>
  )
}
