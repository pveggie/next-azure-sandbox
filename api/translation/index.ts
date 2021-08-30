// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate

import type { Context, HttpRequest } from '@azure/functions'
import axios, { AxiosRequestConfig } from 'axios'
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
  context.log('HTTP trigger function processed a request.')
  let status = 200

  try {
    const { sourceText } = req.query
    context.log('Source text: ', sourceText)
    context.log('PROCESS ENV')
    context.log(process.env)
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
    const axiosRequestConfig = getAxiosRequestConfig(sourceText, apiKey)
    await new Promise<void>((resolve) => {
      resolve()
    })

    context.log('Axios Request Config:')
    context.log(axiosRequestConfig)

    const responseBody: TranslationResponse = {
      translation: `Translation was requested for ${sourceText}`,
    }

    context.res = {
      body: responseBody,
    }
  } catch (error) {
    const err = error as Error
    const body = err && 'message' in err ? err.message : 'An error occurred'
    context.res = {
      status,
      body,
    }
  }
}

export default httpTrigger
