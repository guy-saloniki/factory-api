const jFile = require('jsonfile')

const file = '_data.json'

const getUsersMaxActions = () => {
    return jFile.readFile(file)
}

const writeToFile = (obj) => {
    return jFile.writeFile(file, obj)
}

module.exports = {
    getUsersMaxActions,
    writeToFile
}