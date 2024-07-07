
import styles from './Layout.module.scss'
import {Outlet} from "react-router-dom";
import Sidebar from "../../containers/sidebar/Sidebar";

export const Layout = () =>{

    return (
        <>
        <Sidebar />
        <div className={styles.content}>
            <Outlet />
        </div>
        </>
    )
}