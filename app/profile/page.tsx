"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Edit2, Save, User } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [profile, setProfile] = useState({
    personal: {
      name: "Ozoda Muminova",
      dob: "1990-05-15",
      email: "ozoda@example.com",
      phone: "+998 90 123 4567",
      bloodType: "A+",
    },
    health: {
      height: "165 cm",
      weight: "62 kg",
      allergies: "None",
      conditions: "None",
      medications: "Prenatal vitamins",
    },
    pregnancy: {
      babyName: "Ali",
      babyDob: "2022-12-10",
      breastfeeding: true,
      pregnancyHistory: "1 pregnancy, 1 birth",
      notes: "Natural birth, no complications",
    },
    preferences: {
      notifications: true,
      reminders: true,
      dataSharing: false,
      theme: "Light",
      language: "English",
    },
  })

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    // In a real app, you would save to backend here
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <ArrowLeft className="w-6 h-6 text-amber-600" />
              </Link>
              <h1 className="text-xl font-bold text-amber-800">Maternal Profile</h1>
            </div>
            <button
              onClick={isEditing ? handleSave : toggleEdit}
              className="p-2 rounded-full bg-amber-100 text-amber-600"
            >
              {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Profile Summary */}
        <section className="mb-6">
          <div className="card bg-amber-50 border border-amber-100">
            <div className="flex items-center">
              <div className="mr-4 w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center">
                <User className="w-10 h-10 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-800">{profile.personal.name}</h2>
                <div className="flex items-center text-sm text-amber-600 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    Mother of {profile.pregnancy.babyName}, {calculateAge(profile.pregnancy.babyDob)}
                  </span>
                </div>
                <p className="text-sm text-amber-600 mt-1">
                  {profile.pregnancy.breastfeeding ? "Currently breastfeeding" : "Not breastfeeding"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <TabButton label="Personal" active={activeTab === "personal"} onClick={() => setActiveTab("personal")} />
            <TabButton label="Health" active={activeTab === "health"} onClick={() => setActiveTab("health")} />
            <TabButton
              label="Pregnancy & Baby"
              active={activeTab === "pregnancy"}
              onClick={() => setActiveTab("pregnancy")}
            />
            <TabButton
              label="Preferences"
              active={activeTab === "preferences"}
              onClick={() => setActiveTab("preferences")}
            />
          </div>
        </section>

        {/* Tab Content */}
        <section>
          <div className="card">
            {activeTab === "personal" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-amber-800 mb-4">Personal Information</h2>

                <ProfileField
                  label="Full Name"
                  value={profile.personal.name}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      personal: { ...profile.personal, name: value },
                    })
                  }
                />

                <ProfileField
                  label="Date of Birth"
                  value={profile.personal.dob}
                  type="date"
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      personal: { ...profile.personal, dob: value },
                    })
                  }
                />

                <ProfileField
                  label="Email"
                  value={profile.personal.email}
                  type="email"
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      personal: { ...profile.personal, email: value },
                    })
                  }
                />

                <ProfileField
                  label="Phone"
                  value={profile.personal.phone}
                  type="tel"
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      personal: { ...profile.personal, phone: value },
                    })
                  }
                />

                <ProfileField
                  label="Blood Type"
                  value={profile.personal.bloodType}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      personal: { ...profile.personal, bloodType: value },
                    })
                  }
                />
              </div>
            )}

            {activeTab === "health" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-amber-800 mb-4">Health Information</h2>

                <ProfileField
                  label="Height"
                  value={profile.health.height}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      health: { ...profile.health, height: value },
                    })
                  }
                />

                <ProfileField
                  label="Weight"
                  value={profile.health.weight}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      health: { ...profile.health, weight: value },
                    })
                  }
                />

                <ProfileField
                  label="Allergies"
                  value={profile.health.allergies}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      health: { ...profile.health, allergies: value },
                    })
                  }
                />

                <ProfileField
                  label="Medical Conditions"
                  value={profile.health.conditions}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      health: { ...profile.health, conditions: value },
                    })
                  }
                />

                <ProfileField
                  label="Medications"
                  value={profile.health.medications}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      health: { ...profile.health, medications: value },
                    })
                  }
                />
              </div>
            )}

            {activeTab === "pregnancy" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-amber-800 mb-4">Pregnancy & Baby Information</h2>

                <ProfileField
                  label="Baby's Name"
                  value={profile.pregnancy.babyName}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      pregnancy: { ...profile.pregnancy, babyName: value },
                    })
                  }
                />

                <ProfileField
                  label="Baby's Date of Birth"
                  value={profile.pregnancy.babyDob}
                  type="date"
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      pregnancy: { ...profile.pregnancy, babyDob: value },
                    })
                  }
                />

                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Currently Breastfeeding</p>
                  {isEditing ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={profile.pregnancy.breastfeeding}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            pregnancy: { ...profile.pregnancy, breastfeeding: e.target.checked },
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  ) : (
                    <span className="text-gray-900 font-medium">{profile.pregnancy.breastfeeding ? "Yes" : "No"}</span>
                  )}
                </div>

                <ProfileField
                  label="Pregnancy History"
                  value={profile.pregnancy.pregnancyHistory}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      pregnancy: { ...profile.pregnancy, pregnancyHistory: value },
                    })
                  }
                />

                <ProfileField
                  label="Notes"
                  value={profile.pregnancy.notes}
                  isEditing={isEditing}
                  multiline={true}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      pregnancy: { ...profile.pregnancy, notes: value },
                    })
                  }
                />
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-amber-800 mb-4">App Preferences</h2>

                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Enable Notifications</p>
                  {isEditing ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={profile.preferences.notifications}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, notifications: e.target.checked },
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {profile.preferences.notifications ? "Enabled" : "Disabled"}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Enable Reminders</p>
                  {isEditing ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={profile.preferences.reminders}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, reminders: e.target.checked },
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {profile.preferences.reminders ? "Enabled" : "Disabled"}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Data Sharing with Healthcare Providers</p>
                  {isEditing ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={profile.preferences.dataSharing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, dataSharing: e.target.checked },
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {profile.preferences.dataSharing ? "Enabled" : "Disabled"}
                    </span>
                  )}
                </div>

                <ProfileField
                  label="Theme"
                  value={profile.preferences.theme}
                  isEditing={isEditing}
                  options={["Light", "Dark", "System"]}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, theme: value },
                    })
                  }
                />

                <ProfileField
                  label="Language"
                  value={profile.preferences.language}
                  isEditing={isEditing}
                  options={["English", "Russian", "Uzbek"]}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, language: value },
                    })
                  }
                />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
        <div className="flex justify-around items-center p-2">
          <NavButton icon={<Home />} label="Home" />
          <NavButton icon={<Milk />} label="Feeding" />
          <NavButton icon={<Baby />} label="Growth" />
          <NavButton icon={<Calendar />} label="Cycle" />
          <NavButton icon={<User />} label="Profile" active />
        </div>
      </nav>
    </div>
  )
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg whitespace-nowrap ${
        active ? "bg-amber-600 text-white" : "bg-white text-amber-800 hover:bg-amber-100"
      }`}
    >
      {label}
    </button>
  )
}

function ProfileField({ label, value, type = "text", isEditing, multiline = false, options = [], onChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label className="text-gray-700 md:w-1/3 mb-1 md:mb-0">{label}</label>
      {isEditing ? (
        options.length > 0 ? (
          <select className="input-field md:w-2/3" value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : multiline ? (
          <textarea
            className="input-field md:w-2/3"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
          />
        ) : (
          <input
            type={type}
            className="input-field md:w-2/3"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      ) : (
        <p className="text-gray-900 font-medium md:w-2/3">{value}</p>
      )}
    </div>
  )
}

function calculateAge(dateString) {
  const birthDate = new Date(dateString)
  const today = new Date()

  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--
    months += 12
  }

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""} old`
  } else {
    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""} old`
  }
}

function Home() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function Milk() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M8 2h8" />
      <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
      <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
    </svg>
  )
}

function Baby() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.5.3 2 0" />
      <path d="M16 5c-.7.6-1.7 1-3 1h-2c-1.3 0-2.3-.4-3-1" />
      <path d="M3 20a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1Z" />
      <path d="M12 7v.01" />
    </svg>
  )
}

function NavButton({ icon, label, active = false }) {
  return (
    <button className="flex flex-col items-center p-2">
      <div className={`p-1.5 rounded-full ${active ? "bg-amber-100 text-amber-600" : "text-gray-500"}`}>{icon}</div>
      <span className={`text-xs mt-1 ${active ? "text-amber-600 font-medium" : "text-gray-500"}`}>{label}</span>
    </button>
  )
}
