import React from 'react';
import { App } from './app';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import './translations/i18n';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
reportWebVitals(sendToVercelAnalytics);

export * from './pages';
export * from './components';
export * from './app';
export * from './hooks';
