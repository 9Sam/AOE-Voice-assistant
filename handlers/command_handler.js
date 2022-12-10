const fs = require('fs'); //? Módulo para trabajar con archivos
const path = require('path');

const commands = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js')).map(x => x.split('.')[0])

const commandCollection = [];

commands.forEach(c => {
    let command = require(path.join(__dirname, `../commands/${c}`))
    commandCollection.push({name: command.name, aliases: command.aliases})
})

module.exports = commandCollection;