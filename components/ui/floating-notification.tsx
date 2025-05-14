"use client"

import type React from "react"

import { useState } from "react"
import { Bell } from "lucide-react"

interface FloatingNotificationProps {
  message: string
  linkText: string
  linkUrl: string
}

export function FloatingNotification({ message, linkText, linkUrl }: FloatingNotificationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isBouncing, setIsBouncing] = useState(true)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
    setIsBouncing(false)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(false)
    setIsBouncing(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end" onClick={handleClick}>
      {isExpanded ? (
        <div className="mb-3 w-64 rounded-lg bg-yellow-400 p-4 text-dark-900 shadow-lg transition-all duration-300 ease-in-out">
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 rounded-full p-1 text-dark-900 hover:bg-yellow-500"
          >
            ✕
          </button>
          <h3 className="mb-2 font-bold">{message}</h3>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded bg-dark-900 px-4 py-2 text-sm font-medium text-white hover:bg-dark-800"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
          </a>
        </div>
      ) : null}
      <div
        className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-yellow-400 text-dark-900 shadow-lg transition-all duration-300 ${
          isBouncing ? "animate-bounce-slow" : ""
        }`}
      >
        <Bell size={24} />
      </div>
    </div>
  )
}
