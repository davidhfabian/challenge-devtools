import { FC } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

interface OwnProps {
  search: string
  handleSearch: (value: string) => void
}

type Props = OwnProps

export const Search: FC<Props> = ({ handleSearch, search }) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.400' />
      </InputLeftElement>
      <Input
        tabIndex={1}
        variant='filled'
        value={search}
        placeholder='Search by description or server...'
        autoComplete='none'
        autoFocus
        onChange={(evt) => handleSearch(evt.target.value)}
        color='gray.600'
        appearance='none'
        {...{
          rounded: 'base',
          bg: '#EEEEEE',
          _hover: { borderColor: '#AAAAAA' },
          _focus: { borderColor: '#AAAAAA' },
          _placeholder: { color: 'gray.400' }
        }}
      />
      {search && (
        <InputRightElement>
          <CloseIcon color='gray.400' onClick={() => handleSearch('')} />
        </InputRightElement>)}
    </InputGroup>
  )
}
