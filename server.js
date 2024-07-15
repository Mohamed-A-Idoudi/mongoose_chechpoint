const express = require ("express");
const mongoose = require ("mongoose");
require('dotenv').config();
const app = express();
const port = 3000;

const schema = mongoose.Schema;
const personSchema = new schema ({
    Name : {type: String, required : true },
    Age : {type: Number, default: 0 },
    FavoriteFoods :{ type : [String], default: [] }
});

const Person = mongoose.model("Person", personSchema);
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {} ).then ( async () => {
    console.log("connection succeeded ")

    const arrayOfPeople =[
        {Name: "John", Age: 25, FavoriteFoods: ["Pizza", "burger"]},
        {Name: "Jane", Age: 30, FavoriteFoods: ["Pizza", ""]},
        {Name: "Bob", Age: 35, FavoriteFoods: ["Pizza", ""]}
    ]
    try{
        const people = await Person.create(arrayOfPeople)
        console.log("person created")
    }catch(error) {console.log(`creating person failed: ${error}`)};

}).catch(err => console.error(`Error making the connection : ${err} `));

// const createPerson = (done) => {
//     const person = new Person ({
//         Name: "John", 
//         Age: 30, 
//         FavoriteFoods: ["Pizza", "Burger"]
//     });
//     Person.save((err, data) => {
//         if (err) return console.error(err);
//         else {
//             console.log(" preson Saved:", data);
//             done (null, data);
//         }
//     });
// }



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


