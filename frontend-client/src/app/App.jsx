import React from 'react';

import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import { Layout } from "../common/widgets/layout/Layout";
import {persistor} from "./store";
import {store} from "./store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import { Profile } from '../pages/profile/Profile';
import { Home } from '../pages/home/Home';
import { Payment } from '../pages/payment/Payment';
import { Unknown } from '../pages/unknown/Unknown';
import { Privacy } from '../pages/privacy/Privacy';
import { Agreement } from '../pages/agreement/Agreement';
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { Faq } from '../pages/faq/Faq';

import styles from './app.module.scss';


function App() {

  return (
    <div className={styles.application}>
      <BrowserRouter>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <Routes>
                      <Route element={<Layout />} >
                          <Route path="*" element={<Unknown />} />
                          <Route path="/" element={<Navigate to="/home" />}/>
                          <Route path="/home" element={<Home />} />
                          <Route path="/faq" element={<Faq />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/payment" element={<Payment />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/agreement" element={<Agreement />}/>
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                      </Route>
                  </Routes>
              </PersistGate>
          </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
