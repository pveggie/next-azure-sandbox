import { AxiosResponse } from 'axios'

export default function handler(req, res): void {
  if ('TRANSLATION_API_KEY' in process.env) {
    const translationApiKey = process.env.TRANSLATION_API_KEY
    console.log(translationApiKey)
    res.status(200).json('Test sending response from api')
  }
}
