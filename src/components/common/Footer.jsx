import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black">
              BROWEAR
            </h2>
            <span className="mt-3 block h-px w-10 bg-black" />
            <p className="mt-4 text-sm leading-6 text-gray-500">
              Premium men's fashion crafted with comfort, quality, and
              timeless style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              Shop
            </span>
            <ul className="mt-5 space-y-3 text-sm text-gray-500">
              <li>
                <Link to="/topwear" className="transition-colors hover:text-black">
                  Topwear
                </Link>
              </li>
              <li>
                <Link to="/bottomwear" className="transition-colors hover:text-black">
                  Bottomwear
                </Link>
              </li>
              <li>
                <Link to="/footwear" className="transition-colors hover:text-black">
                  Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              Support
            </span>
            <ul className="mt-5 space-y-3 text-sm text-gray-500">
              <li>
                <Link to="/contact" className="transition-colors hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="transition-colors hover:text-black">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-colors hover:text-black">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              Contact
            </span>

            <div className="mt-5 space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-gray-400" />
                support@browear.com
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-gray-400" />
                +91 98765 43210
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-gray-400" />
                India
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              
              <a  href="#"
                className="flex h-9 w-9 items-center justify-center border border-gray-300 text-gray-600 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <Instagram size={16} />
              </a>
              
               <a href="#"
                className="flex h-9 w-9 items-center justify-center border border-gray-300 text-gray-600 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <Facebook size={16} />
              </a>
              
                 <a href="#"
                className="flex h-9 w-9 items-center justify-center border border-gray-300 text-gray-600 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} BROWEAR. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Crafted by hand, for men who care how they look.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;