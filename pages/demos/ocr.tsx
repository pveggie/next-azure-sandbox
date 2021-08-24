import React from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { createWorker, Worker } from 'tesseract.js'
import DefaultLayout from '../../components/layouts/DefaultLayout'

interface Props {
  something?: string
}

interface State {
  src: string
  cropData: string
  cropper: Cropper | null
}

class Ocr extends React.Component<Props, State> {
  worker!: Worker

  constructor(props: Props) {
    super(props)
    this.state = {
      src: '/images/image-1.jpg',
      cropData: '#',
      cropper: null,
    }
  }

  async componentDidMount(): Promise<void> {
    this.worker = createWorker({
      logger: (message) => console.info(message),
    })

    await this.worker.load()
    await this.worker.loadLanguage('kor')
    await this.worker.initialize('kor')
  }

  async componentWillUnmount(): Promise<void> {
    await this.worker.terminate()
  }

  onFileSelect(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement
    console.log(Object.keys(target))
    const files = (target.files as FileList) || []

    if (files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const { result } = reader || ''
        if (typeof result === 'string') {
          this.setState({ src: result })
        }
      })
      reader.readAsDataURL(files[0])
    }
  }

  async onCropEnd(): Promise<void> {
    const { cropper } = this.state
    if (cropper) {
      const canvas: HTMLCanvasElement = cropper.getCroppedCanvas()
      const cropData = canvas.toDataURL()
      this.setState({ cropData })

      try {
        const {
          data: { text },
        } = await this.worker.recognize(cropData)
        // eslint-disable-next-line no-console
        console.log('Text: ', text)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  render(): JSX.Element {
    const { src } = this.state
    return (
      <DefaultLayout pageTitle="Optical Character Recognition">
        {/* TODO: Add custom styling for input */}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => this.onFileSelect(event)}
        />
        <div className="aspect-w-16 aspect-h-9 bg-gray-800">
          <Cropper
            src={src}
            responsive
            onInitialized={(instance) => this.setState({ cropper: instance })}
            cropend={() => this.onCropEnd()}
          />
        </div>
      </DefaultLayout>
    )
  }
}

// eslint-disable-next-line no-void

export default Ocr
