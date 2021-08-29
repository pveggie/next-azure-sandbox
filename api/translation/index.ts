// https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate

import type { Context, HttpRequest } from '@azure/functions'
// import axios, { AxiosRequestConfig } from 'axios'
// import { uuid } from 'uuidv4'

interface TranslationResponse {
  translation: string
}

async function httpTrigger(context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.')

  const { sourceText } = req.query

  if (sourceText) {
    await new Promise<void>((resolve) => {
      resolve()
    })

    const responseBody: TranslationResponse = {
      translation: `Translation was requested for ${sourceText}`,
    }

    context.res = {
      body: responseBody,
    }
  }
}

export default httpTrigger

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<{ translation: string }>
// ): void {
//   const languageCodes = {
//     english: 'en',
//     korean: 'ko',
//   }

//   interface GetParamsArgs {
//     apiKey: string
//     sourceText: string
//   }

//   // function getAxiosParams({
//   //   apiKey,
//   //   sourceText,
//   // }: GetParamsArgs): AxiosRequestConfig {
//   //   return {
//   //     baseURL: 'https://api.cognitive.microsofttranslator.com',
//   //     url: '/translate',
//   //     method: 'post',
//   //     headers: {
//   //       'Ocp-Apim-Subscription-Key': apiKey,
//   //       'Ocp-Apim-Subscription-Region': 'germanywestcentral',
//   //       'Content-Type': 'application/json',
//   //       'X-ClientTraceId': uuid().toString(),
//   //     },
//   //     params: {
//   //       'api-version': '3.0',
//   //       from: languageCodes.korean,
//   //       fromScript: languageCodes.korean,
//   //       to: languageCodes.english,
//   //       toScript: languageCodes.english,
//   //     },
//   //     data: [
//   //       {
//   //         text: sourceText,
//   //       },
//   //     ],
//   //   }
//   // }

//   try {
//     if (!process.env.TRANSLATION_API_KEY) {
//       // eslint-disable-next-line no-console
//       console.error(
//         `Error: Environment variable TRANSLATION_API_KEY is missing from process.env.`
//       )
//       throw new Error()
//     }
//
//     // const translationApiKey = process.env.TRANSLATION_API_KEY
//     // const axiosParams = getAxiosParams({
//     //   apiKey: translationApiKey,
//     //   sourceText,
//     // })
//     // const azureRes = await axios(axiosParams)
//     // console.log('SUCCESS')
//     // console.log(azureRes)
//     res.status(200).json({ translation: 'Test sending response from api' })
//   } catch (error) {
//     console.log('ERROR')
//     console.log(Object.keys(error))
//     // console.error(error)
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.log(error.response)
//     throw new Error()
//   }
// }
