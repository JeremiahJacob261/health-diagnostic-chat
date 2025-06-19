export interface Disease {
  name: string
  symptoms: string[]
}

export interface DiagnosisResult {
  disease: string
  matchPercentage: number
  matchedSymptoms: string[]
  totalSymptoms: number
}

// Predefined disease database
export const diseaseDatabase: Disease[] = [
  {
    name: "HIV/AIDS",
    symptoms: [
      "fever",
      "fatigue",
      "weight loss",
      "swollen lymph nodes",
      "skin rashes",
      "lesions",
      "recurring infections",
    ],
  },
  {
    name: "Tuberculosis",
    symptoms: ["coughing", "chest pain", "weight loss", "night sweats", "chills"],
  },
  {
    name: "Cholera",
    symptoms: ["diarrhea", "dehydration", "vomiting", "muscle cramps"],
  },
  {
    name: "Malaria",
    symptoms: ["fever", "chills", "muscle and joint pain", "sweating", "nausea and vomiting"],
  },
  {
    name: "Typhoid Fever",
    symptoms: ["fever", "abdominal pain", "weakness", "loss of appetite", "skin rashes", "headache"],
  },
  {
    name: "Lassa Fever",
    symptoms: [
      "sore throat",
      "chest pain",
      "vomiting",
      "headache",
      "fever",
      "bleeding or hemorrhaging",
      "muscle and joint pain",
    ],
  },
  {
    name: "Yellow Fever",
    symptoms: ["fever", "chills", "headache", "muscle and joint pain", "nausea and vomiting"],
  },
  {
    name: "Diarrhea",
    symptoms: ["fever", "abdominal cramps", "vomiting", "dehydration"],
  },
  {
    name: "Guinea Worm Disease",
    symptoms: ["lesions", "fever", "nausea and vomiting", "swelling and pain around the region"],
  },
  {
    name: "Measles",
    symptoms: ["fever", "coughing", "running nose", "red eyes", "skin rashes"],
  },
  {
    name: "Stroke",
    symptoms: [
      "sudden weakness/numbness in face/arm/leg",
      "trouble speaking",
      "trouble seeing",
      "dizziness",
      "loss of balance",
    ],
  },
  {
    name: "Smallpox",
    symptoms: ["skin rashes", "raised bumps", "lesions"],
  },
]

// Normalize symptoms function
function normalizeSymptoms(symptoms: string[]): string[] {
  return symptoms
    .map((symptom) => symptom.toLowerCase().trim())
    .filter((symptom, index, array) => array.indexOf(symptom) === index) // Remove duplicates
}

// Main matching function
export function matchSymptoms(userSymptoms: string[]): DiagnosisResult[] {
  const normalizedUserSymptoms = normalizeSymptoms(userSymptoms)
  const results: DiagnosisResult[] = []

  for (const disease of diseaseDatabase) {
    const matchedSymptoms: string[] = []

    // Check each user symptom against disease symptoms
    for (const userSymptom of normalizedUserSymptoms) {
      for (const diseaseSymptom of disease.symptoms) {
        if (userSymptom.toLowerCase() === diseaseSymptom.toLowerCase()) {
          matchedSymptoms.push(diseaseSymptom)
          break
        }
      }
    }

    if (matchedSymptoms.length > 0) {
      const matchPercentage = (matchedSymptoms.length / disease.symptoms.length) * 100

      results.push({
        disease: disease.name,
        matchPercentage,
        matchedSymptoms,
        totalSymptoms: disease.symptoms.length,
      })
    }
  }

  // Sort by match percentage (descending) and return only matches with > 0%
  return results.filter((result) => result.matchPercentage > 0).sort((a, b) => b.matchPercentage - a.matchPercentage)
}
