const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path')


//Route files
const employeesRouter = require('./routes/employeesRouter')
const departmentsRouter = require('./routes/depatmentsRouter')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/usersRouter')
const shiftsRouter = require('./routes/shiftsRouter')

//Load env vars
dotenv.config({ path: './config/config.env' })

//Connect DB
connectDB()

const app = express()

//Body parser
app.use(express.json())

//Cookie parser
app.use(cookieParser())

// Enable cors
app.use(cors())

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/employees', employeesRouter)
app.use('/api/v1/departments', departmentsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/shifts', shiftsRouter)

app.use(errorHandler)

port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})