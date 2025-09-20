"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SUBJECTS_BY_CLASS } from "@/lib/education-data"
import type { UserProfile } from "@/app/page"
import type { Subject } from "@/lib/education-data"
import { SubjectView } from "@/components/subject-view"

interface DashboardProps {
  userProfile: UserProfile
}

export function Dashboard({ userProfile }: DashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  // Determine which subjects to show based on class level
  const subjectGroup = userProfile.classLevel <= 8 ? "6-8" : "9-12"
  const availableSubjects = SUBJECTS_BY_CLASS[subjectGroup]

  if (selectedSubject) {
    return <SubjectView subject={selectedSubject} userProfile={userProfile} onBack={() => setSelectedSubject(null)} />
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Choose Your Subject</h1>
          <p className="text-lg text-muted-foreground mb-2">Select a subject to start your learning journey</p>
          <Badge variant="secondary" className="text-sm">
            Class {userProfile.classLevel} • Age {userProfile.age}
          </Badge>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableSubjects.map((subject) => (
            <Card
              key={subject.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 animate-bounce-gentle"
              onClick={() => setSelectedSubject(subject)}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">{subject.name}</CardTitle>
                <CardDescription className="text-base">{subject.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:animate-pulse-glow" size="lg">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Motivational Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Your Learning Goal</h2>
              <p className="text-lg text-muted-foreground italic">"{userProfile.reason}"</p>
              <div className="mt-6 flex justify-center gap-4">
                <Badge variant="outline" className="text-sm px-4 py-2">
                  📚 Interactive Notes
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2">
                  🧠 Smart Quizzes
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2">
                  🎮 Fun Games
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
