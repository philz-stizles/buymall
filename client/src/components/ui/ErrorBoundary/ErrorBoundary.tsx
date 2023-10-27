import React, { Component, PropsWithChildren } from 'react'

type Props = {}

type State = {
    hasError: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
  state = {
    hasError: false
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // This would be triggered
    // whenever an error occurs in any of its child components
  }

  render() {
    const { hasError } = this.state
    if(hasError) {
        return <p>Something went wrong</p>
    }

    return this.props.children;
  }
}

export default ErrorBoundary