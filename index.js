
require('dotenv').config();
const { mostrarMeu, pausa, leerInput, listarlugares } = require("./helpers/inquirer");
const Busqueda = require("./models/busquedad");

const main = async() => {

    const busquedas = new Busqueda();
    let opt;

    do {

        opt = await mostrarMeu();
        
    
        switch (opt) {
            case 1:
    
                const lugar = await leerInput(`Ciudad: `);
                const lugares = await busquedas.ciudad(lugar);       
                const id = await listarlugares(lugares);
                if(id === `0`) continue
                const lugarsel = lugares.find(l => l.id === id)
                busquedas.agregarHistorial(lugarsel.nombre)
                const climas = await busquedas.clima(lugarsel.lat,lugarsel.lng)               
    
    
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarsel.nombre);
                console.log('Lat: ',lugarsel.lat);
                console.log('Lng: ',lugarsel.lng);
                console.log('Temperatura: ',climas.temp);
                console.log('Minima: ', climas.min);
                console.log('maxima: ',climas.max);
                console.log('El clima esta: ',climas.desc);
    
                
            break;
    
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar} `);
                })
                
            break;
            
            
        }
        if (opt !== 0 ) await pausa();
        
       } while (opt !== 0);
}


main();