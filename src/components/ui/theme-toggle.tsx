import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Toggles the persisted application theme between light and dark modes.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <Button
      aria-label={`Switch to ${nextTheme} mode`}
      className={cn("shrink-0", className)}
      onClick={toggleTheme}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
