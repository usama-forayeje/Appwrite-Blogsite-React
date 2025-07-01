import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "../providers/ThemeProvider"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./dropdown-menu"

export function ThemeToggle() {
  const { theme, themes, setTheme } = useTheme()

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Palette },
  ]

  const colorThemes = [
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Theme Mode</DropdownMenuLabel>
        {themeOptions.map((option) => {
          const Icon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={theme === option.value ? "bg-accent" : ""}
            >
              <Icon className="mr-2 h-4 w-4" />
              {option.label}
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Themes</DropdownMenuLabel>
        {colorThemes.map((colorTheme) => (
          <DropdownMenuItem
            key={colorTheme.value}
            onClick={() => setTheme(colorTheme.value)}
            className={theme === colorTheme.value ? "bg-accent" : ""}
          >
            <div className={`mr-2 h-4 w-4 rounded-full ${colorTheme.color}`} />
            {colorTheme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
