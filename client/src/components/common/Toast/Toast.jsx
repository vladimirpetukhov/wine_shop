import React, { useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../../store/store';
const Toast = () => {
  const { state } = useContext(StoreContext);
  useEffect(() => {
    if (!state.toast.status) {
      return;
    }
    const { status, message } = state.toast;
    toast[status](message)
  },[state.toast, state.toast.message]);
  return <ToastContainer autoClose={3000} position="bottom-right" />;
};

export default Toast;
