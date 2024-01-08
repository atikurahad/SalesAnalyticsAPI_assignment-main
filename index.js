
const app = require("./app");

app.listen(`${process.env.RUNNING_PORT}`,()=>{
    console.log(`App is running on PORT ${process.env.RUNNING_PORT}`)
})