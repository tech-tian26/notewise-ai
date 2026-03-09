import type {
  Note,
  Quiz,
  QuizAttempt,
  StudyTask,
  StudyProgress,
  TopicStrength,
  VoiceMessage,
  ActivityItem,
  User,
} from "./types"

export const mockUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@notewise.ai",
  avatar: "AJ",
  createdAt: "2025-09-15",
}

export const mockNotes: Note[] = [
  {
    id: "note-1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    content: `# Newton's Laws of Motion\n\n## First Law (Law of Inertia)\nAn object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force.\n\n## Second Law\nThe acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.\n\n**Formula:** F = ma\n\nWhere:\n- F = Force (Newtons)\n- m = Mass (kg)\n- a = Acceleration (m/s^2)\n\n## Third Law\nFor every action, there is an equal and opposite reaction.\n\n### Key Concepts\n- Inertia is the resistance of any physical object to any change in its velocity\n- Net force is the sum of all forces acting on an object\n- Mass is different from weight`,
    extractedText:
      "Newton's Laws of Motion. First Law - An object at rest stays at rest. Second Law - F equals ma. Third Law - Every action has an equal and opposite reaction.",
    keyConcepts: [
      "Inertia",
      "Net Force",
      "F = ma",
      "Action-Reaction Pairs",
      "Mass vs Weight",
    ],
    summary:
      "Newton's three laws describe the relationship between forces and motion. The first law defines inertia, the second quantifies force as F=ma, and the third establishes that forces come in equal and opposite pairs.",
    fileType: "image",
    fileName: "physics_notes_scan.jpg",
    createdAt: "2026-02-20T10:30:00Z",
    updatedAt: "2026-02-20T10:35:00Z",
  },
  {
    id: "note-2",
    title: "Neural Network Fundamentals",
    subject: "Machine Learning",
    content: `# Neural Network Fundamentals\n\n## Architecture\nNeural networks consist of layers of interconnected nodes (neurons).\n\n### Layer Types\n1. **Input Layer**: Receives raw data\n2. **Hidden Layers**: Process information through weighted connections\n3. **Output Layer**: Produces the final result\n\n## Activation Functions\n- **ReLU**: f(x) = max(0, x)\n- **Sigmoid**: f(x) = 1 / (1 + e^(-x))\n- **Tanh**: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))\n\n## Backpropagation\nThe algorithm used to train neural networks by computing gradients of the loss function with respect to each weight.\n\n### Steps:\n1. Forward pass: compute predictions\n2. Compute loss\n3. Backward pass: compute gradients\n4. Update weights using gradient descent`,
    extractedText:
      "Neural Network Fundamentals. Architecture consists of input, hidden, and output layers. Key activation functions include ReLU, Sigmoid, and Tanh.",
    keyConcepts: [
      "Neurons and Layers",
      "Activation Functions",
      "Backpropagation",
      "Gradient Descent",
      "Loss Function",
    ],
    summary:
      "Neural networks are composed of layers of neurons that process information. They learn through backpropagation, adjusting weights to minimize a loss function using gradient descent.",
    fileType: "pdf",
    fileName: "ml_chapter_3.pdf",
    createdAt: "2026-02-22T14:00:00Z",
    updatedAt: "2026-02-22T14:10:00Z",
  },
  {
    id: "note-3",
    title: "Organic Chemistry: Functional Groups",
    subject: "Chemistry",
    content: `# Organic Chemistry: Functional Groups\n\n## Hydroxyl Group (-OH)\nFound in alcohols. Makes molecules polar and capable of hydrogen bonding.\n\n## Carbonyl Group (C=O)\n- **Aldehyde**: Carbonyl at the end of a carbon chain\n- **Ketone**: Carbonyl within a carbon chain\n\n## Carboxyl Group (-COOH)\nFound in carboxylic acids. Acts as an acid by donating H+.\n\n## Amine Group (-NH2)\nFound in amines and amino acids. Acts as a base by accepting H+.\n\n## Key Reactions\n- Esterification: Alcohol + Carboxylic Acid -> Ester + Water\n- Oxidation of alcohols: Primary -> Aldehyde -> Carboxylic Acid`,
    extractedText:
      "Functional Groups in Organic Chemistry. Hydroxyl, Carbonyl, Carboxyl, and Amine groups with their properties and reactions.",
    keyConcepts: [
      "Hydroxyl Group",
      "Carbonyl Group",
      "Carboxyl Group",
      "Amine Group",
      "Esterification",
    ],
    summary:
      "Functional groups determine the chemical properties of organic molecules. Key groups include hydroxyl (alcohols), carbonyl (aldehydes/ketones), carboxyl (acids), and amine (bases).",
    fileType: "image",
    fileName: "chem_notes_page1.png",
    createdAt: "2026-02-25T09:15:00Z",
    updatedAt: "2026-02-25T09:20:00Z",
  },
  {
    id: "note-4",
    title: "Linear Algebra: Matrices",
    subject: "Mathematics",
    content: `# Linear Algebra: Matrices\n\n## Matrix Operations\n\n### Addition\nMatrices must have the same dimensions. Add corresponding elements.\n\n### Multiplication\nNumber of columns in first matrix must equal number of rows in second.\n(m x n) * (n x p) = (m x p)\n\n## Determinant\nFor a 2x2 matrix [[a,b],[c,d]]: det = ad - bc\n\n## Inverse\nA matrix A has an inverse if det(A) is not 0.\nA^(-1) = (1/det(A)) * adj(A)\n\n## Eigenvalues and Eigenvectors\nAv = lambda * v\nWhere lambda is the eigenvalue and v is the eigenvector.\n\n### Finding Eigenvalues\nSolve: det(A - lambda*I) = 0`,
    extractedText:
      "Linear Algebra - Matrices. Operations include addition and multiplication. Key concepts: determinant, inverse, eigenvalues and eigenvectors.",
    keyConcepts: [
      "Matrix Operations",
      "Determinant",
      "Matrix Inverse",
      "Eigenvalues",
      "Eigenvectors",
    ],
    summary:
      "Matrices are rectangular arrays of numbers with operations like addition, multiplication, and inversion. Eigenvalues and eigenvectors are fundamental concepts for understanding linear transformations.",
    fileType: "pdf",
    fileName: "linear_algebra_ch5.pdf",
    createdAt: "2026-03-01T11:00:00Z",
    updatedAt: "2026-03-01T11:05:00Z",
  },
  {
    id: "note-5",
    title: "Data Structures: Trees and Graphs",
    subject: "Computer Science",
    content: `# Data Structures: Trees and Graphs\n\n## Binary Trees\nEach node has at most two children (left and right).\n\n### Types\n- **Binary Search Tree (BST)**: Left child < parent < right child\n- **AVL Tree**: Self-balancing BST\n- **Red-Black Tree**: Self-balancing with color properties\n\n### Traversals\n1. **In-order**: Left -> Root -> Right\n2. **Pre-order**: Root -> Left -> Right\n3. **Post-order**: Left -> Right -> Root\n\n## Graphs\nConsist of vertices (V) and edges (E).\n\n### Representations\n- Adjacency Matrix: O(V^2) space\n- Adjacency List: O(V + E) space\n\n### Algorithms\n- BFS: Uses queue, O(V + E)\n- DFS: Uses stack/recursion, O(V + E)\n- Dijkstra's: Shortest path, O(V^2) or O(E log V) with heap`,
    extractedText:
      "Data Structures - Trees and Graphs. Binary trees, BST, AVL trees. Graph representations and algorithms including BFS, DFS, and Dijkstra.",
    keyConcepts: [
      "Binary Search Tree",
      "Tree Traversals",
      "Graph Representations",
      "BFS and DFS",
      "Dijkstra's Algorithm",
    ],
    summary:
      "Trees are hierarchical data structures with various types (BST, AVL, Red-Black). Graphs connect vertices with edges and can be traversed using BFS or DFS. Dijkstra's algorithm finds shortest paths.",
    fileType: "txt",
    fileName: "cs_notes.txt",
    createdAt: "2026-03-03T16:30:00Z",
    updatedAt: "2026-03-03T16:35:00Z",
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    noteId: "note-1",
    noteTitle: "Newton's Laws of Motion",
    subject: "Physics",
    title: "Newton's Laws Quiz",
    difficulty: "medium",
    createdAt: "2026-02-21T08:00:00Z",
    questions: [
      {
        id: "q1-1",
        question: "What does Newton's First Law describe?",
        type: "mcq",
        options: [
          "The relationship between force and acceleration",
          "The tendency of objects to resist changes in motion",
          "The equal and opposite reaction forces",
          "The gravitational attraction between masses",
        ],
        correctAnswer: 1,
        explanation:
          "Newton's First Law (Law of Inertia) states that objects resist changes in their state of motion unless acted upon by an external force.",
      },
      {
        id: "q1-2",
        question: "In the equation F = ma, what does 'a' represent?",
        type: "mcq",
        options: ["Area", "Amplitude", "Acceleration", "Angular velocity"],
        correctAnswer: 2,
        explanation:
          "In F = ma, 'a' represents acceleration, measured in meters per second squared (m/s^2).",
      },
      {
        id: "q1-3",
        question:
          "Newton's Third Law states that forces always come in equal and opposite pairs.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "This is correct. For every action force, there is an equal and opposite reaction force.",
      },
      {
        id: "q1-4",
        question:
          "If a 5 kg object has an acceleration of 3 m/s^2, what is the net force?",
        type: "mcq",
        options: ["8 N", "15 N", "1.67 N", "2 N"],
        correctAnswer: 1,
        explanation:
          "Using F = ma: F = 5 kg x 3 m/s^2 = 15 N.",
      },
      {
        id: "q1-5",
        question: "Mass and weight are the same thing.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation:
          "Mass is the amount of matter in an object (measured in kg), while weight is the force of gravity on an object (measured in Newtons). Weight = mg.",
      },
    ],
  },
  {
    id: "quiz-2",
    noteId: "note-2",
    noteTitle: "Neural Network Fundamentals",
    subject: "Machine Learning",
    title: "Neural Networks Quiz",
    difficulty: "hard",
    createdAt: "2026-02-23T10:00:00Z",
    questions: [
      {
        id: "q2-1",
        question: "Which activation function returns max(0, x)?",
        type: "mcq",
        options: ["Sigmoid", "Tanh", "ReLU", "Softmax"],
        correctAnswer: 2,
        explanation:
          "ReLU (Rectified Linear Unit) is defined as f(x) = max(0, x). It outputs 0 for negative inputs and x for positive inputs.",
      },
      {
        id: "q2-2",
        question:
          "Backpropagation computes gradients of the loss function with respect to each weight.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "Backpropagation calculates the gradient of the loss function with respect to each weight, allowing the network to learn.",
      },
      {
        id: "q2-3",
        question:
          "What is the correct order of steps in training a neural network?",
        type: "mcq",
        options: [
          "Backward pass, Forward pass, Update weights, Compute loss",
          "Forward pass, Compute loss, Backward pass, Update weights",
          "Compute loss, Forward pass, Backward pass, Update weights",
          "Forward pass, Backward pass, Compute loss, Update weights",
        ],
        correctAnswer: 1,
        explanation:
          "The training process follows: Forward pass (compute predictions) -> Compute loss -> Backward pass (compute gradients) -> Update weights.",
      },
      {
        id: "q2-4",
        question:
          "The output of a Sigmoid function always lies between 0 and 1.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "The Sigmoid function f(x) = 1/(1+e^(-x)) maps any real number to a value between 0 and 1.",
      },
      {
        id: "q2-5",
        question: "Which layer type receives the raw input data?",
        type: "mcq",
        options: [
          "Output Layer",
          "Hidden Layer",
          "Input Layer",
          "Convolution Layer",
        ],
        correctAnswer: 2,
        explanation:
          "The input layer is the first layer in a neural network and receives the raw data.",
      },
    ],
  },
  {
    id: "quiz-3",
    noteId: "note-5",
    noteTitle: "Data Structures: Trees and Graphs",
    subject: "Computer Science",
    title: "Trees & Graphs Quiz",
    difficulty: "medium",
    createdAt: "2026-03-04T09:00:00Z",
    questions: [
      {
        id: "q3-1",
        question: "In a Binary Search Tree, the left child is always:",
        type: "mcq",
        options: [
          "Greater than the parent",
          "Equal to the parent",
          "Less than the parent",
          "A leaf node",
        ],
        correctAnswer: 2,
        explanation:
          "In a BST, the left child node always has a value less than its parent node.",
      },
      {
        id: "q3-2",
        question:
          "BFS (Breadth-First Search) uses a stack data structure.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation:
          "BFS uses a queue (FIFO), not a stack. DFS is the algorithm that uses a stack or recursion.",
      },
      {
        id: "q3-3",
        question: "What is the space complexity of an adjacency matrix?",
        type: "mcq",
        options: ["O(V)", "O(E)", "O(V^2)", "O(V + E)"],
        correctAnswer: 2,
        explanation:
          "An adjacency matrix requires O(V^2) space where V is the number of vertices.",
      },
      {
        id: "q3-4",
        question:
          "Which tree traversal visits nodes in the order: Left, Root, Right?",
        type: "mcq",
        options: ["Pre-order", "Post-order", "In-order", "Level-order"],
        correctAnswer: 2,
        explanation:
          "In-order traversal visits: Left subtree -> Root -> Right subtree.",
      },
      {
        id: "q3-5",
        question:
          "Dijkstra's algorithm can handle edges with negative weights.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation:
          "Dijkstra's algorithm does not work correctly with negative edge weights. Bellman-Ford should be used instead.",
      },
    ],
  },
]

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: "attempt-1",
    quizId: "quiz-1",
    answers: [1, 2, 0, 1, 1],
    score: 5,
    totalQuestions: 5,
    completedAt: "2026-02-22T09:30:00Z",
  },
  {
    id: "attempt-2",
    quizId: "quiz-2",
    answers: [2, 0, 1, 0, 2],
    score: 4,
    totalQuestions: 5,
    completedAt: "2026-02-24T15:00:00Z",
  },
]

