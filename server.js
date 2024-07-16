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
/////////////////////////////////////////////////////////////////////////////
    // const arrayOfPeople =[
    //     {Name: "John", Age: 25, FavoriteFoods: ["Pizza", "burger"]},
    //     {Name: "Jane", Age: 30, FavoriteFoods: ["chawerma", "burritos"]},
    //     {Name: "Bob", Age: 35, FavoriteFoods: ["Pizza", "burritos"]},
    //     {Name: "Bob", Age: 35, FavoriteFoods: ["mhamssa", "milk"]},
    //     {Name: "Bob", Age: 35, FavoriteFoods: ["chiken", "burritos"]},
    // ]
    // try{
    //     const people = await Person.create(arrayOfPeople)
    //     console.log("person created")
    // }catch(error) {console.log(`creating person failed: ${error}`)};

///////////////////////////////////////////////////////////////////////////////////////////////
// Find all the people having a given name, using Model.find() -> [Person]
    // try{
    //     const peopleName = await Person.find({Name :"Bob"}).exec()
    //     console.log("people found", peopleName)
    // }catch(error){
    //     console.log(`finding people failed: ${error}`)
    // }

////////////////////////////////////////////////////////////////////////////////////////////////
// Find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as a search key.
    // try{
    //     const Food = await Person.findOne({FavoriteFoods:"burger"}).exec()
    //     console.log("people found by food", Food)
    // }catch(error){
    //     console.log(`finding people failed: ${error}`)
    // }

//////////////////////////////////////////////////////////////////////////////////////////
// Find the (only!!) person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.
// const PersonID = "66958a65cf12103784537a00"
// try{
//         const Find_ID = await Person.findById(PersonID).exec()
//         console.log("people found by ID", Find_ID)
//     }catch(error){
//         console.log(`finding people failed: ${error}`)
//     }

//////////////////////////////////////////////////////////////////////////////////////////
// Perform Classic Updates by Running Find, Edit, then Save
// const ID_person = "66958a65cf12103784537a00"
// const FindID = await Person.findById (ID_person);
// if (FindID){
//         FindID.FavoriteFoods.push("chicken")
//         await FindID.save();
//         console.log("person updated", )
//     }else{
//         console.log("person not found")
//     }

//////////////////////////////////////////////////////////////////////////////////////////
// Perform New Updates on a Document Using model.findOneAndUpdate()
// const UpdatePerson = "Bob";
// const UpdatePersonAge = await Person.findOneAndUpdate(
//     {Name: UpdatePerson},
//     {Age: 30},
//     {new: true}
// ).exec()
// console.log("The age is updated", UpdatePerson)

////////////////////////////////////////////////////////////////////////
// Delete One Document Using model.findByIdAndRemove
// const ID_person = "66958a65cf121037845379fe"
// try {
//     const deletedPerson = await Person.findByIdAndDelete(ID_person).exec();
//     if (deletedPerson) {
//         console.log("Person deleted", ID_person);
//     } else {
//         console.log("Person not found", ID_person);
//     }
// } catch (error) {
//     console.log("Error deleting person", error);
// }

//////////////////////////////////////////////////////////////////////////////////////////////////
// MongoDB and Mongoose - Delete Many Documents with model.remove()
    // try {
    //     const result = await Person.deleteMany({ Name: "Jane"});
    //     console.log("Operation outcome:", result);
    //     return result;
    // } catch (error) {
    //     console.log("Error deleting people", error);
    // }

/////////////////////////////////////////////////////////////////////////////////////////////////
try {
    const Food = await Person.find({ FavoriteFoods: "burritos" })
        .sort("Name")      // Correct sorting format, use an object { Name: 1 } for ascending
        .limit(2)
        .select("-Age")
        .exec();                // Remove the callback from exec()

    console.log("People found by food:", Food);
} catch (error) {
    console.log(`Finding people failed: ${error}`);
}


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


