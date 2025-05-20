"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Baby, Calendar, LineChart, Plus, Ruler } from "lucide-react"

export default function GrowthPage() {
  const [measurements, setMeasurements] = useState([
    { id: 1, date: "May 10, 2023", weight: "7.2 kg", height: "65 cm", weightPercentile: 75, heightPercentile: 68 },
    { id: 2, date: "April 10, 2023", weight: "6.8 kg", height: "63 cm", weightPercentile: 72, heightPercentile: 65 },
    { id: 3, date: "March 10, 2023", weight: "6.3 kg", height: "61 cm", weightPercentile: 70, heightPercentile: 63 },
    { id: 4, date: "February 10, 2023", weight: "5.7 kg", height: "58 cm", weightPercentile: 68, heightPercentile: 60 },
    { id: 5, date: "January 10, 2023", weight: "5.1 kg", height: "55 cm", weightPercentile: 65, heightPercentile: 58 },
  ])

  const babyData = {
    name: "Ali",
    birthdate: "December 10, 2022",
    age: "5 months",
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-blue-600" />
            </Link>
            <h1 className="text-xl font-bold text-blue-800">Baby Growth Tracker</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Baby Info */}
        <section className="mb-6">
          <div className="card bg-blue-50 border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 mr-3">
                <Baby className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-800">{babyData.name}</h2>
                <div className="flex items-center text-sm text-blue-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Born: {babyData.birthdate}</span>
                </div>
              </div>
            </div>

            <p className="text-blue-800 font-medium">Current Age: {babyData.age}</p>
          </div>
        </section>

        {/* Latest Measurements */}
        <section className="mb-6">
          <div className="card">
            <h2 className="card-header text-blue-800">
              <div className="card-icon bg-blue-100 text-blue-600">
                <Ruler className="w-5 h-5" />
              </div>
              Latest Measurements
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-blue-800 font-medium">Weight</p>
                  <div className="bg-blue-100 py-0.5 px-2 rounded-full text-xs text-blue-700">
                    {measurements[0].weightPercentile}th percentile
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-800">{measurements[0].weight}</p>
                <p className="text-xs text-blue-600 mt-1">Measured on {measurements[0].date}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-blue-800 font-medium">Height</p>
                  <div className="bg-blue-100 py-0.5 px-2 rounded-full text-xs text-blue-700">
                    {measurements[0].heightPercentile}th percentile
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-800">{measurements[0].height}</p>
                <p className="text-xs text-blue-600 mt-1">Measured on {measurements[0].date}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Charts */}
        <section className="mb-6">
          <div className="card">
            <h2 className="card-header text-blue-800">
              <div className="card-icon bg-blue-100 text-blue-600">
                <LineChart className="w-5 h-5" />
              </div>
              Growth Charts
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-medium text-blue-800 mb-2">Weight-for-age</h3>
                <div className="w-full h-40 bg-white rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Weight chart visualization</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-medium text-blue-800 mb-2">Length-for-age</h3>
                <div className="w-full h-40 bg-white rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Height chart visualization</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add New Measurement Button */}
        <section className="mb-6">
          <button className="btn-primary w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Add New Measurement
          </button>
        </section>

        {/* Measurement History */}
        <section>
          <h2 className="text-lg font-semibold text-blue-800 mb-4">Measurement History</h2>

          <div className="card space-y-4">
            {measurements.map((measurement) => (
              <div key={measurement.id} className="p-3 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-blue-800">{measurement.date}</p>
                  <button className="text-xs text-blue-600">Edit</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <div className="flex items-center">
                      <p className="font-medium">{measurement.weight}</p>
                      <span className="ml-2 text-xs bg-blue-100 py-0.5 px-2 rounded-full text-blue-700">
                        {measurement.weightPercentile}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <div className="flex items-center">
                      <p className="font-medium">{measurement.height}</p>
                      <span className="ml-2 text-xs bg-blue-100 py-0.5 px-2 rounded-full text-blue-700">
                        {measurement.heightPercentile}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg md:hidden">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
