import React, { createContext, useCallback, useMemo, useState } from 'react';
import ApiService, { IResultsWithMeta } from '../api/api-service';
import { Species } from '../interfaces/trefle.interface';
interface IPlantsWithPage {
    results: IResultsWithMeta<Species>;
    page: number;
}
export interface IRegion {
    regionName: string;
    regionIdentifier: string;
}

export interface IMainContext {
    region: IRegion;
    plants: IPlantsWithPage;
    plant: Species;
    onRegionChanged: (region: IRegion) => void;
    onPageChange: (regionIdentifier: string, page: number) => void;
    onPlantSelected: (plantId: number) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const [region, setRegion] = useState<IRegion>(null);
    const [plants, setPlants] = useState<IPlantsWithPage>(null);
    const [plant, setPlant] = useState<Species>(null);

    console.log('REGION ', region);
    console.log('PLANTS ', plants);
    console.log('A PLANT: ', plant);

    const apiService = useMemo(() => {
        return new ApiService();
    }, []);

    const onRegionChanged = useCallback(async (newRegion: IRegion) => {
        setRegion(newRegion);
        setPlant(null);
        const res = await apiService.getPlantsForRegion(newRegion.regionIdentifier);
        setPlants({ results: res, page: 1});
    }, [apiService]);

    const onPageChange = useCallback(async (regionId: string, page: number) => {
        const res = await apiService.getPlantsForRegion(regionId, page);
        setPlants({ results: res, page: page});
    }, [apiService]);

    const onPlantSelected = useCallback(async (plantId: number) => {
        const res = await apiService.getPlant(plantId);
        setPlant(res.data);
    }, [apiService]);

    const mainContext = useMemo(() => {
        return {
            region: region,
            plants: plants,
            plant: plant,
            onRegionChanged: onRegionChanged,
            onPageChange: onPageChange,
            onPlantSelected: onPlantSelected
        }
    }, [region, plants, plant, onRegionChanged, onPageChange, onPlantSelected])

    return (
        <MainContext.Provider value={mainContext}>
            {children}
        </MainContext.Provider>
    );
}