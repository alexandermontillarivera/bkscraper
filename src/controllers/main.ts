import { axiod as axios } from 'axiod/mod.ts'
import { response, request } from 'opine/mod.ts'
import { log as logger } from 'nextlog/mod.ts'
import { cheerio }  from 'cheerio/mod.ts'
import { Selector } from 'cheerio/types.ts'
import * as types from '../types/dataScrapping.ts'

export const getMetaInfo = async (req = request, res = response) => {
  const url: string = req.body.siteUrl
  try {
    if(url){
      await axios.get(url)
      .then(response => {
        //@ts-ignore exist method in module
        const $: Selector = cheerio.load(response.data)
        const head = $('meta')
        const metaTags = []
        for (let i = 0; i < head.length; i++) {
          const element = head[i]
          //@ts-ignore send array of element attributes
          metaTags.push(element.attribs)
        }
        const data = metaTags.filter((i: types.Item) => 
        i.name == 'description' || 
        i.name == 'title' || 
        i.name == 'keywords')
  
        res.status = 200
        res.json({
          status: 200,
          data
        })
      })
    } else {
      res.status = 400
      res.json({
        status: 400,
        message: 'Required url'
      })
    }
  } catch (err) {
    logger.error('Error server from meta function: ', err)
    res.status = 500 
    res.json({
      status: 500,
      message: 'Internal error server'
    })
  }
}

export const getOpenGraph = async (req = request, res = response) => {
  const url: string = req.body.siteUrl
  const type: string = req.body.typeOgp
  console.log(req.body)
  const successResponse = (data) => {
    res.status = 200
    res.json({
      status: 200,
      data
    })
  }
  try {
    if(url){
      await axios.get(url)
      .then(response => {
        //@ts-ignore exist method in module
        const $ = cheerio.load(response.data)
        const head = $('meta')
        const openGraph = []
        for(let i = 0; i < head.length; i++){
          const element = head[i]
          //@ts-ignore send array of element attributes
          openGraph.push(element.attribs)
        }
        switch(type){
          case "property": {
            const data = openGraph.filter((i: types.Item) => 
            i.property == 'og:type' || 
            i.property == 'og:title' || 
            i.property == 'og:description' || 
            i.property == 'og:image' || 
            i.property == 'og:url'||
            i.property == 'og:image:width' ||
            i.property == 'og:image:height' ||
            i.property == 'og:locale' ||
            i.property == 'twitter:text:title' ||
            i.property == 'twitter:image' ||
            i.property == 'twitter:card' ||
            i.property == 'twitter:site' ||
            i.property == 'twitter:creator'
            )
            successResponse(data)
            console.log(data)
            break
          } default : {
            const data = openGraph.filter((i: types.Item) => 
            i.name == 'og:type' || 
            i.name == 'og:title' || 
            i.name == 'og:description' || 
            i.name == 'og:image' || 
            i.name == 'og:url' ||
            i.name == 'og:image:width' ||
            i.name == 'og:image:height' ||
            i.name == 'og:locale' ||
            i.name == 'twitter:text:title' ||
            i.name == 'twitter:image' ||
            i.name == 'twitter:card' ||
            i.name == 'twitter:site' ||
            i.name == 'twitter:creator'
            ) 
            successResponse(data)
            console.log(data)

          }
        }
      })
    } else {
      res.status = 400
      res.json({
        status: 400,
        message: 'Request url'
      })
    }
  } catch (err) {
    logger.error('Error server from meta function: ', err)
    res.status = 500 
    res.json({
      status: 500,
      message: 'Internal error server'
    })
  }
}
