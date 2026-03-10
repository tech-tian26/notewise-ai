"use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { useAuth } from "@/lib/auth-context"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { BookOpen, Brain, Mic, BarChart3 } from "lucide-react"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const { login, isLoading } = useAuth()
//   const router = useRouter()

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError("")
//     try {
//       await login(email, password)
//       router.push("/dashboard")
//     } catch {
//       setError("Invalid credentials. Please try again.")
//     }
//   }


//   return (
//     <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4">
//       <div className="flex w-full max-w-sm flex-col gap-8">
//         <div className="flex flex-col items-center gap-3">
//           <div className="flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//               <Brain className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <span className="text-2xl font-bold tracking-tight text-foreground">
//               NoteWise AI
//             </span>
//           </div>
//           <p className="text-center text-sm text-muted-foreground text-balance">
//             Transform your notes into knowledge with AI
//           </p>
//         </div>

//         <Card>
//           <CardHeader className="pb-4">
//             <CardTitle className="text-lg">Sign in to your account</CardTitle>
//             <CardDescription>
//               Enter your credentials to continue studying
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="flex flex-col gap-4">
//               {error && (
//                 <p className="text-sm text-destructive">{error}</p>
//               )}
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col px-6 pb-6 pt-0">
//               <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </Button>
//               <p className="mt-3 text-sm text-muted-foreground">
//                 {"Don't have an account? "}
//                 <Link
//                   href="/signup"
//                   className="font-medium text-primary underline-offset-4 hover:underline"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </CardFooter>
//           </form>
//         </Card>

//         <div className="grid grid-cols-2 gap-3">
//           {[
//             { icon: BookOpen, label: "Smart Notes" },
//             { icon: Brain, label: "AI Quizzes" },
//             { icon: Mic, label: "Voice Q&A" },
//             { icon: BarChart3, label: "Analytics" },
//           ].map((feature) => (
//             <div
//               key={feature.label}
//               className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground"
//             >
//               <feature.icon className="h-4 w-4 text-primary" />
//               {feature.label}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// For login bypass
import { redirect } from "next/navigation"

export default function LoginPage() {
  redirect("/dashboard")
}
