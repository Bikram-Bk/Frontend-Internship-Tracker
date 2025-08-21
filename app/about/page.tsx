import { BrainCircuit, CheckCircle, Clock, Target } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          About InternTrack
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-justify">
          We believe in working smarter, not harder. InternTrack is designed to
          be your personal productivity partner, helping to understand patterns
          and achieve your goals with clarity.
        </p>
      </header>

      <div className="flex justify-center">
        <div
          className="relative rounded-lg overflow-hidden shadow-lg w-full max-w-4xl mx-auto px-4 md:px-8"
          style={{ aspectRatio: "2.5 / 1" }}>
          <Image
            src="/about__us.jpg"
            alt="About Us"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-primary/30" role="img" />
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">
          Our Mission
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-lg leading-relaxed text-justify">
              In today&apos;s fast-paced world, keeping track of tasks can be
              overwhelming. It&apos;s easy to get lost in a sea of to-do lists
              and lose sight of the bigger picture. Our mission with InternTrack
              is to provide a simple yet powerful tool that not only helps you
              log your activities but also offers valuable insights through
              intelligent analysis. We aim to empower individuals and teams to
              reflect on their weekly efforts, identify patterns, and optimize
              their workflow for maximum efficiency and minimum stress. By
              transforming raw log data into clear summaries and visual charts,
              InternTrack turns reflection into a forward-looking strategy.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-center mb-8">
          <div className="flex-shrink-0">
            <Target className="w-32 h-32 text-primary/70" />
          </div>
        </div>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">
          Core Features
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-accent-foreground" />
              <h3 className="text-xl font-semibold font-headline">
                Structured Logging
              </h3>
            </div>
            <p className="text-gray-700">
              Easily record your tasks for each day of the week, plus any
              pending items. This structured approach ensures no task is
              forgotten and provides a clear basis for review.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <BrainCircuit className="w-8 h-8 text-accent-foreground" />
              <h3 className="text-xl font-semibold font-headline">
                AI-Powered Summaries
              </h3>
            </div>
            <p className="text-gray-700">
              Leverage the power of AI to get a concise summary of your weekly
              activities. Identify key accomplishments and areas of focus
              without manually sifting through your logs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-8 h-8 text-accent-foreground" />
              <h3 className="text-xl font-semibold font-headline">
                Progress Tracker
              </h3>
            </div>
            <p className="text-gray-700">
              Track your weekly progress and internship milestones with clarity.
              Stay on top of your goals and monitor accomplishments in
              real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
