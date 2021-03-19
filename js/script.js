const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const otherJob = document.getElementById('other-job-role');
const selectJob = document.getElementById('title');
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const activitiesField = document.getElementById('activities');
const checkboxes = document.querySelectorAll('[type="checkbox"]');
const activitiesCost = document.getElementById('activities-cost');
const selectPayment = document.getElementById('payment');
const creditCardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

//Focus on 'Name Field' upon load
nameInput.focus();

/**
 * 'Job Role' section
    * Hide 'other job' input on start
    * Show 'other job' input based on user selection
*/
otherJob.style.display = 'none';

selectJob.addEventListener('change', (e) => {
    if(e.target.value === 'other'){
        otherJob.style.display = 'inherit';
    } else {
        otherJob.style.display = 'none';
    }
});

/**
 * 'T-Shirt info' section 
    * Disable color selection until design element is selected
*/
selectColor.disabled = true;

selectDesign.addEventListener('change', (e) => {
    selectColor.disabled = false;
    const design = e.target.value;
    if(design === 'js puns'){
        selectColor[1].selected = true;
        for(let i = 0; i < selectColor.length; i++){
            if(selectColor[i].getAttribute('data-theme') === 'js puns'){
                selectColor[i].hidden = false;
            } else{
                selectColor[i].hidden = true;
            }
        }
    } else {
        selectColor[4].selected = true;
        for(let i = 0; i < selectColor.length; i++){
            if(selectColor[i].getAttribute('data-theme') === 'heart js'){
                selectColor[i].hidden = false;
            } else {
                selectColor[i].hidden = true;
            }
        }
    }
});

/**
 * 'Register for Activities' section
    * Total cost of activities is updated based on user selection
*/
let totalCost = 0;

activitiesField.addEventListener('change', (e) => {
    const price = parseInt(e.target.getAttribute('data-cost'));
    if(e.target.checked){
        totalCost += price;
        activitiesCost.innerHTML = `Total: \$${totalCost}`;
    } else {
        totalCost -= price;
        activitiesCost.innerHTML = `Total: \$${totalCost}`;
    }
});

//Make focus state for activities more obvious for users as they tab through
for(let i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener('focus', (e) => {
        e.target.parentNode.className = 'focus';
    });
    
    checkboxes[i].addEventListener('blur', (e) => {
        if(checkboxes[i].parentNode.className === 'focus'){
                checkboxes[i].parentNode.className = '';
        }
    });
}

//control for conflicting events
activitiesField.addEventListener('change', (e) => {
    const clickedEvent = e.target;
    const dateAndTime = e.target.getAttribute('data-day-and-time');
    if (clickedEvent.checked){
        for(let i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].getAttribute('data-day-and-time') === dateAndTime && 
                checkboxes[i] !== clickedEvent){
                checkboxes[i].disabled = true;
                checkboxes[i].parentElement.classList.add('disabled');
            }
        }
    } else {
        for(let i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].getAttribute('data-day-and-time') === dateAndTime && 
                checkboxes[i] !== clickedEvent){
                checkboxes[i].disabled = false;
                checkboxes[i].parentElement.classList.remove('disabled');
            }
        }
    }
});


/**
 * 'Payment Info' section
    * Display credit card payment as default
    * Payment method is displayed based on user selection
*/
let paymentDivs = [];
paymentDivs.push(document.getElementById('credit-card'));
paymentDivs.push(document.getElementById('paypal'));
paymentDivs.push(document.getElementById('bitcoin'));

selectPayment[1].selected = true;
hideShowPayment(paymentDivs, 'credit-card');

//Helper function to hide/show payment based on user selection
function hideShowPayment(paymentTypes, idName){
    for(let i = 0; i < paymentTypes.length; i++){
        if(paymentTypes[i].getAttribute('id') === idName){
            paymentTypes[i].hidden = false;
        } else {
            paymentTypes[i].hidden = true;
        }
    }
}

selectPayment.addEventListener('change', (e) => {
   if(e.target.value === 'credit-card'){
       hideShowPayment(paymentDivs, 'credit-card');
   } else if(e.target.value === 'paypal'){
        hideShowPayment(paymentDivs, 'paypal');
   } else {
       hideShowPayment(paymentDivs, 'bitcoin');
   }
});

/**
 * Validating functions
 */

//Name field cannot be blank
let invalidName= document.createElement('SPAN');
invalidName.innerHTML = 'Name field can only be comprised of letters';
invalidName.className = 'hint';
nameInput.parentNode.insertBefore(invalidName,nameInput.nextElementSibling);

function isValidName(){
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameInput.value);
    if(nameInput.value === ''){
        validationBlankFail(nameInput);
        return nameIsValid;
    }
    if(!nameIsValid){
        validationInvalidFail(nameInput);
        return nameIsValid;
    }
    if(nameIsValid) {
        validationPass(nameInput);
        return nameIsValid;
    }
}

