/* jshint esversion:8 */
var pro = require('./child_proccess');
var ms = require('./mssqlcont');
//var mscontstr = require('./../passwd/mssql');
var LOG = require('./log_out');
var Card_Server = require('./run_stat');
var Regedit = require('./regedit');

async function Create(){
    LOG.LOG('获取配置。。。');
    var create_setup = await ms.querySync('select * from Create_setup');
    var create_setup_arg = {};
    
    {
        for(let i of create_setup){
            if(i.val.trim() == 'sid'){
              create_setup_arg.sid = i.vkey.trim();
            }
          }
    }
    //check sid
    var sid = (await pro.ExecSync('whoami /user'))
                .split(' ').reverse()[0].split('\\')[0].trim();
    
    {
        if(typeof(create_setup_arg.sid) == 'undefined'){
           LOG.LOG('sid未定义，获取sid：'+sid+'写入create_setup...');
           create_setup_arg.sid = sid;
            LOG.LOG('写入结果：');
            LOG.LOG(await ms.querySync('insert into Create_setup (val,vkey) values (\'sid\',\''+create_setup_arg.sid+'\')'));
        }
        if(create_setup_arg.sid != sid){
            LOG.LOG('sid不匹配,old:'+create_setup_arg.sid+',new:'+sid+',更新sid....');
            LOG.LOG('update down');
            LOG.LOG(await ms.updateSync({vkey:sid},{val:'sid'},'Create_setup'));
        }
    }

    //get card_server_port
    var server_port = await ms.querySync('select * from server_port');
    //配置card_port
    var proccess_list = pro.get_proccess_list();
    /*
        { id: 3,
    name: '江阴-桃源28500',
    server_port: '6000      ',
    card_port: '28500     ',
    dir_name: 'jytaoyuan',
    Data_Base: 'taoyuan',
    remark: '江阴-桃源' },
    */
   var proccess_list_prasa = JSON.stringify(proccess_list);
   //console.log(proccess_list_prasa);
   for(var i of server_port){
       if(proccess_list_prasa.includes(i.dir_name)){
           LOG.LOG(i.name+'已运行');
       }else{
           LOG.LOG(i.name+'未运行，正在启动server_port');
       }
   }
    
}
Create();
           
    
