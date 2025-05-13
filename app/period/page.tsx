"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Bell, Info, ChevronLeft, ChevronRight, Plus, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CyclePage() {
  const [currentDay, setCurrentDay] = useState(14)
  const [cycleLength, setCycleLength] = useState(28)
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Calculate cycle phases
  const menstrualPhase = { start: 1, end: 5 }
  const fertileWindow = { start: 10, end: 15 }
  const ovulationDay = 14
  const lutealPhase = { start: 15, end: 28 }
  const pmsPhase = { start: 24, end: 28 }

  // Determine current phase
  const getCurrentPhase = (day: number) => {
    if (day >= menstrualPhase.start && day <= menstrualPhase.end) return "Menstrual Phase"
    if (day >= fertileWindow.start && day <= fertileWindow.end) return "Fertile Window"
    if (day === ovulationDay) return "Ovulation Day"
    if (day >= pmsPhase.start && day <= pmsPhase.end) return "PMS Phase"
    return "Luteal Phase"
  }

  // Get phase color
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "text-rose-600 dark:text-rose-400"
      case "Fertile Window":
        return "text-purple-600 dark:text-purple-400"
      case "Ovulation Day":
        return "text-teal-600 dark:text-teal-400"
      case "PMS Phase":
        return "text-amber-600 dark:text-amber-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  // Get phase emoji
  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "🩸"
      case "Fertile Window":
        return "🌸"
      case "Ovulation Day":
        return "🌕"
      case "PMS Phase":
        return "⚠️"
      default:
        return "🌙"
    }
  }

  // Get phase background
  const getPhaseBg = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "bg-rose-100 dark:bg-rose-900/30"
      case "Fertile Window":
        return "bg-purple-100 dark:bg-purple-900/30"
      case "Ovulation Day":
        return "bg-teal-100 dark:bg-teal-900/30"
      case "PMS Phase":
        return "bg-amber-100 dark:bg-amber-900/30"
      default:
        return "bg-blue-100 dark:bg-blue-900/30"
    }
  }

  // Get phase border
  const getPhaseBorder = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return "border-rose-200 dark:border-rose-800/50"
      case "Fertile Window":
        return "border-purple-200 dark:border-purple-800/50"
      case "Ovulation Day":
        return "border-teal-200 dark:border-teal-800/50"
      case "PMS Phase":
        return "border-amber-200 dark:border-amber-800/50"
      default:
        return "border-blue-200 dark:border-blue-800/50"
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    for (let i = 1; i <= cycleLength; i++) {
      days.push(i)
    }
    return days
  }

  // Get day status for calendar
  const getDayStatus = (day: number) => {
    if (day >= menstrualPhase.start && day <= menstrualPhase.end) return "menstrual"
    if (day >= fertileWindow.start && day <= fertileWindow.end) return "fertile"
    if (day === ovulationDay) return "ovulation"
    if (day >= pmsPhase.start && day <= pmsPhase.end) return "pms"
    return "regular"
  }

  // Get day dot color
  const getDayDotColor = (status: string) => {
    switch (status) {
      case "menstrual":
        return "bg-rose-500"
      case "fertile":
        return "bg-purple-500"
      case "ovulation":
        return "bg-teal-500"
      case "pms":
        return "bg-amber-500"
      default:
        return "bg-blue-300"
    }
  }

  const currentPhase = getCurrentPhase(currentDay)
  const phaseColor = getPhaseColor(currentPhase)
  const phaseEmoji = getPhaseEmoji(currentPhase)
  const phaseBg = getPhaseBg(currentPhase)
  const phaseBorder = getPhaseBorder(currentPhase)

  // Symptoms data
  const symptoms = [
    { id: "mood", name: "Mood", options: ["😊", "😐", "😞", "😠"], selected: null },
    { id: "cramps", name: "Cramps", options: ["None", "Mild", "Moderate", "Severe"], selected: null },
    { id: "headache", name: "Headache", options: ["None", "Mild", "Moderate", "Severe"], selected: null },
    { id: "bloating", name: "Bloating", options: ["None", "Mild", "Moderate", "Severe"], selected: null },
    { id: "breast", name: "Breast Tenderness", options: ["None", "Mild", "Moderate", "Severe"], selected: null },
    { id: "energy", name: "Energy", options: ["High", "Normal", "Low", "Very Low"], selected: null },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-lavender-50 dark:from-gray-900 dark:to-purple-900/30">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-rose-100 dark:border-rose-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-rose-900 dark:text-rose-400" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-rose-900 dark:text-rose-300">Cycle & Menstrual Tracker</h1>
            <p className="text-xs text-rose-700 dark:text-rose-400">Track your cycle, symptoms, and wellness</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/period/analytics">
            <Button variant="ghost" size="icon" className="rounded-full">
              <BarChart3 className="h-5 w-5 text-rose-700 dark:text-rose-400" />
              <span className="sr-only">Analytics</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Calendar className="h-5 w-5 text-rose-700 dark:text-rose-400" />
            <span className="sr-only">Calendar</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24">
        {/* Cycle Overview */}
        <section className="py-6 fade-in-up">
          <Card className={`p-5 ${phaseBg} ${phaseBorder} card-glass relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <div className="text-6xl">{phaseEmoji}</div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center">
                  <span className="text-3xl mr-2">{phaseEmoji}</span>
                  <h2 className={`text-xl font-semibold ${phaseColor}`}>{currentPhase}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Day {currentDay} of {cycleLength}
                </p>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-white/70 dark:bg-gray-800/70">
                      <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your cycle information</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Next Period</p>
                <p className="font-medium text-rose-700 dark:text-rose-400">May 25, 2025</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Fertile Window</p>
                <p className="font-medium text-purple-700 dark:text-purple-400">May 10-15, 2025</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Horizontal Calendar Strip */}
        <section className="py-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Cycle Calendar</h3>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1 snap-x hide-scrollbar">
              {generateCalendarDays().map((day) => {
                const status = getDayStatus(day)
                const isActive = day === currentDay

                return (
                  <button
                    key={day}
                    className={`flex-shrink-0 w-10 h-14 flex flex-col items-center justify-center rounded-full snap-start focus-ring ${
                      isActive
                        ? `${phaseBg} border ${phaseBorder}`
                        : "bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50"
                    }`}
                    onClick={() => setCurrentDay(day)}
                  >
                    <span
                      className={`text-sm font-medium ${isActive ? phaseColor : "text-gray-700 dark:text-gray-300"}`}
                    >
                      {day}
                    </span>
                    <div className={`h-2 w-2 rounded-full mt-1 ${getDayDotColor(status)}`}></div>
                  </button>
                )
              })}
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-rose-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-lavender-50 dark:from-purple-900/30 to-transparent pointer-events-none"></div>
          </div>

          <div className="flex justify-center mt-2 space-x-4 text-xs">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-rose-500 mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">Period</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">Fertile</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-teal-500 mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">Ovulation</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">PMS</span>
            </div>
          </div>
        </section>

        {/* Wellness & Symptoms Tracker */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Tabs defaultValue="symptoms">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="notes">Notes & Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="symptoms">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Track Today's Symptoms</h3>

                <div className="grid grid-cols-2 gap-3">
                  {symptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50"
                    >
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{symptom.name}</p>
                      <div className="flex flex-wrap gap-1">
                        {symptom.options.map((option, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-100 dark:border-gray-700/50">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Symptoms</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Spotting
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Acne
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Insomnia
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      Cravings
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Notes & Observations</h3>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-h-[120px] focus-ring"
                  placeholder="Add notes about how you're feeling today..."
                ></textarea>

                <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/80 rounded-lg border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center">
                    <Switch id="breastfeeding" />
                    <label htmlFor="breastfeeding" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Currently breastfeeding
                    </label>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                          <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Breastfeeding may affect your cycle</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Tips & Health Insights */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Card className="p-5 bg-gradient-to-br from-lavender-100 to-rose-50 dark:from-purple-900/40 dark:to-rose-900/30 border-lavender-200 dark:border-purple-700/50 card-glass">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-purple-100 dark:bg-purple-800/70 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-700 dark:text-purple-300"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 text-lg">Today's Wellness Insight</h3>
                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-purple-100 dark:border-purple-700/50">
                  <p className="text-purple-800 dark:text-purple-300 leading-relaxed">
                    {currentPhase === "Ovulation Day"
                      ? "Your estrogen is peaking today. This is a great time to boost your energy with a short walk or light exercise. Stay hydrated!"
                      : currentPhase === "Menstrual Phase"
                        ? "During your period, iron-rich foods like leafy greens and lean proteins can help replenish what's lost. Rest when needed."
                        : currentPhase === "Fertile Window"
                          ? "Your body is preparing for potential conception. If you're trying to conceive, this is your optimal window."
                          : currentPhase === "PMS Phase"
                            ? "Magnesium-rich foods like dark chocolate and nuts may help reduce PMS symptoms. Practice self-care and gentle movement."
                            : "Your progesterone is rising. Focus on balanced meals and adequate sleep to support your hormonal health."}
                  </p>
                </div>

                <div className="mt-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-purple-100 dark:border-purple-700/50">
                  <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Breastfeeding & Your Cycle</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    Breastfeeding can delay the return of your menstrual cycle. Exclusive breastfeeding may provide
                    natural contraception for the first 6 months (LAM method), but it's not guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 border-t border-rose-100 dark:border-rose-900/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Switch id="reminder" />
            <label htmlFor="reminder" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remind me tomorrow
            </label>
          </div>
          <Button variant="ghost" size="sm" className="text-rose-700 dark:text-rose-400">
            <Bell className="h-4 w-4 mr-1" />
            Set Alerts
          </Button>
        </div>
        <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white btn-glow dark:bg-rose-600 dark:hover:bg-rose-700">
          <Plus className="h-4 w-4 mr-1" />
          Log Today's Data
        </Button>
      </div>
    </div>
  )
}
