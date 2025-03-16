"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { Star } from "lucide-react";

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
  rating: z.number().int().min(1).max(5),
  comment: z
    .string()
    .min(1, {
      message: "Comment is required",
    })
    .max(1000, {
      message: "Comment must be less than 1000 characters",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(
          `http://localhost:3000/book/${params.id}`
        );
        const data = response.data;
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  const onSubmit = async (data: FormData) => {
    if (!book) return;

    setSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/book/${params.id}/review`,
        data
      );

      setBook({
        ...book,
        reviews: [...book.reviews, data],
      });

      form.reset();
      setShowReviewForm(false);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const RatingInput = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className="focus:outline-none"
            aria-label={`Rate ${rating} stars`}
          >
            <Star
              className={`h-6 w-6 ${
                rating <= value
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

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
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt={book.title}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {book.reviews.length > 0 ? (
              book.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>

            {!showReviewForm ? (
              <Button onClick={() => setShowReviewForm(true)} className="mt-2">
                Write a Review
              </Button>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 border p-4 rounded-md"
                >
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <RatingInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Review</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your thoughts about this book..."
                            className="resize-none min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Review"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
