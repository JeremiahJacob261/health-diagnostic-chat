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
  { label: "Prefer not to specify" },
]

// Duration options
export const durationOptions: Option[] = [
  { label: "Acute (less than 24 hours)" },
  { label: "Recent (1-3 days)" },
  { label: "Short-term (4-7 days)" },
  { label: "Moderate (1-2 weeks)" },
  { label: "Extended (2-4 weeks)" },
  { label: "Chronic (1-6 months)" },
  { label: "Long-term (over 6 months)" },
  { label: "Intermittent" },
  { label: "Recurring" },
]

// Exposure options
export const exposureOptions: Option[] = [
  { label: "International travel" },
  { label: "Domestic travel" },
  { label: "Urban exposure" },
  { label: "Rural exposure" },
  { label: "Wilderness/camping" },
  { label: "Sick individuals" },
  { label: "Healthcare settings" },
  { label: "Animals" },
  { label: "Insects/ticks" },
  { label: "Mold exposure" },
  { label: "Chemical exposure" },
  { label: "Radiation exposure" },
  { label: "Allergen exposure" },
  { label: "Extreme weather" },
  { label: "Unusual food" },
  { label: "Contaminated food" },
  { label: "Untreated water" },
  { label: "Recreational drugs" },
  { label: "Vaccination/recent immunization" },
  { label: "None" },
]

