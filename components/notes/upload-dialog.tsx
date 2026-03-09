"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, Loader2 } from "lucide-react"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNoteCreated: () => void
}

export function UploadDialog({
  open,
  onOpenChange,
  onNoteCreated,
}: UploadDialogProps) {

  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState("")

  const handleFile = useCallback((f: File) => {
    setFile(f)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)

      const f = e.dataTransfer.files[0]
      if (f) handleFile(f)
    },
    [handleFile]
  )

  async function handleUpload() {

    if (!file) return

    setProcessing(true)
    setProgress(0)

    setStage("Preparing document...")

    // fallback text (stable for now)
    const extractedText = `Study notes extracted from file: ${file.name}`

    setStage("Generating AI notes...")

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 10, 90))
    }, 300)

    try {

      const res = await fetch("/api/ai/generate-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: extractedText,
          fileName: file.name,
        }),
      })

      if (!res.ok) {
        throw new Error("AI generation failed")
      }

      await res.json()

      clearInterval(interval)
      setProgress(100)

      // refresh notes list
      onNoteCreated()

      setTimeout(() => {
        setProcessing(false)
        setFile(null)
        setProgress(0)
        setStage("")
        onOpenChange(false)
      }, 800)

    } catch (err) {

      console.error("Upload failed:", err)

      clearInterval(interval)
      setProcessing(false)
      setStage("Failed to process file")
    }
  }

  function reset() {
    setFile(null)
    setProcessing(false)
    setProgress(0)
    setStage("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!processing) {
          onOpenChange(o)
          if (!o) reset()
        }
      }}
    >

      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Upload Notes</DialogTitle>
          <DialogDescription>
            Upload PDFs, images, or documents for AI note generation
          </DialogDescription>
        </DialogHeader>

        {!processing ? (

          <div className="flex flex-col gap-4">

            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-5 w-5 text-primary" />
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drag and drop your file here
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, Images, DOCX, TXT, or PPTX
                </p>
              </div>

              <label>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.docx,.txt,.pptx"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleFile(f)
                  }}
                />

                <span className="cursor-pointer text-sm font-medium text-primary hover:underline">
                  Browse files
                </span>

              </label>

            </div>

            {file && (

              <div className="flex items-center gap-3 rounded-lg border border-border bg-accent/50 p-3">

                <FileText className="h-5 w-5 text-primary" />

                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>

              </div>

            )}

            <Button
              className="w-full"
              disabled={!file}
              onClick={handleUpload}
            >
              Process with AI
            </Button>

          </div>

        ) : (

          <div className="flex flex-col items-center gap-4 py-4">

            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{stage}</p>
              <p className="text-xs text-muted-foreground">
                This may take a moment
              </p>
            </div>

            <Progress value={progress} className="w-full" />

          </div>

        )}

      </DialogContent>
    </Dialog>
  )
}