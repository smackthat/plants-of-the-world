import React, { createContext, useCallback, useMemo, useState } from 'react';
import ApiService, { IResultsWithMeta } from '../api/api-service';
import { Species, Zone } from '../interfaces/trefle.interface';

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
    regions: Map<string, Zone>;
    plants: IPlantsWithPage;
    plant: Species;
    onRegionChanged: (region: IRegion) => void;
    onRegionsChanged: (regions: Zone[]) => void;
    onPageChange: (regionIdentifier: string, page: number) => void;
    onPlantSelected: (plantId: number) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const [region, setRegion] = useState<IRegion>(null);
    const [regions, setRegions] = useState<Map<string, Zone>>(null);
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
        setRegions(null);
        const res = await apiService.getPlantsForRegion(newRegion.regionIdentifier);
        setPlants({ results: res, page: 1 });
    }, [apiService]);

    const onPageChange = useCallback(async (regionId: string, page: number) => {
        const res = await apiService.getPlantsForRegion(regionId, page);
        setPlants({ results: res, page: page });
    }, [apiService]);

    const onPlantSelected = useCallback(async (plantId: number) => {

        if (!plantId) {
            setPlant(null);
            setRegions(null);
        }
        else {
            const res = await apiService.getPlant(plantId);
            setPlant(res.data);
        }

    }, [apiService]);

    const onRegionsChanged = useCallback((zones: Zone[]) => {
        if (zones && zones.length > 0) {
            let foo = new Map(zones.map(z => [z.slug, z]));
            setRegions(foo);
        }
        else {
            setRegions(null);
        }

    }, []);

    const mainContext = useMemo(() => {
        return {
            region: region,
            regions: regions,
            plants: plants,
            plant: plant,
            onRegionChanged: onRegionChanged,
            onRegionsChanged: onRegionsChanged,
            onPageChange: onPageChange,
            onPlantSelected: onPlantSelected
        }
    }, [region, regions, plants, plant, onRegionChanged, onRegionsChanged, onPageChange, onPlantSelected])

    return (
        <MainContext.Provider value={mainContext}>
            {children}
        </MainContext.Provider>
    );
}