export const mockStudyProgress: StudyProgress[] = (() => {
  const data: StudyProgress[] = []
  const baseDate = new Date("2026-03-01")
  for (let i = 29; i >= 0; i--) {
    const d = new Date(baseDate)
    d.setDate(d.getDate() - i)
    data.push({
      date: d.toISOString().split("T")[0],
      minutesStudied: Math.floor(Math.random() * 120) + 15,
      notesReviewed: Math.floor(Math.random() * 4),
      quizzesCompleted: Math.floor(Math.random() * 3),
    })
  }
  return data
})()

export const mockTopicStrengths: TopicStrength[] = [
  { topic: "Newton's Laws", strength: 88, subject: "Physics" },
  { topic: "Neural Networks", strength: 72, subject: "Machine Learning" },
  { topic: "Functional Groups", strength: 55, subject: "Chemistry" },
  { topic: "Matrices", strength: 65, subject: "Mathematics" },
  { topic: "Trees & Graphs", strength: 80, subject: "Computer Science" },
  { topic: "Backpropagation", strength: 48, subject: "Machine Learning" },
  { topic: "Thermodynamics", strength: 42, subject: "Physics" },
  { topic: "Probability", strength: 70, subject: "Mathematics" },
]

export const mockStudyTasks: StudyTask[] = [
  {
    id: "task-1",
    title: "Review Newton's Laws",
    description: "Revisit key formulas and solve practice problems",
    type: "review",
    subject: "Physics",
    duration: 25,
    priority: "medium",
    completed: true,
    scheduledFor: "2026-03-05",
  },
  {
    id: "task-2",
    title: "Take Neural Networks Quiz",
    description: "Test your understanding of activation functions and backpropagation",
    type: "quiz",
    subject: "Machine Learning",
    duration: 15,
    priority: "high",
    completed: false,
    scheduledFor: "2026-03-05",
  },
  {
    id: "task-3",
    title: "Revise Functional Groups",
    description: "Focus on weak areas: esterification and oxidation reactions",
    type: "revise",
    subject: "Chemistry",
    duration: 30,
    priority: "high",
    completed: false,
    scheduledFor: "2026-03-05",
  },
  {
    id: "task-4",
    title: "Listen to Matrices Summary",
    description: "Audio review of eigenvalues and eigenvectors",
    type: "listen",
    subject: "Mathematics",
    duration: 10,
    priority: "low",
    completed: false,
    scheduledFor: "2026-03-05",
  },
  {
    id: "task-5",
    title: "Practice Graph Algorithms",
    description: "Work through BFS and DFS examples step by step",
    type: "review",
    subject: "Computer Science",
    duration: 20,
    priority: "medium",
    completed: false,
    scheduledFor: "2026-03-05",
  },
  {
    id: "task-6",
    title: "Backpropagation Deep Dive",
    description: "Strengthen weak topic with focused study session",
    type: "revise",
    subject: "Machine Learning",
    duration: 35,
    priority: "high",
    completed: false,
    scheduledFor: "2026-03-06",
  },
  {
    id: "task-7",
    title: "Thermodynamics Review",
    description: "Review first and second laws, entropy concepts",
    type: "review",
    subject: "Physics",
    duration: 25,
    priority: "high",
    completed: false,
    scheduledFor: "2026-03-06",
  },
]

