const selectedSeatEl = document.getElementById("selected-seat");
const totalBookedEl = document.getElementById("total-booked");
const availableSeatEl = document.getElementById("available-seat");
const totalPriceEl = document.getElementById("total-price");
const couponInputEl = document.getElementById("coupon-field");
const couponBtnEl = document.getElementById("coupon-btn");
const defaultTextEl = document.getElementById("default-text");
const grandTotalEl = document.getElementById("grand-total");
const phoneNumberEl = document.getElementById("phone-number");
const nextBtnEl = document.getElementById("next-btn");


let selectedSeat = [];
let totalPrice = 0;

function handleSelectSeat(event){
    
    const value = event.innerText;
    if(selectedSeat.includes(value)){
        return alert("Seat already booked.")
    } else if(selectedSeat.length < 4) {

        event.classList.add('bg-primary');
        event.classList.add('text-white');

        //push array
        selectedSeat.push(event.innerText);
        //increase total book number
        totalBookedEl.innerText = selectedSeat.length;

        //decrease available seat
        const availableSeatValue = parseFloat(availableSeatEl.innerText);
        const newAvailableSeatValue = availableSeatValue - 1;
        availableSeatEl.innerText = newAvailableSeatValue;

        //remove default text
        defaultTextEl.classList.add("hidden");


        selectedSeatEl.innerHTML += `
            <li class="text-base font-normal flex justify-between">
                <span>${event.innerText}</span>
                <span>Economy</span>
                <span>550</span>
            </li>
        `

        //update total price
        totalPrice += 550;
        totalPriceEl.innerText = totalPrice.toFixed(2);


        //active coupon button
        if(selectedSeat.length > 3){
            couponInputEl.removeAttribute('disabled');
            couponBtnEl.removeAttribute('disabled');
        }

    } else {
        return alert("Maximum seat booked.")
    }

}

//coupon button function
document.getElementById("coupon-btn").addEventListener("click", function(){
    const couponInputValue = couponInputEl.value;
    let couponSave = 0;

    if(couponInputValue != "NEW50" && couponInputValue !== "Couple 20"){
        alert("Your Provided Coupon is not valid.");
        return;
    }


    if(couponInputValue === "NEW50"){
        couponSave = totalPrice * .15;
    }else if(couponInputValue === "Couple 20"){
        couponSave = totalPrice * .20;
    }

    //show discount price and replace coupon form
    const showCouponPriceEl = document.getElementById("show-coupon-price");
    showCouponPriceEl.innerHTML = `
        <p>Discount</p>
        <p>
            <span>-BDT: </span>
            <span>${couponSave.toFixed(2)}</span>
        </p>
    `


    const grandTotalValue = totalPrice - couponSave;
    grandTotalEl.innerText = grandTotalValue.toFixed(2);
})


//phone number
phoneNumberEl.addEventListener('input', function(e){
    const inputValue = e.target.value;

    if(inputValue.length >= 11){
        nextBtnEl.removeAttribute("disabled");
    }
})

document.getElementById("btn-continue").addEventListener('click', function (){
    window.location.reload();
})