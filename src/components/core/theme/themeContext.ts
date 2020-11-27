import React, { createContext, useState, useEffect } from 'react';

export interface ICSSStyle extends React.CSSProperties {
    hover?: React.CSSProperties;
    active?: React.CSSProperties;
}
export interface ICSSStyleMap {
    [prop: string]: ICSSStyle;
}

export interface IStyleRule {
    [prop: string]: {
        [prop: string]: {
            key?: number;
            pseudoClass?: {
                [prop: string]: number;
            };
        };
    };
}

export interface ThemeInterface {
    type: 'light' | 'dark';
    setType: (type: 'light' | 'dark') => void;
    create: (data: ICSSStyleMap) => void | any;
}

export const ThemeContext = createContext<ThemeInterface>({
    type: 'light',
    setType: () => {},
    create: () => {},
});

export const themeContextData = (): ThemeInterface => {
    const [type, setType] = useState<'light' | 'dark'>('light');

    const [styleRule, setStyleRule] = useState<IStyleRule>({});
    const [updateStyleRule, setUpdateStyleRule] = useState<IStyleRule>({});
    const [classNumber, setClassNumber] = useState<number>(100);
    const [className, setClassName] = useState({});

    useEffect(() => {
        if (classNumber !== 100) {
            if (document.querySelector('style[style-components="1.0.0"]') === null) {
                const createStyle = document.createElement('style');
                createStyle.setAttribute('style-components', '1.0.0');
                document.head.appendChild(createStyle);
            }

            const styles: any = document.querySelector('style[style-components="1.0.0"]');

            for (const [proprety, objCSS] of Object.entries(updateStyleRule)) {
                for (const [propretyValue, value] of Object.entries(objCSS)) {
                    const propretyText = proprety
                        .split(/(?=[A-Z])/)
                        .join('-')
                        .toLowerCase();
                    styles.sheet.insertRule(`._${value.key} {${propretyText}: ${propretyValue}}`);
                }
            }
        }
    }, [classNumber]);

    const create = (data: ICSSStyleMap): any => {
        useEffect(() => {
            const classes: any = {};
            let number = classNumber;
            const newStyleRule = { ...styleRule };
            const newUpdateStyleRule: IStyleRule = {};

            for (const [selector, objCSS] of Object.entries(data)) {
                if (classes[selector] === undefined) {
                    classes[selector] = '';
                }
                for (const [proprety, propretyValue] of Object.entries(objCSS)) {
                    if (proprety === 'hover' || proprety === 'active') {
                        // -------------------------
                    } else {
                        if (proprety in newStyleRule && propretyValue in newStyleRule[proprety]) {
                            classes[selector] += ` _${newStyleRule[proprety][propretyValue].key}`;
                        } else {
                            if (!newStyleRule[proprety]) newStyleRule[proprety] = {};
                            if (!newStyleRule[proprety][propretyValue]) {
                                newStyleRule[proprety][propretyValue] = {};
                            }
                            if (!newStyleRule[proprety][propretyValue]['pseudoClass']) {
                                newStyleRule[proprety][propretyValue]['pseudoClass'] = {};
                            }
                            newStyleRule[proprety][propretyValue]['key'] = number;

                            if (!newUpdateStyleRule[proprety]) newUpdateStyleRule[proprety] = {};
                            if (!newUpdateStyleRule[proprety][propretyValue]) {
                                newUpdateStyleRule[proprety][propretyValue] = {};
                            }
                            if (!newUpdateStyleRule[proprety][propretyValue]['pseudoClass']) {
                                newUpdateStyleRule[proprety][propretyValue]['pseudoClass'] = {};
                            }
                            newUpdateStyleRule[proprety][propretyValue]['key'] = number;
                            classes[selector] += ` _${number}`;
                            number++;
                        }
                    }
                }
                classes[selector] = classes[selector].trim();
            }

            setStyleRule(newStyleRule);
            setUpdateStyleRule(newUpdateStyleRule);
            setClassNumber(number);
            setClassName(classes);
        }, []);

        return className;
    };

    return {
        create,
        type,
        setType,
    };
};
