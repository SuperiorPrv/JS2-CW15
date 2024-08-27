import { Display,DisplayBag } from "./dom.js";

const API = "http://localhost:3000/data";
const BagAPI = 'http://localhost:3000/bag';

const id = localStorage.getItem("ProductId");

async function GetData() {
    try {
        const {data} = await axios.get(API+'/'+id);
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

async function PostBagData(Obj) {
    try {
        const response = await axios.post(BagAPI,Obj);
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

export {GetData,GetBagData,PostBagData,PutBagData,DeleteBagData}