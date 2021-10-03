import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('render app', () => {
  const comp = render(<App />)

  expect(comp.container).toBeDefined()
})
