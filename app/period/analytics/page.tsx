"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Download, Info, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export default function CycleAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  // Sample data for visualizations
  const cycleData = [
    { month: "Dec", cycleLength: 28, periodLength: 5, symptoms: 3, mood: 2 },
    { month: "Jan", cycleLength: 30, periodLength: 6, symptoms: 4, mood: 1 },
    { month: "Feb", cycleLength: 27, periodLength: 4, symptoms: 2, mood: 3 },
    { month: "Mar", cycleLength: 29, periodLength: 5, symptoms: 5, mood: 2 },
    { month: "Apr", cycleLength: 28, periodLength: 5, symptoms: 3, mood: 4 },
    { month: "May", cycleLength: 26, periodLength: 4, symptoms: 2, mood: 3 },
  ]

  // Calculate averages
  const avgCycleLength = Math.round(cycleData.reduce((sum, data) => sum + data.cycleLength, 0) / cycleData.length)
  const avgPeriodLength =
    Math.round((cycleData.reduce((sum, data) => sum + data.periodLength, 0) / cycleData.length) * 10) / 10
  const totalCycles = cycleData.length

  // Calculate cycle regularity
  const cycleVariation =
    Math.round(
      Math.sqrt(
        cycleData.reduce((sum, data) => sum + Math.pow(data.cycleLength - avgCycleLength, 2), 0) / cycleData.length,
      ) * 10,
    ) / 10

  const cycleRegularity =
    cycleVariation <= 2
      ? "Very Regular"
      : cycleVariation <= 4
        ? "Regular"
        : cycleVariation <= 6
          ? "Somewhat Regular"
          : "Irregular"

  // Most common symptoms
  const commonSymptoms = [
    { name: "Cramps", frequency: "83%" },
    { name: "Fatigue", frequency: "67%" },
    { name: "Headache", frequency: "50%" },
    { name: "Bloating", frequency: "50%" },
  ]

  // Find max cycle length for scaling
  const maxCycleLength = Math.max(...cycleData.map((d) => d.cycleLength))

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-lavender-50 dark:from-gray-900 dark:to-purple-900/30">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-rose-100 dark:border-rose-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center">
          <Link href="/period" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-rose-900 dark:text-rose-400" />
              <span className="sr-only">Back to Cycle Tracker</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-rose-900 dark:text-rose-300">Cycle Analytics</h1>
            <p className="text-xs text-rose-700 dark:text-rose-400">Understand your patterns over time</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white/70 dark:bg-gray-800/70 border-rose-200 dark:border-rose-800/50"
          >
            <Download className="h-4 w-4 mr-1 text-rose-700 dark:text-rose-400" />
            <span className="text-rose-700 dark:text-rose-400">Export</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {/* Time Range Selector */}
        <section className="py-4 fade-in-up">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Cycle Insights</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px] bg-white/70 dark:bg-gray-800/70 border-rose-200 dark:border-rose-800/50">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard
              title="Avg. Cycle Length"
              value={`${avgCycleLength} days`}
              trend="+1 day from last 3 cycles"
              trendDirection="up"
              icon={<Calendar className="h-4 w-4 text-rose-600 dark:text-rose-400" />}
              color="rose"
            />
            <MetricCard
              title="Avg. Period Length"
              value={`${avgPeriodLength} days`}
              trend="No change"
              trendDirection="neutral"
              icon={<Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
              color="purple"
            />
            <MetricCard
              title="Cycle Regularity"
              value={cycleRegularity}
              trend="Variation: ±2.3 days"
              trendDirection="neutral"
              icon={<BarChart3 className="h-4 w-4 text-teal-600 dark:text-teal-400" />}
              color="teal"
            />
            <MetricCard
              title="Tracked Cycles"
              value={totalCycles.toString()}
              trend="6 months of data"
              trendDirection="neutral"
              icon={<Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
              color="blue"
            />
          </div>
        </section>

        {/* Cycle Length Chart */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Cycle Length Trends</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                      <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your cycle length over time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="h-64 relative">
              {/* Chart Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
                <span>35d</span>
                <span>30d</span>
                <span>25d</span>
                <span>20d</span>
              </div>

              {/* Chart grid lines */}
              <div className="absolute left-8 right-0 top-0 bottom-0">
                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/4"></div>
                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/4"></div>
                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/4"></div>
                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-1/4"></div>
              </div>

              {/* Average line */}
              <div
                className="absolute left-8 right-0 border-t-2 border-purple-400 dark:border-purple-500 border-dashed z-10"
                style={{ top: `${100 - (avgCycleLength / 35) * 100}%` }}
              ></div>

              {/* Chart bars */}
              <div className="absolute left-8 right-0 top-0 bottom-0 flex items-end justify-around">
                {cycleData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center w-full">
                    <div
                      className="w-12 bg-gradient-to-t from-rose-400 to-purple-400 dark:from-rose-600 dark:to-purple-600 rounded-t-md relative group"
                      style={{ height: `${(data.cycleLength / 35) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {data.cycleLength} days
                      </div>

                      {/* Period length indicator */}
                      <div
                        className="absolute bottom-0 w-full bg-rose-600 dark:bg-rose-700 rounded-b-md"
                        style={{ height: `${(data.periodLength / data.cycleLength) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">{data.month}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 right-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-md text-xs flex flex-col gap-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-t from-rose-400 to-purple-400 dark:from-rose-600 dark:to-purple-600 mr-1 rounded-sm"></div>
                  <span className="text-gray-700 dark:text-gray-300">Cycle Length</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-rose-600 dark:bg-rose-700 mr-1 rounded-sm"></div>
                  <span className="text-gray-700 dark:text-gray-300">Period Length</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-0 border-t-2 border-purple-400 dark:border-purple-500 border-dashed mr-1"></div>
                  <span className="text-gray-700 dark:text-gray-300">Average ({avgCycleLength}d)</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Symptoms Analysis */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Tabs defaultValue="symptoms">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="mood">Mood Patterns</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="symptoms">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Most Common Symptoms</h3>

                <div className="space-y-3">
                  {commonSymptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">{symptom.name}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-rose-700 dark:text-rose-400 mr-2">
                            {symptom.frequency}
                          </span>
                          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-rose-500 dark:bg-rose-600 rounded-full"
                              style={{ width: symptom.frequency }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Symptom Patterns</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Your symptoms tend to be most severe 1-2 days before your period starts. Cramps typically last for
                    the first 2-3 days of your period.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800/50">
                    Cramps
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50">
                    Fatigue
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50">
                    Headache
                  </Badge>
                  <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800/50">
                    Bloating
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50">
                    Mood Swings
                  </Badge>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="mood">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Mood Patterns</h3>

                <div className="h-48 relative mb-4">
                  {/* Cycle phases background */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/4 bg-rose-100/50 dark:bg-rose-900/20 rounded-l-md"></div>
                    <div className="w-1/4 bg-blue-100/50 dark:bg-blue-900/20"></div>
                    <div className="w-1/4 bg-teal-100/50 dark:bg-teal-900/20"></div>
                    <div className="w-1/4 bg-amber-100/50 dark:bg-amber-900/20 rounded-r-md"></div>
                  </div>

                  {/* Phase labels */}
                  <div className="absolute bottom-0 inset-x-0 flex text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-1/4 text-center">Menstrual</div>
                    <div className="w-1/4 text-center">Follicular</div>
                    <div className="w-1/4 text-center">Ovulation</div>
                    <div className="w-1/4 text-center">Luteal</div>
                  </div>

                  {/* Mood line */}
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <path
                      d="M0,80 C20,100 40,40 80,60 C120,80 160,30 200,50 C240,70 280,90 320,70 C360,50 400,90 440,70"
                      fill="none"
                      stroke="url(#mood-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="mood-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Mood indicators */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Mood Insights</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Your mood tends to be lowest during the first 2 days of your period and 3-4 days before your
                      period starts. You report feeling most energetic and positive around ovulation.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Hormonal Effects</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      These mood changes align with typical hormonal fluctuations. Estrogen rises during the follicular
                      phase, peaks at ovulation (boosting mood), then drops in the luteal phase as progesterone rises.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="predictions">
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Cycle Predictions</h3>

                <div className="space-y-3">
                  <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg border border-rose-100 dark:border-rose-800/30">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-rose-700 dark:text-rose-400 mr-2" />
                      <h4 className="font-medium text-rose-900 dark:text-rose-300">Next Period</h4>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-rose-800 dark:text-rose-300">Expected Start Date</span>
                      <span className="font-medium text-rose-900 dark:text-rose-200">May 25, 2025</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                      <span className="text-rose-800 dark:text-rose-300">Predicted Duration</span>
                      <span className="font-medium text-rose-900 dark:text-rose-200">4-5 days</span>
                    </div>
                    <div className="mt-2 text-xs text-rose-700 dark:text-rose-400">
                      Based on your last 6 cycles (±2 days accuracy)
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-700 dark:text-purple-400 mr-2" />
                      <h4 className="font-medium text-purple-900 dark:text-purple-300">Fertility Window</h4>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-purple-800 dark:text-purple-300">Next Fertile Window</span>
                      <span className="font-medium text-purple-900 dark:text-purple-200">Jun 8-13, 2025</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                      <span className="text-purple-800 dark:text-purple-300">Predicted Ovulation</span>
                      <span className="font-medium text-purple-900 dark:text-purple-200">Jun 11, 2025</span>
                    </div>
                    <div className="mt-2 text-xs text-purple-700 dark:text-purple-400">
                      Based on your average cycle length of 28 days
                    </div>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg border border-teal-100 dark:border-teal-800/30">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-teal-700 dark:text-teal-400 mr-2" />
                      <h4 className="font-medium text-teal-900 dark:text-teal-300">Cycle Prediction Accuracy</h4>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 dark:bg-teal-600 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                        <span>Low</span>
                        <span className="font-medium text-teal-700 dark:text-teal-400">85% Accurate</span>
                        <span>High</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-teal-700 dark:text-teal-400">
                      Predictions improve with more tracked cycles
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Insights & Recommendations */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.4s" }}>
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
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 text-lg">Your Cycle Insights</h3>

                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-purple-100 dark:border-purple-700/50">
                  <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Cycle Patterns</h4>
                  <p className="text-purple-800 dark:text-purple-300 text-sm leading-relaxed">
                    Your cycles are very regular with an average length of {avgCycleLength} days. This regularity
                    suggests healthy hormonal balance. Your period typically lasts {avgPeriodLength} days, which is
                    within the normal range.
                  </p>
                </div>

                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-purple-100 dark:border-purple-700/50">
                  <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Symptom Insights</h4>
                  <p className="text-purple-800 dark:text-purple-300 text-sm leading-relaxed">
                    Your most consistent symptoms are cramps and fatigue, which typically appear 1-2 days before your
                    period starts. Consider tracking your water intake and exercise - our data suggests these may help
                    reduce your symptom severity.
                  </p>
                </div>

                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-purple-100 dark:border-purple-700/50">
                  <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Recommendations</h4>
                  <ul className="text-purple-800 dark:text-purple-300 text-sm leading-relaxed space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2">•</div>
                      <span>
                        Consider magnesium-rich foods 7-10 days before your period to potentially reduce cramps
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2">•</div>
                      <span>Your energy peaks mid-cycle - this is an ideal time for more intensive exercise</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2">•</div>
                      <span>
                        Track your sleep patterns - our data suggests a correlation with your mood fluctuations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}

function MetricCard({
  title,
  value,
  trend,
  trendDirection,
  icon,
  color,
}: {
  title: string
  value: string
  trend: string
  trendDirection: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: "rose" | "purple" | "teal" | "blue"
}) {
  const getBgColor = () => {
    switch (color) {
      case "rose":
        return "bg-rose-100 dark:bg-rose-900/30"
      case "purple":
        return "bg-purple-100 dark:bg-purple-900/30"
      case "teal":
        return "bg-teal-100 dark:bg-teal-900/30"
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30"
    }
  }

  const getBorderColor = () => {
    switch (color) {
      case "rose":
        return "border-rose-200 dark:border-rose-800/50"
      case "purple":
        return "border-purple-200 dark:border-purple-800/50"
      case "teal":
        return "border-teal-200 dark:border-teal-800/50"
      case "blue":
        return "border-blue-200 dark:border-blue-800/50"
    }
  }

  const getTextColor = () => {
    switch (color) {
      case "rose":
        return "text-rose-900 dark:text-rose-300"
      case "purple":
        return "text-purple-900 dark:text-purple-300"
      case "teal":
        return "text-teal-900 dark:text-teal-300"
      case "blue":
        return "text-blue-900 dark:text-blue-300"
    }
  }

  const getTrendColor = () => {
    if (trendDirection === "up") return "text-green-600 dark:text-green-400"
    if (trendDirection === "down") return "text-red-600 dark:text-red-400"
    return "text-gray-600 dark:text-gray-400"
  }

  return (
    <Card className={`p-3 ${getBgColor()} ${getBorderColor()} card-glass`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs text-gray-700 dark:text-gray-300">{title}</h3>
        {icon}
      </div>
      <p className={`text-lg font-semibold ${getTextColor()}`}>{value}</p>
      <p className={`text-xs ${getTrendColor()}`}>{trend}</p>
    </Card>
  )
}
