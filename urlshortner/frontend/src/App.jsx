import './App.css';
import { RouterProvider ,createBrowserRouter} from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';


function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
      
    },
    {
      path:'/home',
      element:<Home/>
    },
    
    
  
  ])
  return (
      <div className="App w-full">
      <RouterProvider router={appRouter}/>
      </div>
  );
}

export default App;

