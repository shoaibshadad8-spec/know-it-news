async function getWeatherData(){
    var weatherApiKey = '1dbbca23866449f5ad7150709262009'
    var weatherCityName = 'Cairo'
    var weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${weatherCityName}`
    var data = ''
    data = await fetch(weatherApiUrl)
    var result = await data.json();
    // console.log(result);
    document.querySelector('#temp h2').innerText = result.current.temp_c + 'C';
    document.querySelector('#temp h3').innerText = result.location.name;
    document.querySelector('#temp img').setAttribute('src', 'http:' + result.current.condition.icon)
    document.querySelector('#temp img').setAttribute('title', result.current.condition.text)
}