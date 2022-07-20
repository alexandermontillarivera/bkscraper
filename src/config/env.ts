import { config as access} from 'std/dotenv/mod.ts'

const env = await access()

const config = {
  app: {
    port: env.PORT
  }
}

export default config
