const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://j0446247_db_user:${password}@ac-uxm9brf-shard-00-00.f1lmuo8.mongodb.net:27017,ac-uxm9brf-shard-00-01.f1lmuo8.mongodb.net:27017,ac-uxm9brf-shard-00-02.f1lmuo8.mongodb.net:27017/Phonebook?ssl=true&replicaSet=atlas-rypw4p-shard-0&authSource=admin&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  console.log("phonebook:");
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
}
