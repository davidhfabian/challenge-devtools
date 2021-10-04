import { DataTypes } from 'sequelize'
import database from '../configs/database'
import ServerLog from './serverLog'

const Server = database.define('server', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING(100)
  },
  description: {
    type: DataTypes.STRING(200)
  },
  server_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

Server.hasMany(ServerLog, { foreignKey: 'server_id', sourceKey: 'id' })
ServerLog.belongsTo(Server, { foreignKey: 'server_id', constraints: false })

export default Server
