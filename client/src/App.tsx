import { RouterProvider } from 'react-router-dom';
import routes from '../../client/src/pages/routes';

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
