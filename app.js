require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const authJwt = require('./middlewares/jwt.js');
const errorHandler = require('./helpers/error_handler.js');


const app = express();
const env = process.env;
const API = env.API_URL;

//global middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler)

//Routing
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/users.js');
const adminRouter = require('./routes/admin.js');

app.use(`/${API}`, authRouter);
app.use(`/${API}/users`, userRouter);
app.use(`/${API}/admin`, adminRouter);
app.use('/public', express.static(__dirname + '/public'));

//Environment Keys
const hostname = env.HOSTNAME;
const Port = env.PORT;

//DataBase Connection
mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.error(error);
});

//Listening to port
app.listen(Port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${Port}`);
});