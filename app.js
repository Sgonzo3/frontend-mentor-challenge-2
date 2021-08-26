/*
bill-input
tip
people-input

Should Custom Tip open a modal?

final-tip
final-total

onChange for bill-input
onClick for tip button
onChange for people-inout
onClick for reset
*/
(() => {
    let billInput = 0;
    let selectedTip = 0;
    let peopleInput = 0;
    
    let finalTip = 0;
    let finalTotal = 0;
    
    let activeTip = document.querySelector(".tip-button.active");
    let resetElement = document.querySelector(".reset-button")
    let billElement = document.querySelector(".bill-input");
    let peopleElement = document.querySelector(".people-input");
    let tipTotalElement = document.querySelector('.tip-total p');
    let cashTotalElement = document.querySelector(".cash-total p");
    
    let clickHandler = (event) => {
        let className = event.target.classList.value;
        console.log(className)
        switch (className) {
            case "tip-button":
                tipOnClick(event);
                break;
            case "reset-button enabled":
                resetOnClick(event);
                break;
        }
    }
    
    let billOnChange = (event) => {
        billInput = +event.target.value;
        console.log(billInput);
        calculate();
    }
    
    let tipOnClick = (event) => {
        selectedTip = +event.target.value;
        console.log(selectedTip, activeTip, activeTip?.ariaPressed);
        if (activeTip) {
            activeTip.classList.remove("active");
            activeTip.ariaPressed = false;    
        }
        event.target.classList.toggle("active");
        event.target.ariaPressed = true;
        activeTip = event.target;
        calculate();
    }
    
    let peopleOnChange = (event) => {
        peopleInput = +event.target.value;
        console.log(peopleInput);
        calculate();
    }
    
    let resetOnClick = (event) => {
        console.log("Resetting...");
    
        billInput = 0;
        selectedTip = 0;
        peopleInput = 1;
    
        billElement.value = billInput;
        activeTip?.classList.remove("active");
        peopleElement.value = peopleInput;
        resetElement.classList.remove("enabled");
        calculate();
    }
    
    let calculate = (bill, tip, people) => {
        console.log(billInput, selectedTip, peopleInput)

        let anyInput = !!billInput || !!selectedTip || !!peopleInput;
        let allInput = !!billInput && !!selectedTip && !!peopleInput;
        let portion = parseFloat(billInput).toPrecision(15) / parseFloat(peopleInput).toPrecision(15) || 0;
    
        finalTip = allInput 
        ?  (portion * parseFloat(selectedTip).toPrecision(15))
        : 0;
    
        finalTotal = allInput 
        ? (portion + finalTip)
        : 0;
    
        
        tipTotalElement.innerHTML = "$" + finalTip.toFixed(2);
        cashTotalElement.innerHTML = "$" + finalTotal.toFixed(2);
        allInput 
        ? resetElement.classList.add("enabled") 
        : resetElement.classList.remove("enabled")
    }
    
    resetOnClick();
    
    window.addEventListener("click", (event) => clickHandler(event));
    billElement.addEventListener("input", (event) => billOnChange(event));
    peopleElement.addEventListener("input", (event) => peopleOnChange(event));
})();
