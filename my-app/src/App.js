import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import News from './page/News';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([

    // {
    //   path: "/",
    //   element: <Home/>
    // },

    // {
    //   path: "/add",
    //   element: <Add/>
    // },

    // {
    //   path: "/list",
    //   element: <List/>
    // }

    {
      path: "/",
      element: <Home/>
    },

    {
      path: "/news",
      element: <News/>
    }

  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
