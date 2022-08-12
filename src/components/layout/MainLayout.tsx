import React, { ReactNode } from 'react'
import styles from '@styles/components/layout/MainLayout.module.css'
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import Footer from '@components/layout/Footer';

interface MainLayoutProps {
    children?: JSX.Element | JSX.Element[];
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
    const { children } = props;

    return (
        <>
            <Header />
            <Sidebar />
            <div className={styles.pageWrap}>
                <div className={styles.content}>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MainLayout;
