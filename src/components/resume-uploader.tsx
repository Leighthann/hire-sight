"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { FileText, Upload, X, Check, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeUploaderProps {
  onUploadComplete?: (files: File[]) => void
  maxFiles?: number
}

type FileWithPreview = File & {
  preview?: string
  progress: number
  status: "uploading" | "complete" | "error"
  error?: string
}

export function ResumeUploader({ onUploadComplete, maxFiles = 10 }: ResumeUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        toast({
          title: "Maximum files exceeded",
          description: `You can only upload up to ${maxFiles} files at once.`,
          variant: "destructive",
        })
        return
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading" as const,
        }),
      )

      setFiles((prev) => [...prev, ...newFiles])
    },
    [files.length, maxFiles, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview || "")
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setIsUploading(true)

    try {
      // Simulate file upload with progress
      for (let i = 0; i < files.length; i++) {
        if (files[i].status === "complete") continue

        // Update progress in steps
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          setFiles((prev) => {
            const newFiles = [...prev]
            newFiles[i].progress = progress
            return newFiles
          })
        }

        // Mark as complete
        setFiles((prev) => {
          const newFiles = [...prev]
          newFiles[i].status = "complete"
          return newFiles
        })
      }

      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} resume${files.length > 1 ? "s" : ""}.`,
      })

      if (onUploadComplete) {
        onUploadComplete(files)
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive",
      })

      // Mark failed files
      setFiles((prev) =>
        prev.map((file) => (file.status === "uploading" ? { ...file, status: "error", error: "Upload failed" } : file)),
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors dark:border-gray-700",
          isDragActive && "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload
            className={cn("mb-2 h-10 w-10 text-gray-400", isDragActive && "text-brand-500 dark:text-brand-400")}
          />
          <h3 className="mb-1 text-lg font-semibold">{isDragActive ? "Drop the files here" : "Upload Resumes"}</h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Drag & drop resume files or click to browse</p>
          <Button type="button" size="sm">
            Select Files
          </Button>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 5MB</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-background p-4">
            <h4 className="mb-4 text-sm font-medium">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-brand-500" />
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === "uploading" && (
                      <div className="flex w-24 items-center">
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    )}
                    {file.status === "complete" && <Check className="h-5 w-5 text-green-500" />}
                    {file.status === "error" && (
                      <div className="flex items-center text-red-500">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        <span className="text-xs">{file.error}</span>
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={uploadFiles} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload All"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

