import React, { ReactNode } from 'react'
import axios from 'axios'
import DefaultLayout from '../../components/layouts/DefaultLayout'

interface Props {
  something?: string
}
interface State {
  sourceText: string
  translatedText: string
}
class Translation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      sourceText: '도 토 리 전 분',
      translatedText: '',
    }
  }

  componentDidMount(): void {
    const { sourceText } = this.state
    axios
      .get('/api/translate', { params: { sourceText } })
      .then((response) => {
        // handle success
        if ('data' in response) {
          const translatedText = response.data as string
          this.setState({ translatedText })
        }
      })
      .catch((error) => {
        // handle error
        const errorText = error as string
        this.setState({ translatedText: errorText })
      })
  }

  render(): ReactNode {
    const { sourceText, translatedText } = this.state
    return (
      <DefaultLayout pageTitle="Translation">
        <input type="text" readOnly value={sourceText} />

        <div className="p-4">
          <h3 className="mb-2 font-bold">Result</h3>
          <p>{translatedText}</p>
        </div>
      </DefaultLayout>
    )
  }
}

export default Translation
