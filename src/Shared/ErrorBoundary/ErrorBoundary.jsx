import React from 'react';

function logErrorToMyService(error, componentStack) {
	// Implement your error logging service here
	console.error('Logging error to my service:', error, componentStack);
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		logErrorToMyService(error, info.componentStack);
	}

	render() {
		const { hasError } = this.state;
		const { fallback, children } = this.props;
		if (hasError) {
			// You can render any custom fallback UI
			return fallback;
		}

		return children;
	}
}

export default ErrorBoundary;
