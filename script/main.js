import { currencies } from "./currency-types.js";
const ccTypeLeft = document.getElementById("currency-type-left");
const ccTypeRight = document.getElementById("currency-type-right");

currencies.forEach((value) => {
  const element1 = document.createElement("option");
  element1.value = value;
  element1.innerText = value;
  if (value === "USD") element1.defaultSelected = true;

  const element2 = document.createElement("option");
  element2.value = value;
  element2.innerText = value;
  if (value === "INR") element2.defaultSelected = true;

  ccTypeLeft.append(element1);
  ccTypeRight.append(element2);
});

const converterForm = document.getElementById("cc-form");
const ctLeft = document.getElementById("currency-type-left");
const ctRight = document.getElementById("currency-type-right");
const ctValueLeft = document.getElementById("ct-value-left");
const ctValueRight = document.getElementById("ct-value-right");

let controller = new AbortController();
let loading = false;

converterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (loading === true) {
    controller.abort();
    console.log("canceled previous fetch call!");
    controller = new AbortController();
  }

  loading = true;

  try {
    const res = await fetch(
      "https://v6.exchangerate-api.com/v6/b8dfb100f0891c3a0a5b9ffc/latest/USD",
      {
        signal: controller.signal,
      }
    );
    if (!res.ok) throw new Error("failed to get exchange data");

    const exchange = await res.json();

    const currencyLeft = ctLeft.value;
    const currencyRight = ctRight.value;
    const amountLeft = ctValueLeft.value;
    let amountRight =
      (amountLeft / exchange.conversion_rates[currencyLeft]) *
      exchange.conversion_rates[currencyRight];

    amountRight = Number(amountRight.toFixed(4));

    ctValueRight.value = amountRight;

    console.log(currencyLeft, exchange.conversion_rates[currencyLeft]);
    console.log(currencyRight, exchange.conversion_rates[currencyRight]);
    console.log("result = ", amountRight);
  } catch (error) {
    console.log(error);
  } finally {
    loading = false;
  }
});
