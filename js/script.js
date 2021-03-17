/* Focus on 'Name' field*/
const nameInput = document.getElementById('name');
nameInput.focus();

/* 'Job Role' section
    * Hide 'other job' input on start
    * Show 'other job' input based on user selection
*/
const otherJob = document.getElementById('other-job-role');
otherJob.style.display = 'none';
const selectJob = document.getElementById('title');

selectJob.addEventListener('change', (e) => {
    if(e.target.value === 'other'){
        otherJob.style.display = 'inherit';
    } else {
        otherJob.style.display = 'none';
    }
});

/* 'T-Shirt info' section 
    * Disable color selection until design element is selected
*/
const selectColor = document.getElementById('color');
selectColor.disabled = true;
const selectDesign = document.getElementById('design');

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

/* 'Register for Activities' section
    * Total cost of activities is updated based on user selection
*/
const activitiesField = document.getElementById('activities');
const activitiesCost = document.querySelector('.activities-cost');
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

//const checkboxLabels = document.getElementById('activities-box').children;
const checkboxes = document.querySelectorAll('[type="checkbox"]');

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

/* 'Payment Info' section
    * Display credit card payment as default
    * Payment method is displayed based on user selection
*/
const selectPayment = document.getElementById('payment');
selectPayment[1].selected = true;

/* ------------------ I WANT TO CLEAN THIS UP -----------*/
//grab payment options
let paymentDivs = [];
paymentDivs.push(document.getElementById('credit-card'));
paymentDivs.push(document.getElementById('paypal'));
paymentDivs.push(document.getElementById('bitcoin'));
/* ------------------ ----------------------- -----------*/

//hide all payment options except for credit-card
for(let i = 1; i < paymentDivs.length; i++){
    paymentDivs[i].hidden = true;
}

/*-------------THIS EVENT LISTENER IS REPETITIVE--------------- */
selectPayment.addEventListener('change', (e) => {
   if(e.target.value === 'credit-card'){
       for( let i = 0; i < paymentDivs.length; i++){
           if(paymentDivs[i].getAttribute('id') === 'credit-card'){
               paymentDivs[i].hidden = false;
           } else {
               paymentDivs[i].hidden = true;
           }
       }
   } else if(e.target.value === 'paypal'){
        for( let i = 0; i < paymentDivs.length; i++){
            if(paymentDivs[i].getAttribute('id') === 'paypal'){
                paymentDivs[i].hidden = false;
            } else {
                paymentDivs[i].hidden = true;
            }
        }
   } else {
        for( let i = 0; i < paymentDivs.length; i++){
            if(paymentDivs[i].getAttribute('id') === 'bitcoin'){
                paymentDivs[i].hidden = false;
            } else {
                paymentDivs[i].hidden = true;
            }
        }
   }
});



/**
 * Validating functions
 */

//Name field cannot be blank
function isValidName(name){
    return /[a-z]+\s[a-z]+/i.test(name);
}

//Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

//One activity must be selected for registration
//checkboxes = array of input type checkbox
function isValidRegistration(checkboxes){
    var oneChecked = false;
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            oneChecked = true;
            break;
        } else {
            oneChecked = false;
        }
    }
    return oneChecked;
}

//Credit card payment has to contain valid credit card fields
const creditCardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const regNumber = /^\d{13,16}$/;
const regZip = /^\d{5}$/;
const regCvv = /^\d{3}$/;

function isValidPayment(payment){
    var valid = false;
    if(payment.value === 'credit-card'){
        valid = regNumber.test(creditCardNum.value) && regZip.test(zipCode.value) && regCvv.test(cvv.value);
    } else {
        valid = true;
    }
    return valid;
}
/* Form validation
    * 
*/
const form = document.querySelector('form');
const emailInput = document.getElementById('email');


form.addEventListener('submit', (e) => {
    let validForm = isValidName(nameInput.value) &&
        isValidEmail(emailInput.value) &&
        isValidRegistration(checkboxes) &&
        isValidPayment(selectPayment);
    if(!validForm){
        e.preventDefault();
        console.log('something is missing');
    } 
});