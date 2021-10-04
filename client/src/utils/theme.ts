import { extendTheme, Theme } from '@chakra-ui/react'

const colors = {
  highlight: {
    standard: '#7289da',
    hover: '#677bc4',
    active: '#5b6eae'
  },
  brandGray: {
    accent: '#8e9297',
    active: '#393c43',
    light: '#36393f',
    dark: '#303339',
    darker: '#202225',
    darkest: '#18191c',
    hover: '#32353b'
  },
  brandGreen: '#43b581',
  labelGray: '#72767d',
  menuRed: '#f04747',
  brandBorder: '#1A202C',
  accountBar: '#292b2f',
  memberList: '#2f3136',
  iconColor: '#b9bbbe',
  messageInput: '#40444b'
}

const fonts = {
  body: "'Open Sans', sans-serif"
}

const customTheme: Partial<Theme> = extendTheme({ colors, fonts })

export default customTheme
