import { CasualDB } from 'casualdb/mod.ts'
import { log } from 'nextlog/mod.ts'
import { response, request } from 'opine/mod.ts'
import { Schema } from '../types/database.ts'
import * as path from "std/path/mod.ts"

const db = new CasualDB<Schema>()
await db.connect(path.join(Deno.cwd(), 'src/db/languages.json'))

const getData = await db.get<Schema["languages"]>('languages')

const languagesControl = (req = request, res = response) => {
  const { lang } = req.params
  try {
    const dataFilter = getData.findOne({ lang })
    if(dataFilter.value() !== null){
      res.status = 200
      res.json({
        status: 200,
        // @ts-ignore access to object
        data: dataFilter.data.dataLang 
      })
    } else {
      res.status = 404
      res.json({
        status: 404,
        message: 'Lang not found :('
      })
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

export default languagesControl
