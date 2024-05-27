import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";
import { VITE_APP_STRIPE_KEY } from '../src/Config/config.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const stripe_key = VITE_APP_STRIPE_KEY
const stripePromise = loadStripe(stripe_key);

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Elements stripe={stripePromise}>
      <React.Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </Provider>
      </React.Fragment >
    </Elements>
  </QueryClientProvider>
)
