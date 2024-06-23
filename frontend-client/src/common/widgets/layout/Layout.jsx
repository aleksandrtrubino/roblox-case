import {Header} from "../../containers/header/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "../../containers/footer/Footer";

import styles from "./layout.module.scss"


export const Layout = () => {
    return (
        <>
            <Header />
                <div className={styles.content}>
                    <Outlet />
                </div>
            <Footer />
        </>
    )
}