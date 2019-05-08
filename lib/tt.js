/* jshint esversion:8*/
var pro = require("../passwd/mssql.json");
var ms = require("./mssqlcont");
var pool = new ms();
var fs = require('fs');
var pf = require('util');

var ge = require("regedit");
var a = {
    'HKEY_CURRENT_USER\\CLSID':{
        asd:{
            value:'err',
            type:'REG_SZ'
            
        }
    }
};

var reg = require('regedit-simple');
reg.getKey({target:'HKEY_CURRENT_USER\\CLSID'}).then(r=>{
    console.log(r);
});
reg.add({target:'HKEY_CURRENT_USER\\CLSID',name:'sad',type:'REG_SZ',value:'dfg'}).then(r=>{
    console.log(r);
})
