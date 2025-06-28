import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, PlusCircle, Link } from "lucide-react";

function MobileNav() {
  return (
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium mt-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link to="/create-post" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <PlusCircle className="h-5 w-5" />
            Create Post
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav