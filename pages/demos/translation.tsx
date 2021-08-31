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
  placeholderText = '도토리전분'

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
    event: React.FormEvent<HTMLInputElement>
  ): Promise<void> {
    const target = event.target as HTMLInputElement
    const sourceText = target.value
    this.setState({ sourceText, translatedText: '' })

    await this.debouncedTranslation(sourceText)
  }

  debouncedTranslation = debounce(async (sourceText) => {
    if (sourceText) {
      this.translateText(sourceText)
    }
  }, 1000)

  async translateText(sourceText: string): Promise<void> {
    console.log('translating')
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
      <DefaultLayout pageTitle="Translation">
        <input
          type="text"
          placeholder={placeholderText}
          value={sourceText}
          onChange={(event) => this.handleSourceTextChange(event)}
        />

        <div className="p-4">
          <h3 className="mb-2 font-bold">Result</h3>
          {error && <p className="text-red-600">{error}</p>}
          <p>{translatedText}</p>
        </div>
      </DefaultLayout>
    )
  }
}

export default Translation
