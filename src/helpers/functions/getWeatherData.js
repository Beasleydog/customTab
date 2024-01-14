import { CACHED_KEYS, getCachedValue, setCachedValue } from "../functions/CacheAPI"

export default async function getCurrentWeather() {
    let weather = getCachedValue(CACHED_KEYS.WEATHER, true);

    const includeColors = false;

    if (weather.expired || !weather.value) {
        weather = await fetch("https://weather.com/weather/today/");
        weather = await weather.text();
        weather = {
            status: "success",
            temp: weather.match(`<span data-testid="TemperatureValue" class="CurrentConditions.*?>(.*?)<`)[1],
            weather: weather.match('<div data-testid="wxPhrase" class="CurrentConditions.*?>(.*?)<')[1],
            iconSvg: `<svg ${includeColors ? ` style="--color-moon: #ccc; --color-star: #ccc; --color-cloud: #fff; --color-na: #fff; --color-fog: #fff; --color-hail: #fff; --color-tornado: #fff; --color-wind: #fff; --color-storm: #fff; --color-lightning: #e8ce05; --color-sun: #e8ce05; --color-drop: #6adef8; --color-snowflake: #fff; --color-thunderstorm-mask: #2b2b2b;"` : ""} viewbox="0 0 200 200">${weather.match('<svg set="weather" .*?>(.*?)(<\/svg>)')[1]}</svg>`,
        }
        setCachedValue(CACHED_KEYS.WEATHER, weather, (5 / 60) * 1);
    }

    return weather;
}