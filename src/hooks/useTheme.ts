'use client'

import { useCallback, useEffect } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

function storedTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * The initial theme is applied by an inline script in the root layout to avoid a flash.
 * The <html data-theme> attribute is the source of truth, so components style the toggle with
 * `dark:` variants instead of React state and server/client markup always match.
 */
export function useTheme() {
  // Follow the OS setting until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  return { toggle }
}
