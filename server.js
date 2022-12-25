const express = require('express');
const path=require('path')
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const MaterielRoute = require('./routes/MaterielRoute');
const TypeRoute = require('./routes/typeRoute');
const formData = require('express-form-data');
const cors=require('cors')
require('dotenv').config();
require('colors');
const BodyParser=require('body-parser')
const fileRoutes=require('./routes/file-upload-route');
const eventRoutes=require('./routes/eventRoute');

connectDB();

const app = express();
app.use(cors())
app.use(BodyParser.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/dev',fileRoutes.routes)


if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(formData.parse());

app.use('/api/users', userRoute);
app.use('/api/Materiel', MaterielRoute);
app.use('/api/Type', TypeRoute);
app.use('/api/Event', eventRoutes);


app.get('*', function (req, res) {
    console.log('Enpoint does not exist.');
    res.status(404).send('Enpoint does not exist.');
});

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Server is connected in ${process.env.NODE_ENV} mode on port ${PORT}`.red)
);