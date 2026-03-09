"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NoteCard } from "@/components/notes/note-card"
import { UploadDialog } from "@/components/notes/upload-dialog"
import type { Note } from "@/lib/types"
import { Plus, Search } from "lucide-react"
import { toast } from "sonner"

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState("")
  const [subjectFilter, setSubjectFilter] = useState<string>("all")
  const [uploadOpen, setUploadOpen] = useState(false)

  async function fetchNotes() {
    const res = await fetch("/api/notes")
    const data = await res.json()

    console.log("API NOTES:", data)
    // ensure notes is always an array
    if (Array.isArray(data)) {
      setNotes(data)
    } else {
      setNotes([])
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const filtered = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.subject.toLowerCase().includes(search.toLowerCase())

    const matchesSubject =
      subjectFilter === "all" || note.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  function handleNoteCreated() {
    fetchNotes()
    toast.success("Note processed successfully!")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Notes
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload and manage your study notes
          </p>
        </div>

        <Button onClick={() => setUploadOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Notes
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16">
          <p className="text-sm text-muted-foreground">No notes found</p>

          <Button variant="outline" size="sm" onClick={() => setUploadOpen(true)}>
            Upload your first note
          </Button>
        </div>
      )}

      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onNoteCreated={handleNoteCreated}
      />
    </div>
  )
}