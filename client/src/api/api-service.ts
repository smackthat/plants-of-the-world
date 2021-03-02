import axios, { AxiosRequestConfig } from "axios";
import { Species } from "../interfaces/trefle.interface";



export interface ResultWithMeta<T> {
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
export default class ApiService {

    //#region Constructor
    constructor() {
        console.log('Lock n loaded');
    }

    //#endregion Constructor

    //#region  Public methods

    public async getPlantsForRegion(regionId: string, page: number = 1): Promise<ResultWithMeta<Species>> {

        const plants = await this.get(`api/plants/forRegion/${regionId}`, {
            params: {
                page
            }
        });
        return plants.data;
    }

    public async getPlant(plantId: number): Promise<Species> {
        const plant = await this.get(`api/plants/${plantId}`)
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