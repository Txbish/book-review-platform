import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-white shadow-lg p-5 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <BookOpen className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          <span className="text-blue-600">Book</span> Reviews
        </h1>
      </div>
      <div className="space-x-3 flex">
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 rounded-full">
            Books
          </Button>
        </Link>
        <Link href="/add-book">
          <Button
            variant="outline"
            className="hover:text-blue-600 transition-colors border-blue-200 rounded-full px-6"
          >
            Add Book
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
