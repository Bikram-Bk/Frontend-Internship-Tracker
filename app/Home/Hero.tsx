"use client";

import { useAuth } from "../context/auth-context";

export default function Hero() {
  const { authenticated } = useAuth();
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-down">
          Welcome to InternTrack
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up">
          Streamline your productivity. Log your weekly tasks, generate
          insightful summaries with AI, and visualize your progress like never
          before.
        </p>
        <div className="flex justify-center gap-4">
          {!authenticated ? (
            <a
              href="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-transform hover:scale-105">
              Get Started
            </a>
          ) : (
            <a
              href="/logbook"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-transform hover:scale-105">
              Log Book
            </a>
          )}
          <a
            href="/about"
            className="border border-gray-300 px-6 py-3 rounded-md text-lg hover:bg-gray-100 transition-transform hover:scale-105">
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        {/* Card 1: Easy Log Booking */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="mx-auto bg-gray-100 p-4 rounded-full w-fit">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold pt-4">Easy Log Booking</h2>
          <p className="text-gray-600 mt-2">
            A simple and structured interface to log your tasks for every day of
            the week.
          </p>
        </div>

        {/* Card 2: AI-Powered Summaries */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="mx-auto bg-gray-100 p-4 rounded-full w-fit">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold pt-4">AI-Powered Summaries</h2>
          <p className="text-gray-600 mt-2">
            Let our AI analyze your weekly logs and provide you with a concise,
            actionable summary.
          </p>
        </div>

        {/* Card: Progress Tracker */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="mx-auto bg-gray-100 p-4 rounded-full w-fit">
            <svg
              className="h-8 w-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold pt-4">Progress Tracker</h2>
          <p className="text-gray-600 mt-2">
            Monitor your internship journey with detailed progress updates and
            insights.
          </p>
        </div>
      </section>
    </div>
  );
}
