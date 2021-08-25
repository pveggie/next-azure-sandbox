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
      cropper: null,
      text: 'Set image area then hit the "Get text" button.',
      hasRead: false,
      isReading: false,
    }
  }

  async componentDidMount(): Promise<void> {
    this.worker = createWorker()

    await this.worker.load()
    await this.worker.loadLanguage('kor+eng')
    await this.worker.initialize('kor+eng')
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

  handleCropInit(instance: Cropper): void {
    this.setState({ cropper: instance })
  }

  async handleGetTextClick(): Promise<void> {
    this.setState({ isReading: true })
    const cropData = this.getCropData()

    if (cropData) {
      const {
        data: { text },
      } = await this.worker.recognize(cropData)
      this.setState({ text, isReading: false })
    } else {
      this.setState({ text: 'Text could not be read', isReading: false })
    }
  }

  getCropData(): string {
    const { cropper } = this.state
    let cropData = ''
    if (cropper) {
      const canvas: HTMLCanvasElement = cropper.getCroppedCanvas()
      cropData = canvas.toDataURL()
    }
    return cropData
  }

  render(): JSX.Element {
    const { src, text, hasRead, isReading } = this.state
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
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-1">
              <h3 className="mb-1 font-bold">Image Area Selection</h3>
              <div className="p-4 border-2">
                <div className="grid gap-x-4 gap-y-2 mb-2">
                  {/* TODO: Add custom styling for file input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => this.handleFileSelect(event)}
                  />

                  <Button primary onClick={() => this.handleGetTextClick()}>
                    <Loader isLoading={isReading} iconClassName="mr-2" />
                    Get Text
                  </Button>
                </div>

                <div className="aspect-w-1 aspect-h-1 relative bg-gray-800 overflow-hidden">
                  <Loader isMask isLoading={isReading} iconClassName="mr-3">
                    Reading text
                  </Loader>

                  <Cropper
                    src={src}
                    responsive
                    dragMode="move"
                    autoCropArea={0.5}
                    onInitialized={(instance) => this.handleCropInit(instance)}
                  />
                </div>
              </div>
            </div>

            <div className="content lg-col-span-3 md:col-span-2">
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

export default Ocr
