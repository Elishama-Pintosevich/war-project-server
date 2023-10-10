
const express = require("express");
// מבצע מינפולציות על כתובות אינטרנט 
const path = require("path");
// ספרייה שיודעת להפעיל שרת
const http = require("http");

const cors = require("cors")
const {routesInit} = require("./routes/configRoutes")
// התחברות למונגו
require("./db/mongoConnect");

const app = express();
app.use(cors({
    origin: ["https://israel-help.netlify.app/"],
    methods: ["POST", "PUT", "DELETE", "PATCH", "GET"],

}))


// כדי שנוכל לקבל באדי עם ג'ייסון בבקשות פוסט , עריכה ומחיקה
app.use(express.json());

// מגדיר שתקיית פאבליק וכל הקבצים בה יהיו ציבוריים

// פונקציה שאחראית להגדיר את כל הרואטים שנייצר באפלקציית שרת
routesInit(app);


const server = http.createServer(app);
// בודק באיזה פורט להריץ את השרת  , אם בשרת אמיתי אוסף
// את המשתנה פורט מהסביבת עבודה שלו ואם לא 3001
const port = process.env.PORT || 3002;
server.listen(port);