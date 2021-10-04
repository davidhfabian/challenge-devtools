import express, { Application } from 'express'
import cors from 'cors'
// import serverRoutes from '../routes/server'
import database from './database'
import config from 'config'

interface AppConfig {
  port: number
  apiUrl: string
}

const { port, apiUrl }: AppConfig = config.get('app')

class Server {
  private readonly app: Application
  private readonly port: number
  private readonly apiPaths = {
    server: `${apiUrl}/server`,
    log: `${apiUrl}/log`
  }

  constructor () {
    this.app = express()
    this.port = port

    // this.dbConnection()
    this.middleware()
  }

  async dbConnection () {
    try {
      await database.authenticate()
      console.log('Database connection established')
    } catch (err: any) {
      throw new Error(err)
    }
  }

  middleware () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  listen () {
    this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
  }
}

export default Server
