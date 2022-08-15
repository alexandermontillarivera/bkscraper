// deno-lint-ignore-file no-explicit-any
import { CasualDB } from 'casualdb/mod.ts'
import { log } from 'nextlog/mod.ts'
import { response, request } from 'opine/mod.ts'
import * as Schemas  from '../types/database.ts'
import * as path from "std/path/mod.ts"

const db = new CasualDB<Schemas.db>()
await db.connect(path.join(Deno.cwd(), 'src/db/languages.json'))

export const languages = async (req = request, res = response) => {
  const { contex, lang } = req.params
  const responseData = (data) => {
    const filter: any = data.findOne({ lang })
    if(filter.value() !== null){
      res.json({
        data: filter.data
      })
    } else {
      res.status = 404
      res.json({
        status: 404,
        message: 'Not found'
      })
    }
  }
  try {
    switch(contex){
      case 'home': {
        const data = await db.get<Schemas.home["home"]>('home')
        responseData(data)
        break
      }
      case 'documentation': {
        const data = await db.get<Schemas.documentation["documentation"]>('documentation')
        responseData(data)
        break
      }
      case 'opengraph': {
        const data = await db.get<Schemas.opengraph["openGraph"]>('openGraph')
        responseData(data)
        break
      }
      case 'metadata': {
        const data = await db.get<Schemas.metadata["metadata"]>('metadata')
        responseData(data)
        break
      }
      default : {
        res.status = 400
        res.json({
          status: 400,
          message: 'Require valid parameters'
        })
      }
    }
  } catch (error) {
    res.status = 500
    res.json({
      status: 500,
      message: 'Internal error server...'
    })
    log.error(error)
  }
}