const btnSearch = document.getElementById('btnBuscar')
const inputCity = document.getElementById("searchCity")
const textCityFinal = document.getElementById('cardWeather')

btnSearch.addEventListener('click' , () => { 
    if (inputCity.value.trim().length > 0) {
        console.log('@@ input value => ', inputCity.value)
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
	    const result = await response.json();
	    console.log(result);
    } catch (error) {
	    console.error(error);
    }
}
