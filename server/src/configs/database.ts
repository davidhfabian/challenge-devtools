import { Sequelize } from 'sequelize'
import config from 'config'

const {
  host,
  dialect,
  nameDatabase,
  username,
  password
} = config.get('db')

const database = new Sequelize(nameDatabase, username, password, {
  host,
  dialect
})

export default database
