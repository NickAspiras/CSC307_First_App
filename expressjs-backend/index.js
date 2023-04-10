const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

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
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    let result = findUserById(req.params.id);
    if (result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
        
    }
    else{
        users['users_list'].pop(result);
        res.send(users);
    }
    
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   