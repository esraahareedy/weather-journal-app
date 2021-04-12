/* Global Variables */
const apiKey = '&appid=4330aebd0857a0194ffb76c92d96b64e' // Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

//Create a new data instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
const generate = document.querySelector('#generate');

generate.addEventListener('click', performAction);

/* Function called by event listener */

function performAction() {
    
    //get user inputs
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    getWeather(baseURL, zipCode, apiKey)
        .then(function(data) {
            // add data to POST request
            postData('/addWeather', { temp: data.main.temp, date: newDate, content: feelings });
        }).then(function() {
            updateUI()
        }).catch(function(error){
            console.log(error)
        })

}

/* Function to GET Web API Data*/
const getWeather = async(baseURL , zipCode , apiKey) =>{
    const res = await fetch(baseURL+zipCode+apiKey+'&units=metric');
    try{
        const apiTemp = await res.json();
        return apiTemp
    }catch(error){
        console.log('error' , error);
    }
}


/* Function to POST data */
const postData = async ( url = '', data = {}) =>{
    console.log(data); //test
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        }), 
    });

    try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    }catch(error){
        console.log('error' , error);
    }
};




const updateUI = async() =>{
    const req = await fetch('/all')
    try{
        const allData = await req.json();

        document.querySelector('#date').innerHTML = `Date:  ${allData.date}`;
        document.querySelector('#temp').innerHTML = `Temprature:  ${allData.temp} C`;
        document.querySelector('#content').innerHTML = `Feelings:  ${allData.content}`;
    }catch(error){
        console.log('error' , error)
    }
}
