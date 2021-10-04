import { FC } from 'react'
import {
  chakra,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { MeliLogo } from 'components/MeliLogo'

enum ColorMode {
  dark = 'dark',
  light = 'light'
}

export const Header: FC = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const textColorMode = useColorModeValue(ColorMode.dark, ColorMode.light)
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <chakra.header
      w='full'
      overflowY='hidden'
    >
      <chakra.div h='4.5rem' mx='auto' maxW='1200px'>
        <Flex w='full' h='full' px='6' align='center' justify='space-between'>
          <Flex align='center'>
            <Link href='/' tabIndex={1} role='button' aria-label='Mercado Libre'>
              <HStack>
                <MeliLogo />
              </HStack>
            </Link>
          </Flex>
          <Flex
            justify='flex-end'
            w='full'
            maxW='824px'
            align='center'
            color='gray.400'
          >
            <IconButton
              tabIndex={2}
              rele='button'
              size='md'
              fontSize='lg'
              aria-label={`Switch to ${textColorMode} mode`}
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </Flex>
        </Flex>
      </chakra.div>
    </chakra.header>
  )
}
