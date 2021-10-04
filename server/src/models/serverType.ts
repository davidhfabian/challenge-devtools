import { DataTypes } from 'sequelize'
import database from '../configs/database'
import Server from './server'

const ServerType = database.define('server_type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true
  }
}, {
  tableName: 'server_types',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

ServerType.hasMany(Server, { foreignKey: 'server_type_id', sourceKey: 'id' })
Server.belongsTo(ServerType, { foreignKey: 'server_type_id', constraints: false })

export default ServerType
