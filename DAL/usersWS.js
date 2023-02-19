const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/users'

const fetchUsers = () => axios.get(url)

module.exports = {fetchUsers}