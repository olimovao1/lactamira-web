"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Coffee, Search, Utensils, Plus } from "lucide-react"

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState("mother")

  const motherNutrition = [
    {
      id: 1,
      category: "Iron-Rich Foods",
      description: "Essential for preventing anemia during breastfeeding",
      foods: [
        { name: "Spinach", benefits: "Rich in iron, folate, and vitamins" },
        { name: "Lentils", benefits: "High in protein and iron" },
        { name: "Red meat", benefits: "Excellent source of heme iron" },
        { name: "Fortified cereals", benefits: "Easy way to get additional iron" },
      ],
    },
    {
      id: 2,
      category: "Calcium-Rich Foods",
      description: "Important for your bone health and baby's development",
      foods: [
        { name: "Yogurt", benefits: "Contains calcium and probiotics" },
        { name: "Cheese", benefits: "High in calcium and protein" },
        { name: "Almonds", benefits: "Good plant source of calcium" },
        { name: "Fortified plant milk", benefits: "Alternative calcium source" },
      ],
    },
    {
      id: 3,
      category: "Protein-Rich Foods",
      description: "Helps with recovery and milk production",
      foods: [
        { name: "Chicken", benefits: "Lean protein source" },
        { name: "Fish", benefits: "Protein and omega-3 fatty acids" },
        { name: "Eggs", benefits: "Complete protein with choline" },
        { name: "Tofu", benefits: "Plant-based protein option" },
      ],
    },
  ]

  const babyNutrition = [
    {
      id: 1,
      category: "First Foods (6 months)",
      description: "Single-ingredient purees to introduce solids",
      foods: [
        { name: "Iron-fortified rice cereal", benefits: "Easy to digest, fortified with iron" },
        { name: "Pureed sweet potato", benefits: "Rich in vitamin A" },
        { name: "Pureed avocado", benefits: "Healthy fats for brain development" },
        { name: "Pureed banana", benefits: "Easy to digest, natural sweetness" },
      ],
    },
    {
      id: 2,
      category: "7-8 Months",
      description: "Thicker textures and combination foods",
      foods: [
        { name: "Yogurt", benefits: "Calcium and probiotics" },
        { name: "Soft cooked vegetables", benefits: "Introducing more textures" },
        { name: "Soft fruits", benefits: "Vitamin C and fiber" },
        { name: "Well-cooked grains", benefits: "Energy and nutrients" },
      ],
    },
    {
      id: 3,
      category: "9-12 Months",
      description: "Finger foods and more complex textures",
      foods: [
        { name: "Soft meat pieces", benefits: "Iron and protein" },
        { name: "Pasta", benefits: "Energy and practicing pincer grasp" },
        { name: "Cheese cubes", benefits: "Calcium and protein" },
        { name: "Soft fruit pieces", benefits: "Self-feeding practice" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-green-600" />
            </Link>
            <h1 className="text-xl font-bold text-green-800">Nutrition Guide</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Search Bar */}
        <section className="mb-6">
          <div className="relative">
            <input type="text" placeholder="Search for foods or nutrients..." className="input-field pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-6">
          <div className="flex rounded-xl overflow-hidden border border-green-200">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "mother" ? "bg-green-600 text-white" : "bg-white text-green-800"
              }`}
              onClick={() => setActiveTab("mother")}
            >
              For Mother
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "baby" ? "bg-green-600 text-white" : "bg-white text-green-800"
              }`}
              onClick={() => setActiveTab("baby")}
            >
              For Baby
            </button>
          </div>
        </section>

        {/* Nutrition Content */}
        <section>
          {activeTab === "mother" ? (
            <div className="space-y-6">
              <div className="card bg-green-50 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 mr-3">
                    <Coffee className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-800">Breastfeeding Nutrition</h2>
                    <p className="text-sm text-green-600">Recommended daily intake: 2300-2500 calories</p>
                  </div>
                </div>

                <p className="text-green-800 mb-4">
                  While breastfeeding, your body needs additional nutrients to support milk production and your own
                  recovery. Focus on nutrient-dense foods and stay well hydrated.
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Protein</p>
                    <p className="text-xs text-green-600">65g daily</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Calcium</p>
                    <p className="text-xs text-green-600">1000mg daily</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Iron</p>
                    <p className="text-xs text-green-600">9mg daily</p>
                  </div>
                </div>
              </div>

              {motherNutrition.map((category) => (
                <div key={category.id} className="card">
                  <h2 className="card-header text-green-800">
                    <div className="card-icon bg-green-100 text-green-600">
                      <Utensils className="w-5 h-5" />
                    </div>
                    {category.category}
                  </h2>

                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="space-y-3">
                    {category.foods.map((food, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-xl">
                        <p className="font-medium text-green-800">{food.name}</p>
                        <p className="text-sm text-green-600">{food.benefits}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="card bg-green-50 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 mr-3">
                    <Baby className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-800">Baby Nutrition</h2>
                    <p className="text-sm text-green-600">Age-appropriate food recommendations</p>
                  </div>
                </div>

                <p className="text-green-800 mb-4">
                  Introducing solid foods to your baby is an exciting milestone. Start with single-ingredient purees and
                  gradually introduce new foods and textures as your baby grows.
                </p>

                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Remember:</p>
                  <ul className="text-xs text-green-600 list-disc list-inside space-y-1 mt-1">
                    <li>Introduce one new food at a time (wait 3-5 days between new foods)</li>
                    <li>Watch for allergic reactions</li>
                    <li>Avoid honey until after 12 months</li>
                    <li>Avoid added salt and sugar</li>
                  </ul>
                </div>
              </div>

              {babyNutrition.map((category) => (
                <div key={category.id} className="card">
                  <h2 className="card-header text-green-800">
                    <div className="card-icon bg-green-100 text-green-600">
                      <Utensils className="w-5 h-5" />
                    </div>
                    {category.category}
                  </h2>

                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="space-y-3">
                    {category.foods.map((food, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-xl">
                        <p className="font-medium text-green-800">{food.name}</p>
                        <p className="text-sm text-green-600">{food.benefits}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 p-4 rounded-full bg-green-600 text-white shadow-lg md:hidden">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

function Baby({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.5.3 2 0" />
      <path d="M10 16c.5.3 1.5.3 2 0" />
      <path d="M16 5c-.7.6-1.7 1-3 1h-2c-1.3 0-2.3-.4-3-1" />
      <path d="M3 20a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1Z" />
      <path d="M12 7v.01" />
    </svg>
  )
}
