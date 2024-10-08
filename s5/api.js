import { Display,DisplayBag } from "./dom.js";

const API = "http://localhost:3000/data";
const BagAPI = 'http://localhost:3000/bag';

const searchInput = document.querySelector('.searchInput');
const selectCompany = document.querySelector('.selectCompany');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

const bagLength = document.querySelector('.bagLength');

let atr1='',atr2='',atr3=1000;

searchInput.oninput=(e)=>{
    atr1 = e.target.value.trim();
    Sorting();
}

selectCompany.onclick=(e)=>{
    if(e.target.value == 'All'){
        atr2='';
        Sorting();
    }
    else{
        atr2 = e.target.value;
        Sorting();
    }
}

priceRange.oninput=(e)=>{
    priceValue.innerHTML = 'Price: $'+e.target.value;
    atr3 = e.target.value;
    Sorting();
}

async function Sorting() {
    try {
        const {data} = await axios.get(API);
        let data1=[];
        data.forEach((e,i) => {
            if(e.name.includes(atr1) && e.manufacturer.includes(atr2) && Number(e.price)<=atr3) data1.push(e);
        });
        Display(data1)
        
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
        location.reload();
    } catch (error) {
        console.error(error);
        
    }
}

async function PostData(Obj) {
    try {
        const response = await axios.post(API,Obj);
        GetData();
    } catch (error) {
        console.error(error);
        
    }
}

async function GetData() {
    try {
        const {data} = await axios.get(API);
        let st = new Set();
        st.add("All");
        data.forEach((e,i)=>{
            st.add(e.manufacturer);
        });
        selectCompany.innerHTML = "";
        st.forEach((e,i)=>{
            let option = document.createElement('option');
            option.value = e;
            option.innerHTML = e;
            selectCompany.appendChild(option);
        });
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

export {GetData,GetBagData,PutBagData,DeleteBagData,VaporizeBagData,PostData}