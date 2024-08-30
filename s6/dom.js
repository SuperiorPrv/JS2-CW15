import { PostBagData,PutBagData,DeleteBagData,VaporizeBagData,GetDataObj,PutData,DeleteData } from "./api.js";

const block2_h1 = document.querySelector('.block2_h1')
const productImg = document.querySelector('.productImg');
const productName = document.querySelector('.productName');
const productManufacturer = document.querySelector('.productManufacturer');
const productPrice = document.querySelector('.productPrice');
const productInfo = document.querySelector('.productInfo');
const addToCart = document.querySelector('.addToCart');

const bagShowButton = document.querySelector('.bagShowButton');
const bagDialog = document.querySelector('.bagDialog');
const closeBagDialog = document.querySelector('.closeBagDialog');
const bag_box = document.querySelector('.bag_box');
const totalPrice = document.querySelector('.totalPrice');

const editProduct = document.querySelector('.editProduct');
const editProductDialog = document.querySelector('.editProductDialog');
const editProductForm = document.querySelector('.editProductForm');
const closeEditProductDialog = document.querySelector('.closeEditProductDialog');

const deleteThisProduct = document.querySelector('.deleteThisProduct');

const checkOut = document.querySelector('.checkOut');

let ind = 0;

checkOut.onclick=()=>{
    VaporizeBagData();
}

closeEditProductDialog.onclick=()=>{
    editProductDialog.close();
}

editProductForm.onsubmit=(event)=>{
    event.preventDefault();
    if(editProductForm.name.value.trim()=="" || editProductForm.manufacturer.value.trim()=="" || editProductForm.price.value.trim()=="" || editProductForm.image.value.trim()=="" || editProductForm.about.value.trim()==""){
        alert("Please fill all fields!");
    }
    else{
        let product = {
            name: editProductForm.name.value,
            manufacturer: editProductForm.manufacturer.value,
            price: (editProductForm.price.value).toString(),
            image: editProductForm.image.value,
            about: editProductForm.about.value
        };
        PutData(product,ind);
        editProductDialog.close();
    }
}

deleteThisProduct.onclick=async()=>{
    let Obj = await GetDataObj();
    DeleteData(Obj.id);
    window.location.href = "adminPage.html";
}

editProduct.onclick=async()=>{
    editProductDialog.showModal();
    let Obj = await GetDataObj();
    editProductForm.name.value = Obj.name;
    editProductForm.manufacturer.value = Obj.manufacturer;
    editProductForm.price.value = Obj.price;
    editProductForm.image.value = Obj.image;
    editProductForm.about.value = Obj.about;
    ind = Obj.id;
}

let productData;

addToCart.onclick=()=>{
    productData["count"]=1;
    PostBagData(productData);
}

bagShowButton.onclick=()=>{
    bagDialog.showModal();
}
closeBagDialog.onclick=()=>{
    bagDialog.close();
}

function DisplayBag(Data) {
    let TotalPrice = 0;
    bag_box.innerHTML = '';
    Data.forEach((e,i)=>{
        let card = document.createElement('div');
        card.classList.add('card1');
        let right = document.createElement('div');
        let right_d1 = document.createElement('div');
        let right_d2 = document.createElement('div');
        let image = document.createElement('img');
        let name = document.createElement('p');
        let deleteProduct = document.createElement('button');
        deleteProduct.classList.add('deleteProduct');
        let price = document.createElement('h4');
        let incButton = document.createElement('button');
        incButton.classList.add('countBtn');
        let count = document.createElement('span');
        let decButton = document.createElement('button');
        decButton.classList.add('countBtn');
        incButton.onclick=()=>{
            e.count++;
            PutBagData(e,e.id);
        }
        decButton.onclick=()=>{
            e.count--;
            if(e.count<1) e.count=1;
            PutBagData(e,e.id);
        }
        count.innerHTML = e.count;
        image.src = e.image;
        name.innerHTML = e.name;
        deleteProduct.innerHTML = 'x';
        deleteProduct.onclick=()=>{
            DeleteBagData(e.id);
        }
        price.innerHTML = "$"+e.price;
        incButton.innerHTML = '+';
        decButton.innerHTML = '-';
        right_d1.append(name,deleteProduct);
        right_d2.append(incButton,count,decButton);
        right.append(right_d1,price,right_d2);
        card.append(image,right);
        bag_box.appendChild(card);
        TotalPrice += e.count * e.price;
    });
    totalPrice.innerHTML = '$'+Math.round(TotalPrice);
}

function Display(Obj) {
    productData = Obj;
    block2_h1.innerHTML = "Home / "+ Obj.name;
    productImg.src = Obj.image;
    productName.innerHTML = Obj.name;
    productManufacturer.innerHTML = 'By '+Obj.manufacturer;
    productPrice.innerHTML = '$'+Obj.price;
    productInfo.innerHTML = Obj.about;
}

export {Display,DisplayBag};