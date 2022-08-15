import * as controllers from '../controllers/languages.ts'
import { Router } from 'opine/mod.ts'

const router = Router()

router.get('/:contex/:lang', controllers.languages)

export default router