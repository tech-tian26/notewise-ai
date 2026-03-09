"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Image, FileType, File } from "lucide-react"
import type { Note } from "@/lib/types"

const fileIcons: Record<string, any> = {
  pdf: FileText,
  image: Image,
  docx: FileType,
  txt: File,
  pptx: FileType,
}

const subjectColors: Record<string, string> = {
  Physics: "bg-blue-500/10 text-blue-500",
  "Machine Learning": "bg-purple-500/10 text-purple-500",
  Chemistry: "bg-emerald-500/10 text-emerald-500",
  Mathematics: "bg-amber-500/10 text-amber-500",
  "Computer Science": "bg-rose-500/10 text-rose-500",
  General: "bg-primary/10 text-primary",
}

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {

  const fileType = (note as any).fileType || "pdf"
  const Icon = fileIcons[fileType] || FileText

  const createdDate =
    (note as any).created_at || (note as any).createdAt

  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="group h-full transition-colors hover:border-primary/30 hover:bg-accent/50">

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>

            <Badge
              variant="secondary"
              className={subjectColors[note.subject] || subjectColors["General"]}
            >
              {note.subject || "General"}
            </Badge>

          </div>

          <CardTitle className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
            {note.title}
          </CardTitle>
        </CardHeader>

        <CardContent>

          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {note.summary || note.content?.slice(0, 120)}
          </p>

          <div className="flex items-center justify-between">

            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {fileType}
            </span>

            <span className="text-[10px] text-muted-foreground">
              {createdDate
                ? new Date(createdDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </span>

          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
