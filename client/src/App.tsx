// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider } from 'react-router-dom';
import routes from './pages/routes';

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