export const mockVoiceHistory: VoiceMessage[] = [
  {
    id: "voice-1",
    role: "user",
    content: "Explain Newton's Second Law in simple terms",
    timestamp: "2026-03-04T14:00:00Z",
  },
  {
    id: "voice-2",
    role: "assistant",
    content:
      "Newton's Second Law says that the more force you apply to something, the faster it accelerates. Think of pushing a shopping cart: an empty cart accelerates quickly with a small push, but a full cart needs a much bigger push to move the same way. The formula F = ma captures this: Force equals mass times acceleration. So heavier objects need more force to achieve the same acceleration.",
    timestamp: "2026-03-04T14:00:05Z",
  },
  {
    id: "voice-3",
    role: "user",
    content: "What is the difference between supervised and unsupervised learning?",
    timestamp: "2026-03-04T14:05:00Z",
  },
  {
    id: "voice-4",
    role: "assistant",
    content:
      "Great question! In supervised learning, you train a model with labeled data, meaning each example has a known correct answer. It's like studying with an answer key. In unsupervised learning, the model works with unlabeled data and tries to find hidden patterns on its own, like sorting a pile of mixed items without being told what the categories are. Supervised learning is used for tasks like image classification and spam detection, while unsupervised learning is used for clustering and dimensionality reduction.",
    timestamp: "2026-03-04T14:05:08Z",
  },
]

