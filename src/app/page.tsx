"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const BookReviewsPage = () => {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    try {
      const response = await axios.get("/api/books"); // Update URL as needed
      setBooks(response.data); // Use response.data directly
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {books.map((book, index) => (
          <Link href={`/book/${index}`} key={index}>
            <Card className="shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                alt={book.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-500 mt-2">{book.description}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {book.reviews} reviews
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookReviewsPage;
