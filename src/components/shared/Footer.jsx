import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Copyright Text */}
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          © {currentYear} MyBlog. All Rights Reserved.
        </div>

        {/* Navigation and Social Links */}
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <Link to="/about" className="text-sm hover:underline">About</Link>
          <Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer