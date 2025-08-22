"use client"

import { ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <>
            {/* Add your providers here */}
            {/* Example: */}
            {/* <ThemeProvider> */}
            {/*   <AuthProvider> */}
            {/*     <QueryClientProvider client={queryClient}> */}
            {children}
            {/*     </QueryClientProvider> */}
            {/*   </AuthProvider> */}
            {/* </ThemeProvider> */}
        </>
    )
}
