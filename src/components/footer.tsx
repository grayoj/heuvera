import Link from "next/link";
import { HeuveraLogo } from "./logo";

export default function Footer() {
  const footerLinks = [
    {
      title: "COMPANY INFO",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Career", href: "/careers" },
        { text: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "EXPLORE",
      links: [
        { text: "Browse Properties", href: "/browse" },
        { text: "For Rent", href: "/rent" },
        { text: "For Lease", href: "/lease" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { text: "Help Center", href: "/help" },
        { text: "FAQs", href: "/faqs" },
        { text: "Terms & Conditions", href: "/terms" },
        { text: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "User Actions",
      links: [
        { text: "Add Property", href: "/add-property" },
        { text: "Manage Listings", href: "/manage-listings" },
        { text: "Messages", href: "/messages" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
      ),
    },
  ];

  const platformInfo = {
    about: {
      title: "About Our Platform",
      paragraphs: [
        "Our platform makes property listing and management simple and efficient. It's designed to connect property owners with potential clients. Post a property in listed, a prospective client is instantly paired with potential clients. Not a property in listed, a prospective client is instantly paired with potential matches to buyers and renters.",
        "We do not charge any hidden fees or commissions.",
      ],
    },
    howItWorks: {
      title: "How it Works",
      steps: [
        "List Your Property: Submit essential details about your property",
        "Real Time Matching: Our system instantly matches your property with interested parties",
        "Secure Communication: All messages are encrypted securely and directly in your account",
      ],
    },
    whyChooseUs: {
      title: "Why Choose Us?",
      benefits: [
        "User Friendly Experience: Intuitive and easy-to-use platform for all users",
        "Secure & Transparent: Your listings are safe, and we prioritize your privacy and security",
        "No Hidden Fees: We never charge commissions or unexpected costs",
      ],
    },
  };

  return (
    <footer className="bg-[#F8F7F2] dark:bg-[#333333] py-16 px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 relative overflow-hidden">
      <style jsx global>{`
        .animated-underline {
          position: relative;
          display: inline-block;
        }

        .animated-underline::after {
          content: "";
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #7b4f3a;
          transition: width 0.3s ease-in-out;
        }

        .animated-underline:hover::after {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-center mb-12">
          <div className="w-full flex items-center justify-center">
            <HeuveraLogo width={35} height={35} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-[#333333] uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#A7A7A7] hover:text-[#7B4F3A] text-sm animated-underline"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 mt-12 mb-8">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-[#A7A7A7] hover:text-[#7B4F3A] transition-colors"
              aria-label={social.name}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {social.icon}
              </svg>
            </Link>
          ))}
        </div>

        <div className="text-center text-sm text-[#A7A7A7] mt-8">
          © 2025 Heuvera. All Rights Reserved
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <h3 className="font-medium mb-4">{platformInfo.about.title}</h3>
            {platformInfo.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm text-[#A7A7A7] mb-4 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-4">
              {platformInfo.howItWorks.title}
            </h3>
            <ol className="text-sm text-[#A7A7A7] space-y-2">
              {platformInfo.howItWorks.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-medium mr-2">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <h3 className="font-medium mt-8 mb-4">
              {platformInfo.whyChooseUs.title}
            </h3>
            <ul className="text-sm text-[#A7A7A7] space-y-2">
              {platformInfo.whyChooseUs.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
