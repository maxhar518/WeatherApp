if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwabuilder-sw.js') 
    .then((reg) => console.log('service worker registered',reg))
    .catch((err) => console.log('service worker not registered',err))
 }
 
const cityForm = document.querySelector('#cityForm')
const city = document.querySelector('#city')
const apiKey = `55ff5b9f1aa556e25d9767c01329b185`;
const message = document.querySelector('#message')
const container = document.querySelector('#container')

const getWeather = async () => {
    try {
        message.innerText = ''
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city.value}&appid=${apiKey}&units=metric`)
        const data = await response.json()
        if (!response.ok) throw error(data.error.message)
        return data
    // .finally(() =>{
    //     hideLoader()
    // })
    } catch (err) {
        message.innerText = `ERROR, no matching location found`
    }
};

cityForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const info = await getWeather();
        console.log(info);
        showWeatherData(info);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});


const showWeatherData = (info) => {
    var myDate = new Date(`${info.dt}` * 1000);
    let a = myDate.toLocaleString();
    const iconCode = info.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let backgroundImageUrl;
    let width = "100px"
    let height = "900px"
    let backgroundSize = "cover"
    let backroundPosition = "center"

    switch (iconCode) {
        case '01d':
        case '01n':
            backgroundImageUrl = 'url(./resources/clouds-1117583_1920/jpg)';
            break;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            backgroundImageUrl = 'url(./resources/clouds-1473311.jpg)';
            break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            backgroundImageUrl = 'url(./resources/glass-2654887_1920.jpg)';
            break;
        case '11d':
        case '11n':
            backgroundImageUrl = 'url(./resources/sea-6811812-1920.jpg)';
            break;
        case '13d':
        case '13n':
            backgroundImageUrl = 'url(./resources/winter.jpg)';
            break;
        case '50d':
        case '50n':
            backgroundImageUrl = 'url(./resources/foggy.jpg)';
            break;
        default:
            backgroundImageUrl = 'url(./resources/sunset.jpg)';
            break;
    }

    document.body.style.backgroundImage = backgroundImageUrl;
    // document.body.style.width = width
    document.body.style.height = height
    document.body.style.backgroundSize = backgroundSize
    document.body.style.backgroundPosition = backroundPosition

    container.innerHTML = `
        <p>${info.weather[0].main}</p>
        <img src="${iconUrl}" alt="Weather Icon"></img>
        <p>Date & Time: ${a}</p>
        <p>Temperature: ${info.main.temp}°C</p> 
        <p>Humidity: ${info.main.humidity}%</p>
        <p>Wind Speed: ${info.wind.speed} km/h</p> 
        <p>Clouds: ${info.clouds.all}%</p>
    `;
}
