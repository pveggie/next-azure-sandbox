import React from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import type { Crop } from 'react-image-crop'
import ReactCrop from 'react-image-crop'
import { createWorker } from 'tesseract.js'
import DefaultLayout from '../../components/layouts/DefaultLayout'

// const worker = createWorker({
//   logger: (m) => console.log(m),
// })

interface Props {
  something?: string
}

interface State {
  src: string
  crop: Crop
}

class Ocr extends React.Component<Props, State> {
  worker: unknown

  constructor(props: Props) {
    super(props)
    this.state = {
      src: '/images/image-1.jpg',
      crop: {
        x: 50,
        y: 0,
        unit: '%',
        width: 50,
        height: 25,
        // aspect: 16 / 9,
      },
    }
  }

  // componentDidMount(): void {
  //   this.worker = createWorker({
  //     logger: (message) => console.info(message),
  //   })
  // }

  componentWillUnmount(): void {}

  onFileSelect(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement
    if (
      target &&
      'files' in target &&
      target.files &&
      'length' in target.files &&
      target.files.length > 0
    ) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const { result } = reader || ''
        if (typeof result === 'string') {
          this.setState({ src: result })
        }
      })
      reader.readAsDataURL(target.files[0])
    }
  }

  onCropChange(newCrop: Crop): void {
    // console.log(newCrop)
    this.setState({ crop: newCrop })
  }

  render(): JSX.Element {
    const { src, crop } = this.state
    return (
      <DefaultLayout pageTitle="Optical Character Recognition">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => this.onFileSelect(event)}
        />
        <ReactCrop
          src={src}
          crop={crop}
          onChange={(newCrop) => this.onCropChange(newCrop)}
        />
      </DefaultLayout>
    )
  }
}

// // eslint-disable-next-line no-void
// void (async () => {
//   try {
//     await worker.load()
//     await worker.loadLanguage('kor')
//     await worker.initialize('kor')
//     const {
//       data: { text },
//     } = await worker.recognize('/images/image-1.jpg')
//     // eslint-disable-next-line no-console
//     console.log('Text: ', text)
//     await worker.terminate()
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(error)
//   }
// })()

export default Ocr
