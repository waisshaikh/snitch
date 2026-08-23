import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './app.store.js';
import { router } from './app.route.jsx';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

