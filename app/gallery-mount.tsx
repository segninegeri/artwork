"use client"

import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import ArtGallery from "./art-gallery-component"

export default function GalleryMount() {
  useEffect(() => {
    // Only run once on the client
    const rootElement = document.getElementById("gallery-root")
    if (rootElement) {
      // Clear any existing content
      rootElement.innerHTML = ""

      // Create a new React root and render the gallery
      const root = createRoot(rootElement)
      root.render(<ArtGallery />)
    }
  }, [])

  // Return nothing - the component will be mounted via DOM manipulation
  return null
}

