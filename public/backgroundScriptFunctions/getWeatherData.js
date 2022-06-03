async function getCurrentWeather() {
    let weather = await fetch("https://weather.com/weather/today/l/40.18,-75.22");
    weather = await weather.text();
    weather = weather.match(`<span data-testid="TemperatureValue" class="CurrentConditions--tempValue--3a50n">(.*)<\/span>`);
    console.log(weather);
}
getCurrentWeather();