"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pill } from "@/components/pill"
import { ChevronLeft } from "lucide-react"
import { ageGroupOptions, genderOptions, symptomOptions } from "@/lib/question-stages"
import { getRandomColor } from "@/lib/utils"
import { matchSymptoms } from "@/lib/disease-matcher"

// Define the stages of the questionnaire
const STAGES = ["AGE_GROUP", "GENDER", "SYMPTOMS", "COMPLETE"] as const

type Stage = (typeof STAGES)[number]

interface DiagnosisResult {
  disease: string
  matchPercentage: number
  matchedSymptoms: string[]
  totalSymptoms: number
}

export default function BioChatApp() {
  const [currentStage, setCurrentStage] = useState<Stage>("AGE_GROUP")
  const [selections, setSelections] = useState<Record<string, string[]>>({
    AGE_GROUP: [],
    GENDER: [],
    SYMPTOMS: [],
  })
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([])

  // Get the current options based on the stage
  const getCurrentOptions = () => {
    switch (currentStage) {
      case "AGE_GROUP":
        return ageGroupOptions
      case "GENDER":
        return genderOptions
      case "SYMPTOMS":
        return symptomOptions.filter((option) => !selectedSymptoms.includes(option.label))
      default:
        return []
    }
  }

  // Handle selection of an option
  const handleSelect = (option: { label: string; children?: any[] }) => {
    if (currentStage === "SYMPTOMS") {
      // Add symptom to selected symptoms
      const newSelectedSymptoms = [...selectedSymptoms, option.label]
      setSelectedSymptoms(newSelectedSymptoms)
      setSelections({
        ...selections,
        SYMPTOMS: newSelectedSymptoms,
      })
    } else {
      // For other stages, add the selection and move to the next stage
      setSelections({
        ...selections,
        [currentStage]: [...selections[currentStage], option.label],
      })

      const currentIndex = STAGES.indexOf(currentStage)
      if (currentIndex < STAGES.length - 1) {
        setCurrentStage(STAGES[currentIndex + 1])
      }
    }
  }

  // Remove a selected symptom
  const removeSymptom = (symptomToRemove: string) => {
    const newSelectedSymptoms = selectedSymptoms.filter((symptom) => symptom !== symptomToRemove)
    setSelectedSymptoms(newSelectedSymptoms)
    setSelections({
      ...selections,
      SYMPTOMS: newSelectedSymptoms,
    })
  }

  // Complete symptom selection and get diagnosis
  const completeSymptomSelection = () => {
    if (selectedSymptoms.length > 0) {
      setCurrentStage("COMPLETE")
      const results = matchSymptoms(selectedSymptoms)
      setDiagnosisResults(results)
    }
  }

  // Handle going back to the previous stage
  const handleBack = () => {
    if (currentStage === "COMPLETE") {
      setCurrentStage("SYMPTOMS")
      setDiagnosisResults([])
      return
    }

    // Otherwise, go back to the previous stage
    const currentIndex = STAGES.indexOf(currentStage)
    if (currentIndex > 0) {
      const previousStage = STAGES[currentIndex - 1]
      setCurrentStage(previousStage)

      // Clear the selections for the current stage
      if (currentStage === "SYMPTOMS") {
        setSelectedSymptoms([])
      }
      setSelections({
        ...selections,
        [currentStage]: [],
      })
    }
  }

  // Reset the entire chat
  const resetChat = () => {
    setCurrentStage("AGE_GROUP")
    setSelections({
      AGE_GROUP: [],
      GENDER: [],
      SYMPTOMS: [],
    })
    setSelectedSymptoms([])
    setDiagnosisResults([])
  }

  // Get the title for the current stage
  const getStageTitle = () => {
    switch (currentStage) {
      case "AGE_GROUP":
        return "What is your age group?"
      case "GENDER":
        return "What is your gender?"
      case "SYMPTOMS":
        return "Select all symptoms you are experiencing:"
      default:
        return ""
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="bg-teal-600 text-white">
          <CardTitle className="text-2xl">Chat Based Medical Diagnosis Program</CardTitle>
          <CardDescription className="text-teal-100">
            {currentStage === "COMPLETE"
              ? "Review your diagnostic results"
              : "Answer questions to build your medical query"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {STAGES.slice(0, -1).map((stage, index) => (
                <div
                  key={stage}
                  className={`text-xs font-medium ${
                    STAGES.indexOf(currentStage) >= index ? "text-teal-600" : "text-slate-400"
                  }`}
                >
                  {stage.charAt(0) + stage.slice(1).toLowerCase().replace("_", " ")}
                </div>
              ))}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div
                className="bg-teal-600 h-2.5 rounded-full"
                style={{ width: `${(STAGES.indexOf(currentStage) / (STAGES.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Selection summary */}
          {(Object.values(selections).some((arr) => arr.length > 0) || selectedSymptoms.length > 0) && (
            <div className="mb-4 p-3 bg-slate-50 rounded-md border border-slate-200">
              <p className="text-sm text-slate-500 mb-2">Your selections so far:</p>

              {selections.AGE_GROUP.length > 0 && (
                <div className="text-slate-700 mb-1">
                  <span className="font-medium">Age Group: </span>
                  {selections.AGE_GROUP.join(", ")}
                </div>
              )}

              {selections.GENDER.length > 0 && (
                <div className="text-slate-700 mb-1">
                  <span className="font-medium">Gender: </span>
                  {selections.GENDER.join(", ")}
                </div>
              )}

              {selectedSymptoms.length > 0 && (
                <div className="text-slate-700 mb-1">
                  <span className="font-medium">Symptoms: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedSymptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-800 cursor-pointer hover:bg-teal-200"
                        onClick={() => removeSymptom(symptom)}
                        title="Click to remove"
                      >
                        {symptom} ×
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Current stage options */}
          {currentStage !== "COMPLETE" && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-slate-700">{getStageTitle()}</h3>

              {currentStage === "SYMPTOMS" && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">
                    Selected {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? "s" : ""}. Click on
                    selected symptoms above to remove them.
                  </p>
                  {selectedSymptoms.length > 0 && (
                    <Button onClick={completeSymptomSelection} className="bg-teal-600 hover:bg-teal-700 mb-4">
                      Get Diagnosis ({selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? "s" : ""})
                    </Button>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {getCurrentOptions().map((option, index) => (
                  <Pill
                    key={index}
                    label={option.label}
                    onClick={() => handleSelect(option)}
                    color={getRandomColor()}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Diagnosis Results */}
          {diagnosisResults.length > 0 && currentStage === "COMPLETE" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 text-slate-700">Possible Diagnosis:</h3>

              {/* Top Match */}
              {diagnosisResults[0] && (
                <div className="mb-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-bold text-teal-800">{diagnosisResults[0].disease}</h4>
                    <span className="text-lg font-semibold text-teal-600">
                      {diagnosisResults[0].matchPercentage.toFixed(1)}% match
                    </span>
                  </div>
                  <div className="text-sm text-teal-700">
                    <span className="font-medium">Matched symptoms: </span>
                    {diagnosisResults[0].matchedSymptoms.join(", ")}
                  </div>
                  <div className="text-xs text-teal-600 mt-1">
                    {diagnosisResults[0].matchedSymptoms.length} of {diagnosisResults[0].totalSymptoms} symptoms matched
                  </div>
                </div>
              )}

              {/* Other Possible Matches */}
              {diagnosisResults.length > 1 && (
                <div>
                  <h4 className="text-md font-medium mb-2 text-slate-600">Other possible conditions:</h4>
                  <ScrollArea className="h-32 w-full">
                    <div className="space-y-2">
                      {diagnosisResults.slice(1, 4).map((result, index) => (
                        <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">{result.disease}</span>
                            <span className="text-sm text-slate-600">{result.matchPercentage.toFixed(1)}%</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {result.matchedSymptoms.length}/{result.totalSymptoms} symptoms matched
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* No matches found */}
              {diagnosisResults.length === 0 && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-gray-600">
                    No matching conditions found based on the selected symptoms. Please consult a healthcare
                    professional for proper diagnosis.
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-xs text-yellow-800">
                  Consult with a pharmacist or healthcare professional for drug prescription and advice.
                   </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-slate-50 p-4">
          <Button variant="outline" onClick={handleBack} disabled={currentStage === "AGE_GROUP"}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={resetChat}>
              Reset
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
