import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider , createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import App from './App.jsx'
import {store} from "./store/store.js";
import {Provider} from "react-redux";
import {LandingPage, RegisterUser, UserLogin, ForgotPassword, ResetPassword} from "./Pages/index.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </>
    )
);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
)
