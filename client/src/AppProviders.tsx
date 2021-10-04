import React, { FC, StrictMode } from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
// @ts-expect-error
// Todo: resolver este type
import customTheme from 'utils/theme'

const AppProviders: FC = ({ children }) => {
  return (
    <StrictMode>
      <ColorModeScript />
      <ChakraProvider theme={customTheme}>
        {children}
      </ChakraProvider>
    </StrictMode>
  )
}

export default AppProviders
