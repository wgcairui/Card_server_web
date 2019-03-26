/*jshint esversion:8*/ 
var cp = require('child_process');

exports.Execfile = (file,arg,callback)=>{
   cp.execFile(file,arg,(err,result)=>{
    if(err) throw err;
    callback(result);
   }) ;
};

async function ExecfileSync(file,arg){
    try {
        var r = await cp.execFileSync(file,arg);
        return r.toString();
    } catch (error) {
        throw error;
    }
}

exports.Exec = (file,callback)=>{
    cp.exec(file,(err,result)=>{
        //if(err) throw err;
        callback(result);
    });
};

async function ExecSync(file) {
    try {
        var r = await cp.execSync(file);
        return r.toString();
    } catch (error) {
       throw error; 
    }
}
exports.ExecfileSync = ExecfileSync;
exports.ExecSync = ExecSync;

exports.get_proccess_list = ()=>{
    var list = (cp.execSync('tasklist /FO table /nh /svc')
                .toString())
                .split('\r\n');
                //.shift();
    

    function serize(list){
        var proccess_json = {};
        for(var i of list){
            i = i.split(' ');
            if(Number(i[19])) proccess_json[i[19]] = i[0];
        }
        return proccess_json;
    }
    return serize(list);


};
exports.kill_proccess = (im)=>{
    var cmd = 'taskkill /im '+im;
    return(cp.execSync(cmd).toString());
};

exports.getsid = ()=>{
    return cp.execSync('whoami /user')
                .toString()
                .split(' ')
                .reverse()[0]
                .split('\\')[0]
                .trim();
};

