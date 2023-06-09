const inquerir = require(`inquirer`)
require(`colors`)

const menuopts = [
    {
        type: `list`,
        name: `opcion`,
        message: `Que desea hacer?`,
        choices: [
            {
                name: `${`1.`.green} Buscar ciudad`,
                value: 1
            },
            {
                name: `${`2.`.green} Historial`,
                value: 2
            },
            {
                name: `${`3.`.green} Salir`,
                value: 0
            }
        
        ]
    }
];

const mostrarMeu = async() =>{
    console.clear();
    console.log(`===========================`.green);
    console.log(`    Selecione la opcion    `.white);
    console.log(`===========================`.green);
    
    const prompt = inquerir.createPromptModule();

    const {opcion} = await prompt(menuopts)

    return opcion;

}

const pausa = async() =>{
    const question = [
        {
            type: `input`,
            name: `Enter`,
            message: `Presione ${`Enter`.green} para continuar`
        }
    ]
    
    const prompt = inquerir.createPromptModule();

    await prompt(question)

    

}

const leerInput = async(message )=> {
    const question = [

        {
            type: `input`,
            name: `desc`,
            message,
            validate(value) {
                if (value.length === 0) {
                    return `Por favor ingrese un valor`;        
        
                }
                return true;
            }
        }


    ];
    const {desc} = await inquerir.prompt(question);
    return desc;
}

const listarlugares = async( lugares = []) =>{
    
    const choices = lugares.map( (lugar , i) => {
        const idx = `${i +1}`.green;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: `0`,
        name: `0.`.green + `Cancelar`
    })

    

    const preguntas = {
        type: `list`,
        name: `id`,
        message: `Seleccione un lugar`,
        choices
    }
    const {id} = await inquerir.prompt(preguntas);
    return id;

    
    
}

const confirmar = async(message) => {
    const preguntas = {
        type: `confirm`,
        name: `ok`,
        message
    }
    const { ok } = await inquerir.prompt(preguntas);
    return ok;
}

const mostraslistadochecklist = async( tareas = []) =>{
    const choices = tareas.map( (tarea , i) => {
        const idx = `${i +1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completado) ? true : false
        }
    });

    

    

    const preguntas = {
        type: `checkbox`,
        name: `ids`,
        message: `Seleccione `,
        choices
    }
    const {ids} = await inquerir.prompt(preguntas);
    return ids;

    console.log()

}


module.exports = {
    mostrarMeu,
    pausa,leerInput,
    listarlugares,
    confirmar,
    mostraslistadochecklist

}
