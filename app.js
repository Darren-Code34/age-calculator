const form = document.querySelector("form")
const inputs = document.querySelectorAll("input")
const jours = document.querySelector("#day")
const mois = document.querySelector("#month")
const annees = document.querySelector("#year")
const error = document.querySelectorAll(".error-msg")
const label = document.querySelectorAll("label")

let dayValue = 0
let monthValue = 0
let yearValue = 0

let validation = false

function showValidation({index, validation}){
    if(!validation){
        inputs[index].style.borderColor = "hsl(0, 100%, 67%)"
        label[index].style.color = "hsl(0, 100%, 67%)"
        error[index].style.visibility = "visible"
        setTimeout(()=>{
            error[index].style.visibility = "hidden"
            inputs[index].style.borderColor = "hsl(0, 0%, 86%)"
            label[index].style.color = "hsl(0, 0%, 38%)"
        }, 3000)
    }
}
jours.addEventListener("blur", dayValidation)
form.addEventListener("submit", dayValidation)
function dayValidation(){
    if(jours.value === ""){
        showValidation({index : 0, validation : false})
    }
    else{
        validation = true
        dayValue = jours.value
    }
}

mois.addEventListener("blur", monthValidation)
form.addEventListener("submit", monthValidation)
function monthValidation(){
    if(mois.value ===""){
        showValidation({index : 1, validation : false})
    }
    else{
        validation = true
        monthValue = mois.value - 1
    }
}

annees.addEventListener("blur", yearValidation)
form.addEventListener("submit", yearValidation)
function yearValidation(){
    if(annees.value ===""){
        showValidation({index : 2, validation : false})
    }
    else{
        validation = true
        yearValue = annees.value
    }
}

form.addEventListener("submit", calculAge)

let age = {
    day:0,
    month:0,
    year:0
}

let dayTimeMilliseconds = 1000*60*60*24
let monthTimeMilliseconds = dayTimeMilliseconds * 30
let yearTimeMilliseconds = dayTimeMilliseconds*365

function calculAge(e){
    e.preventDefault()
    if(validation){
        let dateRef = new Date(`${yearValue}`,`${monthValue}`, `${dayValue}`)
        console.log(dateRef);

        let dateRefMilliseconds = dateRef.getTime()

        let ageMilliseconds = Date.now() - dateRefMilliseconds

        let nbrYear = Math.trunc(ageMilliseconds/(dayTimeMilliseconds*365))
        age.year = nbrYear

        let nbrMonth = Math.trunc((ageMilliseconds % (dayTimeMilliseconds*365)) / (dayTimeMilliseconds*31))
        age.month = nbrMonth

        let nbrDay = Math.trunc(((ageMilliseconds % (dayTimeMilliseconds*365)) % (dayTimeMilliseconds*30)) / dayTimeMilliseconds)
        age.day = nbrDay

        console.log(age);

        displaysAge()
    }
    
}

/*Display the age*/

const resultYears = document.querySelector(".result-years")
const resultMonths = document.querySelector(".result-months")
const resultDays = document.querySelector(".result-days")

function displaysAge(){
    resultYears.innerHTML = age.year
    resultMonths.innerHTML = age.month
    resultDays.innerHTML = age.day
}


