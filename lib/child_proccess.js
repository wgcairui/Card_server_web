/*jshint esversion:6*/ 
var cp = require('child_process');

exports.Execfile = (file,arg,callback)=>{
   cp.execFile(file,arg,(err,result)=>{
    if(err) throw err;
    callback(result);
   }) ;
};

exports.Exec = (file,callback)=>{
    cp.exec(file,(err,result)=>{
        //if(err) throw err;
        callback(result);
    });
};
