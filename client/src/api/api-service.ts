import axios, { AxiosRequestConfig } from 'axios';
import { Species } from '../interfaces/trefle.interface';


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
interface ICachedData {
    data: IResultsWithMeta<any> | IPlantWithMeta;
    expiration: Date;
}

//#endregion Interfaces


export default class ApiService {

    private apiCache: Map<string, ICachedData>;

    //#region Constructor
    constructor() {
        console.log('Lock n loaded');

        // Setting up the cache
        this.apiCache = new Map();

        axios.interceptors.request.use((value: AxiosRequestConfig) => {

            if (value.method === 'get') {
                const key = this.parseQuery(value);

                if (this.apiCache.has(key)) {

                    const cached = this.apiCache.get(key);

                    if (cached.expiration.getTime() < new Date().getTime()) {
                        this.apiCache.delete(key);
                    }
                    else {
                        value.data = cached.data;

                        // Return from cache, don't run a real request
                        value.adapter = () => {
                            return Promise.resolve({
                                data: cached.data,
                                status: 200,
                                statusText: 'OK',
                                headers: value.headers,
                                config: value
                            });
                        };
                    }
                }
            }

            // Not in cache/cache expired, run a request
            return value;
        });

        axios.interceptors.response.use((value) => {

            const key = this.parseQuery(value.config);

            if (!this.apiCache.has(key)) {
                this.apiCache.set(key, {
                    data: value.data,
                    expiration: new Date(Date.now() + 3 * 60000)    // Keep object in cache for 3 minutes (for now)
                });

                console.log('Added to cache: ', this.apiCache);
            }

            if (this.apiCache.size > 80) {
                Array.from(this.apiCache.keys())
                    .slice(0, 60)
                    .forEach(key => this.apiCache.delete(key));
            }

            return value;
        });
    }

    //#endregion Constructor

    //#region  Public methods

    public async getPlantsForRegion(regionId: string, page = 1): Promise<IResultsWithMeta<Species>> {

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

    public async getPlantsSearch(query: string, page = 1): Promise<IResultsWithMeta<Species>> {

        const plants = await this.get(`api/plants/search/${query}`, {
            params: {
                page
            }
        });

        return plants.data;
    }

    //#endregion Public methods

    //#region Private methods

    /** Parses query url with parameters (if provided) as a string */
    private parseQuery(config: AxiosRequestConfig): string {

        if (!config.params) {
            return config.url;
        }

        return config.url + '?' + Object.keys(config.params).map(key => {
            return key + '=' + config.params[key];
        }).join('&');
    }

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