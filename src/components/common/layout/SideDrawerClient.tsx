import { sideDrawerStore } from '@/store/sideDrawerStore'
import SideDrawer from '@/components/common/layout/SideDrawer'

const SideDrawerClient = () => {
  const { isDrawerOpen, setIsDrawerOpen } = sideDrawerStore()

  return <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
}

export default SideDrawerClient
