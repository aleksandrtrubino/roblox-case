import {MainHeader} from "../../containers/header/mainHeader";
import {Outlet} from "react-router-dom";
import {Footer} from "../../containers/footer/Footer";

import styles from "./layout.module.scss"


export const MainLayout = () => {
    return (
        <>
            <MainHeader />
                <div className={styles.content}>
                    <Outlet />
                </div>
            <Footer />
        </>
    )
}