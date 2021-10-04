import { Request, Response } from 'express'
import { Server, ServerType } from '../models'

export const getServers = async (req: Request, res: Response) => {
  try {
    const servers = await Server.findAll({
      include: [
        { model: ServerType, attributes: ['name'] }
      ]
    })

    res.json(servers)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getServer = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const server = await Server.findByPk(id)

    if (!server) res.status(404).json({ msg: 'server not found' })
    res.json(server)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const postServer = async (req: Request, res: Response) => {
  const { body } = req

  try {
    const existingServer = await Server.findOne({
      where: { email: req.body.email }
    })

    if (existingServer) res.status(400).json({ msg: 'server email exist' })

    // @ts-expect-error
    const server = new Server(body)
    await server.save()

    if (!server) res.status(404).json({ msg: 'user not create' })
    res.json(server)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const putServer = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  try {
    const server = await Server.findByPk(id)
    if (!server) res.status(404).json({ msg: 'user not exist' })

    if (body?.email) {
      const existingServer = await Server.findOne({
        where: { email: req.body.email }
      })
      if (existingServer) res.status(400).json({ msg: 'user email exist' })
    }

    await Server.update(body, { where: { id } })
    res.json(await Server.findByPk(id))
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const deleteServer = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const server = await Server.findByPk(id)
    if (!server) res.status(404).json({ msg: 'server not exist' })

    await Server.destroy({ where: { id } })
    // await User.update({status: 0}) // Soft delete
    res.json(server)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}
