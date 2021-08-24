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
  text: string
}

class Ocr extends React.Component<Props, State> {
  worker!: Worker

  constructor(props: Props) {
    super(props)
    this.state = {
      src: '/images/image-1.jpg',
      cropData: '#',
      cropper: null,
      text: 'Set image area then hit the "Get text" button.',
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

  handleFileSelect(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement
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

  handleCropEnd(): void {
    const { cropper } = this.state
    if (cropper) {
      const canvas: HTMLCanvasElement = cropper.getCroppedCanvas()
      const cropData = canvas.toDataURL()
      this.setState({ cropData })
    }
  }

  async handleGetTextClick(): Promise<void> {
    const { cropData } = this.state
    try {
      const {
        data: { text },
      } = await this.worker.recognize(cropData)
      this.setState({ text })
    } catch (error) {
      console.error(error)
    }
  }

  render(): JSX.Element {
    const { src, text } = this.state
    return (
      <DefaultLayout
        pageTitle="Optical Character Recognition"
        intro="Reading text from an image using Tesseract.js"
      >
        <section className="content">
          <p>
            This page uses a the{' '}
            <a
              href="https://github.com/fengyuanchen/cropperjs"
              target="_blank"
              rel="noreferrer"
            >
              Cropper library{' '}
            </a>
            and{' '}
            <a
              href="https://github.com/naptha/tesseract.js#tesseractjs"
              target="_blank"
              rel="noreferrer"
            >
              Tesseract.js
            </a>{' '}
            to allow for text to be read from specific parts of an image.
          </p>
        </section>

        <section>
          {/* TODO: Add custom styling for input */}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => this.handleFileSelect(event)}
          />
          <button type="button" onClick={() => this.handleGetTextClick()}>
            Get Text
          </button>
          <div className="">
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 mb-4">
              <Cropper
                src={src}
                responsive
                onInitialized={(instance) =>
                  this.setState({ cropper: instance })
                }
                cropend={() => this.handleCropEnd()}
              />
            </div>
            <div className="content">
              <h3 className="font-bold">Result</h3>
              <div className="p-4 border-2">
                <p>{text}</p>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    )
  }
}

// eslint-disable-next-line no-void

export default Ocr
