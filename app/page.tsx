"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pill } from "@/components/pill"
import { ChevronLeft, Send, Loader2 } from "lucide-react"
import { ageGroupOptions, genderOptions, durationOptions, exposureOptions, symptomOptions } from "@/lib/question-stages"
import { getRandomColor } from "@/lib/utils"

// Define the stages of the questionnaire
const STAGES = ["AGE_GROUP", "GENDER", "DURATION", "EXPOSURE", "SYMPTOMS", "COMPLETE"] as const

type Stage = (typeof STAGES)[number]

interface ApiResponse {
  response: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export default function BioChatApp() {
  const [currentStage, setCurrentStage] = useState<Stage>("AGE_GROUP")
  const [selections, setSelections] = useState<Record<string, string[]>>({
    AGE_GROUP: [],
    GENDER: [],
    DURATION: [],
    EXPOSURE: [],
    SYMPTOMS: [],
  })
  const [symptomPath, setSymptomPath] = useState<string[]>([])
  const [finalQuery, setFinalQuery] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get the current options based on the stage
  const getCurrentOptions = () => {
    switch (currentStage) {
      case "AGE_GROUP":
        return ageGroupOptions
      case "GENDER":
        return genderOptions
      case "DURATION":
        return durationOptions
      case "EXPOSURE":
        return exposureOptions
      case "SYMPTOMS":
        return symptomPath.length === 0 ? symptomOptions : getCurrentSymptomOptions()
      default:
        return []
    }
  }

  // Get nested symptom options based on the current path
  const getCurrentSymptomOptions = () => {
    let currentOptions = symptomOptions

    // Navigate through the symptom path to get the current options
    for (const selection of symptomPath) {
      const nextOption = currentOptions.find((opt) => opt.label === selection)
      if (nextOption && nextOption.children) {
        currentOptions = nextOption.children
      } else {
        return []
      }
    }

    return currentOptions
  }

  // Handle selection of an option
  const handleSelect = (option: { label: string; children?: any[] }) => {
    if (currentStage === "SYMPTOMS") {
      // For symptoms, we need to handle the hierarchical structure
      const newPath = [...symptomPath, option.label]
      setSymptomPath(newPath)

      // If this option has children, update the symptom options
      if (option.children && option.children.length > 0) {
        return
      } else {
        // If it's a leaf node, add it to selections and move to complete stage
        setSelections({
          ...selections,
          SYMPTOMS: [...selections.SYMPTOMS, ...newPath],
        })
        setCurrentStage("COMPLETE")
        const query = generateFinalQuery([
          ...selections.AGE_GROUP,
          ...selections.GENDER,
          ...selections.DURATION,
          ...selections.EXPOSURE,
          ...newPath,
        ])

        // Make API request with the generated query
        fetchLlamaResponse(query)
      }
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

  // Handle going back to the previous stage or option
  const handleBack = () => {
    if (currentStage === "COMPLETE") {
      setCurrentStage("SYMPTOMS")
      setFinalQuery(null)
      setApiResponse(null)
      setError(null)
      return
    }

    if (currentStage === "SYMPTOMS" && symptomPath.length > 0) {
      // If in symptoms and there's a path, go back one level in the path
      setSymptomPath(symptomPath.slice(0, -1))
      return
    }

    // Otherwise, go back to the previous stage
    const currentIndex = STAGES.indexOf(currentStage)
    if (currentIndex > 0) {
      const previousStage = STAGES[currentIndex - 1]
      setCurrentStage(previousStage)

      // Clear the selections for the current stage
      setSelections({
        ...selections,
        [currentStage]: [],
      })
    }
  }

  // Generate the final query based on all selections
  const generateFinalQuery = (allSelections: string[]): string => {
    const ageGroup = selections.AGE_GROUP[0] || "[age not specified]"
    const gender = selections.GENDER[0] || "[gender not specified]"
    const duration = selections.DURATION[0] || "[duration not specified]"

    // Get all symptom selections (the last entries in the array)
    const symptoms = selections.SYMPTOMS.concat(symptomPath)

    // Get exposure selections
    const exposures = selections.EXPOSURE

    let query = `I'm a ${ageGroup} ${gender} experiencing ${symptoms.join(" specifically with ")}`

    // Add duration
    query += ` for ${duration}`

    // Add exposures if any
    if (exposures.length > 0) {
      query += `. I have recent exposure to ${exposures.join(" and ")}`
    }

    query += `. What could be the potential causes, and what additional information would be helpful for diagnosis?`

    setFinalQuery(query)
    return query
  }

  // Fetch response from LLaMA API
  const fetchLlamaResponse = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://backend.jeremiahjacob261.workers.dev/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queries: query }),
      })
          console.log(response)
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      setApiResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching LLaMA response:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Send the query to LLaMA
  const handleSendToLlama = () => {
    if (finalQuery) {
      fetchLlamaResponse(finalQuery)
    }
  }

  // Reset the entire chat
  const resetChat = () => {
    setCurrentStage("AGE_GROUP")
    setSelections({
      AGE_GROUP: [],
      GENDER: [],
      DURATION: [],
      EXPOSURE: [],
      SYMPTOMS: [],
    })
    setSymptomPath([])
    setFinalQuery(null)
    setApiResponse(null)
    setError(null)
  }

  // Get the title for the current stage
  const getStageTitle = () => {
    switch (currentStage) {
      case "AGE_GROUP":
        return "What is your age group?"
      case "GENDER":
        return "What is your gender?"
      case "DURATION":
        return "How long have you been experiencing symptoms?"
      case "EXPOSURE":
        return "Do you have any relevant exposure history?"
      case "SYMPTOMS":
        return symptomPath.length === 0
          ? "What symptoms are you experiencing?"
          : `Tell me more about your ${symptomPath[symptomPath.length - 1].toLowerCase()}:`
      default:
        return ""
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="bg-teal-600 text-white">
          <CardTitle className="text-2xl">Medical Diagnostic Consultant</CardTitle>
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
                  {stage.charAt(0) + stage.slice(1).toLowerCase()}
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
          {(Object.values(selections).some((arr) => arr.length > 0) || symptomPath.length > 0) && (
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

              {selections.DURATION.length > 0 && (
                <div className="text-slate-700 mb-1">
                  <span className="font-medium">Duration: </span>
                  {selections.DURATION.join(", ")}
                </div>
              )}

              {selections.EXPOSURE.length > 0 && (
                <div className="text-slate-700 mb-1">
                  <span className="font-medium">Exposure: </span>
                  {selections.EXPOSURE.join(", ")}
                </div>
              )}

              {(selections.SYMPTOMS.length > 0 || symptomPath.length > 0) && (
                <div className="text-slate-700 mb-1">
                  <span className="font-medium">Symptoms: </span>
                  {[...selections.SYMPTOMS, ...symptomPath].join(" → ")}
                </div>
              )}
            </div>
          )}

          {/* Current stage options */}
          {currentStage !== "COMPLETE" && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-slate-700">{getStageTitle()}</h3>
              <div className="flex flex-wrap gap-2">
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

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
              <p className="text-slate-600">Analyzing your symptoms...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-red-700">Error</h3>
              <p className="text-red-600">{error}</p>
              <Button
                variant="outline"
                className="mt-2 border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => handleSendToLlama()}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* API Response display */}
          {apiResponse && !isLoading && !error && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 text-slate-700">Diagnostic Analysis:</h3>
              <ScrollArea className="h-64 w-full rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="text-slate-700 whitespace-pre-line">{apiResponse.response}</div>
              </ScrollArea>
              <div className="mt-2 text-xs text-slate-500">
                Tokens used: {apiResponse.usage.total_tokens} (Prompt: {apiResponse.usage.prompt_tokens}, Completion:{" "}
                {apiResponse.usage.completion_tokens})
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-slate-50 p-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={(currentStage === "AGE_GROUP" && symptomPath.length === 0) || isLoading}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={resetChat} disabled={isLoading}>
              Reset
            </Button>
            {finalQuery && !apiResponse && !isLoading && (
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSendToLlama} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send to LLaMA
                  </>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
