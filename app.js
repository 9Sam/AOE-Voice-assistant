const express = require("express")
const morgan = require("morgan")
const path = require("path")

const app = express()

//? Settings
app.set('port', 3000)
app.engine('html', require("ejs").renderFile)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))

//? Middleware
// Cuando es un middleware se utiliza ``app.use`` en vez de ``app.set``
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//? Routes
app.use(require('./routes'))
// Aquí solo requirimos directamente la ruta que queremos usar

//? Statis files
app.use("/public", express.static(path.join(__dirname, 'public')))

//? LISTENING THE SERVER
app.listen(app.get("port"), () => {
    console.log("Listening on port " + app.get('port'))
})

module.exports = app