<<<<<<< HEAD:src/components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
=======
// "use client"

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"

// interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
//   children: React.ReactNode;
// }

// export function ThemeProvider({
//   children,
//   ...props
// }: ThemeProviderProps) {
//   return (
//     <NextThemesProvider 
//       attribute="class"
//       defaultTheme="dark"
//       enableSystem={false}
//       disableTransitionOnChange
//       {...props}
//     >
//       {children}
//     </NextThemesProvider>
//   )
// }
>>>>>>> 7c6a667 (clean up):src/Components/theme-provider.tsx
