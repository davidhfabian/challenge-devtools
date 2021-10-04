import { Router } from 'express'
import {
  getServerLogs,
  getServerLog,
  postServerLog,
  putServerLog,
  deleteServerLog
} from '../controllers/serverLog'

const router = Router()

router.get('/', getServerLogs)
router.get('/:id', getServerLog)
router.post('/', postServerLog)
router.post('/custom', getServerLogs)
router.put('/:id', putServerLog)
router.delete('/:id', deleteServerLog)

export default router
