"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

type Book = {
  title: string;
  author: string;
  description: string;
  reviews: Array<{
    comment: string;
    rating: number;
  }>;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function AddBook() {
  const [adding, setAdding] = useState(false);
  const [book, setBook] = useState<Book | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setAdding(true);
      const response = await axios.post("http://localhost:3000/add-book", data);
      setBook(response.data);
      form.reset();
      alert("Book added successfully!");
    } catch (error) {
      alert("Error adding book");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-2xl font-bold mb-6">Add New Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="input w-full p-2 border rounded"
                    placeholder="Enter book title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="input w-full p-2 border rounded"
                    placeholder="Enter author name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter book description"
                    className="w-full p-2 border rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={adding} className="w-full">
            {adding ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </Form>
      {book && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold">Book Added:</h2>
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
        </div>
      )}
    </div>
  );
}
