const Server = require("./server");

const app = (new Server()).app;

app.listen(8080, () => {
    console.log("App listening in 8080");
});