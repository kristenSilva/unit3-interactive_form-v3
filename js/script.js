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
    console.log(design);
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
//regex accounts for hyphanated names (Latinx inclusion :D)
function isValidName(name){
    return /[a-z]+.[a-z]+.[a-z]+/i.test(name);
}

//Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

/* Form validation
    * 
*/
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {

})