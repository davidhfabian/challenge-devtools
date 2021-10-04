import React, { FunctionComponent } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

interface OwnProps {
  title?: string
}

type Props = OwnProps

export const Search: FunctionComponent<Props> = (props) => {
  const handleChange: () => void = () => 'asdsa'

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.400' />
      </InputLeftElement>
      <Input
        variant='filled'
        type='search'
        placeholder='Search by server name or description...'
        autoComplete='none'
        autoFocus
        onChange={handleChange}
        color='gray.600'
        {...{
          rounded: 'xl',
          bg: '#EEEEEE',
          _hover: { borderColor: '#AAAAAA' },
          _focus: { borderColor: '#AAAAAA' },
          _placeholder: { color: 'gray.400' }
        }}
        {...props}
      />
      <InputRightElement>
        <CloseIcon color='gray.400' />
      </InputRightElement>
    </InputGroup>
  )
}
