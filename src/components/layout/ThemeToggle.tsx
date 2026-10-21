'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark theme"
      className={`grid size-9 place-items-center text-muted transition-colors hover:text-ink ${className}`}
    >
      <Sun className="hidden size-4 transition-transform duration-500 ease-out-expo hover:rotate-45 dark:block" aria-hidden="true" />
      <Moon className="size-4 transition-transform duration-500 ease-out-expo hover:-rotate-12 dark:hidden" aria-hidden="true" />
    </button>
  )
}
