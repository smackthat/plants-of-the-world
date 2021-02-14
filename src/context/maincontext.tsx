import React, { createContext, useMemo, useState } from 'react';
import ApiService from '../api/api-service';

export interface IRegion {
    regionName: string;
    regionIdentifier: string;
}

export interface IMainContext {
    region: IRegion;
    setRegion: (region: IRegion) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const foo = useMemo(() => {
        console.log('Higglidy pigglidy!');
        return new ApiService();
    }, []);

    console.log(foo);

    const [region, setRegion] = useState<IRegion>({regionIdentifier: null, regionName: null});

    return (
        <MainContext.Provider value={{region: region, setRegion: setRegion}}>
            {children}
        </MainContext.Provider>
    );
}