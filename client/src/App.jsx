import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//* Импортирование компонентов лейаут ( layout )
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';

//* Импортирование страниц ( pages )
import { Profile } from './pages/Profile/Profile';
import { Cases } from './pages/Cases/Cases';
import { Payment } from './pages/Payment/Payment';
import { Unknown } from './pages/Unknown/Unknown';
import { Privacy } from './pages/Privacy/Privacy';
import { Agreement } from './pages/Agreement/Agreement';
import { Case } from './pages/Case/Case';

//* Импортирование модальных окон (0)
import { Progress } from './components/modals/Progress/Progress';
import { Notification } from './components/modals/Notification/Notification';
import { Auth } from './components/modals/Auth/Auth';
import { Faq } from './pages/Faq/Faq';

//* Импортирование стилей
import styles from './app.module.scss';
import { useEffect } from 'react';
import { Nickname } from './components/modals/Nickname/Nickname';
import { Support } from './components/modals/Support/Support';

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
      {/* <div id="vk_community_messages"> */}

      {/* </div> */}
      <Router>
        <Header />
        <div className={styles.application_content}>
          <Routes>
            <Route path="*" element={<Unknown />} />
            <Route path="/" element={<Cases />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/case" element={<Case />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/agreement" element={<Agreement />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
