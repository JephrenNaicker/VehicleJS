// Requiring modules
const express = require('express');
const mssql = require('mssql');
const cors=require('cors')

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());
// // Database configuration

const config = {
    user:"",
    password:"",
    server:"DESKTOP-*****",
    database:"AZURA",
    options:{
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: "SQLEXPRESS",
    },
    port:1433
}

// Route to get data
try {
    app.get('/veh',async(req,res)=>{
        const pool = await mssql.connect(config);
        const dataRequest = pool.request().query('SELECT * FROM TM_VEHICLE_INFO');
        dataRequest.then(res1=>{
            return res.json(res1);
        })
    })
} catch (error) {
    console.log(err);
}

// POST API to Save Vehicle
app.post('/veh', async (req, res) => {
    try {
        const { vehicleId, make, model, km, color, location, value } = req.body;

        const pool = await mssql.connect(config);
        const result = await pool.request()
            .input('Make', mssql.VarChar(50), make)
            .input('Model', mssql.VarChar(10), model)
            .input('KM', mssql.Int, km)
            .input('Color', mssql.VarChar(20), color)
            .input('Location', mssql.VarChar(50), location)
            .input('Value', mssql.Float, value)
            .query(`
                INSERT INTO TM_VEHICLE_INFO (Make, Model, KM, Color, Location, Value)
                VALUES (@Make, @Model, @KM, @Color, @Location, @Value)
            `);

        res.status(201).json({ message: 'Vehicle saved successfully!' });
    } catch (err) {
        console.error('Error inserting vehicle:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/',(req,res)=>{
    return res.json("Im Node js backend"); 
})

app.listen(5000,()=>{
    console.log("Server has started")
})