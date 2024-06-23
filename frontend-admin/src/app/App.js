import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from './app.module.scss';

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

function App() {
  const [isAuth, setIsAuth] = React.useState(true)


  return (
    <div className={styles.application}>
      {isAuth ? (
        <div className={styles.application__content}>
          <Sidebar />
          <div className={styles.application__main}>
            <Header />
            <Routes>
              <Route exec path="/" element={<Dashboard />}/>
              <Route path="/users" element={<Users />}/>
              <Route path="/admins" element={<Admins />} />
              <Route path="/admin/:id" element={<Admin />}/>
              <Route path="/user/:id" element={<User />} />
              <Route path="/items" element={<Items />}/>
              <Route path="/cases" element={<Cases />}/>
              <Route path="/payments" element={<Payments />}/>
              <Route path="/outputtings" element={<Outputting />}/>
              <Route path="/promocodes" element={<Promocodes />}/>
            </Routes>
          </div>
        </div>
      ) : (<Auth />)}
    </div>
  );
}

export default App;
