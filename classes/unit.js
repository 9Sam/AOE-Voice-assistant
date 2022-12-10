class Unit{
    constructor(data){
        this.id = data.id_unit;
        this.name = data.unit_name;
        this.aliases = data.aliases;
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

module.exports = Unit;

