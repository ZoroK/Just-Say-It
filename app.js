
const express= require("express");
const fs= require("fs");
const { json } = require("express");
const app =express();

const rd= fs.readFileSync("wordss.json");
const data= JSON.parse(rd);

const arlen = data.length;
console.log(typeof arlen);

app.use(express.static("public"));


port= process.env.PORT||3000;


app.listen(port,()=> console.log("listening"));





app.get("/getwords" ,(req,res)=>{

    let set=new Set();

    while(set.size<10)
    {
        let num= Math.floor(Math.random()*arlen);
        set.add(num);
    }
    const arr=[];

    set.forEach((num)=>{
        arr.push(data[num]);
    });

    res.json(arr);
});