import { Op, Model } from 'sequelize'
import { Server, ServerType } from '../../models'
import { QueryServerLog } from '../../utils/interfaces'

export const getServerLogQuery = (filters?: QueryServerLog) => {
  const { description = '', server = '' } = filters ?? {}

  const where = (description || server)
    ? {
      where: {
        [Op.or]: [
          { description: { [Op.like]: `%${description}%` } },
          { '$server.name$': { [Op.like]: `%${server}%` } }
        ]
      }
    } : {}

  return ({
    include: [
      {
        model: Server,
        attributes: ['name', 'description'],
        include: [
          {
            model: ServerType,
            attributes: ['name']
          }
        ]
      }
    ],
    ...where
  })
}

/**
 * Get value from instance
 * @param instance
 */
export const getDataValue = (instance: Model<any, any>) => instance.get({
  plain: true
})

export const parseResponseServerLog = (response: any) => {
  const { id, description, created_at: createdAt, server: serverData } = response ?? {}
  const { name: server, server_type: { name: serverType } } = serverData

  return {
    id,
    description,
    createdAt,
    server,
    serverType
  }
}

export async function findOrCreateServerType (serverType: string) {
  const [instanceServerType] = await ServerType.findOrCreate({
    attributes: ['id', 'name'],
    where: {
      name: serverType
    },
    limit: 1
  })
  const { id: serverTypeId } = getDataValue(instanceServerType)

  return serverTypeId
}

export async function findOrCreateServer (server: string, serverTypeId: number) {
  const [instanceServer] = await Server.findOrCreate({
    attributes: ['id', 'name', 'description', 'server_type_id'],
    where: {
      name: server,
      server_type_id: serverTypeId
    },
    defaults: {
      description: `Server ${server}`
    },
    limit: 1
  })
  const { id: serverId } = getDataValue(instanceServer)

  return serverId
}
