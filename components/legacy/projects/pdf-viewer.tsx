"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/legacy/ui/card"
import { ThreeDCard } from "@/components/legacy/ui/3d-card"

interface PDFViewerProps {
  pdfUrl: string
  title: string
  team: string
  description: string
  thumbnailUrl?: string
}

export function PDFViewer({ pdfUrl, title, team, description, thumbnailUrl }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Convert Google Drive view URL to preview URL if needed
  const getPreviewUrl = () => {
    if (pdfUrl.includes("drive.google.com/file/d/") && !pdfUrl.includes("/preview")) {
      const fileId = pdfUrl.split("/d/")[1].split("/")[0]
      return `https://drive.google.com/file/d/${fileId}/preview`
    }
    return pdfUrl
  }

  // Extract the PDF URL for direct download (if it's a Google Drive URL)
  const getDownloadUrl = () => {
    if (pdfUrl.includes("drive.google.com/file/d/")) {
      const fileId = pdfUrl.split("/d/")[1].split("/")[0]
      return `https://drive.google.com/uc?export=download&id=${fileId}`
    }
    return pdfUrl
  }

  // Open PDF in a new tab
  const openPdfInNewTab = () => {
    // If it's a preview URL, open the original view URL
    if (pdfUrl.includes("/preview")) {
      const fileId = pdfUrl.split("/d/")[1].split("/")[0]
      window.open(`https://drive.google.com/file/d/${fileId}/view`, "_blank")
    } else {
      window.open(pdfUrl, "_blank")
    }
  }

  const toggleFullscreen = () => {
    // Functionality removed as requested
  }

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Reset loading state and page counter when PDF URL changes
  useEffect(() => {
    setIsLoading(true)
  }, [pdfUrl])

  return (
    <ThreeDCard
      depth={15}
      rotationIntensity={5}
      glareIntensity={0.15}
      hoverScale={1.01}
      backgroundGradient="linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05))"
    >
      <Card variant="glass" className="border-0 bg-transparent backdrop-blur-none p-0 overflow-hidden">
        <div className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-dark-950/95" : "relative"}`}>
          {/* PDF Viewer */}
          <div className={`${isFullscreen ? "h-screen p-4" : "aspect-[16/9] w-full"} relative pdf-container`}>
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-900/50 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-white">Loading PDF...</p>
                </div>
              </div>
            )}

            <iframe
              src={getPreviewUrl()}
              className="w-full h-full rounded-t-lg"
              frameBorder="0"
              allowFullScreen
              onLoad={handleIframeLoad}
            ></iframe>
          </div>

          {/* Project Info - Only show when not in fullscreen */}
          {!isFullscreen && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <p className="text-dark-200 text-sm mb-4">By {team}</p>
              <p className="text-dark-100">{description}</p>
            </div>
          )}
        </div>
      </Card>
    </ThreeDCard>
  )
}
