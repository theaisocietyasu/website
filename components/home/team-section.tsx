"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Download, ChevronDown, UserCheck, Shield, History, Mail } from "lucide-react" // Added Mail icon
import FileSaver from "file-saver"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import { EXECUTIVE_BOARD, OFFICERS, AIS_ALUMNI } from "@/lib/constants"
import { SectionHeading } from "@/components/ui/section-heading"
import { Spotlight } from "@/components/ui/spotlight"
import { ThreeDCard } from "@/components/ui/3d-card"
import { Card } from "@/components/ui/card"
import type { TeamMember } from "@/lib/types"

function ExecutiveMemberCard({ name, position, imageSrc, email }: TeamMember) {
  return (
    <ThreeDCard
      depth={10}
      rotationIntensity={5}
      glareIntensity={0.1}
      hoverScale={1.02}
      backgroundGradient="linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.1))"
      className="h-full"
    >
      <Card variant="glass" className="h-full">
        <div className="p-4 flex flex-col items-center text-center h-[220px] relative group">
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-500/10 to-transparent"></div>
          </div>
          <img
            src={imageSrc || "/placeholder.svg?height=120&width=120&query=person"}
            alt={name}
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <h3 className="text-base font-bold text-white mb-1 w-full">{name}</h3>
          <div className="w-10 h-0.5 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-full mx-auto my-1"></div>
          <p className="text-dark-300 text-xs line-clamp-2">{position}</p>
          {email && ( // Check if email exists before rendering
            <a
              href={`mailto:${email}`}
              className="text-primary-400 text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity line-clamp-1 hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()} // Prevent card click-through
            >
              <Mail size={12} className="inline-block" />
              {email}
            </a>
          )}
          <div className="absolute bottom-2 right-2 opacity-10 transition-opacity duration-300 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 3H3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </Card>
    </ThreeDCard>
  )
}

export function TeamSection() {
  const [selectedTeam, setSelectedTeam] = useState("executive")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [cardHeight, setCardHeight] = useState(240)

  useEffect(() => {
    const equalizeCardHeights = () => {
      const cards = document.querySelectorAll(".team-member-card")
      if (cards.length === 0) return
      cards.forEach((card) => {
        ;(card as HTMLElement).style.height = "auto"
      })
      let maxHeight = 0
      cards.forEach((card) => {
        const height = card.getBoundingClientRect().height
        maxHeight = Math.max(maxHeight, height)
      })
      if (maxHeight > 0) {
        setCardHeight(maxHeight)
        cards.forEach((card) => {
          ;(card as HTMLElement).style.height = `${maxHeight}px`
        })
      }
    }
    equalizeCardHeights()
    window.addEventListener("resize", equalizeCardHeights)
    return () => {
      window.removeEventListener("resize", equalizeCardHeights)
    }
  }, [selectedTeam])

  const downloadExcel = (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const allMembers = [...EXECUTIVE_BOARD, ...OFFICERS, ...AIS_ALUMNI]
      const formattedMembers = allMembers.map(({ name, position, email }) => ({
        name,
        position,
        email,
      }))
      const worksheet = XLSX.utils.json_to_sheet(formattedMembers)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Team Members")
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
      const data = new Blob([excelBuffer], { type: "application/octet-stream" })
      FileSaver.saveAs(data, "ai_society_team_members.xlsx")
    } catch (error) {
      console.error("Error downloading Excel:", error)
    }
  }

  const downloadPDF = (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const allMembers = [...EXECUTIVE_BOARD, ...OFFICERS, ...AIS_ALUMNI]
      const doc = new jsPDF()
      doc.setFontSize(20)
      doc.setTextColor(12, 141, 224)
      doc.text("The AI Society Team Members", 20, 20)
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      allMembers.forEach((member, index) => {
        const y = 40 + index * 10
        doc.text(`${member.name} - ${member.position}`, 20, y)
        doc.text(`${member.email}`, 20, y + 5)
        if (index < allMembers.length - 1) {
          doc.setDrawColor(200, 200, 200)
          doc.line(20, y + 7, 190, y + 7)
        }
      })
      doc.save("ai_society_team_members.pdf")
    } catch (error) {
      console.error("Error downloading PDF:", error)
    }
  }

  const handleTeamChange = (team: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTeam(team)
  }

  const renderTeamMembers = () => {
    let team: TeamMember[]
    if (selectedTeam === "executive") team = EXECUTIVE_BOARD
    else if (selectedTeam === "officers") team = OFFICERS
    else if (selectedTeam === "alumni") team = AIS_ALUMNI
    else team = EXECUTIVE_BOARD

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            className="h-[240px] w-[180px] team-member-card"
            style={{ height: `${cardHeight}px` }}
          >
            <ExecutiveMemberCard
              name={member.name}
              position={member.position}
              imageSrc={member.imageSrc}
              email={member.email}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 relative" id="team">
      <Spotlight className="absolute inset-0" size={800} opacity={0.1} />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="container mx-auto max-w-6xl relative z-20">
        <SectionHeading
          title="Meet Our Team"
          subtitle="Our dedicated team of AI enthusiasts is committed to creating a vibrant community and providing valuable learning experiences."
        />
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              className={`group relative z-50 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 h-10 px-4 rounded-md ${
                selectedTeam === "executive"
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-transparent hover:bg-dark-800 text-dark-100"
              }`}
              onClick={(e) => handleTeamChange("executive", e)}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Executive Board
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${selectedTeam === "executive" ? "rotate-180" : ""}`}
              />
            </button>
            <button
              className={`group relative z-50 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 h-10 px-4 rounded-md ${
                selectedTeam === "officers"
                  ? "bg-secondary-600 hover:bg-secondary-700 text-white"
                  : "bg-transparent hover:bg-dark-800 text-dark-100"
              }`}
              onClick={(e) => handleTeamChange("officers", e)}
            >
              <Shield className="h-4 w-4 mr-2" />
              Officers
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${selectedTeam === "officers" ? "rotate-180" : ""}`}
              />
            </button>
            <button
              className={`group relative z-50 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 h-10 px-4 rounded-md ${
                selectedTeam === "alumni"
                  ? "bg-accent-600 hover:bg-accent-700 text-white"
                  : "bg-transparent hover:bg-dark-800 text-dark-100"
              }`}
              onClick={(e) => handleTeamChange("alumni", e)}
            >
              <History className="h-4 w-4 mr-2" />
              AIS Alumni
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${selectedTeam === "alumni" ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="flex justify-center gap-2 mb-8">
            <button
              className="bg-dark-900/50 hover:bg-dark-800/50 group relative z-50 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 h-8 px-3 text-sm rounded-md"
              onClick={downloadExcel}
            >
              <Download className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform duration-300" /> Excel
            </button>
            <button
              className="bg-dark-900/50 hover:bg-dark-800/50 group relative z-50 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 h-8 px-3 text-sm rounded-md"
              onClick={downloadPDF}
            >
              <Download className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform duration-300" /> PDF
            </button>
          </div>
          <div className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 pointer-events-none">
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-full mx-auto"></div>
            </div>
            {renderTeamMembers()}
          </div>
        </div>
      </div>
    </section>
  )
}
