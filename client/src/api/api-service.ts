import axios, { AxiosRequestConfig } from "axios";
import { Species } from "../interfaces/trefle.interface";


//#region Interfaces

/** An interface for list results */
export interface IResultsWithMeta<T> {
    data: T[];
    links: {
        first?: string;
        last?: string;
        next?: string;
        self?: string;
    };
    meta: {
        total?: number
    };
}

/** An interface for a single plant */
export interface IPlantWithMeta {
    data: Species;
    meta: {
        images_count: number;
        last_modified: Date;
        sources_count: number;
        synonyms_count: number;
    }
}

//#endregion Interfaces


export default class ApiService {

    //#region Constructor
    constructor() {
        console.log('Lock n loaded');
    }

    //#endregion Constructor

    //#region  Public methods

    public async getPlantsForRegion(regionId: string, page: number = 1): Promise<IResultsWithMeta<Species>> {

        const plants = await this.get(`api/plants/forRegion/${regionId}`, {
            params: {
                page
            }
        });
        return plants.data;
    }

    public async getPlant(plantId: number): Promise<IPlantWithMeta> {
        const plant = await this.get(`api/plants/${plantId}`);
        return plant.data;
    }

    //#endregion Public methods

    //#region Private methods

    /** Runs a get request */
    private async get(url: string, config?: AxiosRequestConfig) {
        try {
            const result = await axios.get(url, config);

            console.log('RESULTO: ', result);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }


    //#endregion Private methods




}