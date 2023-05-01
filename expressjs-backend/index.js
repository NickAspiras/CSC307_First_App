const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

const userServices = require('./models/user-services')

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/users', async (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    try{
        const result = await userServices.getUsers(name, job);
        res.send({users_list: result});
    } catch(error){
        console.log(error);
        res.status(500).send('An error occurred in the server.');
    }
    /*
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
    */
});



app.get('/users/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = await userServices.findUserById(id);
    if (result === undefined || result === null || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});



app.post('/users', async (req, res) => {
    const userToAdd = req.body;
    const savedUser = await userServices.addUser(userToAdd);
    if(savedUser){
        res.status(201).send(userToAdd);
    }
    else{
        res.status(500).end()
    }

    /*
    let id = generateID();
    while(findUserById(id) !== undefined && findUserById(id).length > 0){
        id = generateID();
    }
    userToAdd.id = id;
    */
    
});




app.delete('/users/:id', async (req, res) => {
    let deletedUser = await userServices.removeUser(req.params.id);
    if (!deletedUser){
        res.status(404).send('Resource not found.');
        
    }
    else{
        res.status(204).send(deletedUser);
    }
    
    
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

/*
function findUserIndex(id){
    const requiredIndex = users['users_list'].findIndex(character => {
        return character.id === String(id);
    });
    return requiredIndex;
}

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

function addUser(user){
    users['users_list'].push(user);
}
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}
function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

*/