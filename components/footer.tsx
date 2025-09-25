"use client"

import { Phone, Mail, Facebook, Youtube, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-muted mt-8 sm:mt-16">
      {/* Contact Section */}
      <div className="bg-primary text-primary-foreground py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8 text-center md:text-left">
            {/* Hotline Support */}
            <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4">
              <div className="bg-primary-foreground/20 p-3 rounded-full">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Hotline Support</h3>
                <p className="text-base sm:text-lg font-bold">0903.166.228</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4">
              <div className="bg-primary-foreground/20 p-3 rounded-full">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Email Us</h3>
                <p className="text-sm sm:text-base font-bold break-all">cs@namanmarket.com.vn</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h3>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer"
                  onClick={() => window.open("https://facebook.com/namanmarket", "_blank")}
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer"
                  onClick={() => window.open("https://youtube.com/namanmarket", "_blank")}
                >
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer"
                  onClick={() => window.open("https://twitter.com/namanmarket", "_blank")}
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer"
                  onClick={() => window.open("https://instagram.com/namanmarket", "_blank")}
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Payment Methods</h3>
              <div className="flex items-center gap-2">
                <div className="bg-white text-gray-800 rounded px-2 py-1 text-xs font-semibold">QR</div>
                <div className="bg-pink-500 text-white rounded px-2 py-1 text-xs font-semibold">momo</div>
                <div className="bg-orange-500 text-white rounded px-2 py-1 text-xs font-semibold">MC</div>
                <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-semibold">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              Membership Policy
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              Naman Market News
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              Delivery & Return Policy
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              Discover
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              Recruitment
            </a>
          </div>

          {/* Company Info */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2">
            <p className="leading-relaxed">
              Spice Market International Investment Corporation, 21 Thao Dien Street, Thao Dien Ward, District 2, Ho Chi
              Minh City.
            </p>
            <p>Hotline: 0903.166.228. Email: customerservice@spicemarket.com.vn</p>
            <p>0311897914 issued by HCMC Department of Planning and Investment on 26/07/2012.</p>
            <p>Contact for product development and cooperation: luan.l@spicemarket.com.vn</p>
          </div>

          {/* Trust Badge and Language */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs font-semibold text-center">
              ĐÃ THÔNG BÁO
              <br />
              BỘ CÔNG THƯƠNG
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground border-primary hover:bg-primary/90 soft-button text-xs sm:text-sm cursor-pointer"
            >
              🌐 English
            </Button>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
            <div className="text-xs text-muted-foreground">Payment methods:</div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="bg-white border rounded px-1.5 sm:px-2 py-1 text-xs font-semibold">MOMO</div>
              <div className="bg-orange-500 text-white rounded px-1.5 sm:px-2 py-1 text-xs font-semibold">
                MasterCard
              </div>
              <div className="bg-blue-600 text-white rounded px-1.5 sm:px-2 py-1 text-xs font-semibold">VISA</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
            Copyright © 2023 Spice Market
          </div>
        </div>
      </div>
    </footer>
  )
}
