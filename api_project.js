const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.min.json";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

const countryList={
    INR:"indian",
    USD:"usa",
    EUR:"europe",
    BND:"BN",
    CLP:"CL",
    DOP:"DO",
    CDF:"CD",
    BHD:"BH",

}

for(let select of dropdowns){
for (currcode in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name==="from" && currcode==="USD"){
        newoption.selected="selected";
    }
    else if(select.name==="to" && currcode==="INR"){
        newoption.selected="selected";
    }

    
    select.append(newoption);
}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
})
}
const updateflag=(element)=>{
let currcode=element.value;
let countrycode=countryList[currcode];
let newscr='https://flagsapi.com/${countrycode}/flat/64.png';
let img=element.parentElement.querySelector("img");
img.src=newscr;
};


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===" " || amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromcurr.value,tocurr.value);
    const url=`${base_url}/ ${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let finalAmount=amount*rate;
    msg.innerText=`${amtval} ${fromcurr.value}=${finalAmount} ${tocurr.value}`;
});