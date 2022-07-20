import controller from '../controllers/languages.ts'
import { Router } from 'opine/mod.ts'

const router = Router()

router.get('/:lang', controller)

export default router