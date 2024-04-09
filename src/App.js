import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// import { getUserDetails } from './redux/slices/userSlice';
// import NavSection from './components/nav-section';
import AMXRoutes from './routes';
import { theme } from './constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from './components/error-handler';
import MobileView from './components/mobile-view';
import { Toaster } from 'react-hot-toast';
import { validateToken } from './constants/validateToken';
// import { Sendrequest, requestForToken } from './utils/firebase';

// Create a client
const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
function App({ titles }) {
  const isValid = validateToken();
  const GlobalStyle = createGlobalStyle`
  button{
    font-family:${({ theme }) => theme.fontFamily}
  }
   .mobile-view {
      display: none;
    }
    .desktop-view {
      display: block;
    }
 
  @media only screen and (max-width: 1200px) {
   
     .mobile-view {
    display: block;
  }

  .desktop-view {
    display: none;
  }
  }
  `;

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    document.title = titles;
  }, [titles]);

  // useEffect(() => {
  //   requestForToken(setToken);
  // }, []);

  // useEffect(() => {
  //   Sendrequest();
  // }, []);

  // requestForToken();

  // onMessageListener().then((payload) => {
  //   console.log(payload);
  //   setToken((old) => !old);
  // });

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorHandler}
        onError={() => console.log('Error happened')}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={{ theme, ...theme[selectedTheme] }}>
            <GlobalStyle />

            {/* <NavSection /> */}
            <div className="desktop-view" id="desktop">
              <AMXRoutes isAuthenticated={isValid} />
            </div>
            <div className="mobile-view">
              <MobileView />
            </div>
            <Toaster
              toastOptions={{
                className: '',
                style: {
                  fontSize: '0.85rem',
                },
              }}
            />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