//Must be a valid email address
let blankEmail = document.createElement('SPAN');
blankEmail.innerHTML = 'Email field cannot be blank';
blankEmail.className = 'hint';
emailInput.parentElement.appendChild(blankEmail);

function isValidEmail() {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
    if(emailInput.value === ''){
        validationBlankFail(emailInput);
        return emailIsValid;
    } 
    if(!emailIsValid){
        validationInvalidFail(emailInput);
        return emailIsValid;
    } 
    if(emailIsValid){
        validationPass(emailInput);
        return emailIsValid;
    }
}

//One activity must be selected for registration
function isValidActivity(){
    const activityIsValid = totalCost > 0;
    if(activityIsValid){
        validationPass(activitiesCost);
    }
    if(!activityIsValid){
        validationBlankFail(activitiesCost);
    }
    return activityIsValid;
}

//Credit card payment has to contain valid credit card fields
//Validator for credit card number
const regExpNumber = /^\d{13,16}$/;
let blankCardNum = document.createElement('SPAN');
blankCardNum.innerHTML = 'Card Number field cannot be blank';
blankCardNum.className = 'hint';
creditCardNum.parentElement.appendChild(blankCardNum);

function isValidCardNum(){
    let valid = regExpNumber.test(creditCardNum.value);
    if(selectPayment.value === 'credit-card'){
        if(creditCardNum.value === ''){
            validationBlankFail(creditCardNum);
            return valid;
        }
        if(!valid){
            validationInvalidFail(creditCardNum);
            return valid;
        }
        if(valid){
            validationPass(creditCardNum);
            return valid;
        }
    } else {
        valid = true;
        return valid;
    } 
}

//Validator for zip code
const regExpZip = /^\d{5}$/;
let blankZip = document.createElement('SPAN');
blankZip.innerHTML = 'Zip code field cannot be blank';
blankZip.className = 'hint';
zipCode.parentElement.appendChild(blankZip);

function isValidZip(){
    let valid = regExpZip.test(zipCode.value);
    if(selectPayment.value === 'credit-card'){
        if(zipCode.value === ''){
            validationBlankFail(zipCode);
            return valid;
        }
        if(!valid){
            validationInvalidFail(zipCode);
            return valid;
        }
        if(valid){
            validationPass(zipCode);
            return valid;
        }
    } else {
        valid = true;
        return valid;
    }
}

//Validator for CVV
const regExpCvv = /^\d{3}$/;
let blankCvv = document.createElement('SPAN');
blankCvv.innerHTML = 'CVV field cannot be blank';
blankCvv.className = 'hint';
cvv.parentElement.appendChild(blankCvv);

function isValidCvv(){
    let valid = regExpCvv.test(cvv.value);
    if(selectPayment.value === 'credit-card'){
        if(cvv.value === ''){
            validationBlankFail(cvv);
            return valid;
        }
        if(!valid){
            validationInvalidFail(cvv);
            return valid;
        } 
        if(valid){
            validationPass(cvv);
            return valid;
        }
    } else {
        valid = true;
        return valid;
    }
}

//validates all credit card fields
function isValidPayment(){
    let cardValid = isValidCardNum();
    let zipValid = isValidZip();
    let cvvValid = isValidCvv();
    let valid = cardValid && zipValid && cvvValid;
    return valid;
}

//Changes parent element class to 'valid' no error messages displayed
// element - HTML element
function validationPass(element){
    let parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    element.nextElementSibling.style.display = 'none';
    parent.lastElementChild.style.display = 'none';
  }

//Changes parent element class to 'not-valid' & shows 'blank' error message on screen
// element - HTML element
function validationBlankFail(element){
    let parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    element.nextElementSibling.style.display = 'none';
    parent.lastElementChild.style.display = 'inherit';    
  }

  function validationInvalidFail(element){
      let parent = element.parentElement;
      parent.classList.add('not-valid');
      parent.classList.remove('valid');
      element.nextElementSibling.style.display = 'inherit';
      parent.lastElementChild.style.display = 'none';
  }

 
/**
 * Real-time Validation
 */
 nameInput.addEventListener('keyup', isValidName);
 emailInput.addEventListener('keyup', isValidEmail);
 activitiesField.addEventListener('change', isValidActivity);
 selectPayment.addEventListener('keyup', isValidPayment);
 creditCardNum.addEventListener('keyup', isValidCardNum);
 zipCode.addEventListener('keyup', isValidZip);
 cvv.addEventListener('keyup', isValidCvv);
/**
 * Form Validation
 */
form.addEventListener('submit', (e) => {
    if (!isValidName()) {
        e.preventDefault();
    }

    if (!isValidEmail()) {
        e.preventDefault();
    }

    if (!isValidActivity()) {
        e.preventDefault();
    }

    if (!isValidPayment()) {
        e.preventDefault();
    }
});