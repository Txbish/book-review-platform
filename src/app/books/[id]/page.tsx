"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookIcon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: string
  rating: number
  comment: string
  username: string
}

interface Book {
  id: string
  title: string
  author: string
  description: string
  coverImage: string
  reviews: Review[]
}

// Mock data for the book
const book: Book = {
  id: "1",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  description: "A story of decadence and excess",
  coverImage: "/placeholder.svg?height=300&width=200",
  reviews: [
    {
      id: "1",
      rating: 5,
      comment: "This is a great book!",
      username: "reader1",
    },
  ],
}

export default function BookDetailsPage() {
  const [rating, setRating] = useState<string>("5")
  const [comment, setComment] = useState("")
  const [reviews, setReviews] = useState<Review[]>(book.reviews)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    const newReview: Review = {
      id: Date.now().toString(),
      rating: Number.parseInt(rating),
      comment,
      username: "reader" + (reviews.length + 1),
    }

    setReviews([...reviews, newReview])
    setComment("")
    setRating("5")
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

      <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              width={200}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-500 mt-2">{book.description}</p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Reviews</h3>

              <form onSubmit={handleSubmitReview} className="mb-6">
                <div className="mb-4">
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 stars</SelectItem>
                      <SelectItem value="4">4 stars</SelectItem>
                      <SelectItem value="3">3 stars</SelectItem>
                      <SelectItem value="2">2 stars</SelectItem>
                      <SelectItem value="1">1 star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <Textarea
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                  Add Review
                </Button>
              </form>

              {reviews.map((review) => (
                <div key={review.id} className="border-t py-4">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{review.username}</span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

