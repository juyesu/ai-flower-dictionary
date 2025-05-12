import { MenuBars } from '@/pages/assets/icons'
import { sideDrawerStore } from '@/store/sideDrawerStore'

const SideDrawerOpenButton = () => {
  const { setIsDrawerOpen } = sideDrawerStore()

  return (
    <button type='button' aria-label='메뉴 오버레이 열기' onClick={() => setIsDrawerOpen(true)}>
      <MenuBars className='h-7 w-7' fill='currentColor' aria-hidden='true' />
    </button>
  )
}

export default SideDrawerOpenButton
