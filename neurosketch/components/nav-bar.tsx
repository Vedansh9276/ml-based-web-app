"use client"

import Link from "next/link"
import { useState } from "react"
import { Brain, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">Neurosketch</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground/80 hover:text-primary transition-colors">
                Services
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Brain Wellness Scan</DropdownMenuItem>
                <DropdownMenuItem>Cognitive Assessment</DropdownMenuItem>
                <DropdownMenuItem>Neural Monitoring</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
            <Button>Book Scan</Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
            <Link href="/" className="block px-3 py-2 text-foreground/80 hover:text-primary">
              Home
            </Link>
            <Link href="/services" className="block px-3 py-2 text-foreground/80 hover:text-primary">
              Services
            </Link>
            <Link href="/about" className="block px-3 py-2 text-foreground/80 hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-foreground/80 hover:text-primary">
              Contact
            </Link>
            <Button className="w-full mt-4">Book Scan</Button>
          </div>
        </div>
      )}
    </nav>
  )
}

