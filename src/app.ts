import './db/languages.json' assert {type: "json"}
import app from './server.ts'
import { log as logger } from 'nextlog/mod.ts'
import config from './config/env.ts'
import api from './routes/main.ts'
import languages from './routes/languages.ts'

const application = config.app

app.get('/', (_req, res) => {
  res.send('Hello World')
})

app.use('/api', api)
app.use('/lang', languages)

app.listen(Number(application.port), () => {
  logger.info(`App listening in http://localhost:${application.port}`)
})
