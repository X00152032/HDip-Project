/*Simple login using constant 'users' and REST instead of POSTMAN
RCummins */

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

/*Post the user and hash the password using bcrypt*/ 
app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }   catch {
        res.status(500).send()
    }
})

/*Looking for user with certain password - if found = sucesss */
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find User')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
    }   else {
        res.send('Not Allowed')
    }
}catch {
        res.status(500).send()
    }
})

app.listen(3000)
