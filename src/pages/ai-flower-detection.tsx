import Layout from '@/components/common/layout'
import ScrollBtn from '@/components/common/ScrollBtn'
import WebcamModel from '@/components/ai-flower-dection/AiFlowerDetection'

const AiFlowerDetection = () => {
  return (
    <Layout>
      <WebcamModel />
      <ScrollBtn />
    </Layout>
  )
}

export default AiFlowerDetection
