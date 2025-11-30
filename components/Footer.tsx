import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FooterProps {
  siteName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ siteName, year }) => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <LucideIcon name="globe" className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm">&copy; {year} {siteName}. All rights reserved.</span>
        </div>
        <nav aria-label="Footer navigation" className="mt-2 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;