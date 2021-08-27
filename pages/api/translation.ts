// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate

import axios, { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4'

export type TranslationResponse = {
  translation: string
}

export type TranslationRequestParams = {
  sourceText: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ translation: string }>
): Promise<void> {
  const languageCodes = {
    english: 'en',
    korean: 'ko',
  }

  interface GetParamsArgs {
    apiKey: string
    sourceText: string
  }

  function getAxiosParams({
    apiKey,
    sourceText,
  }: GetParamsArgs): AxiosRequestConfig {
    return {
      baseURL: 'https://api.cognitive.microsofttranslator.com',
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Ocp-Apim-Subscription-Region': 'germanywestcentral',
        'Content-Type': 'application/json',
        'X-ClientTraceId': uuid().toString(),
      },
      params: {
        'api-version': '3.0',
        from: languageCodes.korean,
        fromScript: languageCodes.korean,
        to: languageCodes.english,
        toScript: languageCodes.english,
      },
      data: [
        {
          text: sourceText,
        },
      ],
    }
  }

  try {
    if (!process.env.TRANSLATION_API_KEY) {
      // eslint-disable-next-line no-console
      console.error(
        `Error: Environment variable TRANSLATION_API_KEY is missing from process.env.`
      )
      throw new Error()
    }
    const queryParams = req.query as TranslationRequestParams
    const { sourceText } = queryParams
    const translationApiKey = process.env.TRANSLATION_API_KEY
    const axiosParams = getAxiosParams({
      apiKey: translationApiKey,
      sourceText,
    })
    const azureRes = await axios(axiosParams)
    console.log('SUCCESS')
    console.log(azureRes)
    res.status(200).json({ translation: 'Test sending response from api' })
  } catch (error) {
    console.log('ERROR')
    console.log(Object.keys(error))
    // console.error(error)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(error.response)
    throw new Error()
  }
}
