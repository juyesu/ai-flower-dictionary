import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import MyDictionaryPage from '@/components/my-dictionary/MyDictionaryPage'

const MyDictionary = () => {
  return (
    <Layout>
      <MyDictionaryPage />
      <ScrollButton />
    </Layout>
  )
}

export default MyDictionary
