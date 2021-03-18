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
function isValidName(){
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameInput.value);
    if(nameIsValid){
        validationPass(nameInput);
    } else {
        validationFail(nameInput);
    }
    return nameIsValid;
}

//Must be a valid email address
function isValidEmail() {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
    if(emailIsValid){
        validationPass(emailInput);
    } else {
        validationFail(emailInput);
    }
    return emailIsValid;
}

//One activity must be selected for registration
function isValidActivity(){
    const activityIsValid = totalCost > 0;
    if(activityIsValid){
        validationPass(activitiesCost);
    } else {
        validationFail(activitiesCost);
    }
    return activityIsValid;
}

//Credit card payment has to contain valid credit card fields
const regExpNumber = /^\d{13,16}$/;
const regExpZip = /^\d{5}$/;
const regExpCvv = /^\d{3}$/;

function isValidPayment(){
    var valid = false;
    if(selectPayment.value === 'credit-card'){
        valid = regExpNumber.test(creditCardNum.value) && 
                regExpZip.test(zipCode.value) && 
                regExpCvv.test(cvv.value);
        if(regExpNumber.test(creditCardNum.value)){
            validationPass(creditCardNum);
        } else {
            validationFail(creditCardNum);
        }

        if(regExpZip.test(zipCode.value)){
            validationPass(zipCode);
        } else {
            validationFail(zipCode);
        }

        if(regExpCvv.test(cvv.value)){
            validationPass(cvv);
        } else {
            validationFail(cvv);
        }
    } else {
        valid = true;
    }
    return valid;
}

//Changes parent element class to 'valid'
// element - HTML element
function validationPass(element){
    let parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.hidden = true;
  }

//Changes parent element class to 'not-valid' & shows message on screen
// element - HTML element
function validationFail(element){
    let parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.hidden = false;
  }
/**
 * Real-time Validation
 */
 nameInput.addEventListener('keyup', isValidName);
 emailInput.addEventListener('keyup', isValidEmail);
 activitiesField.addEventListener('keyup', isValidActivity);
 selectPayment.addEventListener('keyup', isValidPayment);

/**
 * Form Validation
 */
form.addEventListener('submit', (e) => {
    //COMMENT OUT AFTER TESTING
    e.preventDefault();

    if (!isValidName()) {
        console.log('Invalid name prevented submission');
        e.preventDefault();
    }

    if (!isValidEmail()) {
        console.log('Invalid email prevented submission');
        e.preventDefault();
    }

    if (!isValidActivity()) {
        console.log('Invalid activities selection prevented submission');
        e.preventDefault();
    }

    if (!isValidPayment()) {
        console.log('Invalid credit card input prevented submission');
        e.preventDefault();
    }
});