import React, { FC } from 'react'
import { Center, Heading, Text, CenterProps } from '@chakra-ui/react'

const DEFAULT_HEIGHT = 475

interface OwnProps {
  title: string
  description: string
}

type Props = OwnProps & CenterProps

const EmptyState: FC<Props> = ({ title, description, ...restProps }) => {
  return (
    <Center height={DEFAULT_HEIGHT} flexDirection='column' {...restProps}>
      <Heading>{title}</Heading>
      {description &&
        <Text fontSize='lg' color='gray.500' isTruncated>
          {description}
        </Text>}
    </Center>
  )
}

export default EmptyState
