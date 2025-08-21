import { Target } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="pt-8 pb-6 bg-gray-800 text-muted-foreground">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        <div>
          <Link href="/" className="flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-300" />
            <h1 className="text-xl text-white font-semibold uppercase">
              Issue Tracker
            </h1>
          </Link>
          <p className="text-sm text-white text-opacity-70 max-w-xs mt-2 text-justify">
            A simple and efficient tool designed to help interns and teams log,
            track, and manage issues throughout the development process.
          </p>

          <div className="mt-4 flex items-center space-x-3">
            <a
              href="https://facebook.com"
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebook className="text-white" />
            </a>
            <a
              href="https://twitter.com"
              className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer">
              <FaTwitter className="text-white" />
            </a>
            <a
              href="https://youtube.com"
              className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer">
              <FaYoutube className="text-white" />
            </a>
            <a
              href="https://instagram.com"
              className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer">
              <FaInstagram className="text-white" />
            </a>
          </div>
        </div>

        {/* Second Part of Footer - About Us */}
        <div className="max-w-[120px]">
          <h2 className="text-sm font-semibold text-white uppercase mb-4">
            About Us
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-sm text-white hover:text-blue-300">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm text-white hover:text-blue-300">
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/policy"
                className="text-sm text-white hover:text-blue-300">
                Policy
              </Link>
            </li>
          </ul>
        </div>
        {/* Third Part of Footer */}
        <div>
          <h2 className="text-sm font-semibold text-white uppercase mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/logbook"
                className="text-sm text-white hover:text-blue-300">
                Logbook
              </Link>
            </li>
            <li>
              <Link
                href="/summary"
                className="text-sm text-white hover:text-blue-300">
                Summary
              </Link>
            </li>
            <li>
              <Link
                href="/how-to"
                className="text-sm text-white hover:text-blue-300">
                How to Use
              </Link>
            </li>
          </ul>
        </div>
        {/* Fourth Part of Footer */}
        <div>
          <h2 className="text-sm font-semibold text-white uppercase mb-4">
            Contact
          </h2>
          <ul className="space-y-2">
            <li>
              <p className="text-sm text-white hover:text-blue-300">
                +977-9805671231
              </p>
            </li>
            <li>
              <p className="text-sm text-white hover:text-blue-300">
                bikrambk2244@gmail.com
              </p>
            </li>
            <li>
              <p className="text-sm text-white hover:text-blue-300">
                Kathmandu, Nepal
              </p>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-6 border-white border-opacity-10 w-[90%] mx-auto" />
      <div className="w-[90%] mx-auto">
        <span className="text-sm text-white opacity-50">
          COPYRIGHT BY BIKRAM LUHAR - {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default Footer;
