import { PutBagData,DeleteBagData,VaporizeBagData } from "./api.js";

const right_box  = document.querySelector('.right_box');
const bagShowButton = document.querySelector('.bagShowButton');
const bagDialog = document.querySelector('.bagDialog');
const closeBagDialog = document.querySelector('.closeBagDialog');
const bag_box = document.querySelector('.bag_box');
const totalPrice = document.querySelector('.totalPrice');

const checkOut = document.querySelector('.checkOut');

const logInAdmin = document.querySelector('.logInAdmin');
const logInDialog = document.querySelector('.logInDialog');
const logInForm = document.querySelector('.logInForm');
const closeLogInDialog = document.querySelector('.closeLogInDialog');

logInAdmin.onclick=()=>{
    logInDialog.showModal();
}

logInForm.onsubmit=(e)=>{
    e.preventDefault();
    if(logInForm.name.value.trim()!="Parviz" || logInForm.password.value!="15041912"){
        alert("Wrong username or password!");
        logInForm.reset();
    }
    else{
        window.location.href = "adminpage.html";
    }
}

closeLogInDialog.onclick=()=>{
    logInDialog.close();
}


checkOut.onclick=()=>{
    VaporizeBagData();
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

function Display(Data) {
    right_box.innerHTML = '';
    Data.forEach((e,i) => {
        let card = document.createElement('div');
        let image = document.createElement('img');
        let name = document.createElement('p');
        let price = document.createElement('h4');
        image.src = e.image;
        name.innerHTML = e.name;
        price.innerHTML = '$'+e.price;
        card.append(image,name,price);
        card.onclick=()=>{
            localStorage.setItem('ProductId',e.id);
            window.location.href = 'about.html';
        }
        right_box.appendChild(card);
    });
}

export {Display,DisplayBag}