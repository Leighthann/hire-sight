"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Upload, X, Check, AlertCircle, Loader2, FileType } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeUploaderProps {
  onUploadComplete?: (files: File[]) => void
}

type FileWithPreview = File & {
  preview?: string
  progress: number
  status: "uploading" | "complete" | "error"
  error?: string
}

export function ResumeUploader({ onUploadComplete }: ResumeUploaderProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    // Only take the first file
    const newFile = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0]),
      progress: 0,
      status: "uploading" as const,
    })

    setFile(newFile)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  const removeFile = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }

  const uploadFile = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // Simulate file upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setFile((prev) => {
          if (!prev) return null
          return { ...prev, progress }
        })
      }

      // Mark as complete
      setFile((prev) => {
        if (!prev) return null
        return { ...prev, status: "complete" }
      })

      toast({
        title: "Upload complete",
        description: "Your resume has been uploaded successfully.",
      })

      if (onUploadComplete) {
        onUploadComplete([file])
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume.",
        variant: "destructive",
      })

      // Mark as failed
      setFile((prev) => {
        if (!prev) return null
        return { ...prev, status: "error", error: "Upload failed" }
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (extension === "pdf") {
      return (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500/20 text-red-400">
          <FileText className="h-5 w-5" />
        </div>
      )
    } else if (extension === "doc" || extension === "docx") {
      return (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/20 text-blue-400">
          <FileText className="h-5 w-5" />
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500/20 text-gray-400">
          <FileType className="h-5 w-5" />
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-6 transition-colors",
          isDragActive && "border-brand-400 bg-brand-950/50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className={cn("mb-2 h-10 w-10 text-gray-500", isDragActive && "text-brand-400")} />
          <h3 className="mb-1 text-lg font-semibold text-white">
            {isDragActive ? "Drop your resume here" : "Upload Your Resume"}
          </h3>
          <p className="mb-4 text-sm text-gray-400">Drag & drop your resume or click to browse</p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className="flex items-center rounded-full bg-red-500/20 border border-red-700 px-3 py-1 text-xs text-red-300">
              PDF
            </div>
            <div className="flex items-center rounded-full bg-blue-500/20 border border-blue-700 px-3 py-1 text-xs text-blue-300">
              DOC
            </div>
            <div className="flex items-center rounded-full bg-blue-500/20 border border-blue-700 px-3 py-1 text-xs text-blue-300">
              DOCX
            </div>
          </div>
          <Button type="button" size="sm" className="bg-gradient-primary">
            Select File
          </Button>
          <p className="mt-2 text-xs text-gray-500">Maximum file size: 5MB</p>
        </div>
      </div>

      {file && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileIcon(file.name)}
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {file.status === "uploading" && (
                  <div className="flex w-24 items-center">
                    <Progress value={file.progress} className="h-2 bg-gray-700" />
                  </div>
                )}
                {file.status === "complete" && <Check className="h-5 w-5 text-green-400" />}
                {file.status === "error" && (
                  <div className="flex items-center text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    <span className="text-xs">{file.error}</span>
                  </div>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  disabled={isUploading}
                  className="hover:bg-gray-700 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={uploadFile}
              disabled={isUploading || file.status === "complete"}
              className="bg-gradient-primary"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : file.status === "complete" ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Uploaded
                </>
              ) : (
                "Upload Resume"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

