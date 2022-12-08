import React from 'react'
import { ToastContainer } from 'react-toastify';

const Successful= () => {
  return (
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick = {true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
  )
}

export default Successful;