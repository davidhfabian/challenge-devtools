import { FC } from 'react'
import { Layout } from 'components/Layout'
import { ServerLog } from './components/ServerLog'

export const Home: FC = () => {
  return (
    <Layout>
      <ServerLog />
    </Layout>
  )
}
