import type { LightbulbIcon as LucideProps } from "lucide-react"

export const Video = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 7 16 12 23 17 23 7z" />
    <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
  </svg>
)

