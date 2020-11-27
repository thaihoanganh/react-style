import React from 'react';
import { StyleSheet } from '../';

export interface LayoutProps {}

const Sidebar: React.FC<LayoutProps> = (props) => {
    const style = StyleSheet.create({
        sidebar: {
            position: 'relative',
            width: '100%',
            height: '50%',
            backgroundColor: '#fff',
        },
    });

    return <div className={style.sidebar}></div>;
};

const Layout: React.FC<LayoutProps> = (props) => {
    const style = StyleSheet.create({
        layout: {
            position: 'absolute',
            display: 'flex',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
        },
        header: {
            position: 'relative',
            width: '100%',
            height: '50%',
            backgroundColor: '#fff',
        },
    });

    return (
        <div className={style.layout}>
            <div className={style.header}></div>
            <Sidebar />
        </div>
    );
};

export default Layout;
