const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});



const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
       {
        id: 'daf123', 
        name: 'Cindy',
        job: 'Bartender',
       },
       {
        id: "qwe123",
        job: "Zookeeper",
        name: "Cindy"
      }
    ]
} 

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByName(name);
        let i = 0;
        for(i = 0; i < result.length; i++){
            if(result[i].job == job){
                result = {users_list: result[i]};
                res.send(result);
                break;
            }
        }
        if(i == result.length){
            res.send(users);
        }
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    let id = generateID();
    while(findUserById(id) !== undefined && findUserById(id).length > 0){
        id = generateID();
    }
    userToAdd.id = id;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user){
    users['users_list'].push(user);
}
/*
function generateID() {
    let length = 6;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const numbers = '';
    const numbersLength = numbers.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
*/

function generateID() {
    let length = 6;
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    const numbers = '0123456789';
    const numbersLength = numbers.length;
    let numbersStr = '';
    for(let i = 0; i < 3; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        numbersStr += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result + numbersStr;
}

app.delete('/users/:id', (req, res) => {
    let result = findUserById(req.params.id);
    if (result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
        
    }
    else{
        let idx = findUserIndex(req.params.id);
        users['users_list'].splice(idx, 1);
        res.status(204).send(users);
    }
    
    
});

function findUserIndex(id){
    const requiredIndex = users['users_list'].findIndex(character => {
        return character.id === String(id);
    });
    return requiredIndex;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   