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
  // image: null
  crop: Crop
}

class Ocr extends React.Component<Props, State> {
  worker: unknown

  constructor(props: Props) {
    super(props)
    this.state = {
      // image: null,
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

  onCropChange(newCrop: Crop): void {
    // console.log(newCrop)
    this.setState({ crop: newCrop })
  }

  render(): JSX.Element {
    const { crop } = this.state
    return (
      <DefaultLayout pageTitle="Optical Character Recognition">
        <ReactCrop
          src="/images/image-1.jpg"
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
