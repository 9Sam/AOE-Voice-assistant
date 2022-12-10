const db = require('../database/connection')
const check = require('../models/type')
// Contiene todas las civilizaciones y las unidades

module.exports = {
    name: 'weakness',
    aliases: ['debilidades', 'debilidad'],
    description: 'Muestra la debilidad de una civilización o una unidad',
    async execute(args){
        let res;
        //se recibe la información que viene en un objeto que contiene las civilizaciones, las unidades y los argumentos
        let response = await check(args)

        //* Civilizaciones
        if(response.type == 1){
            res = response.data[0].characteristics;
        //* Unidades
        }else if(response.type == 2){
            res = response.data[0].bad_against;
        //* En caso de no encontrarse
        }else{
            res = "received";
        }
        
        return res;
    }
}
