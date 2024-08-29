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
        alert("Checkouted succesfully!");
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
        const {data} = await axios.get(BagAPI);
        let cnt=0;
        data.forEach((e,i) => {
            if(e.name==Obj.name) cnt++;
        });
        if(cnt==0)
        {
            const response = await axios.post(BagAPI,Obj);
            GetBagData();
        }
        else{
            alert('Product already exist in the bag');
        }
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

export {GetData,GetBagData,PostBagData,PutBagData,DeleteBagData,VaporizeBagData}