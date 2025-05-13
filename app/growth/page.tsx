"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Download,
  Info,
  Plus,
  Camera,
  BarChart3,
  Ruler,
  Weight,
  Maximize,
  Star,
  ImageIcon,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BabyGrowthPage() {
  const [activeTab, setActiveTab] = useState("growth")
  const [selectedMonth, setSelectedMonth] = useState(6)
  const [showAddMeasurement, setShowAddMeasurement] = useState(false)

  // Sample baby data
  const babyData = {
    name: "Sophia",
    birthDate: "November 10, 2024",
    age: "6 months 5 days",
    gender: "female",
    currentWeight: 7.2,
    currentHeight: 65,
    currentHeadCirc: 42.5,
  }

  // Sample growth measurements
  const growthData = [
    { age: "Birth", weight: 3.4, height: 49, headCirc: 34, date: "Nov 10, 2024" },
    { age: "1 month", weight: 4.2, height: 52, headCirc: 36, date: "Dec 10, 2024" },
    { age: "2 months", weight: 5.1, height: 55, headCirc: 37.5, date: "Jan 10, 2025" },
    { age: "4 months", weight: 6.3, height: 60, headCirc: 40, date: "Mar 10, 2025" },
    { age: "6 months", weight: 7.2, height: 65, headCirc: 42.5, date: "May 10, 2025" },
  ]

  // Sample percentile data
  const percentiles = {
    weight: 75,
    height: 68,
    headCirc: 62,
  }

  // Sample milestones
  const milestones = [
    {
      category: "Motor Skills",
      items: [
        { name: "Holds head up", completed: true, age: "2 months" },
        { name: "Rolls over", completed: true, age: "4 months" },
        { name: "Sits without support", completed: true, age: "6 months" },
        { name: "Crawls", completed: false },
        { name: "Stands with support", completed: false },
      ],
    },
    {
      category: "Communication",
      items: [
        { name: "Smiles", completed: true, age: "1 month" },
        { name: "Laughs", completed: true, age: "3 months" },
        { name: "Babbles", completed: true, age: "5 months" },
        { name: "Says 'mama/dada'", completed: false },
        { name: "Waves bye-bye", completed: false },
      ],
    },
    {
      category: "Cognitive",
      items: [
        { name: "Follows moving objects", completed: true, age: "2 months" },
        { name: "Recognizes familiar faces", completed: true, age: "3 months" },
        { name: "Reaches for toys", completed: true, age: "4 months" },
        { name: "Transfers objects", completed: false },
        { name: "Looks for hidden objects", completed: false },
      ],
    },
  ]

  // Sample upcoming milestones
  const upcomingMilestones = [
    { name: "Crawling", expectedAge: "7-10 months" },
    { name: "Pincer grasp", expectedAge: "7-9 months" },
    { name: "Stands with support", expectedAge: "8-10 months" },
  ]

  // Generate months for age selector
  const generateMonths = () => {
    const months = []
    for (let i = 0; i <= 24; i++) {
      months.push(i)
    }
    return months
  }

  // Calculate growth chart data points
  const calculateGrowthPoints = (metric) => {
    // This would normally be calculated based on WHO/CDC growth charts
    // For this example, we're using simplified data
    const points = []

    if (metric === "weight") {
      points.push({ x: 0, y: 3.4 })
      points.push({ x: 1, y: 4.2 })
      points.push({ x: 2, y: 5.1 })
      points.push({ x: 4, y: 6.3 })
      points.push({ x: 6, y: 7.2 })
    } else if (metric === "height") {
      points.push({ x: 0, y: 49 })
      points.push({ x: 1, y: 52 })
      points.push({ x: 2, y: 55 })
      points.push({ x: 4, y: 60 })
      points.push({ x: 6, y: 65 })
    } else if (metric === "headCirc") {
      points.push({ x: 0, y: 34 })
      points.push({ x: 1, y: 36 })
      points.push({ x: 2, y: 37.5 })
      points.push({ x: 4, y: 40 })
      points.push({ x: 6, y: 42.5 })
    }

    return points
  }

  // Get percentile color
  const getPercentileColor = (percentile) => {
    if (percentile < 5) return "text-red-600 dark:text-red-400"
    if (percentile < 25) return "text-amber-600 dark:text-amber-400"
    if (percentile > 95) return "text-purple-600 dark:text-purple-400"
    return "text-green-600 dark:text-green-400"
  }

  // Get percentile background
  const getPercentileBg = (percentile) => {
    if (percentile < 5) return "bg-red-100 dark:bg-red-900/30"
    if (percentile < 25) return "bg-amber-100 dark:bg-amber-900/30"
    if (percentile > 95) return "bg-purple-100 dark:bg-purple-900/30"
    return "bg-green-100 dark:bg-green-900/30"
  }

  // Get percentile border
  const getPercentileBorder = (percentile) => {
    if (percentile < 5) return "border-red-200 dark:border-red-800/50"
    if (percentile < 25) return "border-amber-200 dark:border-amber-800/50"
    if (percentile > 95) return "border-purple-200 dark:border-purple-800/50"
    return "border-green-200 dark:border-green-800/50"
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 dark:from-gray-900 dark:to-teal-900/30">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-blue-900 dark:text-blue-400" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-blue-900 dark:text-blue-300">Baby Growth Tracker</h1>
            <p className="text-xs text-blue-700 dark:text-blue-400">Track {babyData.name}'s growth and milestones</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-blue-800/50"
          >
            <Download className="h-4 w-4 mr-1 text-blue-700 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-400">Export</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {/* Baby Info Card */}
        <section className="py-6 fade-in-up">
          <Card className="p-5 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/50 card-glass relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <div className="text-6xl">👶</div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden mr-4 border-2 border-blue-300 dark:border-blue-700">
                  <span className="text-3xl">👶</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300">{babyData.name}</h2>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Born {babyData.birthDate} • {babyData.age}
                  </p>
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full bg-white/70 dark:bg-gray-800/70">
                      <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Baby information</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Weight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                </div>
                <p className="font-medium text-blue-900 dark:text-blue-300">{babyData.currentWeight} kg</p>
                <p className={`text-xs ${getPercentileColor(percentiles.weight)}`}>{percentiles.weight}th percentile</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Ruler className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
                </div>
                <p className="font-medium text-blue-900 dark:text-blue-300">{babyData.currentHeight} cm</p>
                <p className={`text-xs ${getPercentileColor(percentiles.height)}`}>{percentiles.height}th percentile</p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Maximize className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Head</p>
                </div>
                <p className="font-medium text-blue-900 dark:text-blue-300">{babyData.currentHeadCirc} cm</p>
                <p className={`text-xs ${getPercentileColor(percentiles.headCirc)}`}>
                  {percentiles.headCirc}th percentile
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Add Measurement Button */}
        <section className="py-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Dialog open={showAddMeasurement} onOpenChange={setShowAddMeasurement}>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white btn-glow dark:bg-blue-600 dark:hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add New Measurement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Measurement</DialogTitle>
                <DialogDescription>Enter your baby's latest measurements to track their growth.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="measurement-date">Date</Label>
                    <Input id="measurement-date" type="date" defaultValue="2025-05-13" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="measurement-age">Age</Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="measurement-age">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="7">7 months</SelectItem>
                        <SelectItem value="8">8 months</SelectItem>
                        <SelectItem value="9">9 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="measurement-weight">Weight (kg)</Label>
                    <Input id="measurement-weight" type="number" step="0.1" defaultValue="7.2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="measurement-height">Height (cm)</Label>
                    <Input id="measurement-height" type="number" step="0.1" defaultValue="65" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="measurement-head">Head (cm)</Label>
                    <Input id="measurement-head" type="number" step="0.1" defaultValue="42.5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="measurement-notes">Notes</Label>
                  <Input id="measurement-notes" placeholder="Any additional notes..." />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="add-photo" />
                  <Label htmlFor="add-photo">Add photo with this measurement</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddMeasurement(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddMeasurement(false)}>Save Measurement</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Tabs */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Tabs defaultValue="growth" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="growth">Growth Charts</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="photos">Photo Timeline</TabsTrigger>
            </TabsList>

            {/* Growth Charts Tab */}
            <TabsContent value="growth">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Growth Charts</h3>
                  <Select
                    value={selectedMonth.toString()}
                    onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[140px] bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-blue-800/50">
                      <SelectValue placeholder="Select Age" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateMonths().map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month === 0 ? "Birth" : `${month} month${month > 1 ? "s" : ""}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight Chart */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Weight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Weight-for-Age</h4>
                  </div>
                  <div className="h-48 relative">
                    {/* Chart Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
                      <span>10kg</span>
                      <span>8kg</span>
                      <span>6kg</span>
                      <span>4kg</span>
                      <span>2kg</span>
                    </div>

                    {/* Chart grid lines */}
                    <div className="absolute left-8 right-0 top-0 bottom-0">
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                    </div>

                    {/* Percentile bands */}
                    <div className="absolute left-8 right-0 top-0 bottom-0 opacity-20">
                      <div className="h-1/5 bg-red-200 dark:bg-red-900"></div>
                      <div className="h-1/5 bg-amber-200 dark:bg-amber-900"></div>
                      <div className="h-2/5 bg-green-200 dark:bg-green-900"></div>
                      <div className="h-1/5 bg-purple-200 dark:bg-purple-900"></div>
                    </div>

                    {/* Baby's growth line */}
                    <svg
                      className="absolute left-8 right-0 top-0 bottom-0 h-full w-[calc(100%-2rem)]"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,180 C20,160 40,140 80,120 C120,100 160,80 200,60"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Data points */}
                      {calculateGrowthPoints("weight").map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x * 40}
                          cy={180 - point.y * 18}
                          r="4"
                          fill="#3b82f6"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
                      <span>Birth</span>
                      <span>2m</span>
                      <span>4m</span>
                      <span>6m</span>
                      <span>8m</span>
                      <span>10m</span>
                      <span>12m</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center mt-2 text-xs">
                    <div className="flex items-center mx-2">
                      <div className="w-3 h-3 bg-red-200 dark:bg-red-900 mr-1 rounded-sm"></div>
                      <span className="text-gray-600 dark:text-gray-400">&lt;5%</span>
                    </div>
                    <div className="flex items-center mx-2">
                      <div className="w-3 h-3 bg-amber-200 dark:bg-amber-900 mr-1 rounded-sm"></div>
                      <span className="text-gray-600 dark:text-gray-400">5-25%</span>
                    </div>
                    <div className="flex items-center mx-2">
                      <div className="w-3 h-3 bg-green-200 dark:bg-green-900 mr-1 rounded-sm"></div>
                      <span className="text-gray-600 dark:text-gray-400">25-95%</span>
                    </div>
                    <div className="flex items-center mx-2">
                      <div className="w-3 h-3 bg-purple-200 dark:bg-purple-900 mr-1 rounded-sm"></div>
                      <span className="text-gray-600 dark:text-gray-400">&gt;95%</span>
                    </div>
                  </div>
                </div>

                {/* Height Chart */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Ruler className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Length/Height-for-Age</h4>
                  </div>
                  <div className="h-48 relative">
                    {/* Chart Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
                      <span>80cm</span>
                      <span>70cm</span>
                      <span>60cm</span>
                      <span>50cm</span>
                      <span>40cm</span>
                    </div>

                    {/* Chart grid lines */}
                    <div className="absolute left-8 right-0 top-0 bottom-0">
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                    </div>

                    {/* Percentile bands */}
                    <div className="absolute left-8 right-0 top-0 bottom-0 opacity-20">
                      <div className="h-1/5 bg-red-200 dark:bg-red-900"></div>
                      <div className="h-1/5 bg-amber-200 dark:bg-amber-900"></div>
                      <div className="h-2/5 bg-green-200 dark:bg-green-900"></div>
                      <div className="h-1/5 bg-purple-200 dark:bg-purple-900"></div>
                    </div>

                    {/* Baby's growth line */}
                    <svg
                      className="absolute left-8 right-0 top-0 bottom-0 h-full w-[calc(100%-2rem)]"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,180 C20,160 40,140 80,120 C120,100 160,80 200,60"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Data points */}
                      {calculateGrowthPoints("height").map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x * 40}
                          cy={180 - (point.y - 40) * 4.5}
                          r="4"
                          fill="#3b82f6"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
                      <span>Birth</span>
                      <span>2m</span>
                      <span>4m</span>
                      <span>6m</span>
                      <span>8m</span>
                      <span>10m</span>
                      <span>12m</span>
                    </div>
                  </div>
                </div>

                {/* Head Circumference Chart */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Maximize className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Head Circumference-for-Age</h4>
                  </div>
                  <div className="h-48 relative">
                    {/* Chart Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
                      <span>50cm</span>
                      <span>45cm</span>
                      <span>40cm</span>
                      <span>35cm</span>
                      <span>30cm</span>
                    </div>

                    {/* Chart grid lines */}
                    <div className="absolute left-8 right-0 top-0 bottom-0">
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/5"></div>
                    </div>

                    {/* Percentile bands */}
                    <div className="absolute left-8 right-0 top-0 bottom-0 opacity-20">
                      <div className="h-1/5 bg-red-200 dark:bg-red-900"></div>
                      <div className="h-1/5 bg-amber-200 dark:bg-amber-900"></div>
                      <div className="h-2/5 bg-green-200 dark:bg-green-900"></div>
                      <div className="h-1/5 bg-purple-200 dark:bg-purple-900"></div>
                    </div>

                    {/* Baby's growth line */}
                    <svg
                      className="absolute left-8 right-0 top-0 bottom-0 h-full w-[calc(100%-2rem)]"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,180 C20,160 40,140 80,120 C120,100 160,80 200,60"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Data points */}
                      {calculateGrowthPoints("headCirc").map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x * 40}
                          cy={180 - (point.y - 30) * 9}
                          r="4"
                          fill="#3b82f6"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
                      <span>Birth</span>
                      <span>2m</span>
                      <span>4m</span>
                      <span>6m</span>
                      <span>8m</span>
                      <span>10m</span>
                      <span>12m</span>
                    </div>
                  </div>
                </div>

                {/* Measurement History */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Measurement History</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {growthData.map((measurement, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 text-blue-600 dark:text-blue-400 mr-1" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">{measurement.date}</span>
                            </div>
                            <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">{measurement.age}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-right">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {measurement.weight} kg
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {measurement.height} cm
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Head</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {measurement.headCirc} cm
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Milestones Tab */}
            <TabsContent value="milestones">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Developmental Milestones</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-blue-800/50"
                  >
                    <Plus className="h-4 w-4 mr-1 text-blue-700 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-400">Add Milestone</span>
                  </Button>
                </div>

                {/* Milestone Progress */}
                <div className="mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h4 className="font-medium text-blue-900 dark:text-blue-300">Milestone Progress</h4>
                      </div>
                      <Badge className={`${getPercentileBg(75)} ${getPercentileBorder(75)}`}>On Track</Badge>
                    </div>
                    <div className="mt-3">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                        <span>0 months</span>
                        <span className="font-medium text-blue-700 dark:text-blue-400">6 months</span>
                        <span>12 months</span>
                      </div>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 mt-3">
                      {babyData.name} has achieved 9 of 15 expected milestones for her age. She's developing right on
                      track!
                    </p>
                  </div>
                </div>

                {/* Milestone Categories */}
                <div className="space-y-6">
                  {milestones.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{category.category}</h4>
                      <div className="space-y-2">
                        {category.items.map((milestone, milestoneIndex) => (
                          <div
                            key={milestoneIndex}
                            className={`p-3 rounded-lg border ${
                              milestone.completed
                                ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30"
                                : "bg-gray-50 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                                    milestone.completed ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                                  }`}
                                >
                                  {milestone.completed && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  )}
                                </div>
                                <span
                                  className={`font-medium ${
                                    milestone.completed
                                      ? "text-green-900 dark:text-green-300"
                                      : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {milestone.name}
                                </span>
                              </div>
                              {milestone.completed ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                  {milestone.age}
                                </Badge>
                              ) : (
                                <Button variant="ghost" size="sm" className="h-7 text-xs">
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upcoming Milestones */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Coming Up Next</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                    <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                      Here are some milestones to look forward to in the coming months:
                    </p>
                    <div className="space-y-2">
                      {upcomingMilestones.map((milestone, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></div>
                          <span className="text-sm text-blue-900 dark:text-blue-300 font-medium">{milestone.name}</span>
                          <span className="text-xs text-blue-700 dark:text-blue-400 ml-2">
                            ({milestone.expectedAge})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Growth Photo Timeline</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-blue-800/50"
                  >
                    <Camera className="h-4 w-4 mr-1 text-blue-700 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-400">Add Photo</span>
                  </Button>
                </div>

                {/* Month Selector */}
                <div className="relative mb-4">
                  <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1 snap-x hide-scrollbar">
                    {generateMonths()
                      .slice(0, 7)
                      .map((month) => (
                        <button
                          key={month}
                          className={`flex-shrink-0 px-3 py-2 rounded-full snap-start focus-ring ${
                            month === selectedMonth
                              ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-300"
                              : "bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300"
                          }`}
                          onClick={() => setSelectedMonth(month)}
                        >
                          {month === 0 ? "Birth" : `${month} month${month > 1 ? "s" : ""}`}
                        </button>
                      ))}
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Placeholder photos - in a real app these would be actual baby photos */}
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                    <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-blue-400 dark:text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-xs text-white text-center">6 months - Front</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                    <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-blue-400 dark:text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-xs text-white text-center">6 months - Side</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                    <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-blue-400 dark:text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-xs text-white text-center">6 months - Sitting</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                    <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-blue-400 dark:text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-xs text-white text-center">6 months - Smiling</p>
                    </div>
                  </div>
                </div>

                {/* Photo Comparison */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Growth Comparison</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                      <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-blue-400 dark:text-blue-500" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                        <p className="text-xs text-white text-center">Birth</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                      <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-blue-400 dark:text-blue-500" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                        <p className="text-xs text-white text-center">3 months</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                      <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-blue-400 dark:text-blue-500" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                        <p className="text-xs text-white text-center">6 months</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Growth Insights */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Card className="p-5 bg-gradient-to-br from-blue-100 to-teal-50 dark:from-blue-900/40 dark:to-teal-900/30 border-blue-200 dark:border-blue-700/50 card-glass">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-blue-100 dark:bg-blue-800/70 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-lg">Growth Insights</h3>

                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-blue-100 dark:border-blue-700/50">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Growth Patterns</h4>
                  <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                    {babyData.name} is growing steadily along the {percentiles.weight}th percentile for weight and the{" "}
                    {percentiles.height}th percentile for height. This consistent growth pattern is a positive indicator
                    of healthy development.
                  </p>
                </div>

                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-blue-100 dark:border-blue-700/50">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Developmental Progress</h4>
                  <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                    At 6 months, {babyData.name} has achieved key milestones like sitting without support and rolling
                    over. Her motor skills are developing right on schedule, and her communication skills are showing
                    good progress with regular babbling.
                  </p>
                </div>

                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-blue-100 dark:border-blue-700/50">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Recommendations</h4>
                  <ul className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2">•</div>
                      <span>Continue with iron-rich foods as you introduce solids to support healthy growth</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2">•</div>
                      <span>Encourage tummy time to strengthen neck and shoulder muscles</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2">•</div>
                      <span>Read and talk to {babyData.name} regularly to support language development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 border-t border-blue-100 dark:border-blue-900/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Switch id="reminder" />
            <label htmlFor="reminder" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remind me for next check-up
            </label>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-700 dark:text-blue-400">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule Check-up
          </Button>
        </div>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white btn-glow dark:bg-blue-600 dark:hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-1" />
          Add New Measurement
        </Button>
      </div>
    </div>
  )
}
