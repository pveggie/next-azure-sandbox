import React from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import classNames from 'classnames'
import { createWorker, Worker } from 'tesseract.js'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import Button from '../../components/atoms/Button'
import Loader from '../../components/atoms/Loader'

interface Props {
  something?: string
}

interface State {
  src: string
  cropData: string
  cropper: Cropper | null
  text: string
  hasRead: boolean
  isReading: boolean
}

class Ocr extends React.Component<Props, State> {
  worker!: Worker

  constructor(props: Props) {
    super(props)
    this.state = {
      src: '/images/image-1.jpg',
      cropData: '',
      cropper: null,
      text: 'Set image area then hit the "Get text" button.',
      hasRead: false,
      isReading: false,
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
      this.setCropData()
    }
  }

  handleCropInit(instance: Cropper): void {
    this.setState({ cropper: instance })
    this.setCropData()
  }

  handleCropEnd(): void {
    this.setCropData()
  }

  async handleGetTextClick(): Promise<void> {
    const { cropData } = this.state
    this.setState({ isReading: true })
    try {
      const {
        data: { text },
      } = await this.worker.recognize(cropData)
      this.setState({ text, isReading: false })
    } catch (error) {
      console.error(error)
    }
  }

  setCropData(): void {
    const { cropper } = this.state
    if (cropper) {
      const canvas: HTMLCanvasElement = cropper.getCroppedCanvas()
      const cropData = canvas.toDataURL()
      this.setState({ cropData })
    }
  }

  render(): JSX.Element {
    const { src, text, cropData, hasRead, isReading } = this.state
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
            className="mb-2"
            onChange={(event) => this.handleFileSelect(event)}
          />
          {cropData && (
            <Button
              className="mb-2"
              primary
              onClick={() => this.handleGetTextClick()}
            >
              <Loader isLoading={isReading} />
              <span className="ml-2">Get Text</span>
            </Button>
          )}

          <div className="">
            <div className="aspect-w-16 aspect-h-9 relative mb-4 bg-gray-800">
              <Loader isMask isLoading={isReading}>
                <span className="ml-3">Reading text</span>
              </Loader>

              <Cropper
                src={src}
                responsive
                dragMode="move"
                autoCropArea={0.5}
                onInitialized={(instance) => this.handleCropInit(instance)}
                cropend={() => this.handleCropEnd()}
              />
            </div>
            <div className="content">
              <h3 className="font-bold">Result</h3>
              <div className="p-4 border-2">
                <p className={classNames({ 'text-gray-400': !hasRead })}>
                  {text}
                </p>
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
