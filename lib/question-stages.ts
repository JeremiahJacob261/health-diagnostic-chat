export interface Option {
  label: string
  children?: Option[]
}

// Age group options
export const ageGroupOptions: Option[] = [
  { label: "Infant (0-1 year)" },
  { label: "Toddler (1-3 years)" },
  { label: "Child (4-12 years)" },
  { label: "Adolescent (13-17 years)" },
  { label: "Young Adult (18-35 years)" },
  { label: "Middle-aged Adult (36-55 years)" },
  { label: "Older Adult (56-69 years)" },
  { label: "Elderly (70+ years)" },
]

// Gender options
export const genderOptions: Option[] = [
  { label: "Male" },
  { label: "Female" },
  { label: "Non-binary" },
  { label: "Prefer not to specify" },
]

// Symptom options based on the disease database
export const symptomOptions: Option[] = [
  { label: "Fever" },
  { label: "Fatigue" },
  { label: "Weight loss" },
  { label: "Swollen lymph nodes" },
  { label: "Skin rashes" },
  { label: "Lesions" },
  { label: "Recurring infections" },
  { label: "Coughing" },
  { label: "Chest pain" },
  { label: "Night sweats" },
  { label: "Chills" },
  { label: "Diarrhea" },
  { label: "Dehydration" },
  { label: "Vomiting" },
  { label: "Muscle cramps" },
  { label: "Muscle and joint pain" },
  { label: "Sweating" },
  { label: "Nausea and vomiting" },
  { label: "Abdominal pain" },
  { label: "Weakness" },
  { label: "Loss of appetite" },
  { label: "Headache" },
  { label: "Sore throat" },
  { label: "Bleeding or hemorrhaging" },
  { label: "Abdominal cramps" },
  { label: "Swelling and pain around the region" },
  { label: "Running nose" },
  { label: "Red eyes" },
  { label: "Sudden weakness/numbness in face/arm/leg" },
  { label: "Trouble speaking" },
  { label: "Trouble seeing" },
  { label: "Dizziness" },
  { label: "Loss of balance" },
  { label: "Raised bumps" },
]
