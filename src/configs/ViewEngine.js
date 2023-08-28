import express from "express";
var configVE = function(app){
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views","./src/views");
}
export default configVE;