//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(event){
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,2000);
    event.preventDefault();
});


//Calculate results
function calculateResults(event){
    //UI Vars
const  UIamount     = document.querySelector('#amount').value,
    UIinterest      = document.querySelector('#interest').value,
    UIyears         = document.querySelector('#years').value,
    UImonthlyPay    = document.querySelector('#monthly-payment'),
    UItotalPay      = document.querySelector('#total-payment'),
    UItotalInterest = document.querySelector('#total-interest');

const principal = parseFloat(UIamount);
const calculatedInterest = parseFloat(UIinterest) / 100 / 12;
const calculatedPayments = parseFloat(UIyears) * 12;

//doing the calculate
const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal *x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        UImonthlyPay.value = monthly.toFixed(2);
        UItotalPay.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //show results
    document.getElementById('results').style.display = 'block';

    document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please, check your numbers');
    }
}

//ERROR MESSAGE
function showError(err){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div')

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')
    //add class
    errorDiv.className = 'alert alert-danger'
    //add text
    errorDiv.appendChild(document.createTextNode(err));
    //insert the div error above heading
    card.insertBefore(errorDiv, heading)
    //clear error
    setTimeout(clearError, 3000)
}

//clear ERROR

function clearError(){
    document.querySelector('.alert').remove();
}