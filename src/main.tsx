import './index.scss';
import '@fontsource/roboto';
import '@fontsource/inter';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AuthenticationContextProvider } from './components/AuthenticationContext/AuthenticationContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
