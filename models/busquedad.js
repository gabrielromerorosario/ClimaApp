const axios = require('axios');


class Busqueda {
    historial = [`Santo Domingo`,`spain`];

    constructor(){

    }

    get paramsMapbox(){
        return {


            'access_token' : process.env.MAPBOX_KEY,
            'limit' : 5,
            'languaje': `es`
                    
        }
    }

    get paramsopenweather(){
        return {
            appid : process.env.weather_key,
            units : `metric`,
            lang: `es`
        }
    }

    async ciudad(lugar = ``){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params : this.paramsMapbox
                
            });

            const rep = await instance.get();
            
            return rep.data.features.map(lugares => ({
                id: lugares.id,
                nombre: lugares.place_name,
                lng: lugares.center[0],
                lat: lugares.center[1],
            }));
            
        } catch (error) {
            console.log(error)
        }
    }

    async clima(lat,lon){
        try {
            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params : {...this.paramsopenweather,lat,lon}
                
            });

            const rep = await instance.get();

            const {weather , main} = rep.data;
            
            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            };
            
        } catch (error) {
            console.log(error)
        }

    }

    agregarHistorial(lugal = ``){
        if(this.historial.includes(lugal.toLocaleLowerCase())){
            return;
        }
        this.historial.unshift(lugal.toLocaleLowerCase());
    }

}

module.exports = Busqueda;