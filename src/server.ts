import { app } from "./app";


const port = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`);
});