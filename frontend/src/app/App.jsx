import { RouterProvider } from 'react-router';
import { router } from './app.route.jsx';
import { useAuth } from '../features/auth/hook/useAuth.js';
import { useEffect } from 'react';

import './App.css';

function App() {
  const  {handlegetMe} = useAuth()
  useEffect(()=>{ })
  return (
    <RouterProvider router={router} />
  );
}

export default App;
