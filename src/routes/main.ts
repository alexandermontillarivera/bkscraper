import { Router } from 'opine/mod.ts'
import * as controllers from '../controllers/main.ts'

const router = Router()

router.post('/meta', controllers.getMetaInfo)
router.post('/opengraph', controllers.getOpenGraph)

export default router
