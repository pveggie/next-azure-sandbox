// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate

import type { Context, HttpRequest } from '@azure/functions'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { uuid } from 'uuidv4'

interface TranslationResponse {
  translation: string
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
    const result = await axios(axiosRequestConfig)

    context.log(result)

    const responseBody: TranslationResponse = {
      translation: `Translation was requested for ${sourceText}`,
    }

    context.res = {
      body: responseBody,
    }
  } catch (error) {
    let err
    let body = 'An error occurred'
    if ('response' in error) {
      err = error as AxiosError<{
        response: { data: { error: { code: string; message: string } } }
      }>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { code = '', message = '' } = err.response.data.error as {
        code: string
        message: string
      }
      context.log('Axios request to Azure Translator returned an error: ')
      context.log(`Code: ${code}`)
      context.log(`Message: ${message}`)
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
