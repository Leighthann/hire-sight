export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="animate-pulse">
        {/* Header */}
        <div className="h-8 w-64 bg-gray-700 rounded mb-6"></div>

        {/* Profile card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
            <div className="ml-4">
              <div className="h-6 w-48 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-5 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="h-8 w-full bg-gray-700 rounded mb-4"></div>
              <div className="h-5 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="h-8 w-full bg-gray-700 rounded mb-4"></div>
            </div>
            <div>
              <div className="h-5 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="h-8 w-full bg-gray-700 rounded mb-4"></div>
              <div className="h-5 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="h-8 w-full bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Skills card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>

        {/* Experience card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="h-6 w-48 bg-gray-700 rounded mb-4"></div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="mb-6">
              <div className="h-5 w-64 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Education card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="h-6 w-40 bg-gray-700 rounded mb-4"></div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <div className="h-5 w-64 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

