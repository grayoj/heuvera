'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#7B4F3A] text-[#F8F7F2] py-12 px-6"
      aria-label="Website Footer"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h4 className="text-xl font-bold mb-4">Heuvera</h4>
          <p className="text-sm opacity-80">
            Your virtual gateway to exceptional real estate discoveries.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h5 className="font-semibold mb-3 border-b pb-2 border-[#E3E2D9]">
            Navigation
          </h5>
          <ul className="space-y-2">
            <li>
              <Link
                href="/discover"
                className="hover:text-[#E3E2D9] transition-colors"
              >
                Discover
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="hover:text-[#E3E2D9] transition-colors"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                className="hover:text-[#E3E2D9] transition-colors"
              >
                Marketplace
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h5 className="font-semibold mb-3 border-b pb-2 border-[#E3E2D9]">
            Support
          </h5>
          <ul className="space-y-2">
            <li>
              <Link
                href="/help"
                className="hover:text-[#E3E2D9] transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#E3E2D9] transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-[#E3E2D9] transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h5 className="font-semibold mb-3 border-b pb-2 border-[#E3E2D9]">
            Connect
          </h5>
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://facebook.com/heuvera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#F8F7F2] hover:text-[#E3E2D9] transition-colors"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="https://twitter.com/heuvera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-[#F8F7F2] hover:text-[#E3E2D9] transition-colors"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="https://instagram.com/heuvera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#F8F7F2] hover:text-[#E3E2D9] transition-colors"
            >
              <Instagram size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 pt-6 border-t border-[#E3E2D9] text-center text-sm">
        <p>&copy; {currentYear} Heuvera. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
