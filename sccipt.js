    const forecastContainer = document.getElementById("forecastContainer");
    const inputValue = document.getElementById("inputValue");
    const temperature = document.getElementById("temp");
    const humidity = document.getElementById("humidity")
    const extraDetails = document.getElementById("extraDetails")
    const condition = document.getElementById("condition")
    const conditionIcon = document.getElementById("conditionIcon")
    const advice = document.getElementById("advice");

    //let cities = [];
    let cityName; 
    window.onload = async function(){
        const lastCity = localStorage.getItem("lastCity");
            if (lastCity) {
            cityName = lastCity;
                let data = await getWeather(cityName)
               displayWeatherData(data,cityName);
    }
}
    inputValue.addEventListener("keydown", async function (e){
        if(e.code === "Enter"){
            cityName = inputValue.value.trim();
            if(cityName !== ""){
               let data = await getWeather(cityName)
               displayWeatherData(data,cityName);
            }
            else{
                window.alert("Please enter a valid location")
            }
            inputValue.value = "";
        }
    }
);
        async function getWeather(city) {
            try {
                let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ab56c93353ff4117a62135043252001&q=${city}`);
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }                
                let data = await response.json();
                return data; // Return the fetched data   // daa 3am el nas ma7adesh ye2arab meno
            } catch (error) {
                console.error("There was an error fetching the data:", error);
                return null; 
            }
        }
        async function displayWeatherData(data,cityName) { //avoiding the repetitive code
            if (!data || !data.current) return;
        
            temperature.textContent = `${data.location.name} ${data.current.temp_c}°C`;
            humidity.innerHTML = `HUMIDITY: ${data.current.humidity}% <br>      
                                  Wind speed: ${data.current.wind_kph} kph`;
            extraDetails.innerHTML = `Preciption: ${data.current.precip_mm} mm <br>  
                                      Feels like: ${data.current.feelslike_c}°C`;   
            conditionIcon.src = data.current.condition.icon;        //editing the contdition Icon
            condition.textContent = data.current.condition.text;    

            localStorage.setItem("lastCity", cityName);
            
            // Weather advice logic
            let temp = data.current.temp_c;
            let cond = data.current.condition.text.toLowerCase();
            let wind = data.current.wind_kph;
        
            if (temp < 6) {
                advice.textContent = "🥶 It's freezing! Stay home by the oven with hot cocoa.";
            } else if (temp < 15 && wind > 20) {
                advice.textContent = "🍃 It's chilly and windy. A jacket is a must!";
            } else if (temp > 35) {
                advice.textContent = "🔥 It's super hot! Stay indoors and stay hydrated.";
            } else if (cond.includes("rain")) {
                advice.textContent = "🌧️ Don't forget your umbrella!";
            } else if (cond.includes("snow")) {
                advice.textContent = "❄️ Snow is falling—perfect day for Netflix and chill!";
            } else {
                advice.textContent = "🌤️ Looks like a nice day out!";
            }
        
            // Day/Night styles
            if (data.current.is_day !== 1) {
                document.body.style.backgroundColor = "#09001c";
                document.querySelectorAll(".col").forEach(el => {
                    el.style.backgroundColor = "#2E236C";
                    el.style.boxShadow = "0px 0px 12px 4px #8b5cf6";
                });
            } else {
                document.body.style.backgroundColor = "#6EACDA";
                document.querySelectorAll(".col").forEach(el => {
                    el.style.backgroundColor = "#03346E";
                    el.style.boxShadow = "0px 0px 12px 4px #ffffff";
                });
            }
        }
    

