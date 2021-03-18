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
const activitiesCost = document.getElementById('activities-cost');
const checkboxes = document.querySelectorAll('[type="checkbox"]');
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

//Make focus state for activities more obvious for users
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
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);
    if(nameIsValid){
        validationPass(name);
    } else {
        validationFail(name);
    }
    return nameIsValid;
}

//Must be a valid email address
function isValidEmail(email) {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if(emailIsValid){
        validationPass(email);
    } else {
        validationFail(email);
    }
    return emailIsValid;
}

//One activity must be selected for registration
//checkboxes = array of input type checkbox
function isValidRegistration(activities){
    const activityIsValid = totalCost >0;
    // for(let i = 0; i < checkboxes.length; i++){
    //     if(checkboxes[i].checked){
    //         oneChecked = true;
    //         break;
    //     } else {
    //         oneChecked = false;
    //     }
    // }

    if(activityIsValid){
        validationPass(activities);
    } else {
        validationFail(activities);
    }
    
    return activityIsValid;
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
        if(regNumber.test(creditCardNum.value)){
            validationPass(creditCardNum);
        } else {
            validationFail(creditCardNum);
        }

        if(regZip.test(zipCode.value)){
            validationPass(zipCode);
        } else {
            validationFail(zipCode);
        }

        if(regCvv.test(cvv.value)){
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

/* Form validation
    * 
*/
const form = document.querySelector('form');
const emailInput = document.getElementById('email');


form.addEventListener('submit', (e) => {
    // let validForm = isValidName(nameInput) &&
    //     isValidEmail(emailInput.value) &&
    //     isValidRegistration(checkboxes) &&
    //     isValidPayment(selectPayment);
    // if(!validForm){
    //     e.preventDefault();
    //     console.log('something is missing');
    // } 
    //e.preventDefault();

    if (!isValidName(nameInput)) {
        console.log('Invalid name prevented submission');
        e.preventDefault();
    }

    if (!isValidEmail(emailInput)) {
        console.log('Invalid email prevented submission');
        e.preventDefault();
    }

    if (!isValidRegistration(activitiesCost)) {
        console.log('Invalid activities selection prevented submission');
        e.preventDefault();
    }

    if (!isValidPayment(selectPayment)) {
        console.log('Invalid credit card input prevented submission');
        e.preventDefault();
    }
    
});