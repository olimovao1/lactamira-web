"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  Plus,
  Calendar,
  Clock,
  Heart,
  Apple,
  Utensils,
  Filter,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronRight,
  BarChart3,
  Droplets,
  Star,
  Bookmark,
  Share2,
  Camera,
  Home,
  User,
  Bell,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NutritionGuidePage() {
  const [activeTab, setActiveTab] = useState("baby")
  const [babyAge, setBabyAge] = useState("6")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddFood, setShowAddFood] = useState(false)
  const [showAddMeal, setShowAddMeal] = useState(false)
  const [waterProgress, setWaterProgress] = useState(60)
  const [selectedDay, setSelectedDay] = useState("today")
  const [showRecipeDetail, setShowRecipeDetail] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  // Update water progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaterProgress(60)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Sample baby data
  const babyData = {
    name: "Sophia",
    age: "6 months",
    allergies: ["None identified"],
    recentFoods: ["Rice cereal", "Sweet potato", "Banana", "Avocado"],
    nextFoods: ["Peas", "Carrots", "Yogurt"],
  }

  // Sample mother data
  const motherData = {
    name: "Ozoda",
    breastfeeding: true,
    dietaryPreferences: ["Balanced diet"],
    nutritionalNeeds: ["Iron", "Calcium", "Vitamin D", "Omega-3"],
    dailyWaterGoal: 3000, // ml
    currentWaterIntake: 1800, // ml
  }

  // Sample food introduction data for babies
  const foodIntroductionData = [
    {
      age: "4-6 months",
      foods: [
        { name: "Rice cereal", introduced: true, date: "Apr 15, 2025", reaction: "None" },
        { name: "Oatmeal", introduced: true, date: "Apr 20, 2025", reaction: "None" },
        { name: "Pureed sweet potato", introduced: true, date: "Apr 25, 2025", reaction: "Enjoyed it" },
        { name: "Pureed banana", introduced: true, date: "May 1, 2025", reaction: "Loved it" },
        { name: "Pureed avocado", introduced: true, date: "May 5, 2025", reaction: "Neutral" },
        { name: "Pureed apple", introduced: false },
      ],
    },
    {
      age: "6-8 months",
      foods: [
        { name: "Pureed peas", introduced: false },
        { name: "Pureed carrots", introduced: false },
        { name: "Pureed pears", introduced: false },
        { name: "Pureed peaches", introduced: false },
        { name: "Plain yogurt", introduced: false },
        { name: "Soft tofu", introduced: false },
      ],
    },
    {
      age: "8-10 months",
      foods: [
        { name: "Soft pasta", introduced: false },
        { name: "Soft chicken", introduced: false },
        { name: "Egg yolk", introduced: false },
        { name: "Soft cheese", introduced: false },
        { name: "Beans", introduced: false },
        { name: "Ground meat", introduced: false },
      ],
    },
    {
      age: "10-12 months",
      foods: [
        { name: "Whole milk", introduced: false },
        { name: "Whole egg", introduced: false },
        { name: "Fish", introduced: false },
        { name: "Berries", introduced: false },
        { name: "Citrus fruits", introduced: false },
      ],
    },
  ]

  // Sample meal plans for mother
  const motherMealPlans = [
    {
      day: "Today",
      meals: [
        {
          type: "Breakfast",
          food: "Oatmeal with berries and nuts",
          nutrients: ["Fiber", "Antioxidants", "Healthy fats"],
          time: "8:00 AM",
          completed: true,
        },
        {
          type: "Snack",
          food: "Greek yogurt with honey",
          nutrients: ["Protein", "Calcium", "Probiotics"],
          time: "10:30 AM",
          completed: true,
        },
        {
          type: "Lunch",
          food: "Salmon salad with quinoa",
          nutrients: ["Omega-3", "Protein", "Complex carbs"],
          time: "1:00 PM",
          completed: true,
        },
        {
          type: "Snack",
          food: "Apple with almond butter",
          nutrients: ["Fiber", "Healthy fats"],
          time: "3:30 PM",
          completed: false,
        },
        {
          type: "Dinner",
          food: "Chicken stir-fry with vegetables",
          nutrients: ["Protein", "Iron", "Vitamins"],
          time: "7:00 PM",
          completed: false,
        },
      ],
    },
    {
      day: "Tomorrow",
      meals: [
        {
          type: "Breakfast",
          food: "Spinach and cheese omelet with whole grain toast",
          nutrients: ["Protein", "Iron", "Calcium"],
          time: "8:00 AM",
          completed: false,
        },
        {
          type: "Snack",
          food: "Banana with peanut butter",
          nutrients: ["Potassium", "Protein"],
          time: "10:30 AM",
          completed: false,
        },
        {
          type: "Lunch",
          food: "Lentil soup with whole grain bread",
          nutrients: ["Protein", "Iron", "Fiber"],
          time: "1:00 PM",
          completed: false,
        },
        {
          type: "Snack",
          food: "Hummus with carrot sticks",
          nutrients: ["Protein", "Fiber", "Vitamin A"],
          time: "3:30 PM",
          completed: false,
        },
        {
          type: "Dinner",
          food: "Baked fish with sweet potato and broccoli",
          nutrients: ["Omega-3", "Vitamin A", "Vitamin C"],
          time: "7:00 PM",
          completed: false,
        },
      ],
    },
  ]

  // Sample meal plans for baby
  const babyMealPlans = [
    {
      day: "Today",
      meals: [
        {
          type: "Breakfast",
          food: "Iron-fortified rice cereal mixed with breast milk",
          nutrients: ["Iron", "Carbohydrates"],
          time: "8:00 AM",
          completed: true,
        },
        {
          type: "Lunch",
          food: "Pureed sweet potato",
          nutrients: ["Vitamin A", "Fiber"],
          time: "12:00 PM",
          completed: true,
        },
        {
          type: "Snack",
          food: "Mashed banana",
          nutrients: ["Potassium", "Vitamin B6"],
          time: "3:00 PM",
          completed: false,
        },
        {
          type: "Dinner",
          food: "Pureed avocado",
          nutrients: ["Healthy fats", "Vitamin E"],
          time: "6:00 PM",
          completed: false,
        },
      ],
    },
    {
      day: "Tomorrow",
      meals: [
        {
          type: "Breakfast",
          food: "Oatmeal cereal mixed with breast milk",
          nutrients: ["Iron", "Fiber"],
          time: "8:00 AM",
          completed: false,
        },
        {
          type: "Lunch",
          food: "Pureed peas",
          nutrients: ["Protein", "Vitamin K"],
          time: "12:00 PM",
          completed: false,
        },
        {
          type: "Snack",
          food: "Applesauce",
          nutrients: ["Vitamin C", "Fiber"],
          time: "3:00 PM",
          completed: false,
        },
        {
          type: "Dinner",
          food: "Pureed carrots",
          nutrients: ["Vitamin A", "Fiber"],
          time: "6:00 PM",
          completed: false,
        },
      ],
    },
  ]

  // Sample recipes
  const recipes = [
    {
      id: 1,
      title: "Homemade Sweet Potato Puree",
      ingredients: ["1 large sweet potato", "Water or breast milk for thinning"],
      instructions: [
        "Wash, peel, and dice sweet potato",
        "Steam until tender (about 15 minutes)",
        "Blend until smooth",
        "Add liquid to achieve desired consistency",
      ],
      nutrients: ["Vitamin A", "Fiber", "Potassium"],
      prepTime: "5 minutes",
      cookTime: "15 minutes",
      forBaby: true,
      forMother: true,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 24,
      difficulty: "Easy",
      description:
        "A simple, nutritious puree that's perfect for babies starting solids. Sweet potatoes are packed with vitamin A and fiber, making them an excellent first food.",
    },
    {
      id: 2,
      title: "Banana Avocado Mash",
      ingredients: ["1/2 ripe banana", "1/4 ripe avocado"],
      instructions: ["Mash banana and avocado together", "Mix until smooth or leave slightly chunky for older babies"],
      nutrients: ["Healthy fats", "Potassium", "Vitamin B6"],
      prepTime: "5 minutes",
      cookTime: "0 minutes",
      forBaby: true,
      forMother: false,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 32,
      difficulty: "Easy",
      description:
        "A no-cook, nutrient-dense blend that combines the creaminess of avocado with the natural sweetness of banana. Perfect for babies 6+ months.",
    },
    {
      id: 3,
      title: "Salmon Quinoa Bowl",
      ingredients: [
        "4 oz salmon fillet",
        "1/2 cup quinoa",
        "1 cup mixed vegetables",
        "Olive oil",
        "Lemon juice",
        "Salt and pepper",
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Season salmon with salt and pepper",
        "Grill or bake salmon until cooked through",
        "Sauté vegetables in olive oil",
        "Combine all ingredients in a bowl",
        "Drizzle with lemon juice and olive oil",
      ],
      nutrients: ["Omega-3 fatty acids", "Protein", "Complex carbohydrates", "Fiber"],
      prepTime: "10 minutes",
      cookTime: "20 minutes",
      forBaby: false,
      forMother: true,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 18,
      difficulty: "Medium",
      description:
        "A nutrient-packed bowl that's perfect for breastfeeding mothers. Rich in omega-3 fatty acids from salmon and complex carbs from quinoa to support milk production.",
    },
    {
      id: 4,
      title: "Lactation Energy Bites",
      ingredients: [
        "1 cup rolled oats",
        "1/2 cup peanut butter",
        "1/3 cup honey",
        "2 tbsp flaxseed",
        "2 tbsp brewer's yeast",
        "1/2 cup dark chocolate chips",
      ],
      instructions: [
        "Mix all ingredients in a large bowl",
        "Chill in refrigerator for 30 minutes",
        "Roll into 1-inch balls",
        "Store in airtight container in refrigerator",
      ],
      nutrients: ["Protein", "Healthy fats", "Iron", "B vitamins"],
      prepTime: "10 minutes",
      cookTime: "0 minutes",
      forBaby: false,
      forMother: true,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 42,
      difficulty: "Easy",
      description:
        "These no-bake energy bites contain ingredients known to support milk production. They're perfect for a quick snack when you need an energy boost.",
    },
  ]

  // Sample nutritional recommendations
  const nutritionalRecommendations = {
    baby: [
      "Continue breastfeeding or formula as the main source of nutrition",
      "Introduce one new food at a time and wait 3-5 days before introducing another",
      "Look for signs of readiness: sitting up with support, showing interest in food, diminished tongue thrust reflex",
      "Start with iron-rich foods like fortified cereals",
      "Avoid honey until after 12 months due to risk of botulism",
      "Avoid cow's milk as a drink until 12 months",
      "Avoid added salt and sugar in baby foods",
    ],
    mother: [
      "Consume an extra 330-400 calories per day while breastfeeding",
      "Stay hydrated by drinking water throughout the day",
      "Include protein-rich foods at every meal",
      "Consume calcium-rich foods or supplements (1000 mg daily)",
      "Continue taking prenatal vitamins while breastfeeding",
      "Include omega-3 fatty acids through fish or supplements",
      "Limit caffeine to 300mg per day (about 2-3 cups of coffee)",
    ],
  }

  // Sample nutrient tracking data for mother
  const motherNutrientTracking = {
    calories: { current: 1850, target: 2300, unit: "kcal" },
    protein: { current: 65, target: 75, unit: "g" },
    calcium: { current: 800, target: 1000, unit: "mg" },
    iron: { current: 18, target: 27, unit: "mg" },
    omega3: { current: 250, target: 500, unit: "mg" },
    water: { current: 1800, target: 3000, unit: "ml" },
  }

  // Filter foods based on search query
  const filterFoods = (foods) => {
    if (!searchQuery) return foods
    return foods.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Get appropriate food introduction data based on baby's age
  const getFoodIntroductionData = () => {
    const ageNum = Number.parseInt(babyAge)
    if (ageNum < 6) return foodIntroductionData[0]
    if (ageNum < 8) return foodIntroductionData[1]
    if (ageNum < 10) return foodIntroductionData[2]
    return foodIntroductionData[3]
  }

  // Get meal plan based on selected day
  const getMealPlan = (plans, day) => {
    return plans.find((plan) => plan.day.toLowerCase() === day.toLowerCase()) || plans[0]
  }

  // Calculate completion percentage for meal plan
  const calculateMealCompletion = (meals) => {
    const completed = meals.filter((meal) => meal.completed).length
    return Math.round((completed / meals.length) * 100)
  }

  // Handle recipe click
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
    setShowRecipeDetail(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-teal-50 dark:from-gray-900 dark:to-teal-900/30">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-green-100 dark:border-green-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5 text-green-900 dark:text-green-400" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-green-900 dark:text-green-300">Nutrition Guide</h1>
            <p className="text-xs text-green-700 dark:text-green-400">Healthy eating for you and your baby</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
          >
            <Filter className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-400">Filter</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {/* Search Bar */}
        <section className="py-4 fade-in-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search foods, recipes, or nutrients..."
              className="pl-10 bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Tabs */}
        <section className="py-2 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Tabs defaultValue="baby" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="baby">Baby Nutrition</TabsTrigger>
              <TabsTrigger value="mother">Mother Nutrition</TabsTrigger>
            </TabsList>

            {/* Baby Nutrition Tab */}
            <TabsContent value="baby">
              {/* Baby Info Card */}
              <Card className="p-5 bg-gradient-to-r from-green-100 to-teal-50 dark:from-green-900/30 dark:to-teal-900/20 border-green-200 dark:border-green-800/50 card-glass relative overflow-hidden mb-4">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className="text-6xl">🍎</div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-green-900 dark:text-green-300">
                      {babyData.name}'s Nutrition
                    </h2>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Age: {babyData.age} • Allergies: {babyData.allergies.join(", ")}
                    </p>
                  </div>

                  <Select value={babyAge} onValueChange={setBabyAge}>
                    <SelectTrigger className="w-[110px] bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Baby's Age</SelectLabel>
                        <SelectItem value="4">4 months</SelectItem>
                        <SelectItem value="5">5 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="7">7 months</SelectItem>
                        <SelectItem value="8">8 months</SelectItem>
                        <SelectItem value="9">9 months</SelectItem>
                        <SelectItem value="10">10 months</SelectItem>
                        <SelectItem value="11">11 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Recently Introduced</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {babyData.recentFoods.map((food, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        >
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Next Foods to Try</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {babyData.nextFoods.map((food, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
                        >
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar for food introduction */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Food introduction progress</p>
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">5/30 foods</p>
                  </div>
                  <Progress value={17} className="h-2 bg-gray-200 dark:bg-gray-700" />
                </div>
              </Card>

              {/* Day Selector for Meal Plan */}
              <div className="flex overflow-x-auto gap-2 pb-2 mb-4 -mx-1 px-1 snap-x hide-scrollbar">
                {["Today", "Tomorrow", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <button
                    key={day}
                    className={`flex-shrink-0 px-4 py-2 rounded-full snap-start focus-ring ${
                      selectedDay.toLowerCase() === day.toLowerCase()
                        ? "bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800/50 text-green-900 dark:text-green-300"
                        : "bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setSelectedDay(day.toLowerCase())}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Baby Meal Planning */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {selectedDay === "today" ? "Today's" : "Upcoming"} Meals
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {calculateMealCompletion(getMealPlan(babyMealPlans, selectedDay).meals)}% completed
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
                  >
                    <Calendar className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-400">View All</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {getMealPlan(babyMealPlans, selectedDay).meals.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className={`p-3 rounded-lg border ${
                        meal.completed
                          ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30"
                          : "bg-gray-50 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700/50"
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-full mr-3 ${
                            meal.completed ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-700/50"
                          }`}
                        >
                          {meal.type === "Breakfast" && (
                            <Clock
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                          {meal.type === "Lunch" && (
                            <Utensils
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                          {meal.type === "Snack" && (
                            <Apple
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                          {meal.type === "Dinner" && (
                            <Utensils
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p
                                className={`font-medium ${
                                  meal.completed
                                    ? "text-green-900 dark:text-green-300"
                                    : "text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                {meal.type}
                                {meal.completed && (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 inline ml-1" />
                                )}
                              </p>
                              <p
                                className={`text-sm ${
                                  meal.completed
                                    ? "text-green-700 dark:text-green-400"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {meal.food}
                              </p>
                            </div>
                            <span
                              className={`text-xs ${
                                meal.completed
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {meal.time}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {meal.nutrients.map((nutrient, nutrientIndex) => (
                              <Badge
                                key={nutrientIndex}
                                variant="outline"
                                className={`text-xs ${
                                  meal.completed
                                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {nutrient}
                              </Badge>
                            ))}
                          </div>
                          {!meal.completed && selectedDay === "today" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-7 text-xs text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                            >
                              Mark as completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Food Introduction Tracker */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Food Introduction Tracker</h3>
                  <Dialog open={showAddFood} onOpenChange={setShowAddFood}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
                      >
                        <Plus className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                        <span className="text-green-700 dark:text-green-400">Add Food</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Food</DialogTitle>
                        <DialogDescription>Record a new food you've introduced to your baby.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="food-date">Date</Label>
                            <Input id="food-date" type="date" defaultValue="2025-05-13" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="food-age">Baby's Age</Label>
                            <Select defaultValue="6">
                              <SelectTrigger id="food-age">
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
                        <div className="space-y-2">
                          <Label htmlFor="food-name">Food Name</Label>
                          <Input id="food-name" placeholder="e.g., Sweet Potato" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="food-preparation">Preparation Method</Label>
                          <Select defaultValue="puree">
                            <SelectTrigger id="food-preparation">
                              <SelectValue placeholder="Select preparation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="puree">Puree</SelectItem>
                              <SelectItem value="mashed">Mashed</SelectItem>
                              <SelectItem value="soft-cooked">Soft Cooked</SelectItem>
                              <SelectItem value="finger-food">Finger Food</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Baby's Reaction</Label>
                          <RadioGroup defaultValue="none">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="loved" id="reaction-loved" />
                              <Label htmlFor="reaction-loved">Loved it</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="liked" id="reaction-liked" />
                              <Label htmlFor="reaction-liked">Liked it</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="neutral" id="reaction-neutral" />
                              <Label htmlFor="reaction-neutral">Neutral</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="disliked" id="reaction-disliked" />
                              <Label htmlFor="reaction-disliked">Disliked it</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="food-notes">Notes</Label>
                          <Input id="food-notes" placeholder="Any observations..." />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="food-reaction" />
                          <Label htmlFor="food-reaction">Had adverse reaction</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddFood(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddFood(false)}>Save Food</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {foodIntroductionData.map((ageGroup, index) => (
                      <AccordionItem key={index} value={`age-${index}`}>
                        <AccordionTrigger className="text-green-900 dark:text-green-300 hover:text-green-700 dark:hover:text-green-400">
                          {ageGroup.age} Foods
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {filterFoods(ageGroup.foods).map((food, foodIndex) => (
                              <div
                                key={foodIndex}
                                className={`p-3 rounded-lg border ${
                                  food.introduced
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30"
                                    : "bg-gray-50 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700/50"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div
                                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                                        food.introduced ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                                      }`}
                                    >
                                      {food.introduced && (
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
                                        food.introduced
                                          ? "text-green-900 dark:text-green-300"
                                          : "text-gray-700 dark:text-gray-300"
                                      }`}
                                    >
                                      {food.name}
                                    </span>
                                  </div>
                                  {food.introduced ? (
                                    <div className="text-right">
                                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                        {food.date}
                                      </Badge>
                                      {food.reaction && (
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                          Reaction: {food.reaction}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      Mark Introduced
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>

              {/* Baby Recipes */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Baby Food Recipes</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
                  >
                    <BookOpen className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-400">All Recipes</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {recipes
                    .filter((recipe) => recipe.forBaby)
                    .map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-100 dark:border-gray-700/50 cursor-pointer hover:border-green-200 dark:hover:border-green-800/50 transition-colors"
                        onClick={() => handleRecipeClick(recipe)}
                      >
                        <div className="flex">
                          <div className="w-20 h-20 rounded-md overflow-hidden mr-3 bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <img
                              src={recipe.image || "/placeholder.svg"}
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{recipe.title}</h4>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span className="mr-3">Prep: {recipe.prepTime}</span>
                              <Utensils className="h-3 w-3 mr-1" />
                              <span>Cook: {recipe.cookTime}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= Math.floor(recipe.rating)
                                        ? "text-amber-500 fill-amber-500"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                {recipe.rating} ({recipe.reviews})
                              </span>
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              >
                                {recipe.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {recipe.nutrients.map((nutrient, nutrientIndex) => (
                                <Badge
                                  key={nutrientIndex}
                                  variant="outline"
                                  className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                >
                                  {nutrient}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600 self-center ml-2" />
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              {/* Nutritional Recommendations */}
              <Card className="p-5 bg-gradient-to-br from-green-100 to-teal-50 dark:from-green-900/40 dark:to-teal-900/30 border-green-200 dark:border-green-700/50 card-glass">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-green-100 dark:bg-green-800/70 p-2 rounded-full">
                    <Info className="h-5 w-5 text-green-700 dark:text-green-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 dark:text-green-300 text-lg">Nutritional Guidance</h3>

                    <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-green-100 dark:border-green-700/50">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">For {babyData.age} Babies</h4>
                      <ul className="text-green-800 dark:text-green-300 text-sm leading-relaxed space-y-2">
                        {nutritionalRecommendations.baby.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-5 w-5 text-green-600 dark:text-green-400 mr-2">•</div>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-green-100 dark:border-green-700/50">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Food Safety</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 flex-shrink-0" />
                          <p className="text-sm text-green-800 dark:text-green-300">
                            Always check food temperature before feeding. It should be lukewarm, not hot.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 flex-shrink-0" />
                          <p className="text-sm text-green-800 dark:text-green-300">
                            Store homemade baby food in the refrigerator for up to 48 hours or freeze for up to 1 month.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Mother Nutrition Tab */}
            <TabsContent value="mother">
              {/* Mother Info Card */}
              <Card className="p-5 bg-gradient-to-r from-green-100 to-teal-50 dark:from-green-900/30 dark:to-teal-900/20 border-green-200 dark:border-green-800/50 card-glass relative overflow-hidden mb-4">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className="text-6xl">🥗</div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-green-900 dark:text-green-300">
                      {motherData.name}'s Nutrition
                    </h2>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {motherData.breastfeeding ? "Breastfeeding" : "Not breastfeeding"} •{" "}
                      {motherData.dietaryPreferences.join(", ")}
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
                        <p>Your nutritional information</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nutritional Focus</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {motherData.nutritionalNeeds.map((nutrient, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        >
                          {nutrient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Water Intake</p>
                      <p className="text-xs font-medium text-green-700 dark:text-green-400">
                        {motherData.currentWaterIntake} / {motherData.dailyWaterGoal} ml
                      </p>
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={(motherData.currentWaterIntake / motherData.dailyWaterGoal) * 100}
                        className="h-2 bg-gray-200 dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <Droplets className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-1" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round((motherData.currentWaterIntake / motherData.dailyWaterGoal) * 100)}% of daily goal
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Nutrient Tracking */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Today's Nutrient Tracking</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
                  >
                    <BarChart3 className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-400">View Trends</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {Object.entries(motherNutrientTracking).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {key === "omega3" ? "Omega-3" : key}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {value.current} / {value.target} {value.unit}
                        </p>
                      </div>
                      <Progress
                        value={(value.current / value.target) * 100}
                        className="h-2 bg-gray-200 dark:bg-gray-700"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((value.current / value.target) * 100)}% of daily target
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Day Selector for Meal Plan */}
              <div className="flex overflow-x-auto gap-2 pb-2 mb-4 -mx-1 px-1 snap-x hide-scrollbar">
                {["Today", "Tomorrow", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <button
                    key={day}
                    className={`flex-shrink-0 px-4 py-2 rounded-full snap-start focus-ring ${
                      selectedDay.toLowerCase() === day.toLowerCase()
                        ? "bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800/50 text-green-900 dark:text-green-300"
                        : "bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setSelectedDay(day.toLowerCase())}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Mother Meal Planning */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {selectedDay === "today" ? "Today's" : "Upcoming"} Meals
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {calculateMealCompletion(getMealPlan(motherMealPlans, selectedDay).meals)}% completed
                    </p>
                  </div>
                  <Dialog open={showAddMeal} onOpenChange={setShowAddMeal}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
                      >
                        <Plus className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                        <span className="text-green-700 dark:text-green-400">Add Meal</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Meal</DialogTitle>
                        <DialogDescription>Record a meal you've eaten or plan to eat.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="meal-day">Day</Label>
                            <Select defaultValue="today">
                              <SelectTrigger id="meal-day">
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                <SelectItem value="thursday">Thursday</SelectItem>
                                <SelectItem value="friday">Friday</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="meal-time">Time</Label>
                            <Input id="meal-time" type="time" defaultValue="12:00" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meal-type">Meal Type</Label>
                          <Select defaultValue="lunch">
                            <SelectTrigger id="meal-type">
                              <SelectValue placeholder="Select meal type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="breakfast">Breakfast</SelectItem>
                              <SelectItem value="lunch">Lunch</SelectItem>
                              <SelectItem value="dinner">Dinner</SelectItem>
                              <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meal-food">Food</Label>
                          <Input id="meal-food" placeholder="e.g., Salmon salad with quinoa" />
                        </div>
                        <div className="space-y-2">
                          <Label>Nutrients (select all that apply)</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nutrient-protein" />
                              <Label htmlFor="nutrient-protein">Protein</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nutrient-fiber" />
                              <Label htmlFor="nutrient-fiber">Fiber</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nutrient-iron" />
                              <Label htmlFor="nutrient-iron">Iron</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nutrient-calcium" />
                              <Label htmlFor="nutrient-calcium">Calcium</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nutrient-omega3" />
                              <Label htmlFor="nutrient-omega3">Omega-3</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nutrient-vitamins" />
                              <Label htmlFor="nutrient-vitamins">Vitamins</Label>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="meal-notes">Notes</Label>
                          <Input id="meal-notes" placeholder="Any additional notes..." />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="meal-completed" />
                          <Label htmlFor="meal-completed">Already completed</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddMeal(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddMeal(false)}>Save Meal</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-3">
                  {getMealPlan(motherMealPlans, selectedDay).meals.map((meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className={`p-3 rounded-lg border ${
                        meal.completed
                          ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30"
                          : "bg-gray-50 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700/50"
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-full mr-3 ${
                            meal.completed ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-700/50"
                          }`}
                        >
                          {meal.type === "Breakfast" && (
                            <Clock
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                          {meal.type === "Lunch" && (
                            <Utensils
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                          {meal.type === "Snack" && (
                            <Apple
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                          {meal.type === "Dinner" && (
                            <Utensils
                              className={`h-4 w-4 ${
                                meal.completed
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p
                                className={`font-medium ${
                                  meal.completed
                                    ? "text-green-900 dark:text-green-300"
                                    : "text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                {meal.type}
                                {meal.completed && (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 inline ml-1" />
                                )}
                              </p>
                              <p
                                className={`text-sm ${
                                  meal.completed
                                    ? "text-green-700 dark:text-green-400"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {meal.food}
                              </p>
                            </div>
                            <span
                              className={`text-xs ${
                                meal.completed
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {meal.time}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {meal.nutrients.map((nutrient, nutrientIndex) => (
                              <Badge
                                key={nutrientIndex}
                                variant="outline"
                                className={`text-xs ${
                                  meal.completed
                                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {nutrient}
                              </Badge>
                            ))}
                          </div>
                          {!meal.completed && selectedDay === "today" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-7 text-xs text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                            >
                              Mark as completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Mother Recipes */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 card-glass mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Recipes for Breastfeeding Mothers</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/70 dark:bg-gray-800/70 border-green-200 dark:border-green-800/50"
                  >
                    <BookOpen className="h-4 w-4 mr-1 text-green-700 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-400">All Recipes</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {recipes
                    .filter((recipe) => recipe.forMother)
                    .map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg border border-gray-100 dark:border-gray-700/50 cursor-pointer hover:border-green-200 dark:hover:border-green-800/50 transition-colors"
                        onClick={() => handleRecipeClick(recipe)}
                      >
                        <div className="flex">
                          <div className="w-20 h-20 rounded-md overflow-hidden mr-3 bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <img
                              src={recipe.image || "/placeholder.svg"}
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{recipe.title}</h4>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span className="mr-3">Prep: {recipe.prepTime}</span>
                              <Utensils className="h-3 w-3 mr-1" />
                              <span>Cook: {recipe.cookTime}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= Math.floor(recipe.rating)
                                        ? "text-amber-500 fill-amber-500"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                {recipe.rating} ({recipe.reviews})
                              </span>
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              >
                                {recipe.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {recipe.nutrients.map((nutrient, nutrientIndex) => (
                                <Badge
                                  key={nutrientIndex}
                                  variant="outline"
                                  className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                >
                                  {nutrient}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600 self-center ml-2" />
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              {/* Nutritional Recommendations */}
              <Card className="p-5 bg-gradient-to-br from-green-100 to-teal-50 dark:from-green-900/40 dark:to-teal-900/30 border-green-200 dark:border-green-700/50 card-glass">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-green-100 dark:bg-green-800/70 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-green-700 dark:text-green-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 dark:text-green-300 text-lg">Nutritional Guidance</h3>

                    <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-green-100 dark:border-green-700/50">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">For Breastfeeding Mothers</h4>
                      <ul className="text-green-800 dark:text-green-300 text-sm leading-relaxed space-y-2">
                        {nutritionalRecommendations.mother.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-5 w-5 text-green-600 dark:text-green-400 mr-2">•</div>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-sm border border-green-100 dark:border-green-700/50">
                      <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Key Nutrients</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">Calcium</p>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                              1000mg daily
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Sources: Dairy products, fortified plant milks, leafy greens, tofu
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">Iron</p>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                              9mg daily
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Sources: Red meat, beans, lentils, spinach, fortified cereals
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">
                              Omega-3 Fatty Acids
                            </p>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                              500mg daily
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Sources: Fatty fish (salmon, mackerel), flaxseeds, chia seeds, walnuts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Recipe Detail Dialog */}
      <Dialog open={showRecipeDetail} onOpenChange={setShowRecipeDetail}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRecipe.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(selectedRecipe.rating)
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {selectedRecipe.rating} ({selectedRecipe.reviews} reviews)
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="w-full h-48 rounded-md overflow-hidden bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <img
                    src={selectedRecipe.image || "/placeholder.svg"}
                    alt={selectedRecipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="mr-3">Prep: {selectedRecipe.prepTime}</span>
                    <Utensils className="h-4 w-4 mr-1" />
                    <span>Cook: {selectedRecipe.cookTime}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Description</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedRecipe.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Ingredients</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Instructions</h4>
                  <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-decimal pl-5">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Nutrients</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRecipe.nutrients.map((nutrient, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      >
                        {nutrient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                </div>
                <Button onClick={() => setShowRecipeDetail(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-green-100 dark:border-green-900/30 px-2 py-1 backdrop-blur-md">
        <div className="flex justify-around items-center">
          <NavButton icon={<Home size={24} />} label="Home" />
          <NavButton icon={<BarChart3 size={24} />} label="Log" active />
          <NavButton icon={<Bell size={24} />} label="Community" />
          <NavButton icon={<User size={24} />} label="Profile" />
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
    <button className="flex flex-col items-center py-1 px-3 focus-ring rounded-lg">
      <div className={active ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>{icon}</div>
      <span
        className={`text-xs mt-1 ${active ? "text-green-600 dark:text-green-400 font-medium" : "text-gray-500 dark:text-gray-400"}`}
      >
        {label}
      </span>
    </button>
  )
}
