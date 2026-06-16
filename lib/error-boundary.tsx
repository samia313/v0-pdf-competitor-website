'use client'

import React, { ReactNode, ErrorInfo } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[v0] Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full">
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
                <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
