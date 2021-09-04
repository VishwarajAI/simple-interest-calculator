// inputs 
const form = document.querySelector('form');
const amountInputElem = form['amount'];
const rateInputElem = form['rate'];
const rateSpanElem = document.querySelector('form > .form-field.slider > span');
const yearsInputElem = form['years'];





/*     FUNCTIONS          */

// initialize input elements value
const initializeInputs = () => 
{
    amountInputElem.value     = "1.0";
    rateInputElem.value       = "3.5";
    rateSpanElem.innerHTML    = "3.5%";
   
    // initialize years element
    const MAX_NUMBER_OF_YEARS = 20
    let  template = '';
    for(let i = 1; i <= MAX_NUMBER_OF_YEARS ;i++)
    {
        template += `<option value="${i}">${i}</option>`
    }
    yearsInputElem.innerHTML = template;
    yearsInputElem.value = 5;
}


// update Results 
const updateResults = (amount,rate,years,interest) =>
{
    document.querySelector('.results').style.display = 'block';
    document.querySelector('.results #amount').innerHTML = amount;
    document.querySelector('.results #rate').innerHTML = `${rate}%`;
    document.querySelector('.results #year').innerHTML = parseInt(years) + (new Date()).getFullYear();
    document.querySelector('.results #future-amount').innerHTML = interest;
}


const validateAmout = (amount) => 
{
    
    if(!isNaN(amount) && amount > 0) return true;
    alert('a positive amount should be entered');
    amountInputElem.focus();
    return false;
    
}

// giving the amout, the rate and number of years returns the interest 

const calculateInterest = (amount,rate,years) => 
{
    return (amount * rate * years ) / 100 ;
}



/* EVENTS */

// renders the change in the rate value into the UI 
rateInputElem.addEventListener('input',(event)=>{
    rateSpanElem.innerHTML = `${event.target.value}%`;
})


// calculate the results and render them into the UI 
form.addEventListener('submit',(event) => {
    event.preventDefault();

    const amount = parseFloat(amountInputElem.value);
    const rate = parseFloat(rateInputElem.value);
    const years = parseInt(yearsInputElem.value);

    if (validateAmout(amount))
        updateResults(amount,rate,years,calculateInterest(amount,rate,years));    
})



window.addEventListener('load',initializeInputs)
