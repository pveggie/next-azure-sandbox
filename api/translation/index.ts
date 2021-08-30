// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate

import type { Context, HttpRequest } from '@azure/functions'
import axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { v4 as uuid } from 'uuid'

interface TranslationResponse {
  translation: string
}

interface AxiosErrorResponse {
  data: { error: { code: string; message: string } }
}

interface AxiosSuccessResponse {
  data: Array<{
    translations: Array<{ text: string; to: string }>
  }>
}

const languageCodes = {
  english: 'en',
  korean: 'ko',
}

function getAxiosRequestConfig(
  sourceText: string,
  apiKey: string
): AxiosRequestConfig {
  return {
    baseURL: 'https://api.cognitive.microsofttranslator.com',
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'X-ClientTraceId': uuid().toString(),
    },
    params: {
      'api-version': '3.0',
      from: languageCodes.korean,
      to: languageCodes.english,
    },
    data: [
      {
        text: sourceText,
      },
    ],
  }
}

async function httpTrigger(context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function for GET /translation')
  let status = 200

  try {
    const { sourceText } = req.query
    context.log('Source text: ', sourceText)
    const apiKey = process.env.TRANSLATION_API_KEY

    if (!apiKey) {
      status = 500
      throw new Error(
        'Api key missing from environment. Please check environment variables'
      )
    } else if (!sourceText) {
      status = 400
      throw new Error('No source text to be translated')
    }

    context.log(`Translation requested from ${sourceText}`)
    const axiosRequestConfig = getAxiosRequestConfig(sourceText, apiKey)
    const response: AxiosResponse = await axios(axiosRequestConfig)
    if ('data' in response) {
      const { data } = response as AxiosSuccessResponse
      const translations = data.map((item) => {
        const translation = item.translations.find((lang) => lang.to === 'en')
        const { text } = translation
        return typeof text === 'string' ? text : ''
      })

      const responseBody: TranslationResponse = {
        translation: translations.join('. '),
      }

      context.res = {
        body: responseBody,
      }
    }
  } catch (error) {
    let err
    let body = 'An error occurred'
    if (!error) {
      context.log('An unknown error occurred')
      status = 500
    } else if ('response' in error) {
      err = error as AxiosError<AxiosErrorResponse>
      const { response } = err

      const { code = '', message = '' } = response.data.error as {
        code: string
        message: string
      }

      context.log(`Code: ${code}`)
      context.log(`Message: ${message}`)

      context.log('Axios request to Azure Translator returned an error: ')
      status = 500
    } else if ('request' in error) {
      context.log('Axios request to Azure Translator returned no response')
      status = 500
    } else {
      err = error as Error
      context.log('Function error occurred: ')
      context.log(err)
      if ('message' in error) {
        body = err.message
      }
    }
    context.res = {
      status,
      body,
    }
  }
}

export default httpTrigger
