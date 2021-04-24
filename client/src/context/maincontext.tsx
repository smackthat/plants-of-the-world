import React, { createContext, Reducer, useCallback, useMemo, useReducer } from 'react';
import ApiService, { IResultsWithMeta } from '../api/api-service';
import { Species, Zone } from '../interfaces/trefle.interface';

interface IPlantsWithPage {
    results: IResultsWithMeta<Species>;
    page: number;
}

interface IMainContextState {
    region: IRegion;
    regions: Map<string, Zone>;
    plants: IPlantsWithPage;
    plant: Species;
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
    onPlantsSearch: (query: string) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

export default function MainContextProvider({ children }) {

    const [state, setState] = useReducer<Reducer<IMainContextState, Partial<IMainContextState>>>(
        (state, newState) => ({ ...state, ...newState }),
        { region: null, regions: null, plants: null, plant: null }
    );

    console.log('REGION ', state.region);
    console.log('PLANTS ', state.plants);
    console.log('A PLANT: ', state.plant);

    const apiService = useMemo(() => {
        return new ApiService();
    }, []);

    const onRegionChanged = useCallback(async (newRegion: IRegion) => {
        setState({ region: newRegion, plant: null, plants: null, regions: null });

        if (newRegion) {
            const res = await apiService.getPlantsForRegion(newRegion.regionIdentifier);
            setState({ plants: { results: res, page: 1 } });
        }

    }, [apiService]);

    const onPageChange = useCallback(async (regionId: string, page: number) => {
        const res = await apiService.getPlantsForRegion(regionId, page);
        setState({ plants: { results: res, page: page } });
    }, [apiService]);

    const onPlantSelected = useCallback(async (plantId: number) => {

        if (!plantId) {
            setState({ plant: null, regions: null });
        }
        else {
            const res = await apiService.getPlant(plantId);
            setState({ plant: res.data });
        }

    }, [apiService]);

    const onRegionsChanged = useCallback((zones: Zone[]) => {
        if (zones && zones.length > 0) {
            let foo = new Map(zones.map(z => [z.slug, z]));
            setState({regions: foo});
        }
        else {
            setState({regions: null})
        }

    }, []);

    const onPlantsSearch = useCallback(async (query: string) => {
        if (query && query.length > 0) {
            const res = await apiService.getPlantsSearch(query);
            setState({ plants: { results: res, page: 1 } });
        }
        else {
            setState({plants: null})
        }
    }, []);

    const mainContext = useMemo(() => {
        return {
            region: state.region,
            regions: state.regions,
            plants: state.plants,
            plant: state.plant,
            onRegionChanged: onRegionChanged,
            onRegionsChanged: onRegionsChanged,
            onPageChange: onPageChange,
            onPlantSelected: onPlantSelected,
            onPlantsSearch: onPlantsSearch
        }
    }, [state.region, state.regions, state.plants, state.plant, onRegionChanged, onRegionsChanged, onPageChange, onPlantSelected, onPlantsSearch])

    return (
        <MainContext.Provider value={mainContext}>
            {children}
        </MainContext.Provider>
    );
}