const axios = require('axios');


class Busqueda {
    historial = [];

    constructor(){

    }

    get paramsMapbox(){
        return {


            'access_token' : process.env.MAPBOX_KEY,
            'limit' : 5,
            'languaje': `es`
                    
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
            return [];
        }
    }

}

module.exports = Busqueda;