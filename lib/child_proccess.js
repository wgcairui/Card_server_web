/*jshint esversion:6*/ 
var Process = require("child_process");

var execfile = (file,arg,callback)=>{
   Process.execFile(file,arg,(err,result)=>{
    if(err) throw err;
    callback(result);
   }) ;
};

var exec = (file,callback)=>{
    Process.exec(file,(err,result)=>{
        if(err) throw err;
        callback(result);
    });
};

