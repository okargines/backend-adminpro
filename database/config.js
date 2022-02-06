const mongoose = require('mongoose');
//require('dotenv').config();   no es necesario

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DBCONECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });    

        console.log('DB on line');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la bsae de datos ver logs');
    }

}

module.exports = {
    dbConnection
}

//const mongoose = require('mongoose');

/*
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
  });
}
*/
