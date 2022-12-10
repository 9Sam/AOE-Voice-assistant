class Civilization{
    constructor(data){
        this.id = data.id_civi;
        this.name = data.civi_name;
        this.aliases = data.aliases;
        this.characteristics = data.characteristics;
        this.team_bonus = data.team_bonus;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getAliases(){
        return this.name;
    }
}

module.exports = Civilization;

