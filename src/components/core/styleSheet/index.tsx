import React from 'react';
import { ThemeContext } from '../theme/themeContext';

export interface ICSSStyle extends React.CSSProperties {
    hover?: React.CSSProperties;
    active?: React.CSSProperties;
}
export interface ICSSStyleMap {
    [prop: string]: ICSSStyle;
}

export interface StyleSheetInterface {
    create: (data: ICSSStyleMap) => any;
    variable: (data: any) => any;
}

const variable = () => {};

const create = (data: ICSSStyleMap) => {
    const context = React.useContext(ThemeContext);
    return context.create(data);
};

const StyleSheet: StyleSheetInterface = () => {};
StyleSheet.create = create;
StyleSheet.variable = variable;

export default StyleSheet;
