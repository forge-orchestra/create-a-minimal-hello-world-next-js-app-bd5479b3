import { FC } from 'react';
import Link from 'next/link';
import { Home, Info } from 'lucide-react';

interface HeaderProps {
  links: { href: string; label: string }[];
}

const Header: FC<HeaderProps> = ({ links }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <a className="flex items-center space-x-2" aria-label="Home">
              <Home className="w-6 h-6" />
              <span>Forge-app</span>
            </a>
          </Link>
        </div>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a className="text-gray-700 hover:text-gray-900" aria-label={link.label}>
                  {link.label}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/about">
              <a className="flex items-center space-x-2 text-gray-700 hover:text-gray-900" aria-label="About">
                <Info className="w-5 h-5" />
                <span>About</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;