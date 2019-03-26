/* jshint esversion:6 */
var Regedit = require("regedit");
var path = require('path');
var pro = require('./child_proccess');


var get_r_path = (sid)=>{
    var _r_path = {};
    _r_path.server = path.join('\\HKEY_USERS',sid,'Software\\VB and VBA Program Settings\\CardShareSQL\\clients');
    _r_path.card = path.join('\\HKEY_USERS',sid,'Software\\VB and VBA Program Settings\\IWCardShare\\ServerTCP');
    _r_path.sql = path.join('\\HKEY_USERS',sid,'Software\\VB and VBA Program Settings\\PropSQL\server');
    return _r_path;
};

var set_regedit = (path,arg,callback)=>{
    
};