//requiring express module
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

//creating backend app
const app = express();

//setup the express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//below code is between app listner and app request

const characters = [{
    routeName: 'asad',
    name: "Asad Rauf",
    role: "Jedi Master",
    age: 500,
    forcePoints: 1500

},
{
    routeName: 'darthmaul',
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
},
{
    routeName: 'yoda',
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
}
];


app.get("/", (req, res) =>{
    //res.send('Welcome to the Star War page')
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", (req, res) =>{
    //res.send('Welcome to the Star War page')
    res.sendFile(path.join(__dirname, "add.html"));
});

//getting yoda object in json format//using foreach to get the characters object that we had already declared above
app.get('/api/characters/:character', (req, res) =>{
    const character = req.params.character;
    console.log(character);
   // res.end();



//foreach loop to help us to locate the object that we have above
//characters array if(character===iteration.routeName)
let found;
characters.forEach(char =>{
    if(character === char.routeName){
    return res.json(char);
}
});

// if(found){
//     return res.json(found);
// }
// return res.json(false);

res.json(found || { success: false });

//return res.send(`No character ${character} found`);
return res.json(char);
});

app.post("/api/characters", (req, res) =>{
const newCharacter = req.body;
console.log(newCharacter);
characters.push(newCharacter);
res.json(newCharacter);
})

//app listener
app.listen(PORT, () =>{
    console.log(`server is listening to the port: ${PORT}`);
});
