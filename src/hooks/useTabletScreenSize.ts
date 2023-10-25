import { useState, useEffect } from "react"

const useTabletScreenSize = () => {
  const [isTabletScreenSize, setIsTabletScreenSize] = useState(false)

  const handleResize = (e) => {
    const { innerWidth } = e.target
    if (innerWidth >= 768 && innerWidth <= 991) setIsTabletScreenSize(true)

    if (innerWidth < 768 || innerWidth > 991) setIsTabletScreenSize(false)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { isTabletScreenSize, handleResize }
}

export default useTabletScreenSize
