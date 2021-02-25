import React, { createContext, useCallback, useMemo, useState } from 'react';
import ApiService, { ResultWithMeta } from '../api/api-service';
import { Species } from '../interfaces/trefle.interface';
interface IPlantsWithPage {
    results: ResultWithMeta<Species>;
    page: number;
}
export interface IRegion {
    regionName: string;
    regionIdentifier: string;
}

export interface IMainContext {
    region: IRegion;
    plants: IPlantsWithPage;
    onRegionChanged: (region: IRegion) => void;
    onPageChange: (regionIdentifier: string, page: number) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const [region, setRegion] = useState<IRegion>(null);
    const [plants, setPlants] = useState<IPlantsWithPage>(null);

    console.log('REGION ', region);
    console.log('PLANTS ', plants);

    const apiService = useMemo(() => {
        return new ApiService();
    }, []);

    const onRegionChanged = useCallback(async (newRegion: IRegion) => {
        setRegion(newRegion);
        let res = await apiService.getPlantsForRegion(newRegion.regionIdentifier);
        setPlants({ results: res, page: 1});
    }, [apiService]);

    const onPageChange = useCallback(async (regionId: string, page: number) => {
        let res = await apiService.getPlantsForRegion(regionId, page);
        setPlants({ results: res, page: page});
    }, [apiService]);

    const mainContext = useMemo(() => {
        return {
            region: region,
            plants: plants,
            onRegionChanged: onRegionChanged,
            onPageChange: onPageChange
        }
    }, [region, plants, onRegionChanged, onPageChange])

    return (
        <MainContext.Provider value={mainContext}>
            {children}
        </MainContext.Provider>
    );
}