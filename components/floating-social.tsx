"use client"

import { Button } from "@/components/ui/button"

export default function FloatingSocial() {
  const handleMessengerClick = () => {
    window.open("https://m.me/your-page-id", "_blank")
  }

  const handleZaloClick = () => {
    window.open("https://zalo.me/your-zalo-id", "_blank")
  }

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-4">
      <Button
        onClick={handleZaloClick}
        className="floating-social-smooth bg-blue-500 hover:bg-blue-600 text-white p-5 rounded-full shadow-xl border-2 border-white/20 soft-button"
        size="lg"
        aria-label="Contact via Zalo"
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.487-.336-.951-.336-.464 0-.782.112-.951.336-.169.224-.254.518-.254.882 0 .364.085.658.254.882.169.224.487.336.951.336.464 0 .782-.112.951-.336.169-.224.254-.518.254-.882 0-.364-.085-.658-.254-.882zM12 18.72c-3.722 0-6.72-3.014-6.72-6.72 0-3.722 3.014-6.72 6.72-6.72 3.722 0 6.72 3.014 6.72 6.72 0 3.722-3.014 6.72-6.72 6.72z" />
          <path d="M9.5 10.5h5v1h-5zm0 2h5v1h-5zm0 2h3v1h-3z" />
        </svg>
      </Button>

      <Button
        onClick={handleMessengerClick}
        className="floating-social-smooth bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-5 rounded-full shadow-xl border-2 border-white/20 soft-button"
        size="lg"
        aria-label="Contact via Messenger"
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.1l3.13 3.259L19.752 8.1l-6.559 6.863z" />
        </svg>
      </Button>
    </div>
  )
}
