console.log("client side js here")

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weather = document.querySelector('#weather');
const errorMsg = document.querySelector('#error');
const searchItem = document.querySelector("#searchItem")

weather.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    weather.textContent = "Loading Weather info";
    errorMsg.textContent = '';
    const location = search.value
        fetch('/weather?address='+location).then((response) => {
            
        response.json().then((data) => {
            if(data.error){
                weather.textContent = "";
                errorMsg.textContent = data.error;
                console.log(data.error)
            }
            else{
                weather.textContent = "As at the last observation time of "+ data.response.observation_time+ 
                " temperature was " + data.response.current_temperature+" and "+ data.response.weather_desc;
                console.log(data.location)
                console.log(data.response)
            }
        }) 
})
})