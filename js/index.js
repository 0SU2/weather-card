const btnSearch = document.getElementById('btnBuscar')
const inputCity = document.getElementById("searchCity")
const textCityFinal = document.getElementById('cardWeather')
const bodyTable = document.getElementById('bodyTable')
const renglonClima = document.getElementById('reglonClima').content
const fragment = document.createDocumentFragment() // para obtener fragmentos de html y estar duplicando

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
	    await drawCard(result.current)
        await getHistoricalData(place_id)
        console.log(result);
    } catch (error) {
	    console.error(error);
    }   
}

const getHistoricalData = async(place_id) => {
    // se va a obtener la informacion del json que nos manda la api
    const ano = new Date().getFullYear().toString();
    const mes = (new Date().getMonth() + 1).toString();
    const dia = new Date().getDay().toString();
    const fecha_actual = ano+'-'+mes+'-'+dia;
    
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/time_machine?date=${fecha_actual}&place_id=${place_id}&units=auto`;
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
        drawTable(result.data);
        console.log(result.data);
    } catch (error) {
	    console.error(error);
    }   
}

const drawTable = (datos) => {
    bodyTable.innerHTML = '';
    datos.forEach(renglon => {
        renglonClima.querySelectorAll('td')[0].textContent = renglon.weather;
        renglonClima.querySelectorAll('td')[1].textContent = renglon.temperature;
        renglonClima.querySelectorAll('td')[2].textContent = renglon.feels_like;
        renglonClima.querySelectorAll('td')[3].textContent = renglon.wind.speed;
        renglonClima.querySelectorAll('td')[4].textContent = renglon.wind.gusts;
        renglonClima.querySelectorAll('td')[5].textContent = renglon.precipitation.total;
        renglonClima.querySelectorAll('td')[6].textContent = renglon.precipitation.type;
        renglonClima.querySelectorAll('td')[7].textContent = renglon.ozone;
        renglonClima.querySelectorAll('td')[4].textContent = renglon.humidity;
        const clone = renglonClima.cloneNode(true);
        fragment.appendChild(clone);
    });
    bodyTable.appendChild(fragment);

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
