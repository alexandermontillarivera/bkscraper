import * as express from 'opine/mod.ts'
import { simpleCors } from 'simple_cors/mod.ts'
const app = express.opine()

app.use(express.urlencoded({extends: false}))
app.use(express.json())
app.use(simpleCors)


export default app