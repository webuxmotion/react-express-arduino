import React, { Suspense } from 'react';
import { Provider } from './Context';

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};


const ThemeContext = React.createContext(themes.light);

function App() {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider>
          <>
            <Header />
            <Footer />
          </>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
