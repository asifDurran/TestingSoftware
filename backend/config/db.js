import mongoose from "mongoose"
const connect = async () => {
   try {
       const response = await mongoose.connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true});
       console.log('Your database is connected')
   } catch (error) {
        console.log(error.message)
   }
}
export default connect;