import React, { ReactNode } from 'react'
import styles from '@styles/components/layout/MainLayout.module.css'
import Sidebar from '@components/layout/Sidebar';
import Footer from '@components/layout/Footer';
import TipsterHeader from './TipsterHeader';

interface TipsterLayoutProps {
    children?: JSX.Element | JSX.Element[];
}

const TipsterLayout: React.FC<TipsterLayoutProps> = (props) => {
    const { children } = props;

    return (
        <>
            <TipsterHeader />
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

export default TipsterLayout;
