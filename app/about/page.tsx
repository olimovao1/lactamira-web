"use client"

import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-pink-600" />
            </Link>
            <h1 className="text-xl font-bold text-pink-800">About Lactamira</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-6">
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Info className="w-5 h-5" />
              </div>
              Original Design Prompt
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Design a maternal health tracking app interface called "Lactamira". The layout should be mobile-first
                and fully responsive for large screens (e.g. tablets, desktops). Use a clean, modern UI with soft
                shadows, rounded corners (2xl), and adequate spacing (p-4 or greater).
              </p>

              <h3 className="font-semibold text-pink-800">Key sections to include:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Personalized welcome header with the user's name (e.g., "Good evening, Ozoda")</li>
                <li>
                  Baby health tracking cards:
                  <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
                    <li>Breastfeeding sessions (track time and side)</li>
                    <li>Baby weight & height tracker (with percentile indicators)</li>
                    <li>Daily hydration tracker for moms</li>
                    <li>Iron-rich nutrition suggestion for breastfeeding moms</li>
                  </ul>
                </li>
                <li>Menstrual cycle tracker with ovulation calendar</li>
                <li>Reminders section for feeding, supplements, check-ups</li>
                <li>Motivational quote/message of the day</li>
              </ul>

              <h3 className="font-semibold text-pink-800">Design requirements:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Be mobile-first, but adapt gracefully to large screens</li>
                <li>Use Tailwind-style utility class structure</li>
                <li>Use cards with soft shadows and white backgrounds</li>
                <li>Support light mode only</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="card bg-pink-50 border border-pink-100">
            <h2 className="text-lg font-semibold text-pink-800 mb-4">Implementation Notes</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Lactamira was designed and implemented following the above requirements. The app features a clean,
                modern interface with a focus on maternal and baby health tracking.
              </p>
              <p>
                The implementation includes all the requested sections: personalized welcome header, baby health
                tracking cards, cycle tracker, reminders, and daily motivation. The design is mobile-first with
                responsive layouts for larger screens.
              </p>
              <p>
                The UI uses soft shadows, rounded corners (2xl), and adequate spacing (p-4 or greater) throughout. Cards
                have white backgrounds with soft shadows, and the color scheme is light and pastel-focused.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="card">
            <h2 className="text-lg font-semibold text-pink-800 mb-4">App Features</h2>
            <div className="space-y-4">
              <div className="p-3 bg-pink-50 rounded-xl">
                <h3 className="font-medium text-pink-800">Home Dashboard</h3>
                <p className="text-gray-700">Personalized welcome, daily overview, and quick access to key features</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl">
                <h3 className="font-medium text-blue-800">Baby Growth Tracking</h3>
                <p className="text-gray-700">
                  Monitor weight, height, and developmental milestones with percentile indicators
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl">
                <h3 className="font-medium text-purple-800">Cycle Tracking</h3>
                <p className="text-gray-700">Track menstrual cycles with ovulation prediction and fertility windows</p>
              </div>

              <div className="p-3 bg-green-50 rounded-xl">
                <h3 className="font-medium text-green-800">Nutrition Guide</h3>
                <p className="text-gray-700">Personalized nutrition recommendations for mother and baby</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl">
                <h3 className="font-medium text-amber-800">Breastfeeding Tracker</h3>
                <p className="text-gray-700">Log feeding sessions with duration, side, and pattern analysis</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
