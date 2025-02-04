import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;