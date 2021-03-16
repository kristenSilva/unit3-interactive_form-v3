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
    * 
*/