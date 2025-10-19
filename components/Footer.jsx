"use client";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return { user };
};

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="flex justify-center items-center space-x-6 mb-2 text-sm border-b border-gray-700 pb-4">
          <span className="text-gray-300 font-semibold">
            {user ? `Welcome, ${user.name}` : "Sachin Rameshchandra Pal"}
          </span>

          <a href="https://github.com/9889sachin" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-orange-400 transition">
            GitHub
          </a>

          <a href="https://www.linkedin.com/in/sachinpal21/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-orange-400 transition">
            LinkedIn
          </a>
        </div>

        <div className="text-center text-sm text-gray-500 pt-4">
          © {new Date().getFullYear()} MyRestaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
