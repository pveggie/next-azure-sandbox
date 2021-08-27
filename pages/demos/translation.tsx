import React, { ReactNode } from 'react'
import axios, { AxiosError } from 'axios'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import type { TranslationResponse } from '../api/translation'

interface Props {
  something?: string
}
interface State {
  sourceText: string
  translatedText: string
  error: string
}
class Translation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      sourceText: '도 토 리 전 분',
      translatedText: '',
      error: '',
    }
  }

  async componentDidMount(): Promise<void> {
    const { sourceText } = this.state

    try {
      const response = await axios.get<TranslationResponse>(
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
    const { sourceText, translatedText, error } = this.state
    return (
      <DefaultLayout pageTitle="Translation">
        <input type="text" readOnly value={sourceText} />

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
