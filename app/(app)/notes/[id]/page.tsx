"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Note } from "@/lib/types"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import { ArrowLeft, Brain, Lightbulb, FileText, Sparkles } from "lucide-react"
import Link from "next/link"

export default function NoteDetailPage() {
  const params = useParams()
  const router = useRouter()

  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch(`/api/notes/${params.id}`)
        const data = await res.json()
        setNote(data)
      } catch (error) {
        console.error("Failed to load note:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center py-16 text-muted-foreground">
        Loading note...
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-muted-foreground">Note not found</p>
        <Button variant="outline" onClick={() => router.push("/notes")}>
          Back to Notes
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">
            {note.title}
          </h2>

          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">{note.subject}</Badge>

            <span className="text-xs text-muted-foreground">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Button size="sm" asChild>
          <Link href={`/quizzes?noteId=${note.id}`}>
            <Brain className="mr-2 h-4 w-4" />
            Generate Quiz
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="structured">

        <TabsList>
          <TabsTrigger value="structured">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Structured Notes
          </TabsTrigger>

          <TabsTrigger value="extracted">
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            Extracted Text
          </TabsTrigger>

          <TabsTrigger value="concepts">
            <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
            Key Concepts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structured" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {note.content || ""}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extracted" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">OCR Extracted Text</CardTitle>
              <CardDescription>
                Raw text extracted from {note.fileName}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md bg-muted p-4">
                <p className="whitespace-pre-wrap font-mono text-sm">
                  {note.extractedText}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="mt-4">

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Key Concepts</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3">
                {(note.keyConcepts || []).map((concept, i) => (
                  <div key={i} className="flex items-center gap-3 border p-3 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Summary</CardTitle>
            </CardHeader>

            <CardContent>
              <p>{note.summary}</p>
            </CardContent>
          </Card>

        </TabsContent>

      </Tabs>
    </div>
  )
}