import { createContext } from 'react';

export default createContext(
	{
		widthInPixels: window.innerWidth,
		widthInRem:
			window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize),
		remHeightInPixels: parseFloat(getComputedStyle(document.documentElement).fontSize),
		heightInPixels: window.innerHeight,
		heightInRem: window.innerHeight / parseFloat(getComputedStyle(document.documentElement).fontSize),
	}

);

