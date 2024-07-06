import React from 'react';

import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';

//* Импортирование компонентов лейаут ( layout )
import { MainHeader } from '../common/containers/header/mainHeader';
import { Footer } from '../common/containers/footer/Footer';

//* Импортирование страниц ( pages )
import { Profile } from '../pages/profile/Profile';
import { Home } from '../pages/cases/Home';
import { Payment } from '../pages/payment/Payment';
import { Unknown } from '../pages/unknown/Unknown';
import { Privacy } from '../pages/privacy/Privacy';
import { Agreement } from '../pages/agreement/Agreement';
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/login/Login";
import { Case } from '../pages/case/Case';

//* Импортирование модальных окон (0)
import { Progress } from '../common/components/progress/Progress';
import { Notification } from '../common/components/notification/Notification';
//import { Auth } from '../common/components/authPage/Auth';
import { Faq } from '../pages/faq/Faq';

//* Импортирование стилей
import styles from './app.module.scss';
import { useEffect } from 'react';
import { Nickname } from '../common/components/nickname/Nickname';
import { Support } from '../common/components/support/Support';
import { MainLayout } from "../common/widgets/layout/mainLayout";
import { AuthLayout } from "../common/widgets/layout/authLayout";

// import { Error } from './components/modals/Error/Error';

function App() {
  // useEffect(() => {
  //   const appendVkScript = () => {
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = 'https://vk.com/js/api/openapi.js?168';
  //     script.defer = true;
  //     script.onload = () => {
  //       try {
  //         window.VK.Widgets.CommunityMessages("vk_community_messages", 127607773, {tooltipButtonText: "Есть вопрос?", expanded: 1});
  //       } catch (error) {
  //         console.error('Error initializing VK Widget:', error);
  //       }
  //     };
  //     script.onerror = (error) => {
  //       console.error('Error loading VK script:', error);
  //     };
  //     document.head.appendChild(script);
  //   };

  //   appendVkScript();
  // }, []);

  return (
    <div className={styles.application}>
      <BrowserRouter>
          <Routes>
              <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Route>

            <Route element={<MainLayout />} >
                <Route path="*" element={<Unknown />} />
                <Route path="/" element={<Navigate to="/home" />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/faq" element={<Faq />} />
                {/*<Route path="/auth" element={<Auth />} />*/}
                {/*<Route path="/case" element={<Case />} />*/}
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                {/*<Route path="/notification" element={<Notification />} />*/}
                <Route path="/privacy" element={<Privacy />} />
                {/*<Route path="/progress" element={<Progress />} />*/}
                <Route path="/agreement" element={<Agreement />}/>
                {/*<Route path="/support" element={<Support />}/>*/}
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
