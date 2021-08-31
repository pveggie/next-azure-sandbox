import React, { ReactNode } from 'react'
import axios, { AxiosError } from 'axios'
import { debounce } from 'ts-debounce'
import DefaultLayout from '../../components/layouts/DefaultLayout'

interface Props {
  something?: string
}
interface State {
  sourceText: string
  translatedText: string
  error: string
}
class Translation extends React.Component<Props, State> {
  placeholderText =
    '고주장, 물엿, 설탕, 정제수, 양파, 발효식초, 마늘, 기타과당, 고춧가루, 포도당, 정제소금, 대파, 야채오일베이스'

  debouncedTranslation = debounce(async (sourceText) => {
    if (sourceText) {
      await this.translateText(sourceText)
    }
  }, 1500)

  constructor(props: Props) {
    super(props)
    this.state = {
      sourceText: '',
      translatedText: '',
      error: '',
    }
  }

  async componentDidMount(): Promise<void> {
    const sourceText = this.placeholderText

    await this.translateText(sourceText)
  }

  async handleSourceTextChange(
    event: React.FormEvent<HTMLTextAreaElement>
  ): Promise<void> {
    const target = event.target as HTMLTextAreaElement
    const sourceText = target.value
    this.setState({ sourceText, translatedText: '' })

    await this.debouncedTranslation(sourceText)
  }

  async translateText(sourceText: string): Promise<void> {
    try {
      const response = await axios.get<{ translation: string }>(
        '/api/translation',
        {
          params: { sourceText },
        }
      )
      const translatedText = response.data.translation
      this.setState({ translatedText })
    } catch (error) {
      let errMessage = 'An error occurred'
      if ('statusCode' in error) {
        const respError = error as AxiosError
        errMessage = respError.message
      }

      this.setState({ error: errMessage })
    }
  }

  render(): ReactNode {
    const { placeholderText } = this
    const { sourceText, translatedText, error } = this.state
    return (
      <DefaultLayout
        pageTitle="Translation"
        intro="Translating text using an Azure Cognitive Services Translator"
      >
        <section className="content">
          <p>
            This page allows translation of text from Korean to English using
            the{' '}
            <a
              href="https://docs.microsoft.com/en-us/azure/cognitive-services/translator/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Translator API of Azure Cognitive Services
            </a>
            .{' '}
          </p>
        </section>

        <section>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            <div className="md:h-full">
              <h3 className="mb-2 font-bold">Source Text</h3>
              <textarea
                placeholder={placeholderText}
                value={sourceText}
                onChange={(event) => this.handleSourceTextChange(event)}
                rows={5}
                className="w-full border-gray-400 md:h-full"
              />
            </div>

            <div className="md:h-full">
              <h3 className="mb-2 font-bold">Result</h3>
              <div className="p-2 border border-gray-400 md:h-full">
                {error && <p className="mb-2 text-red-600">{error}</p>}
                <p className="mb-0">{translatedText}</p>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    )
  }
}

export default Translation
