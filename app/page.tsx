import { Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {/* Greeting Section */}
        <section className="pt-8 pb-4 fade-in-up">
          <h1 className="text-2xl font-semibold text-pink-900 dark:text-pink-300">Good evening, Ozoda 👋</h1>
          <p className="text-sm text-pink-700 dark:text-pink-400 mt-1">
            Here's what's important today for you and your baby
          </p>
        </section>

        {/* Daily Affirmation Card */}
        <section className="py-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Card className="p-4 bg-gradient-to-br from-sunshine-100 to-sunshine-50 dark:from-amber-900/40 dark:to-amber-800/30 border-amber-200 dark:border-amber-700/50 relative overflow-hidden card-glass">
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <Sparkles className="w-full h-full text-amber-600" />
            </div>
            <div className="flex items-center">
              <div className="mr-3 bg-amber-200 dark:bg-amber-700 p-2 rounded-full">
                <Sparkles className="h-4 w-4 text-amber-700 dark:text-amber-200" />
              </div>
              <div>
                <h3 className="font-medium text-amber-900 dark:text-amber-200 text-sm">Today's Tip</h3>
                <p className="text-amber-800 dark:text-amber-300 font-medium mt-1">
                  Did you know breastfed babies need extra vitamin D supplements?
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Main Feature Cards */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-medium text-pink-900 dark:text-pink-300 mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/breastfeeding" className="block focus-ring rounded-xl">
              <FeatureCard
                icon="🍼"
                title="Breastfeeding"
                description="2 sessions · 35 mins"
                bgColor="bg-blush-100 dark:bg-pink-900/40"
                borderColor="border-pink-200 dark:border-pink-700/50"
              />
            </Link>
            <Link href="/growth" className="block focus-ring rounded-xl">
              <FeatureCard
                icon="📈"
                title="Baby Growth"
                description="7.2kg · 65cm (75th %)"
                bgColor="bg-blue-100 dark:bg-blue-900/40"
                borderColor="border-blue-200 dark:border-blue-700/50"
              />
            </Link>
            <Link href="/nutrition" className="block focus-ring rounded-xl">
              <FeatureCard
                icon="🍽️"
                title="Nutrition Guide"
                description="Iron-rich foods today"
                bgColor="bg-green-100 dark:bg-green-900/40"
                borderColor="border-green-200 dark:border-green-700/50"
              />
            </Link>
            <Link href="/period" className="block focus-ring rounded-xl">
              <FeatureCard
                icon="📅"
                title="Cycle Calendar"
                description="Day 14 · Ovulation"
                bgColor="bg-lavender-100 dark:bg-purple-900/40"
                borderColor="border-purple-200 dark:border-purple-700/50"
              />
            </Link>
            <FeatureCard
              icon="💬"
              title="Community"
              description="3 new posts today"
              bgColor="bg-teal-100 dark:bg-teal-900/40"
              borderColor="border-teal-200 dark:border-teal-700/50"
            />
            <FeatureCard
              icon="🛎️"
              title="Reminders"
              description="Feed in 30 min"
              bgColor="bg-amber-100 dark:bg-amber-900/40"
              borderColor="border-amber-200 dark:border-amber-700/50"
            />
          </div>
        </section>

        {/* Daily Stats Overview */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-lg font-medium text-pink-900 dark:text-pink-300 mb-3">Today's Overview</h2>
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-1 px-1 snap-x">
            <Card className="flex-shrink-0 w-[260px] p-4 bg-blush-100 dark:bg-pink-900/40 border-pink-200 dark:border-pink-700/50 snap-start card-glass">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-pink-900 dark:text-pink-300">🍼 Breastfeeding</h3>
                  <p className="text-lg font-semibold mt-2 text-pink-800 dark:text-pink-200">2 sessions logged</p>
                  <p className="text-sm text-pink-700 dark:text-pink-400">Total: 35 minutes</p>
                </div>
              </div>
            </Card>

            <Card className="flex-shrink-0 w-[260px] p-4 bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700/50 snap-start card-glass">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-300">😴 Baby Sleep</h3>
                  <p className="text-lg font-semibold mt-2 text-blue-800 dark:text-blue-200">4h 30m total</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">Last nap: 2h ago</p>
                </div>
              </div>
            </Card>

            <Card className="flex-shrink-0 w-[260px] p-4 bg-teal-100 dark:bg-teal-900/40 border-teal-200 dark:border-teal-700/50 snap-start card-glass">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-teal-900 dark:text-teal-300">💧 Your Hydration</h3>
                  <p className="text-lg font-semibold mt-2 text-teal-800 dark:text-teal-200">1.5L of 2L goal</p>
                  <p className="text-sm text-teal-700 dark:text-teal-400">75% completed</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Daily Motivation */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Card className="p-5 bg-gradient-to-br from-lavender-100 to-blush-50 dark:from-purple-900/40 dark:to-pink-900/30 border-lavender-200 dark:border-purple-700/50 overflow-hidden relative card-glass">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-purple-600"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9H9.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 9H15.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-purple-100 dark:bg-purple-700 p-2 rounded-full">
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
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 text-lg">Daily Motivation</h3>
                <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-purple-100 dark:border-purple-700/50">
                  <p className="text-purple-800 dark:text-purple-300 leading-relaxed">
                    You're doing amazing, Ozoda! Every moment you spend nurturing your baby is building a foundation of
                    love and security that will last a lifetime. Remember to nurture yourself too.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button className="btn-glow dark:bg-purple-800 dark:hover:bg-purple-700 dark:text-purple-200 focus-ring">
                    View more tips
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/50 focus-ring"
                  >
                    Save for later
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Community Preview */}
        <section className="py-4 fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-pink-900 dark:text-pink-300">Community Highlights</h2>
            <button className="text-sm text-pink-600 dark:text-pink-400 font-medium focus-ring rounded-lg px-2 py-1">
              See All
            </button>
          </div>
          <Card className="p-4 bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 card-glass">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-300 font-medium">
                SM
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Sarah M.</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2h ago</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Has anyone tried the new organic baby food brand? Looking for recommendations!
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-4">💬 12 replies</span>
                  <span>❤️ 8 likes</span>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  bgColor,
  borderColor,
}: {
  icon: string
  title: string
  description: string
  bgColor: string
  borderColor: string
}) {
  return (
    <Card
      className={`p-4 ${bgColor} ${borderColor} hover:shadow-md transition-shadow flex flex-col h-[100px] justify-between card-glass`}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{description}</p>
      </div>
    </Card>
  )
}
