/*jshint esversion:6*/ 
import { execFile, exec } from "child_process";

export function execfile(file,arg,callback){
   execFile(file,arg,(err,result)=>{
    if(err) throw err;
    callback(result);
   }) ;
}

export function exec(file,callback){
    exec(file,(err,result)=>{
        if(err) throw err;
        callback(result);
    });
}

