import { FaUsers, FaChalkboardTeacher } from "react-icons/fa"

export function StatsSection() {
  return (
    <div className="pt-10 pb-20 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
        <div className="flex flex-col items-center">
          <FaUsers className="text-6xl mb-4" />
          <p className="text-3xl font-bold">350+</p>
          <p className="text-gray-400 text-sm">General Members</p>
        </div>
        <div className="flex flex-col items-center">
          <FaChalkboardTeacher className="text-6xl mb-4" />
          <p className="text-3xl font-bold">30+</p>
          <p className="text-gray-400 text-sm">Events</p>
        </div>
      </div>
    </div>
  )
}
