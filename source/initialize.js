const db = require('../database/connection')
const Civilization = require('../classes/civilization')
const Unit = require('../classes/unit')

module.exports = {
    async getCivilizations(){
        let civilizations = await db.query("select * from civilization");
        civilizations = civilizations.map((civ) => new Civilization(civ));
        return civilizations;
    },
    async getUnits(){
        let units = await db.query("select * from civilization");
        units = units.map((unit) => new Unit(unit));
        return units;
    }
}
