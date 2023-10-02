import React from "react";
import "../styles/WeatherForecastDisplay.css"

function WeatherForecastDisplay(prop) {
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня","Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

    const xdot = [45, 245, 445, 645, 845];
    const ydot = [10, 50, 90, 130, 170, 210];
    const tempMark = [25, 20, 15, 10, 5, 0];

    const temp = {
        "max": prop.weatherData.temperature_2m_max,
        "min": prop.weatherData.temperature_2m_min
    };
    const ydotMax = temp.max.map(x => 210 - x * 8);
    const ydotMin = temp.min.map(x => 210 - x * 8);
    const time = prop.weatherData.time.map(time => 
        `${new Date(time).getDate()} ${monthNames[new Date(time).getMonth()]}`
        );
    const maxline = xdot.map((x, i) => [x, ydotMax[i]]).join(' ');
    const minline = xdot.map((x, i) => [x, ydotMin[i]]).join(' ');
    
    function dispayDescription(e) {
        const id = e.target.dataset.id;
        const div = document.getElementById('weather-forecast-dispay-description');
        div.innerHTML = `<h3>${time[id]}</h3><p>Суточная температура: ${prop.weatherData.temperature_2m_min[id]} - ${prop.weatherData.temperature_2m_max[id]} °C</p>`;
    };

    return (
    <div className="weather-forecast-dispay">
        { time.length > 1 ?
            <svg width="900" height="240" xmlns="http://www.w3.org/2000/svg">

                {/* °C */}
                <text x="10" y="15" transform="translate(0) rotate(270 60 60)">&deg;C</text>
                {/* Линия оси абсцисс */}
                <polyline className="svg-abscissa-line" points={`${xdot[0] - 10},${ydot[ydot.length - 1]} ${xdot[xdot.length - 1] + 10},${ydot[ydot.length - 1]}`} />
                {/* Линии метки градусов */}
                { ydot.map((y, i) => 
                <polyline className="svg-celsius-line" points={`${xdot[0] - 10},${y} ${xdot[xdot.length - 1] + 10},${y}`} key={y}/>
                )}
                {/* Обозначение меток дат */}
                { time.map((time, i) => 
                <text x={xdot[i] - 35} y={ydot[ydot.length - 1] + 25} key={time}>{time}</text>
                )}
                {/* Метки дат */}
                { xdot.map((x, i) => 
                <polyline className="svg-date-mark" points={`${x},${ydot[ydot.length - 1]} ${x},${ydot[ydot.length - 1] + 8}`} key={time[i]}/>
                )}
                {/* Обозначения меток температуры */}
                { tempMark.map((mark, i) => 
                <text x={xdot[0] - 30} y={ydot[i] + 5} key={mark}>{mark}</text>
                )}
                {/* Метки температуры */}
                { ydot.map((y, i) => 
                <circle className="svg-celsius-mark" cx={xdot[0] - 10} cy={y} r="2" key={y}/>
                )}

                {/* Линия максимальной дневной температуры */}
                <polyline className="svg-temperature-max-line" points={maxline}/>
                {/* Точки максимальной дневной температуры */}
                { xdot.map((x, i) => 
                <circle className="svg-temperature-mark" cx={x} cy={ydotMax[i]} r="5" data-id={i} key={time[i]} onMouseEnter={dispayDescription}/>
                )}

                {/* Линия минимальной дневной температуры */}
                <polyline className="svg-temperature-min-line" points={minline}/>
                {/* Точки минимальной дневной температуры */}
                { xdot.map((x, i) => 
                <circle className="svg-temperature-mark" cx={x} cy={ydotMin[i]} r="5" data-id={i} key={time[i]} onMouseEnter={dispayDescription}/>
                )}    

            </svg>
        : "" }

        { time.length > 1 ? 
            <div className="weather-forecast-dispay-description" id="weather-forecast-dispay-description">
                <h3>{time[0]}</h3>
                <p>Суточная температура: {temp.min[0]} - {temp.max[0]} °C</p>
            </div>
        : "" }

        { time.length === 1 ? 
            <div className="weather-forecast-dispay-description">
                <h3>{time[0]}</h3>
                <p>Суточная температура: {temp.min[0]} - {temp.max[0]} °C</p>
            </div>
        : "" }

    </div>
    );
};

export default WeatherForecastDisplay;