// Symptom options (hierarchical)
export const symptomOptions: Option[] = [
  {
    label: "Pain",
    children: [
      {
        label: "Headache",
        children: [
          { label: "Migraine-like" },
          { label: "Tension-like" },
          { label: "Cluster-like" },
          { label: "Sinus-related" },
          { label: "After injury" },
          { label: "With visual aura" },
          { label: "Pulsating" },
        ],
      },
      {
        label: "Chest Pain",
        children: [
          { label: "Sharp and stabbing" },
          { label: "Pressure or squeezing" },
          { label: "Burning sensation" },
          { label: "Triggered by breathing" },
          { label: "Radiating to arm or jaw" },
          { label: "Worse with exertion" },
          { label: "Relieved by rest" },
        ],
      },
      {
        label: "Abdominal Pain",
        children: [
          { label: "Upper right quadrant" },
          { label: "Upper left quadrant" },
          { label: "Lower right quadrant" },
          { label: "Lower left quadrant" },
          { label: "Generalized" },
          { label: "Cramping" },
          { label: "Colicky" },
          { label: "After meals" },
          { label: "With bloating" },
        ],
      },
      {
        label: "Joint Pain",
        children: [
          { label: "Knees" },
          { label: "Hips" },
          { label: "Shoulders" },
          { label: "Wrists" },
          { label: "Ankles" },
          { label: "Multiple joints" },
          { label: "Swelling" },
          { label: "Stiffness" },
        ],
      },
      {
        label: "Back Pain",
        children: [
          { label: "Upper back" },
          { label: "Middle back" },
          { label: "Lower back" },
          { label: "Radiating to legs" },
          { label: "After injury" },
          { label: "Chronic" },
          { label: "Worse with movement" },
          { label: "Improved with rest" },
        ],
      },
    ],
  },
  {
    label: "Respiratory Issues",
    children: [
      {
        label: "Shortness of Breath",
        children: [
          { label: "At rest" },
          { label: "During exertion" },
          { label: "When lying down" },
          { label: "Sudden onset" },
          { label: "Gradual onset" },
          { label: "Worsens at night" },
        ],
      },
      {
        label: "Cough",
        children: [
          { label: "Dry" },
          { label: "Productive with phlegm" },
          { label: "With blood" },
          { label: "Nighttime" },
          { label: "After eating" },
          { label: "With wheezing" },
        ],
      },
      {
        label: "Wheezing",
        children: [
          { label: "During exertion" },
          { label: "At rest" },
          { label: "With allergies" },
          { label: "With cold symptoms" },
          { label: "Intermittent" },
        ],
      },
    ],
  },
  {
    label: "Digestive Issues",
    children: [
      {
        label: "Nausea",
        children: [
          { label: "With vomiting" },
          { label: "Without vomiting" },
          { label: "After eating" },
          { label: "With dizziness" },
          { label: "Worse in morning" },
        ],
      },
      {
        label: "Diarrhea",
        children: [
          { label: "Acute" },
          { label: "Chronic" },
          { label: "With blood" },
          { label: "With mucus" },
          { label: "After eating" },
          { label: "Watery" },
        ],
      },
      {
        label: "Constipation",
        children: [
          { label: "Acute" },
          { label: "Chronic" },
          { label: "With pain" },
          { label: "With bloating" },
          { label: "Straining" },
          { label: "Incomplete evacuation" },
        ],
      },
      {
        label: "Bloating",
        children: [
          { label: "After meals" },
          { label: "With gas" },
          { label: "With pain" },
          { label: "Constant" },
          { label: "Worse in evening" },
        ],
      },
    ],
  },
  {
    label: "Neurological Symptoms",
    children: [
      {
        label: "Dizziness",
        children: [
          { label: "Vertigo (spinning)" },
          { label: "Lightheadedness" },
          { label: "When standing up" },
          { label: "Constant" },
          { label: "With headache" },
          { label: "With nausea" },
        ],
      },
      {
        label: "Numbness or Tingling",
        children: [
          { label: "In hands" },
          { label: "In feet" },
          { label: "On one side of body" },
          { label: "In face" },
          { label: "Spreading" },
          { label: "Sudden onset" },
        ],
      },
      {
        label: "Memory Issues",
        children: [
          { label: "Short-term memory" },
          { label: "Long-term memory" },
          { label: "Word-finding difficulty" },
          { label: "Confusion" },
          { label: "Gradual onset" },
          { label: "With disorientation" },
        ],
      },
      {
        label: "Vision Changes",
        children: [
          { label: "Blurred vision" },
          { label: "Double vision" },
          { label: "Partial vision loss" },
          { label: "Flashes of light" },
          { label: "Floaters" },
          { label: "Sudden loss of vision" },
        ],
      },
    ],
  },
  {
    label: "Skin Issues",
    children: [
      {
        label: "Rash",
        children: [
          { label: "Itchy" },
          { label: "Non-itchy" },
          { label: "Raised" },
          { label: "Flat" },
          { label: "With blisters" },
          { label: "Spreading" },
          { label: "Peeling" },
        ],
      },
      {
        label: "Discoloration",
        children: [
          { label: "Redness" },
          { label: "Yellowing" },
          { label: "Darkening" },
          { label: "Lightening" },
          { label: "Bruising" },
        ],
      },
      {
        label: "Lesions",
        children: [
          { label: "Sores" },
          { label: "Ulcers" },
          { label: "Nodules" },
          { label: "Changing moles" },
          { label: "Crusting" },
        ],
      },
    ],
  },
  {
    label: "General Symptoms",
    children: [
      {
        label: "Fatigue",
        children: [
          { label: "Constant" },
          { label: "Worse in morning" },
          { label: "Worse in evening" },
          { label: "After minimal exertion" },
          { label: "With other symptoms" },
          { label: "Improved with rest" },
        ],
      },
      {
        label: "Fever",
        children: [
          { label: "Low-grade" },
          { label: "High" },
          { label: "Intermittent" },
          { label: "Constant" },
          { label: "With chills" },
          { label: "Night sweats" },
        ],
      },
      {
        label: "Weight Changes",
        children: [
          { label: "Unexplained weight loss" },
          { label: "Unexplained weight gain" },
          { label: "Rapid" },
          { label: "Gradual" },
          { label: "Intentional" },
        ],
      },
      {
        label: "Sleep Issues",
        children: [
          { label: "Insomnia" },
          { label: "Excessive sleeping" },
          { label: "Sleep apnea symptoms" },
          { label: "Nightmares" },
          { label: "Restless sleep" },
          { label: "Frequent waking" },
        ],
      },
    ],
  },
]
