"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Play, Pause, Clock, BarChart2, Calendar, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BreastfeedingPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentBreast, setCurrentBreast] = useState<"left" | "right" | null>(null)
  const [timer, setTimer] = useState(0)
  const [activeTab, setActiveTab] = useState<"today" | "stats">("today")

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Format time as HH:MM AM/PM
  const formatTimeOfDay = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTracking) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking])

  // Start tracking
  const startTracking = (breast: "left" | "right") => {
    setCurrentBreast(breast)
    setIsTracking(true)
  }

  // Pause tracking
  const pauseTracking = () => {
    setIsTracking(false)
  }

  // Resume tracking
  const resumeTracking = () => {
    setIsTracking(true)
  }

  // End tracking
  const endTracking = () => {
    setIsTracking(false)
    setCurrentBreast(null)
    setTimer(0)
  }

  // Switch breast
  const switchBreast = () => {
    setCurrentBreast(currentBreast === "left" ? "right" : "left")
  }

  // Sample feeding history data
  const feedingHistory = [
    { id: 1, breast: "left", duration: 12 * 60, time: new Date(2025, 4, 11, 14, 30) },
    { id: 2, breast: "right", duration: 10 * 60, time: new Date(2025, 4, 11, 12, 15) },
    { id: 3, breast: "left", duration: 15 * 60, time: new Date(2025, 4, 11, 9, 45) },
    { id: 4, breast: "right", duration: 8 * 60, time: new Date(2025, 4, 11, 6, 20) },
    { id: 5, breast: "left", duration: 11 * 60, time: new Date(2025, 4, 10, 22, 10) },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-pink-100">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <ArrowLeft className="text-pink-900" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-pink-900">🍼 Breastfeeding Tracker</h1>
            <p className="text-xs text-pink-700">Track and log your sessions easily</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-pink-900">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {/* Timer Card */}
        <section className="py-6">
          <Card className="p-6 bg-white border-pink-100 shadow-sm">
            <div className="flex flex-col items-center">
              {/* Timer Circle */}
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 rounded-full bg-pink-50 border-4 border-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-pink-900">{formatTime(timer)}</div>
                    {currentBreast && (
                      <div className="text-sm text-pink-700 mt-1">
                        {currentBreast === "left" ? "Left Breast" : "Right Breast"}
                      </div>
                    )}
                  </div>
                </div>
                {/* Progress Circle - would be animated in a real implementation */}
                <svg className="absolute inset-0 -rotate-90" width="192" height="192" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#FBD3E9"
                    strokeWidth="8"
                    strokeDasharray="553"
                    strokeDashoffset={553 - (timer / 1200) * 553} // Example: 20 min max
                  />
                </svg>
              </div>

              {/* Control Buttons */}
              {!isTracking && !currentBreast ? (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    className="py-6 bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-200"
                    onClick={() => startTracking("left")}
                  >
                    Start Left Breast
                  </Button>
                  <Button
                    className="py-6 bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-200"
                    onClick={() => startTracking("right")}
                  >
                    Start Right Breast
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col w-full space-y-3">
                  <div className="flex space-x-3">
                    {isTracking ? (
                      <Button
                        className="flex-1 py-4 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200"
                        onClick={pauseTracking}
                      >
                        <Pause className="mr-2 h-4 w-4" /> Pause
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 py-4 bg-green-100 hover:bg-green-200 text-green-900 border border-green-200"
                        onClick={resumeTracking}
                      >
                        <Play className="mr-2 h-4 w-4" /> Resume
                      </Button>
                    )}
                    <Button
                      className="flex-1 py-4 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200"
                      onClick={switchBreast}
                    >
                      Switch Breast
                    </Button>
                  </div>
                  <Button
                    className="py-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                    onClick={endTracking}
                  >
                    End Session
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "today" ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today's Sessions
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "stats" ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Statistics
          </button>
        </div>

        {/* Today's Sessions */}
        {activeTab === "today" && (
          <section className="py-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-gray-900">Today's Sessions</h2>
              <button className="text-xs text-pink-600 font-medium">See All</button>
            </div>

            <div className="space-y-3">
              {feedingHistory.slice(0, 4).map((session) => (
                <Card key={session.id} className="p-3 bg-white border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          session.breast === "left" ? "bg-pink-100 text-pink-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {session.breast === "left" ? "L" : "R"}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {session.breast === "left" ? "Left Breast" : "Right Breast"}
                        </div>
                        <div className="text-xs text-gray-500">{formatTimeOfDay(session.time)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{formatTime(session.duration)}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Statistics */}
        {activeTab === "stats" && (
          <section className="py-2">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-3 bg-white border-gray-100">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Total Today</div>
                  <div className="text-2xl font-semibold text-pink-900">45:00</div>
                  <div className="text-xs text-gray-500 mt-1">4 sessions</div>
                </div>
              </Card>
              <Card className="p-3 bg-white border-gray-100">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Avg. Duration</div>
                  <div className="text-2xl font-semibold text-pink-900">11:15</div>
                  <div className="text-xs text-gray-500 mt-1">per session</div>
                </div>
              </Card>
            </div>

            <Card className="p-4 bg-white border-gray-100 mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Breast Balance</h3>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-pink-400 rounded-full" style={{ width: "55%" }}></div>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-pink-700">Left: 55%</div>
                <div className="text-blue-700">Right: 45%</div>
              </div>
            </Card>

            <Card className="p-4 bg-white border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Weekly Summary</h3>
              <div className="flex justify-between h-32 items-end">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center">
                    <div
                      className="w-6 bg-pink-200 rounded-t-md"
                      style={{
                        height: `${[40, 60, 50, 80, 70, 45, 30][i]}%`,
                        opacity: i === 4 ? 1 : 0.7, // Today is highlighted
                      }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1">{day}</div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* Quick Actions */}
        <section className="py-4">
          <Card className="p-4 bg-lavender-100 border-lavender-200">
            <h3 className="font-medium text-purple-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="bg-white/70 border-purple-200 text-purple-900">
                <Clock className="mr-2 h-4 w-4" /> Set Reminder
              </Button>
              <Button variant="outline" className="bg-white/70 border-purple-200 text-purple-900">
                <Calendar className="mr-2 h-4 w-4" /> View Calendar
              </Button>
            </div>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 px-2 py-1">
        <div className="flex justify-around items-center">
          <NavButton icon={<Home />} label="Home" />
          <NavButton icon={<BarChart2 size={24} />} label="Log" active />
          <NavButton icon={<BellIcon />} label="Community" />
          <NavButton icon={<User />} label="Profile" />
        </div>
      </nav>
    </div>
  )
}

function NavButton({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button className="flex flex-col items-center py-1 px-3">
      <div className={active ? "text-pink-600" : "text-gray-500"}>{icon}</div>
      <span className={`text-xs mt-1 ${active ? "text-pink-600 font-medium" : "text-gray-500"}`}>{label}</span>
    </button>
  )
}

function Home() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function User() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
