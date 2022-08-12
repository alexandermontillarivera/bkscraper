# Scraperty

It is a web scraping project which filters the meta data with web scraping using the cheerio library in typescript

## Endpoints

#### Get the metadata of a website 

Method: POST

Parameters: 

- url  // a website url

[https://scraperty.deno.dev/api/meta](https://scraperty.deno.dev/api/)

#### Get the open graph of a website

Method: POST

Parameters: 

* url  // a website url
* typeOgp // The type of meta type you have on the website, either property or name, by default is name

[https://scraperty.deno.dev/api/opengraph](https://scraperty.deno.dev/api/opengraph)
