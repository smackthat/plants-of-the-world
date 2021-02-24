import axios, { AxiosResponse } from "axios";
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

    // NOT IN USE: Trefle API doesn't accept JWT tokens from the client side... so let's use the server for ALL of the API calls.
    // public async getAuth(): Promise<any> {
    //     try {
    //         let token = await axios.get('api/auth');
    //         console.log('TADAA! ', token);
    //         localStorage.setItem('trefleToken', JSON.stringify(token.data));
    //     } catch (error) {
    //         throw new Error(error);
    //     }

    // }

    public async getPlantsForRegion(regionId: string, page: number = 1): Promise<ResultWithMeta<Species>> {
        try {
            const plants = await axios.get(`api/plants/forRegion/${regionId}`, {
                params: {
                    page
                }
            });

            console.log('PLÄNTS: ', plants.data);
            return plants.data;
        } catch (error) {
            throw new Error(error);
        }

    }




}