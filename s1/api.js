import { Display,DisplayBag } from "./dom.js";

const API = 'http://localhost:3000/data';
const BagAPI = 'http://localhost:3000/bag';

async function GetData() {
    try {
        const {data} = await axios.get(API);
        Display(data);
    } catch (error) {
        console.error(error);
        
    }
}

async function DeleteBagData(id) {
    try {
        const response = await axios.delete(`${BagAPI}/${id}`);
        GetBagData();
    } catch (error) {
        console.error(error);
        
    }
}

async function PutBagData(Obj,id) {
    try {
        const response = await axios.put(`${BagAPI}/${id}`,Obj);
        GetBagData();
    } catch (error) {
        console.error(error);
        
    }
}

async function GetBagData() {
    try {
        const {data} = await axios.get(BagAPI);
        DisplayBag(data);
    } catch (error) {
        console.error(error);
        
    }
}

export{GetData,GetBagData,PutBagData,DeleteBagData}