const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send('Hello Express');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
app.listen(5000,()=>{ console.log('Listening on port 5000..')});
