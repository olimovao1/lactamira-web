"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Baby,
  Calendar,
  Clock,
  Droplets,
  Home,
  Info,
  LineChart,
  Milk,
  Moon,
  Settings,
  Utensils,
  User,
  FileText,
} from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HomePage() {
  // Current time for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  // Dummy data
  const [breastfeedingSessions, setBreastfeedingSessions] = useState([
    { id: 1, time: "08:30 AM", duration: "25 min", side: "Left" },
    { id: 2, time: "12:15 PM", duration: "20 min", side: "Right" },
  ]);

  const babyData = {
    name: "Ali",
    age: "5 months",
    weight: "7.2 kg",
    height: "65 cm",
    weightPercentile: 75,
    heightPercentile: 68,
  };

  const hydrationData = {
    current: 1.5,
    goal: 2.5,
    percentage: 60,
  };

  const cycleData = {
    currentDay: 14,
    phase: "Ovulation",
    nextPeriod: "May 18",
    daysUntilNextPeriod: 8,
  };

  const reminders = [
    { id: 1, time: "3:00 PM", title: "Feeding time", description: "Left side" },
    {
      id: 2,
      time: "5:30 PM",
      title: "Iron supplement",
      description: "1 tablet with meal",
    },
    {
      id: 3,
      time: "8:00 PM",
      title: "Log baby's weight",
      description: "Weekly tracking",
    },
  ];

  const motivationalQuote = {
    text: "You're doing amazing! Every moment you spend nurturing your baby is building a foundation of love and security that will last a lifetime.",
    author: "Lactamira Team",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">Lactamira</h1>
            <p className="text-sm text-pink-500">
              Your maternal health companion
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors">
                <User className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">
                    <Info className="mr-2 h-4 w-4" />
                    About Lactamira
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="text-red-500">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a
              href="https://t.me/pediatr_achilova"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
              aria-label="Telegram pediatr maslahati"
            >
              <FaTelegram size={20} />
            </a>
            <button className="p-2 rounded-full bg-pink-100 text-pink-600">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 pb-24 md:pb-6">
        {/* Welcome Section */}
        <section className="mb-6 fade-in-up">
          <h2 className="text-2xl font-bold text-pink-800">
            {greeting}, Ozoda
          </h2>
          <p className="text-pink-600">
            Here's what's important today for you and your baby
          </p>
        </section>

        {/* Quick Stats */}
        <section
          className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <Link
            href="/breastfeeding"
            className="card p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="p-3 rounded-full bg-pink-100 mb-2">
              <Milk className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-pink-800">Breastfeeding</h3>
            <p className="text-sm text-gray-600 mt-1">2 sessions today</p>
          </Link>

          <Link
            href="/growth"
            className="card p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="p-3 rounded-full bg-blue-100 mb-2">
              <Baby className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-800">Baby Growth</h3>
            <p className="text-sm text-gray-600 mt-1">7.2kg · 65cm</p>
          </Link>

          <Link
            href="/period"
            className="card p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="p-3 rounded-full bg-purple-100 mb-2">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800">Cycle Tracker</h3>
            <p className="text-sm text-gray-600 mt-1">Day 14 · Ovulation</p>
          </Link>

          <Link
            href="/nutrition"
            className="card p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="p-3 rounded-full bg-green-100 mb-2">
              <Utensils className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-800">Nutrition</h3>
            <p className="text-sm text-gray-600 mt-1">Iron-rich foods</p>
          </Link>
        </section>

        {/* Breastfeeding Tracker */}
        <section className="mb-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Milk className="w-5 h-5" />
              </div>
              Breastfeeding Tracker
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Today's Sessions</h4>
                <Link
                  href="/breastfeeding"
                  className="text-sm text-pink-600 font-medium"
                >
                  View All
                </Link>
              </div>

              {breastfeedingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-between items-center p-3 bg-pink-50 rounded-xl"
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-pink-100 mr-3">
                      <Clock className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium">{session.time}</p>
                      <p className="text-sm text-gray-600">
                        {session.duration}
                      </p>
                    </div>
                  </div>
                  <div className="bg-pink-100 py-1 px-3 rounded-full text-sm font-medium text-pink-700">
                    {session.side} Side
                  </div>
                </div>
              ))}

              <button className="btn-primary w-full">Log New Session</button>
            </div>
          </div>
        </section>

        {/* Baby Growth */}
        <section className="mb-6 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <LineChart className="w-5 h-5" />
              </div>
              Baby Growth Tracker
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{babyData.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Age</p>
                  <p className="font-medium">{babyData.age}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Weight</p>
                  <div className="text-right">
                    <p className="font-medium">{babyData.weight}</p>
                    <p className="text-sm text-green-600">
                      {babyData.weightPercentile}th percentile
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Height</p>
                  <div className="text-right">
                    <p className="font-medium">{babyData.height}</p>
                    <p className="text-sm text-green-600">
                      {babyData.heightPercentile}th percentile
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <div className="w-full h-32 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <p className="text-blue-800 text-center">
                    Growth chart visualization
                    <br />
                    (75th percentile)
                  </p>
                </div>
                <Link
                  href="/growth"
                  className="btn-secondary w-full text-center"
                >
                  View Full Growth Chart
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hydration & Nutrition */}
        <section
          className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Hydration Tracker */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Droplets className="w-5 h-5" />
              </div>
              Hydration Tracker
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-600">Today's intake</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {hydrationData.current}L
                  </p>
                </div>
                <p className="text-gray-600">Goal: {hydrationData.goal}L</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${hydrationData.percentage}%` }}
                ></div>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  {hydrationData.percentage}% of daily goal
                </p>
                <button className="text-blue-600 font-medium text-sm">
                  + Add Water
                </button>
              </div>
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className="card bg-gradient-to-br from-green-50 to-green-100">
            <div className="card-header text-green-800">
              <div className="card-icon bg-green-200 text-green-700">
                <Utensils className="w-5 h-5" />
              </div>
              Nutrition Tip
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-green-800">
                Iron-Rich Foods for Breastfeeding
              </h4>
              <p className="text-green-800">
                Include these iron-rich foods in your diet today to support your
                milk production and baby's development:
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-1">
                <li>Spinach and leafy greens</li>
                <li>Lentils and beans</li>
                <li>Lean red meat</li>
                <li>Fortified cereals</li>
              </ul>
              <Link
                href="/nutrition"
                className="inline-block text-green-700 font-medium"
              >
                View Nutrition Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Cycle Tracker */}
        <section className="mb-6 fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Moon className="w-5 h-5" />
              </div>
              Cycle Tracker
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Current Cycle Day</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold text-purple-600">
                      Day {cycleData.currentDay}
                    </p>
                    <p className="ml-2 text-purple-600 font-medium">
                      {cycleData.phase}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Next Period</p>
                  <p className="font-medium">{cycleData.nextPeriod}</p>
                  <p className="text-sm text-gray-500">
                    in {cycleData.daysUntilNextPeriod} days
                  </p>
                </div>
              </div>

              <div className="w-full h-16 bg-purple-50 rounded-xl flex items-center justify-around p-2">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full w-1.5 rounded-full ${
                      i + 1 === cycleData.currentDay
                        ? "bg-purple-600"
                        : i + 1 <= cycleData.currentDay
                        ? "bg-purple-300"
                        : "bg-purple-100"
                    }`}
                  ></div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Period</span>
                <span>Fertile Window</span>
                <span>Luteal Phase</span>
              </div>

              <Link href="/period" className="btn-secondary w-full text-center">
                View Cycle Details
              </Link>
            </div>
          </div>
        </section>

        {/* Reminders */}
        <section className="mb-6 fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <Clock className="w-5 h-5" />
              </div>
              Today's Reminders
            </div>

            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center p-3 bg-amber-50 rounded-xl"
                >
                  <div className="p-2 rounded-full bg-amber-100 mr-3">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-amber-600 font-medium">
                        {reminder.time}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {reminder.description}
                    </p>
                  </div>
                </div>
              ))}

              <button className="btn-secondary w-full">Add New Reminder</button>
            </div>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="mb-6 fade-in-up" style={{ animationDelay: "0.7s" }}>
          <div className="card bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-pink-800">
                Daily Motivation
              </h3>
              <p className="text-gray-700 italic">"{motivationalQuote.text}"</p>
              <p className="text-sm text-gray-600">
                — {motivationalQuote.author}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
        <div className="flex justify-around items-center p-2">
          <NavButton icon={<Home />} label="Home" active />
          <NavButton icon={<Milk />} label="Feeding" />
          <NavButton
            icon={<FaTelegram size={24} />}
            label="Telegram"
            href="https://t.me/pediatr_achilova"
            external
          />
          <NavButton icon={<Calendar />} label="Cycle" />
          <NavButton icon={<Info />} label="About" href="/about" />
        </div>
      </nav>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active = false,
  href = "#",
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div
        className={`p-1.5 rounded-full ${
          active ? "bg-pink-100 text-pink-600" : "text-gray-500"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs mt-1 ${
          active ? "text-pink-600 font-medium" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center p-2"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="flex flex-col items-center p-2">
      {content}
    </Link>
  );
}