export const mockActivityFeed: ActivityItem[] = [
  {
    id: "act-1",
    type: "note_upload",
    title: "Uploaded new notes",
    description: "Data Structures: Trees and Graphs",
    timestamp: "2026-03-03T16:30:00Z",
  },
  {
    id: "act-2",
    type: "quiz_complete",
    title: "Completed quiz",
    description: "Neural Networks Quiz - Score: 80%",
    timestamp: "2026-02-24T15:00:00Z",
  },
  {
    id: "act-3",
    type: "study_session",
    title: "Study session",
    description: "45 minutes on Linear Algebra",
    timestamp: "2026-03-02T20:00:00Z",
  },
  {
    id: "act-4",
    type: "quiz_complete",
    title: "Completed quiz",
    description: "Newton's Laws Quiz - Score: 100%",
    timestamp: "2026-02-22T09:30:00Z",
  },
  {
    id: "act-5",
    type: "plan_complete",
    title: "Completed study plan",
    description: "Finished all 5 tasks for the day",
    timestamp: "2026-03-01T21:00:00Z",
  },
  {
    id: "act-6",
    type: "note_upload",
    title: "Uploaded new notes",
    description: "Organic Chemistry: Functional Groups",
    timestamp: "2026-02-25T09:15:00Z",
  },
]

export const subjects = [
  "Physics",
  "Machine Learning",
  "Chemistry",
  "Mathematics",
  "Computer Science",
]
