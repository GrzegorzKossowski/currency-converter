import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // TODO:
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
