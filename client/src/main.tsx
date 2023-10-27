import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import store from './store';
import { AuthProvider } from './context/auth-context';
import { DrawerProvider } from './context/drawer-context';
import { ModalProvider } from './context/modal-context';
import { ThemeProvider } from './context/theme-context';
import App from './App.tsx';
import './index.css';

const apolloClient = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ModalProvider>
            <DrawerProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </DrawerProvider>
          </ModalProvider>
        </ApolloProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
