/** Función para determinar el tipo de elemento que se este buscando (civilización, unidad, mapa) */

const db = require('../database/connection');

module.exports = async function check(args){
    let res = {type:3, data:null} ;
    let exist = false;

    console.log(args)
    for(let i=0; i<args.length; i++){
        let databaseResponse = await db.query(`select count(*) as count, id_civi as id from civilization where civi_name like '%${args[i]}%'`);
        let founded = databaseResponse[0].count;
        if(founded > 0){
            let idCivi = databaseResponse[0].id;
            let data = await db.query(`select * from civilization where id_civi = "${idCivi}"`);
            res = {type:1, data:data}
            exist = true;
            break;
        }
    }

    if(!exist){
        for(let j=0; j<args.length; j++){
            let databaseResponse = await db.query(`select count(*) as count, id_unit as id from unit where unit_name like '%${args[j]}%' or aliases like '%${args[j]}%'`);
            let founded = databaseResponse[0].count;
            if(founded > 0){
                let idUnit = databaseResponse[0].id;
                let data = await db.query(`select * from unit where id_unit = "${idUnit}"`);
                res = {type:2, data:data}
                console.log(res)
                break;
            }
        }
    }

    return res;
}