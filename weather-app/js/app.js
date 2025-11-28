const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const loader = document.getElementById('loader');
        const errorMsg = document.getElementById('errorMsg');
        const weatherInfo = document.getElementById('weatherInfo');
        const placeholder = document.getElementById('placeholder');

        async function searchWeather() {
            const city = cityInput.value.trim();
            
            if (!city) {
                showError('Please enter a city name');
                return;
            }

            hideAll();
            loader.style.display = 'block';

            try {
                const response = await fetch(`/.netfily/functions/weather?city=${city}`);

                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                showError(error.message || 'Failed to fetch weather data');
            } finally {
                loader.style.display = 'none';
            }
        }

        function displayWeather(data) {
            document.getElementById('cityName').textContent = 
                `${data.location.name}, ${data.location.country}`;
            document.getElementById('weatherIcon').src = `https:${data.current.condition.icon}`;
            document.getElementById('temp').textContent = `${Math.round(data.current.temp_c)}°C`;
            document.getElementById('description').textContent = data.current.condition.text;
            document.getElementById('humidity').textContent = `${data.current.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.current.wind_kph} km/h`;
            document.getElementById('pressure').textContent = `${data.current.pressure_mb} hPa`;
            document.getElementById('visibility').textContent = `${data.current.vis_km} km`;
            document.getElementById('feelsLike').textContent = `${Math.round(data.current.feelslike_c)}°C`;
            document.getElementById('uvIndex').textContent = data.current.uv;

            weatherInfo.style.display = 'block';
        }

        function showError(message) {
            errorMsg.textContent = message;
            errorMsg.style.display = 'block';
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 3000);
        }

        function hideAll() {
            errorMsg.style.display = 'none';
            weatherInfo.style.display = 'none';
            placeholder.style.display = 'none';
        }

        searchBtn.addEventListener('click', searchWeather);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });
