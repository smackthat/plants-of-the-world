import React, { createContext, useCallback, useMemo, useState } from 'react';
import ApiService, { ResultWithMeta } from '../api/api-service';
import { Species } from '../interfaces/trefle.interface';

export interface IRegion {
    regionName: string;
    regionIdentifier: string;
}

export interface IMainContext {
    region: IRegion;
    plants: ResultWithMeta<Species>;
    onRegionChanged: (region: IRegion) => void;
    onPageChange: (regionIdentifier: string, page: number) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const [region, setRegion] = useState<IRegion>(null);
    const [plants, setPlants] = useState(null);

    console.log('REGION ', region);
    console.log('PLANTS ', plants);

    const apiService = useMemo(() => {
        return new ApiService();
    }, []);

    const onRegionChanged = useCallback(async (newRegion: IRegion) => {
        setRegion(newRegion);
        let res = await apiService.getPlantsForRegion(newRegion.regionIdentifier);
        setPlants(res);
    }, [apiService]);

    const onPageChange = useCallback(async (regionId: string, page: number) => {
        let res = await apiService.getPlantsForRegion(regionId, page);
        setPlants(res);
    }, [apiService]);

    const mainContext = useMemo(() => {
        return {
            region: region,
            plants: plants,
            onRegionChanged: onRegionChanged,
            onPageChange: onPageChange
        }
    }, [region, plants, onRegionChanged])

    return (
        <MainContext.Provider value={mainContext}>
            {children}
        </MainContext.Provider>
    );
}