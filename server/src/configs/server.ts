import express, { Application } from 'express'
import config from 'config'
import cors from 'cors'
import morgan from 'morgan'
import database from './database'
import { serverRoutes, serverLogRoutes } from '../routes'
import { AppConfig } from '../utils/interfaces'

const { port, apiUrl }: AppConfig = config.get('app')

class Server {
  private readonly app: Application
  private readonly port: number
  private readonly apiPaths = {
    server: `${apiUrl}/server`,
    serverLog: `${apiUrl}/server-log`
  }

  constructor () {
    this.app = express()
    this.port = port

    this.dbConnect()
    this.middlewares()
    this.routes()
  }

  async dbConnect () {
    try {
      await database.authenticate()
      console.log('Database connection established')
    } catch (err: any) {
      throw new Error(err)
    }
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(morgan('tiny'))
    this.app.use(express.static('../client/build'))
  }

  routes () {
    this.app.use(this.apiPaths.server, serverRoutes)
    this.app.use(this.apiPaths.serverLog, serverLogRoutes)
  }

  listen () {
    this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`))
  }
}

export default Server
