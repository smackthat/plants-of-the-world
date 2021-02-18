import axios, { AxiosResponse } from "axios";
import { Plant } from "../interfaces/trefle.interface";


export default class ApiService {

    //#region Constructor
    constructor() {
        console.log('Lock n loaded');
    }

    //#endregion Constructor

    public async getAuth(): Promise<any> {
        let foo = await axios.get('api/auth');
        console.log('TADAA! ', foo);
        return foo;
    }

    public async getPlantsForRegion(regionId: string): Promise<void> {
        return await axios.get('api/test');
    }




}