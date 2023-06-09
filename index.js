
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
                const lugarsel = lugares.find(l => l.id === id)
                               
    
    
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarsel.nombre);
                console.log('Lat: ',lugarsel.lat);
                console.log('Lng: ',lugarsel.lng);
                console.log('Temperatura: ');
                console.log('Minima:');
                console.log('maxima:');
    
                
            break;
    
            case 2:
                console.log('Historial')
                
            break;
            case 0:
                console.log('Salir')
                
            break;
        
            
        }
        if (opt !== 0 ) await pausa();
        
       } while (opt !== 0);
}


main();