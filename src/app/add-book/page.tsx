"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AddBookPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log({ title, author, description })

    // Redirect to the books page
    router.push("/")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookIcon className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold">Book Reviews</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-sm text-gray-500">Books</span>
          </Link>
          <Link href="/add-book">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Add Book</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Add Book
          </Button>
        </form>
      </div>
    </div>
  )
}

