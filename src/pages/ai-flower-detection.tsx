import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import WebcamModel from '@/components/ai-flower-dection/AiFlowerDetection'

const AiFlowerDetection = () => {
  return (
    <Layout>
      <WebcamModel />
      <ScrollButton />
    </Layout>
  )
}

export default AiFlowerDetection
