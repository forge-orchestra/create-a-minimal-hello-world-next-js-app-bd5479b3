'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection: React.FC = () => (
  <section className="bg-blue-500 text-white text-center py-20">
    <h1 className="text-4xl font-bold">Hello World</h1>
    <p className="mt-4 text-lg">Welcome to Forge-app, a minimalistic Next.js application.</p>
  </section>
);

const Features: React.FC = () => (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard icon="CheckCircle" title="Modern Design" description="Responsive and sleek design using Tailwind CSS." />
        <FeatureCard icon="Code" title="TypeScript" description="Type-safe development with TypeScript." />
        <FeatureCard icon="Zap" title="Fast Performance" description="Optimized for speed and efficiency." />
      </div>
    </div>
  </section>
);

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center">
    <Icon className="w-12 h-12 mx-auto text-blue-500" />
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const Page: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div>
      <HeroSection />
      <Features />
    </div>
  );
};

export default Page;