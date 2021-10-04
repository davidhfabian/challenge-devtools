import { DataTypes } from 'sequelize'
import database from '../configs/database'

const ServerLog = database.define('server_log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    field: 'id'
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  server_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default ServerLog
