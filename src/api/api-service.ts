import axios from "axios";


export default class ApiService {

    //#region Constructor
    constructor() {
        console.log('Lock n loaded');
    }

    //#endregion Constructor

    public getAuth() {
    }

    public async getPlantsForRegion(regionId: string): Promise<void> {
        return await axios.get('http://www.google.com');
    }




}