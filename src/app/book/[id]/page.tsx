"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  publishedDate: string;
  rating: number;
  reviews: Array<{
    id: string;
    user: string;
    comment: string;
    rating: number;
    date: string;
  }>;
};

export default function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/books/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }

  if (!book) {
    return <div className="flex justify-center p-10">Book not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative h-80 w-full">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <div className="mt-4 text-center">
            <div className="text-xl font-bold">Rating: {book.rating}/5</div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>
          <p className="text-sm text-gray-500 mb-4">
            Published: {book.publishedDate}
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {book.reviews.length > 0 ? (
              book.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <div className="font-semibold">{review.user}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="mb-2">Rating: {review.rating}/5</div>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
            {/* Review form would go here */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
