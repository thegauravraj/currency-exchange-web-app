const base_url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const countryList = {
    INR: "IN",
    USD: "US",
    EUR: "EU",
    BND: "BN",
    CLP: "CL",
    DOP: "DO",
    CDF: "CD",
    BHD: "BH"
};


// Add currencies to dropdown
for (let select of dropdowns) {

    for (let currcode in countryList) {

        let newoption = document.createElement("option");

        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = true;
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = true;
        }

        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}


// Update flag
const updateflag = (element) => {

    let currcode = element.value;
    let countrycode = countryList[currcode];

    let newscr = `https://flagsapi.com/${countrycode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");

    img.src = newscr;
};


// Currency conversion
btn.addEventListener("click", async (evt) => {

    evt.preventDefault();

    let amount = document.querySelector(".amount input");

    let amtval = amount.value;

    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    console.log(fromcurr.value, tocurr.value);

    // Create API URL
    const url = `${base_url}/${fromcurr.value.toLowerCase()}.min.json`;

    console.log(url);

    // Get API data
    let response = await fetch(url);

    let data = await response.json();

    // Get exchange rate
    let rate =
        data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    console.log("Rate:", rate);

    // Calculate final amount
    let finalAmount = amtval * rate;

    msg.innerText =
        `${amtval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
});
