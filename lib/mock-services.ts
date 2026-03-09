import type { Note, Quiz, QuizQuestion } from "./types"

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const sampleOCRTexts: Record<string, string> = {
  default: `The process of photosynthesis converts light energy into chemical energy. Plants use chlorophyll in their chloroplasts to absorb sunlight. The light-dependent reactions occur in the thylakoid membranes, producing ATP and NADPH. The Calvin cycle then uses these molecules to fix carbon dioxide into glucose.

Key equations:
6CO2 + 6H2O + light energy -> C6H12O6 + 6O2

Factors affecting photosynthesis:
1. Light intensity
2. Carbon dioxide concentration
3. Temperature
4. Water availability`,
}

export async function processOCR(
  _file: File,
  onProgress?: (progress: number) => void
): Promise<{ extractedText: string; confidence: number }> {
  const steps = [10, 25, 40, 55, 70, 85, 95, 100]
  for (const step of steps) {
    await delay(300)
    onProgress?.(step)
  }
  return {
    extractedText: sampleOCRTexts.default,
    confidence: 0.94,
  }
}

export async function generateStructuredNotes(
  extractedText: string,
  _fileName: string
): Promise<Partial<Note>> {
  await delay(1500)

  const title = "Photosynthesis: Light and Dark Reactions"
  const keyConcepts = [
    "Chlorophyll & Light Absorption",
    "Light-Dependent Reactions",
    "Calvin Cycle",
    "ATP and NADPH",
    "Carbon Fixation",
  ]
  const summary =
    "Photosynthesis is a two-stage process where light energy is converted to chemical energy. The light-dependent reactions in thylakoid membranes produce ATP and NADPH, which power the Calvin cycle to convert CO2 into glucose."
  const content = `# ${title}\n\n## Overview\n${summary}\n\n## Light-Dependent Reactions\nThese occur in the thylakoid membranes of chloroplasts:\n- Chlorophyll absorbs light energy\n- Water molecules are split (photolysis)\n- ATP and NADPH are produced\n- Oxygen is released as a byproduct\n\n## Calvin Cycle (Light-Independent Reactions)\nThese occur in the stroma:\n1. **Carbon fixation**: CO2 is attached to RuBP by RuBisCO\n2. **Reduction**: ATP and NADPH convert the resulting molecules to G3P\n3. **Regeneration**: RuBP is regenerated to continue the cycle\n\n## Key Formula\n6CO2 + 6H2O + light energy -> C6H12O6 + 6O2\n\n## Factors Affecting Rate\n- Light intensity\n- CO2 concentration\n- Temperature\n- Water availability\n\n---\n*Extracted from: ${extractedText.substring(0, 50)}...*`

  return {
    title,
    content,
    extractedText,
    keyConcepts,
    summary,
  }
}

export async function generateQuiz(
  note: Note,
  config: { numQuestions: number; difficulty: "easy" | "medium" | "hard" }
): Promise<Quiz> {
  await delay(2000)

  const questions: QuizQuestion[] = [
    {
      id: `gen-q-1`,
      question: `What is a key concept in ${note.subject}?`,
      type: "mcq",
      options: [
        note.keyConcepts[0] || "Concept A",
        "Incorrect Option A",
        "Incorrect Option B",
        "Incorrect Option C",
      ],
      correctAnswer: 0,
      explanation: `${note.keyConcepts[0]} is a fundamental concept covered in "${note.title}".`,
    },
    {
      id: `gen-q-2`,
      question: `The topic "${note.title}" is part of the ${note.subject} curriculum.`,
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: `This note is categorized under ${note.subject}.`,
    },
    {
      id: `gen-q-3`,
      question: `Which of the following best describes the content of "${note.title}"?`,
      type: "mcq",
      options: [
        note.summary.substring(0, 60) + "...",
        "An unrelated topic about cooking techniques",
        "A guide to modern art movements",
        "Instructions for building furniture",
      ],
      correctAnswer: 0,
      explanation: note.summary,
    },
    {
      id: `gen-q-4`,
      question: `"${note.keyConcepts[1] || "Secondary concept"}" is discussed in this material.`,
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: `${note.keyConcepts[1] || "This concept"} is one of the key concepts extracted from the notes.`,
    },
    {
      id: `gen-q-5`,
      question: `How many key concepts were identified in "${note.title}"?`,
      type: "mcq",
      options: [
        String(note.keyConcepts.length),
        String(note.keyConcepts.length + 2),
        String(note.keyConcepts.length - 1),
        String(note.keyConcepts.length + 5),
      ],
      correctAnswer: 0,
      explanation: `The AI identified ${note.keyConcepts.length} key concepts in this material.`,
    },
  ]

  return {
    id: `quiz-gen-${Date.now()}`,
    noteId: note.id,
    noteTitle: note.title,
    subject: note.subject,
    title: `${note.title} - Generated Quiz`,
    questions: questions.slice(0, config.numQuestions),
    difficulty: config.difficulty,
    createdAt: new Date().toISOString(),
  }
}

export async function askAIQuestion(question: string): Promise<string> {
  await delay(1800)

  const responses: Record<string, string> = {
    default: `That's a great question! Based on your study materials, here's what I can explain:\n\nThe concept you're asking about relates to fundamental principles in your coursework. Let me break it down:\n\n1. First, consider the basic definition and how it connects to what you've already learned.\n2. The key relationship here involves understanding how different variables interact.\n3. In practical terms, this means you should focus on the underlying mechanisms rather than just memorizing formulas.\n\nWould you like me to go deeper into any specific aspect, or would you prefer some practice questions on this topic?`,
  }

  const lowerQ = question.toLowerCase()
  if (lowerQ.includes("newton") || lowerQ.includes("force") || lowerQ.includes("motion")) {
    return "Newton's laws form the foundation of classical mechanics. The First Law tells us that objects maintain their state of motion unless acted upon by a force - this is inertia. The Second Law, F=ma, quantifies how force relates to mass and acceleration. The Third Law tells us that forces always come in equal and opposite pairs. For example, when you push against a wall, the wall pushes back on you with equal force. These laws explain everything from why a ball rolls to how rockets work!"
  }
  if (lowerQ.includes("neural") || lowerQ.includes("network") || lowerQ.includes("machine learning")) {
    return "Neural networks are inspired by how biological brains work. They consist of layers of interconnected nodes. Data flows through the input layer, gets processed by hidden layers that apply weights and activation functions, and produces results at the output layer. The network learns by adjusting these weights through backpropagation - essentially, it looks at its errors and works backward to figure out which weights to change. Think of it like tuning hundreds of little dials until the output matches what you want."
  }
  if (lowerQ.includes("tree") || lowerQ.includes("graph") || lowerQ.includes("algorithm")) {
    return "Trees and graphs are fundamental data structures. A tree is a special type of graph with no cycles - think of a family tree or folder structure. Binary Search Trees are especially useful because they keep data sorted, allowing O(log n) search time. Graphs are more general - they model any kind of relationships, like social networks or road maps. BFS explores level by level (like ripples in a pond), while DFS goes as deep as possible first (like exploring a maze by always turning the same direction)."
  }

  return responses.default
}

export async function generateStudyPlan(): Promise<string> {
  await delay(1200)
  return "Your study plan has been updated based on your latest quiz results and learning patterns. Focus areas have been adjusted to strengthen weak topics."
}
