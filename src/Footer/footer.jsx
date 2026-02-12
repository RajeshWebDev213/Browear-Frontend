import React from 'react'

function Footer() {
  return (
    <div>
         <footer className="bg-[#111111]  text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Browear Fashion</h2>
          <p className="text-gray-300 text-sm">
            Premium Men's Wear — Style, Comfort & Confidence.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Jeans</li>
            <li>Formal Wear</li>
            <li>Winter Collection</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Contact Us</li>
            <li>Order Tracking</li>
            <li>Returns & Refunds</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Browear Fashion — Men's Wear Only. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer