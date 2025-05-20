"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Moon, Plus } from "lucide-react"

export default function PeriodPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [cycleData, setCycleData] = useState({
    currentDay: 14,
    phase: "Ovulation",
    cycleLength: 28,
    periodLength: 5,
    nextPeriod: "May 18, 2023",
    daysUntilNextPeriod: 8,
  })

  // Generate calendar days
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthName = currentMonth.toLocaleString("default", { month: "long" })
  const year = currentMonth.getFullYear()

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null) // Empty cells for days before the 1st of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Determine day types for styling
  const getDayType = (day) => {
    if (!day) return "empty"

    const today = new Date()
    const isToday =
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()

    if (isToday) return "today"

    // This is simplified logic - in a real app, you'd calculate based on actual cycle data
    const startDate = 1 // Assuming period starts on the 1st
    const ovulationDate = 14 // Assuming ovulation on the 14th

    if (day >= startDate && day < startDate + cycleData.periodLength) {
      return "period"
    } else if (day >= ovulationDate - 2 && day <= ovulationDate + 2) {
      return "fertile"
    } else if (day > ovulationDate + 2) {
      return "luteal"
    } else {
      return "follicular"
    }
  }

  // Navigation functions
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-purple-600" />
            </Link>
            <h1 className="text-xl font-bold text-purple-800">Cycle Tracker</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Cycle Overview */}
        <section className="mb-6">
          <div className="card bg-purple-50 border border-purple-100">
            <h2 className="card-header text-purple-800">
              <div className="card-icon bg-purple-100 text-purple-600">
                <Moon className="w-5 h-5" />
              </div>
              Cycle Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-purple-600">Current Day</p>
                <p className="text-2xl font-bold text-purple-800">Day {cycleData.currentDay}</p>
                <p className="text-xs text-purple-600">{cycleData.phase}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-purple-600">Cycle Length</p>
                <p className="text-2xl font-bold text-purple-800">{cycleData.cycleLength}</p>
                <p className="text-xs text-purple-600">days</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-purple-600">Period Length</p>
                <p className="text-2xl font-bold text-purple-800">{cycleData.periodLength}</p>
                <p className="text-xs text-purple-600">days</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-purple-600">Next Period</p>
                <p className="text-xl font-bold text-purple-800">{cycleData.daysUntilNextPeriod}</p>
                <p className="text-xs text-purple-600">days away</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="mb-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-purple-100">
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              </button>

              <h2 className="text-lg font-semibold text-purple-800">
                {monthName} {year}
              </h2>

              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-purple-100">
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={index} className="text-center text-sm font-medium text-purple-800">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayType = getDayType(day)
                let bgColor = "bg-white"
                let textColor = "text-gray-800"

                if (dayType === "empty") {
                  return <div key={index} className="aspect-square"></div>
                } else if (dayType === "today") {
                  bgColor = "bg-purple-600"
                  textColor = "text-white"
                } else if (dayType === "period") {
                  bgColor = "bg-red-100"
                  textColor = "text-red-800"
                } else if (dayType === "fertile") {
                  bgColor = "bg-green-100"
                  textColor = "text-green-800"
                } else if (dayType === "luteal") {
                  bgColor = "bg-yellow-50"
                  textColor = "text-yellow-800"
                } else if (dayType === "follicular") {
                  bgColor = "bg-blue-50"
                  textColor = "text-blue-800"
                }

                return (
                  <button
                    key={index}
                    className={`aspect-square rounded-full flex items-center justify-center ${bgColor} ${textColor}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-100 mr-1"></div>
                <span>Period</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
                <span>Fertile Window</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-50 mr-1"></div>
                <span>Follicular Phase</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-50 mr-1"></div>
                <span>Luteal Phase</span>
              </div>
            </div>
          </div>
        </section>

        {/* Log Period Button */}
        <section className="mb-6">
          <button className="btn-primary w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700">
            <Plus className="w-5 h-5 mr-2" />
            Log Period or Symptoms
          </button>
        </section>

        {/* Cycle Prediction */}
        <section>
          <div className="card">
            <h2 className="card-header text-purple-800">
              <div className="card-icon bg-purple-100 text-purple-600">
                <Calendar className="w-5 h-5" />
              </div>
              Upcoming Cycle Dates
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                <div>
                  <p className="font-medium text-red-800">Next Period</p>
                  <p className="text-sm text-red-600">Estimated start date</p>
                </div>
                <p className="font-medium text-red-800">{cycleData.nextPeriod}</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                <div>
                  <p className="font-medium text-green-800">Fertile Window</p>
                  <p className="text-sm text-green-600">Highest chance of conception</p>
                </div>
                <p className="font-medium text-green-800">Jun 1 - Jun 5</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <div>
                  <p className="font-medium text-purple-800">Next Ovulation</p>
                  <p className="text-sm text-purple-600">Estimated date</p>
                </div>
                <p className="font-medium text-purple-800">Jun 3</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 p-4 rounded-full bg-purple-600 text-white shadow-lg md:hidden">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
