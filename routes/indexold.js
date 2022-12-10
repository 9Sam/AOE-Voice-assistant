// const { Router } = require("express");
const express = require("express");
const db = require("../database/connection");

const router = express.Router();
const commands = require("../handlers/command_handler");

// console.log(commands)
let civilizations = [], units = [];

class Civilization {
    constructor(id, name, aliases) {
        this.id = id;
        this.name = name;
        this.aliases = aliases;
    }
}

class Unit{
    constructor(id, name, aliases) {
        this.id = id;
        this.name = name;
        this.aliases = aliases;
    }
}

/** RUTAS */
router.get("/", async (req, res) => {
    civilizations = await db.query(
        "select id_civi, civi_name, aliases from civilization"
    );
    civilizations = civilizations.map((civ) =>
            new Civilization(
                civ.id_civi,
                civ.civi_name.split(" ")[0].toLowerCase(),
                civ.aliases
            )
    );

    units = await db.query("select id_unit, unit_name, aliases from unit");
    units = units.map((unit) =>
            new Unit(
                unit.id_unit,
                unit.unit_name.split(" ")[0].toLowerCase(),
                unit.aliases
            )
    );
    // units = units.map(unit => unit.unit_name.split(' ')[0].toLowerCase())

    res.render("index.html", { text: "nada" });
});

router.post("/command", async (req, res) => {
    let text = req.body.text.toLowerCase();
    let args = [];
    let exists = false;
    let commandText = "";
    let fileName = "";

    //? Encontrar si el comando existe por su nombre o por su alias
    for (let i = 0; i < commands.length; i++) {
        if (text.includes(commands[i].name)) {
            exists = true;
            console.log("found");
            fileName = commands[i].name;
            args = removeWord(text, fileName);
            break;
        } else {
            let aliases = commands[i].aliases;
            for (let j = 0; j < aliases.length; j++) {
                if (text.includes(commands[i].aliases[j])) {
                    exists = true;
                    console.log("found in aliases");
                    fileName = commands[i].name;
                    args = removeWord(text, commands[i].aliases[j]);
                    break;
                } else {
                    // console.log("not found in aliases")
                }
            }
        }
    }

    function removeWord(text, word) {
        // para poder eliminar una palabra de un string lo mejor es utilizar la función `replace` y haciendo uso también de las expresiones regulares.
        var replace = `${word} `;
        var re = new RegExp(replace, "g");
        let args = text
            .replace(re, " ")
            .split(" ")
            .filter((x) => x != "");
        return args;
    }

    // async function getCommandText(fileName){
    //     if(fileName){
    //         const file = require(`../commands/${fileName}.js`)
    //         commandText = file.execute(args)
    //     }
    // }

    if (fileName) {
        const file = require(`../commands/${fileName}.js`);
        args = args.filter((x) => x.length > 3 && x != "dame");
        let data = {
            civilizations,
            units,
            args
        }
        commandText = await file.execute(data);
    }

    //? Enviar la respuesta a la vista si el comando existe
    if (exists) {
        if (commandText){
            res.send(commandText.toString());
        }
    } else {
        res.send("received");
    }
    // let parts = text.split(" ");
    // parts.forEach(el => {
    //     //Por ahora los forEach no se pueden `break`
    //     if(commandCollection.includes(el)){
    //         exists = true
    //     }else{
    //         exists = false
    //     }
    // });
});

module.exports = router;
