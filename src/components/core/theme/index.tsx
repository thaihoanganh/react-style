import React from 'react';
import classnames from 'classnames';
import { ThemeContext, themeContextData } from './themeContext';

import './style.css';

export interface ThemeProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Theme: React.FC<ThemeProps> = (props) => {
    const { children, className, style } = props;
    const classes = classnames(className);
    return (
        <ThemeContext.Provider value={themeContextData()}>
            <ThemeContext.Consumer>
                {(value: any) => (
                    <div className={classes} style={style} data-theme={value.type}>
                        {children}
                    </div>
                )}
            </ThemeContext.Consumer>
        </ThemeContext.Provider>
    );
};

export default Theme;
