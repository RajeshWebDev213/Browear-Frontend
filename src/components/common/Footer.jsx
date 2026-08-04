import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-black">
              BROWEAR
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              Premium men's fashion crafted with
              comfort, quality, and timeless style.
            </p>

          </div>

          {/* Shop */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-500">

              <li>
                <Link
                  to="/topwear"
                  className="hover:text-black transition"
                >
                  Topwear
                </Link>
              </li>

              <li>
                <Link
                  to="/bottomwear"
                  className="hover:text-black transition"
                >
                  Bottomwear
                </Link>
              </li>

              <li>
                <Link
                  to="/footwear"
                  className="hover:text-black transition"
                >
                  Footwear
                </Link>
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-500">

              <li>
                <Link
                  to="/contact"
                  className="hover:text-black transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="hover:text-black transition"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="hover:text-black transition"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-black transition"
                >
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-500">

              <div className="flex items-center gap-3">

                <Mail size={18} />

                support@browear.com

              </div>

              <div className="flex items-center gap-3">

                <Phone size={18} />

                +91 98765 43210

              </div>

              <div className="flex items-start gap-3">

                <MapPin size={18} />

                India

              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="p-2 rounded-full border hover:bg-black hover:text-white transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="p-2 rounded-full border hover:bg-black hover:text-white transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="p-2 rounded-full border hover:bg-black hover:text-white transition"
              >
                <Twitter size={18} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BROWEAR. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed with ❤️ for modern men.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;