"use client"

import { useEffect } from "react"

export function useClickRipple() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("div")
      ripple.className = "click-ripple"
      ripple.style.left = e.clientX - 50 + "px"
      ripple.style.top = e.clientY - 50 + "px"
      document.body.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}
