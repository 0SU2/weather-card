const btnSearch = document.getElementById('btnBuscar')
const inputCity = document.getElementById("searchCity")
const textCityFinal = document.getElementById('cardWeather')

btnSearch.addEventListener('click' , () => { 
    if (inputCity.value.trim().length > 0) {
        // console.log('@@ input value => ', inputCity.value)
        buscarCiudad(inputCity.value)
    }
})

const buscarCiudad = async(ciudad) => {
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${ciudad}&language=es`;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'aa7a988904msh5982a34569d7445p10ffc4jsnb299a7d7c56d',
		    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    let result = await response.json();
        const datos = ciudad.split(',');
        result = result.filter((city) => city.adm_area2.toLowerCase() === datos[0].toLowerCase() && city.name.toLowerCase() === datos[0].toLowerCase())
        getCurrentWeather(result[0].place_id)
    } catch (error) {
	    console.error(error);
    }
}

const getCurrentWeather = async(place_id) => {
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?place_id=${place_id}&timezone=auto&language=es&units=metric`;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'aa7a988904msh5982a34569d7445p10ffc4jsnb299a7d7c56d',
		    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
	    drawCard(result.current)
        console.log(result);
    } catch (error) {
	    console.error(error);
    }   
}

const drawCard = datosSi => {
    const temperatura = document.getElementsByClassName('temperatura')
    const localidad = document.getElementsByClassName('localidad')
    const fecha = document.getElementsByClassName('fecha')
    temperatura[0].innerHTML = ''
    temperatura[0].textContent = datosSi.temperature + '°'
    localidad[0].innerHTML = ''
    localidad[0].textContent = inputCity.value
    fecha[0].innerHTML = ''
    fecha[0].textContent = datosSi.summary
}
