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
    loading: boolean;
    error: boolean;
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
    error: boolean;
    loading: boolean;
    onErrorHiding: () => void;
    onRegionChanged: (region: IRegion) => void;
    onRegionsChanged: (regions: Zone[]) => void;
    onPageChange: (regionIdentifier: string, page: number) => void;
    onPlantSelected: (plantId: number) => void;
    onPlantsSearch: (query: string) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

interface Props {
    children: React.ReactFragment
}

export default function MainContextProvider({ children }: Props) {

    const [state, setState] = useReducer<Reducer<IMainContextState, Partial<IMainContextState>>>(
        (state, newState) => ({ ...state, ...newState }),
        { region: null, regions: null, plants: null, plant: null, loading: false, error: false }
    );

    console.log('REGION ', state.region);
    console.log('PLANTS ', state.plants);
    console.log('A PLANT: ', state.plant);

    const apiService = useMemo(() => {
        return new ApiService();
    }, []);

    /** Run API requests through this to spawn loading spinner and to catch errors */
    const runApiRequest = useCallback(async (apiCall: (...params) => Promise<any>, afterDone: (res: any) => void) => {
        try {
            setState({ loading: true });

            const res = await apiCall();

            afterDone(res);
        } catch (error) {
            setState({ error: true });
        } finally {
            setState({ loading: false });
        }
    }, []);

    const onRegionChanged = useCallback(async (newRegion: IRegion) => {
        setState({ region: newRegion, plant: null, plants: null, regions: null });

        if (newRegion) {
            await runApiRequest(() => apiService.getPlantsForRegion(newRegion.regionIdentifier), (res) => {
                setState({ plants: { results: res, page: 1 } });
            });
        }

    }, [apiService]);

    const onPageChange = useCallback(async (regionId: string, page: number) => {

        await runApiRequest(() => apiService.getPlantsForRegion(regionId, page), (res) => {
            setState({ plants: { results: res, page: page } });
        });

    }, [apiService]);

    const onPlantSelected = useCallback(async (plantId: number) => {

        if (!plantId) {
            setState({ plant: null, regions: null });
        }
        else {
            await runApiRequest(() => apiService.getPlant(plantId), (res) => {
                setState({ plant: res });
            });

        }

    }, [apiService]);

    const onRegionsChanged = useCallback((zones: Zone[]) => {
        if (zones && zones.length > 0) {
            const foo = new Map(zones.map(z => [z.slug, z]));
            setState({ regions: foo });
        }
        else {
            setState({ regions: null });
        }

    }, []);

    const onPlantsSearch = useCallback(async (query: string) => {
        if (query && query.length > 0) {

            await runApiRequest(() => apiService.getPlantsSearch(query), (res) => {
                setState({ plants: { results: res, page: 1 } });
            });

        }
        else {
            setState({ plants: null });
        }
    }, [apiService, runApiRequest]);

    const onErrorHiding = useCallback(() => {
        setState({ error: false });
    }, []);

    const mainContext = useMemo(() => {
        return {
            region: state.region,
            regions: state.regions,
            plants: state.plants,
            plant: state.plant,
            loading: state.loading,
            error: state.error,
            onRegionChanged: onRegionChanged,
            onRegionsChanged: onRegionsChanged,
            onPageChange: onPageChange,
            onPlantSelected: onPlantSelected,
            onErrorHiding: onErrorHiding,
            onPlantsSearch: onPlantsSearch
        };
    }, [state.region, state.regions, state.plants, state.plant, state.loading, state.error, onRegionChanged, onRegionsChanged, onPageChange, onErrorHiding, onPlantSelected, onPlantsSearch]);


    return (
        <MainContext.Provider value={mainContext}>
            {children}
        </MainContext.Provider>
    );
}