import express from "express";

const app =  express()
const port = 3000

app.use(express.json());

let teaData = [];
let nextId = 1;

app.post('/teas',(req,res)=>{
    const {name , price} = req.body;
    const newTea = {id: nextId++ , name , price};
    teaData.push(newTea);
    res.status(200).send(newTea);
})

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})

app.get('/teas/:id',(req,res)=>{
    //params is used when we need to extarct variables from url request
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea) return res.status(400).send('Tea not Found');
    res.status(200).send(tea);
})

app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea) return res.status(400).send('Tea not Found');
    const {name , price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

app.delete('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea) return res.status(400).send('Tea not Found');
    const updatedTeas = teaData.filter((t,id)=> t.id !== parseInt(req.params.id));
    teaData = updatedTeas;
    res.status(200).send(teaData);
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})