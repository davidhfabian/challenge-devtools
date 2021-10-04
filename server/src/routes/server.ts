import { Router } from 'express'
import {
  getServers,
  getServer,
  postServer,
  putServer,
  deleteServer
} from '../controllers/server'

const router = Router()

router.get('/', getServers)
router.get('/:id', getServer)
router.post('/', postServer)
router.put('/:id', putServer)
router.delete('/:id', deleteServer)

export default router
