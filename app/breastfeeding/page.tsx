"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Milk, Plus } from "lucide-react"

export default function BreastfeedingPage() {
  const [sessions, setSessions] = useState([
    { id: 1, date: "Today", time: "08:30 AM", duration: "25 min", side: "Left" },
    { id: 2, date: "Today", time: "12:15 PM", duration: "20 min", side: "Right" },
    { id: 3, date: "Yesterday", time: "07:45 AM", duration: "22 min", side: "Left" },
    { id: 4, date: "Yesterday", time: "11:30 AM", duration: "18 min", side: "Right" },
    { id: 5, date: "Yesterday", time: "03:15 PM", duration: "23 min", side: "Left" },
    { id: 6, date: "Yesterday", time: "07:00 PM", duration: "21 min", side: "Right" },
  ])

  // Group sessions by date
  const groupedSessions = sessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = []
    }
    acc[session.date].push(session)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-pink-600" />
            </Link>
            <h1 className="text-xl font-bold text-pink-800">Breastfeeding Tracker</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Stats Overview */}
        <section className="mb-6">
          <div className="card">
            <h2 className="card-header">
              <div className="card-icon">
                <Milk className="w-5 h-5" />
              </div>
              Breastfeeding Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <p className="text-sm text-pink-600">Today</p>
                <p className="text-2xl font-bold text-pink-800">2</p>
                <p className="text-xs text-gray-600">Sessions</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <p className="text-sm text-pink-600">Total Time</p>
                <p className="text-2xl font-bold text-pink-800">45</p>
                <p className="text-xs text-gray-600">Minutes</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <p className="text-sm text-pink-600">Left Side</p>
                <p className="text-2xl font-bold text-pink-800">1</p>
                <p className="text-xs text-gray-600">Sessions</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <p className="text-sm text-pink-600">Right Side</p>
                <p className="text-2xl font-bold text-pink-800">1</p>
                <p className="text-xs text-gray-600">Sessions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Log New Session Button */}
        <section className="mb-6">
          <button className="btn-primary w-full flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Log New Feeding Session
          </button>
        </section>

        {/* Session History */}
        <section>
          <h2 className="text-lg font-semibold text-pink-800 mb-4">Feeding History</h2>

          <div className="space-y-6">
            {Object.entries(groupedSessions).map(([date, dateSessions]) => (
              <div key={date} className="space-y-3">
                <h3 className="font-medium text-gray-700">{date}</h3>

                <div className="card space-y-3">
                  {dateSessions.map((session) => (
                    <div key={session.id} className="flex justify-between items-center p-3 bg-pink-50 rounded-xl">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-pink-100 mr-3">
                          <Clock className="w-4 h-4 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-medium">{session.time}</p>
                          <p className="text-sm text-gray-600">{session.duration}</p>
                        </div>
                      </div>
                      <div className="bg-pink-100 py-1 px-3 rounded-full text-sm font-medium text-pink-700">
                        {session.side} Side
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 p-4 rounded-full bg-pink-600 text-white shadow-lg md:hidden">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
