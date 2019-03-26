/*jshint esversion:8 */
const fs = require('fs');
const pro = require('./child_proccess');
const path = require('path');
const LOG = require('./log_out');
const servers_path = path.join(__dirname,'card_share');


function run (proccess_name){
    var sp = proceess_path(proccess_name);
    exit_file(proccess_name,(r)=>{
        if(r){
            pro.Execfile(sp.server,(r)=>{
                LOG.LOG(r);
                pro.Execfile(sp.card,(r)=>{
                    LOG.LOG(r);
                });
            });            
        }
    });
}

function stop (proccess_name){
    pro.kill_proccess(proccess_name+'_card.exe');
    LOG.LOG('stop '+proccess_name);
    pro.kill_proccess(proccess_name+'_server.exe');
    return true;
}

function restart (proccess_name){
    LOG.LOG('restart '+proccess_name);
    stop(proccess_name);
    run(proccess_name);
}

function exit_file(proccess_name,callback){    
    fs.exists(proccess_name,(r)=>{
        if(!r){
            var sp = proceess_path(proccess_name);
            var template_card = path.join(servers_path,'template','CardShare_Server.exe');
            var template_server = path.join(servers_path,'template','EnjoyFallowServer.exe');
            fs.mkdir(path.join(servers_path,proccess_name),function(err){
                if(err) {
                    LOG.LOG_ERR(err);
                    throw err;
                }else{
                    fs.copyFile(template_server,sp.server,(err)=>{
                        if(err){
                            LOG.LOG_ERR(err);
                            throw err;
                        }else{
                            fs.copyFile(template_card,sp.card,(err)=>{
                                if(err){
                                    LOG.LOG_ERR(err);
                                    throw err;
                                }else{
                                    callback(true);
                                }
                            });
                        }
                    });
                }

            });
        }else{
            callback(true);
        }
    });
}

function proceess_path (proccess_name){
    var server_path = path.join(servers_path,proccess_name);
    return {
        server:path.join(server_path,proccess_name+'_server.exe'),
        card:path.join(server_path,proccess_name+'_card.exe')
    };
}