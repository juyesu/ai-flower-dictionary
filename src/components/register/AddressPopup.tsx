import DaumPostcode from 'react-daum-postcode'
import { useFormContext } from 'react-hook-form'
import { LoginFormType, AddressPopupProps } from '@/types/type'

const AddressPopup = ({ setOpenPostcode }: AddressPopupProps) => {
  const { setValue } = useFormContext<LoginFormType>()

  return (
    <>
      <div
        className="fixed inset-0 z-40 h-full w-full bg-black bg-opacity-30"
        onClick={() => setOpenPostcode(false)}
        aria-hidden="true"
        aria-labelledby="modal-title"
      />
      <div
        className="roundex-xl fixed z-50 flex w-[400px] items-center justify-center"
        aria-modal="true"
      >
        <h2 id="modal-title" className="sr-only">
          주소 검색 모달
        </h2>
        <DaumPostcode
          className="rounded-xl"
          onComplete={(data) => {
            setValue('address', data.address)
            setOpenPostcode(false)
          }}
          autoClose={false}
        />
      </div>
    </>
  )
}

export default AddressPopup
