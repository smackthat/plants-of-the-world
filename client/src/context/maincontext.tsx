import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import ApiService from '../api/api-service';

export interface IRegion {
    regionName: string;
    regionIdentifier: string;
}

export interface IMainContext {
    region: IRegion;
    setRegion: (region: IRegion) => void;
    getAuth: () => Promise<any>;
    apiService: ApiService;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const [region, setRegion] = useState<IRegion>({regionIdentifier: null, regionName: null});

    const apiService = useMemo(() => {
        console.log('Higglidy pigglidy!');
        return new ApiService();
    }, []);

    const getAuth = useCallback(async () => {
        return apiService.getAuth()
    }, [apiService]);

    console.log(apiService);

    useEffect(() => {
        

    }, []);

    return (
        <MainContext.Provider value={{region: region, setRegion: setRegion, apiService: apiService, getAuth: getAuth}}>
            {children}
        </MainContext.Provider>
    );
}