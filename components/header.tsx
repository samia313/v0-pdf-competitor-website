'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FileText, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { categories, pdfTools } from '@/lib/tools-data'
import { ToolIcon } from './tool-icon'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            PDF<span className="text-primary">Master</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {categories.slice(0, 4).map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  {category.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {pdfTools
                  .filter((tool) => tool.category === category.id)
                  .map((tool) => (
                    <DropdownMenuItem key={tool.id} asChild>
                      <Link href={tool.href} className="flex items-center gap-3 cursor-pointer">
                        <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                          <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">{tool.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Link href="/tools">
            <Button variant="ghost">All Tools</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">
                  PDF<span className="text-primary">Master</span>
                </span>
              </Link>
              
              {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    {category.name}
                  </h3>
                  <div className="space-y-1">
                    {pdfTools
                      .filter((tool) => tool.category === category.id)
                      .map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary transition-colors"
                        >
                          <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                            <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{tool.name}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
