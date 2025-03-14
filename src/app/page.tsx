import Link from "next/link"
import Image from "next/image"
import { BookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Book {
  id: string
  title: string
  author: string
  description: string
  coverImage: string
}

// Mock data for books
const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of decadence and excess",
    coverImage: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A story of justice and innocence",
    coverImage: "/placeholder.svg?height=200&width=150",
  },
]

export default function BooksPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookIcon className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold">Book Reviews</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Books</span>
          <Link href="/add-book">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add Book</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="mb-4">
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    width={150}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500 mt-1">{book.description}</p>
                <p className="text-xs text-gray-400 mt-2">5 reviews</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

