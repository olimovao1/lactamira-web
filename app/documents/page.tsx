"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Filter, Grid, List, Lock, Plus, Search, Share2, Upload } from "lucide-react"

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Medical Records", "Test Results", "Prescriptions", "Baby Documents", "Insurance"]

  const documents = [
    {
      id: 1,
      name: "Blood Test Results.pdf",
      category: "Test Results",
      date: "May 10, 2023",
      size: "1.2 MB",
      confidential: true,
    },
    {
      id: 2,
      name: "Ultrasound Scan.jpg",
      category: "Medical Records",
      date: "April 15, 2023",
      size: "3.5 MB",
      confidential: false,
    },
    {
      id: 3,
      name: "Prenatal Vitamins Prescription.pdf",
      category: "Prescriptions",
      date: "April 2, 2023",
      size: "0.8 MB",
      confidential: false,
    },
    {
      id: 4,
      name: "Baby Birth Certificate.pdf",
      category: "Baby Documents",
      date: "December 15, 2022",
      size: "1.5 MB",
      confidential: true,
    },
    {
      id: 5,
      name: "Vaccination Schedule.pdf",
      category: "Baby Documents",
      date: "January 5, 2023",
      size: "0.5 MB",
      confidential: false,
    },
    {
      id: 6,
      name: "Health Insurance Policy.pdf",
      category: "Insurance",
      date: "March 20, 2023",
      size: "2.1 MB",
      confidential: true,
    },
  ]

  // Filter documents based on search query and selected category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-amber-600" />
            </Link>
            <h1 className="text-xl font-bold text-amber-800">Medical Documents</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Search and Filter */}
        <section className="mb-6">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search documents..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-amber-600 mr-2" />
              <select
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-amber-100 text-amber-600" : "bg-white text-gray-500"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-amber-100 text-amber-600" : "bg-white text-gray-500"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Upload Button */}
        <section className="mb-6">
          <button className="btn-primary w-full flex items-center justify-center bg-amber-600 hover:bg-amber-700">
            <Upload className="w-5 h-5 mr-2" />
            Upload New Document
          </button>
        </section>

        {/* Storage Info */}
        <section className="mb-6">
          <div className="card bg-amber-50 border border-amber-100">
            <h2 className="text-lg font-semibold text-amber-800 mb-3">Storage</h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium">9.6 MB of 1 GB</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "1%" }}></div>
              </div>

              <p className="text-xs text-amber-600">
                <Lock className="w-4 h-4 inline mr-1" />
                Your documents are encrypted and stored securely
              </p>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-lg font-semibold text-amber-800 mb-4">Your Documents</h2>

          {filteredDocuments.length === 0 ? (
            <div className="card p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No documents found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="card p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <FileText className="w-6 h-6 text-amber-600" />
                    </div>
                    {doc.confidential && (
                      <div className="bg-red-100 p-1 rounded-full">
                        <Lock className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{doc.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{doc.category}</p>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{doc.date}</span>
                    <span>{doc.size}</span>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 py-1 text-xs bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200">
                      <Download className="w-3 h-3 inline mr-1" />
                      Download
                    </button>
                    <button className="flex-1 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      <Share2 className="w-3 h-3 inline mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="card p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-amber-100 mr-3">
                      <FileText className="w-6 h-6 text-amber-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{doc.name}</h3>
                          <p className="text-xs text-gray-500">
                            {doc.category} • {doc.date}
                          </p>
                        </div>

                        {doc.confidential && (
                          <div className="bg-red-100 p-1 rounded-full">
                            <Lock className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      <button className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 p-4 rounded-full bg-amber-600 text-white shadow-lg md:hidden">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
