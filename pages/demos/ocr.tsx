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

          <div className="grid gap-x-8 gap-y-4 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="grid gap-4 grid-cols-2">
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
                    <Loader isLoading={isReading} iconClassName="mr-2" />
                    Get Text
                  </Button>
                )}
              </div>

              <div className="aspect-w-1 aspect-h-1 relative bg-gray-800">
                <Loader isMask isLoading={isReading} iconClassName="mr-3">
                  Reading text
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
            </div>

            <div className="content md:col-span-3">
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
