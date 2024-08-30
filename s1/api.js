import { Display,DisplayBag } from "./dom.js";

const API = 'http://localhost:3000/data';
const BagAPI = 'http://localhost:3000/bag';

const bagLength = document.querySelector('.bagLength');

async function GetData() {
    try {
        const {data} = await axios.get(API);
        Display(data);
    } catch (error) {
        console.error(error);
        
    }
}

async function VaporizeBagData() {
    try {
        const {data} = await axios.get(BagAPI);
        for(let e of data){
            try {
                const response = await axios.delete(`${BagAPI}/${e.id}`);
            } catch (error) {
                console.error(error);
                
            }
        }
        alert("Chechouted sussesfully!");
        location.reload();
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
        let count = 0;
        data.forEach((e,i) => {
            count+=e.count;
        });
        bagLength.innerHTML = count;
        DisplayBag(data);
    } catch (error) {
        console.error(error);
        
    }
}

export{GetData,GetBagData,PutBagData,DeleteBagData,VaporizeBagData}