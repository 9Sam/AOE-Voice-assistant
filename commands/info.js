const db = require('../database/connection')
const check = require('../models/type')
// Contiene todas las civilizaciones y las unidades

module.exports = {
    name: 'info',
    aliases: ['información', 'detalle'],
    description: 'Ayuda a encontrar el counter de cada unidad',
    async execute(args){
        let res;
        //se recibe la información que viene en un objeto que contiene las civilizaciones, las unidades y los argumentos
        console.log(args)

        let response = await check(args)

        console.log(response)
        if(response.type == 1){
            res = response.data[0].characteristics;
        }else if(response.type == 2){
            res = "Buenos contra: " + response.data[0].good_against + ". Malos contra:" + response.data[0].bad_against + ".";
        }else{
            res = "received";
        }
        
        return res;
    }
}
