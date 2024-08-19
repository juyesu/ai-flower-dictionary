const ScrollBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex flex-col items-center fixed right-7 bottom-5 border rounded-xl cursour-poiner bg-rose-200 dark:bg-gray-600 dark:border-gray-400 opacity-70">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="fill-white p-1.5 cursour-poiner border-b"
        onClick={scrollToTop}
      >
        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="fill-white p-1.5 cursour-poiner h-9"
        onClick={scrollToBottom}
      >
        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
      </svg>
    </div>
  )
}

export default ScrollBtn
