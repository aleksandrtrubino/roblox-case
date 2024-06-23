import React from "react";
import { Routes, Route } from "react-router-dom";
import './styles/styles.scss';

import Auth from "./pages/Auth/Auth";

import Sidebar from "./layout/Sidebar/Sidebar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Payments from "./pages/Payments/Payments";
import User from "./pages/User/User";
import Users from "./pages/Users/Users";
import Header from "./layout/Header/Header";
import Outputting from "./pages/Outputting/Outputting";
import Items from "./pages/Items/Items";
import Cases from "./pages/Cases/Cases";
import Admins from "./pages/Admins/Admins";
import Admin from "./pages/Admin/Admin";
import Promocodes from "./pages/Promocodes/Promocodes";

function App() {
  const [isAuth, setIsAuth] = React.useState(true)


  return (
    <div className="application">
      {isAuth ? (
        <div className='application__content'>
          <Sidebar />
          <div className="application__main">
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
