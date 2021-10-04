import StatusCode from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import { Server, ServerLog } from '../models'
import { DefaultPagination } from '../utils/enums'
import { QueryServerLog, Pagination } from '../utils/interfaces'
import {
  parseResponseServerLog,
  getServerLogQuery,
  findOrCreateServer,
  findOrCreateServerType
} from './helpers/serverLogHelper'

export const getServerLogs = async (req: Request<{}, {}, {}, QueryServerLog>, res: Response) => {
  const { query } = req

  const pg = query?.pagination as unknown as string
  const {
    offset = DefaultPagination.offset,
    limit = DefaultPagination.limit
  }: Pagination = JSON.parse(pg)

  console.log(offset, limit)
  try {
    const { rows: serverLogs, count } = await ServerLog.findAndCountAll(
      {
        ...getServerLogQuery(query),
        offset,
        limit
      }
    )

    const pagination: Pagination = { offset, limit, count }
    const response = serverLogs.map(parseResponseServerLog)
    res.status(StatusCode.OK).json({
      status: true,
      msg: 'getAllServerLogs',
      data: response,
      pagination
    })
  } catch (err) {
    console.log(err)
    res.status(StatusCode.BAD_REQUEST).json({ status: false, msg: 'Bad request' })
  }
}

export const getServerLog = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const serverLog = await ServerLog.findByPk(id, getServerLogQuery())

    if (!serverLog) {
      res.status(StatusCode.NOT_FOUND).json({
        status: false,
        msg: 'No Server Log found',
        data: {}
      })
      return next()
    }

    const response = parseResponseServerLog(serverLog)
    res.status(StatusCode.OK).json({
      status: true,
      msg: 'getServerLog',
      data: response
    })
  } catch (err) {
    console.log(err)
    res.status(StatusCode.BAD_REQUEST).send({ status: false, msg: 'Bad request' })
  }
}

export const postServerLog = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req
  const { server = '', description = '', server_type: serverType = '' } = body ?? {}

  if (!server && !description && !serverType) {
    res.status(StatusCode.BAD_REQUEST).json({ status: false, msg: 'Bad request' })
    return next()
  }

  try {
    const serverTypeId = await findOrCreateServerType(serverType)
    const serverId = await findOrCreateServer(server, serverTypeId)

    const instanceServerLog = await ServerLog.create({ description, server_id: serverId })
    if (!instanceServerLog) {
      res.status(StatusCode.NOT_FOUND).json({ status: false, msg: 'Server Log not create' })
      return next()
    }

    const { id: serverLogId } = instanceServerLog.get({
      plain: true
    })
    const serverLog = await ServerLog.findByPk(serverLogId, getServerLogQuery())
    const response = parseResponseServerLog(serverLog)

    res.status(StatusCode.CREATED).json({
      status: true,
      msg: 'Server log was created successfully',
      data: response
    })
  } catch (err) {
    console.log(err)
    res.status(StatusCode.BAD_REQUEST).json({ status: false, msg: 'Bad request' })
  }
}

export const putServerLog = async (req: Request, res: Response, next: NextFunction) => {
  const { body, params } = req
  const { id } = params

  try {
    const server = await ServerLog.findByPk(id)
    if (!server) {
      res.status(StatusCode.NOT_FOUND).json({ status: false, msg: 'Server Log not found' })
      return next()
    }

    await ServerLog.update(body, { where: { id } })
    const response = await ServerLog.findByPk(id)
    res.status(StatusCode.OK).json({
      status: true,
      msg: 'Server Log updated successfully',
      data: response
    })
  } catch (err) {
    console.log(err)
    res.status(StatusCode.BAD_REQUEST).json({ status: false, msg: 'Bad request' })
  }
}

export const deleteServerLog = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const server = await ServerLog.findByPk(id)
    if (!server) {
      res.status(StatusCode.NOT_FOUND).json({ status: false, msg: 'Server Log not exist' })
      return next()
    }

    await ServerLog.destroy({ where: { id } })
    res.status(StatusCode.OK).json({ status: true, msg: 'Server Log removed successfully' })
  } catch (err) {
    console.log(err)
    res.status(StatusCode.BAD_REQUEST).json({ status: false, msg: 'Bad request' })
  }
}
