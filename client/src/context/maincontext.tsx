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
    search: string;
    loading: boolean;
    error: boolean;
}
export interface IRegion {
    regionName: string;
    regionIdentifier: string;
    filters?: {
        nativityFilter?: 'native' | 'introduced';
        edibilityFilter?: string;
    }
}

export interface IMainContext extends IMainContextState {
    onErrorHiding: () => void;
    onRegionChanged: (region: IRegion) => void;
    onRegionsChanged: (regions: Zone[]) => void;
    onPageChange: (page: number) => void;
    onPlantSelected: (plantId: number) => void;
    onPlantsSearch: (query: string) => void;
}

export const MainContext: React.Context<IMainContext> = createContext(null);

interface Props {
    children: React.ReactNode;
}

export default function MainContextProvider({ children }: Props) {

    const [state, setState] = useReducer<Reducer<IMainContextState, Partial<IMainContextState>>>(
        (state, newState) => ({ ...state, ...newState }),
        { region: null, regions: null, plants: null, plant: null, search: null, loading: false, error: false }
    );

    console.log('REGION ', state.region);
    console.log('PLANTS ', state.plants);
    console.log('A PLANT: ', state.plant);

    const apiService = useMemo(() => {
        return new ApiService();
    }, []);

    /** Run API requests through this to spawn loading spinner and to catch errors */
    const runApiRequest = useCallback(async (
        apiCall: (...params) => Promise<any>,
        afterDone: (res: any) => void,
        onError?: () => void) => {
        try {
            setState({ loading: true });

            const res = await apiCall();

            afterDone(res);
        } catch (error) {
            setState({ error: true });

            if (onError) {
                onError();
            }

        } finally {
            setState({ loading: false });
        }
    }, []);

    const onRegionChanged = useCallback(async (newRegion: IRegion) => {
        setState({ region: newRegion, plant: null, plants: null, regions: null, search: null });

        if (newRegion) {
            await runApiRequest(() => apiService.getPlantsForRegion(newRegion.regionIdentifier, 1, newRegion.filters?.nativityFilter, newRegion.filters?.edibilityFilter),
                (res) => {
                    setState({ plants: { results: res, page: 1 } });
                },
                () => {
                    setState({ region: null });
                });
        }

    }, [apiService]);

    const onPageChange = useCallback(async (page: number) => {

        // use region plants list
        if (state.region?.regionIdentifier) {
            await runApiRequest(() => apiService.getPlantsForRegion(state.region.regionIdentifier, page, state.region.filters?.nativityFilter, state.region.filters?.edibilityFilter), (res) => {
                setState({ plants: { results: res, page: page } });
            });
        }
        // use plants search
        else if (state.search) {
            await runApiRequest(() => apiService.getPlantsSearch(state.search, page), (res) => {
                setState({ plants: { results: res, page: page } });
            });
        }



    }, [apiService, state.region, state.search]);

    const onPlantSelected = useCallback(async (plantId: number) => {

        if (!plantId) {
            setState({ plant: null, regions: null });
        }
        else {
            await runApiRequest(() => apiService.getPlant(plantId), (res) => {
                if (res.data) {
                    setState({ plant: res.data });
                }
            });

        }

    }, [apiService]);

    /** Showing selected regions for filters */
    const onRegionsChanged = useCallback((zones: Zone[]) => {
        if (zones && zones.length > 0) {
            const foo = new Map(zones.map(z => [z.slug.toUpperCase(), z]));
            setState({ regions: foo });
        }
        else {
            setState({ regions: null });
        }

    }, []);

    const onPlantsSearch = useCallback(async (query: string) => {
        if (query && query.length > 0) {

            setState({ plants: null, search: query });

            await runApiRequest(() => apiService.getPlantsSearch(query), (res) => {
                setState({ plants: { results: res, page: 1 } });
            });

        }
        else {
            setState({ plants: null, search: null });
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
            search: state.search,
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