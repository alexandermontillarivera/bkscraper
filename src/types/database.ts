export interface Schema {
  languages: Array<{
    lang: string,
    dataLang: {
      home: {
        title: string,
        message: string,
        featuresTitle: string,
        features: Array<{
          icon: string,
          title: string,
          description: string
        }>
      },
      openGraph: {
        title: string,
        message: {
          content: string,
          reference: {
            title: string,
            url: string
          }
        }
      }
    }
  }>
}
