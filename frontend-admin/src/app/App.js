import React from "react";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";

import Auth from "../pages/auth/Auth";

import Sidebar from "../common/containers/sidebar/Sidebar";

import Dashboard from "../pages/dashboard/Dashboard";
import Payments from "../pages/payments/Payments";
import User from "../pages/user/User";
import Users from "../pages/users/Users";
import Header from "../common/containers/header/Header";
import Outputting from "../pages/outputting/Outputting";
import Items from "../pages/items/Items";
import Cases from "../pages/cases/Cases";
import Admins from "../pages/admins/Admins";
import Admin from "../pages/admin/Admin";
import Promocodes from "../pages/promocodes/Promocodes";
import {Layout} from "../common/widgets/layout/Layout";
import {Login} from "../pages/login/Login";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";
import {RequireAuth} from "../common/widgets/requireAuth/RequireAuth";
import {Pets} from "../pages/pets/Pets";
import {PetCards} from "../pages/pet-cards/PetCards";
import {Boxes} from "../pages/boxes/Boxes";
import Moderators from "../pages/moderators/Moderators";
import {Withdrawals} from "../pages/withdrawals/Withdrawals";

function App() {


  return (
      <BrowserRouter>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Routes>
                  <Route element={<RequireAuth />}>
                      <Route element={<Layout />}>
                          <Route path="/" element={<Navigate to="/boxes"/>}/>

                          <Route path="/users" element={<Users />}/>
                          <Route path="/moderators" element={<Moderators />}/>
                          <Route path="/user/:userId" element={<User />} />
                          <Route path="/promocodes" element={<Promocodes />}/>
                          <Route path="/pets" element={<Pets />}/>
                          <Route path="/pet-cards" element={<PetCards />}/>
                          <Route path="/boxes" element={<Boxes />}/>
                          <Route path="/withdrawals" element={<Withdrawals />}/>
                      </Route>
                  </Route>
                  <Route path="/login" element={<Login />}/>
                </Routes>
              </PersistGate>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
