async function getCurrentWeather(callback) {
    let weather = await fetch("https://weather.com/weather/today/");
    weather = await weather.text();

    const includeColors = false;

    const weatherData = {
        status: "success",
        temp: weather.match(`<span data-testid="TemperatureValue" class="CurrentConditions.*?>(.*?)<\/span>`)[1],
        weather: weather.match('<div data-testid="wxPhrase" class="CurrentConditions.*?>(.*?)<\/div>')[1],
        iconSvg: `<svg ${includeColors ? ` style="--color-moon: #ccc; --color-star: #ccc; --color-cloud: #fff; --color-na: #fff; --color-fog: #fff; --color-hail: #fff; --color-tornado: #fff; --color-wind: #fff; --color-storm: #fff; --color-lightning: #e8ce05; --color-sun: #e8ce05; --color-drop: #6adef8; --color-snowflake: #fff; --color-thunderstorm-mask: #2b2b2b;"` : ""} viewbox="0 0 200 200">${weather.match('<svg set="weather" .*?>(.*?)(<\/svg>)')[1]}</svg>`,
    }
    callback(weatherData)
}