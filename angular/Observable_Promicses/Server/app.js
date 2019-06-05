const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())


app.get('/getEmployee', (req, res) => {
    let data = [
        { name: 'Ashutosh', id: '1' },
        { name: 'Bharat', id: '2' },
        { name: 'Anshuman', id: '3' },
        { name: 'Surya', id: '4' },
        { name: 'Shubham', id: '5' },
        { name: 'Jyoti', id: '6' },
        { name: 'Shruti', id: '7' },
        { name: 'Chandu', id: '8' },
    ];
    res.send(data)
});
app.get('/getOne', (req, res) => {
    let data = { name: "Naveen", id: "9" }
    res.send(data);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))