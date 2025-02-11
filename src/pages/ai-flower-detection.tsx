import Layout from '@/components/layout'
import ScrollBtn from '@/components/ScrollBtn'
import WebcamModel from '@/components/AiFlowerDetection'

const AiFlowerDetection = () => {
  return (
    <Layout>
      <WebcamModel />
      <ScrollBtn />
    </Layout>
  )
}

export default AiFlowerDetection
