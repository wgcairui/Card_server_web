/* jshint esversion:8 */
var pro = require('./child_proccess');
var ms = require('./mssqlcont');
var mscontstr = require('./../passwd/mssql');
var sync = require('async');
//创建顶级变量arg
var arg = {};

var r = (callback)=>{
    sync.waterfall([
        //get create setup
        function(callback){
            console.log('sync 1');
            console.log('获取配置。。。');
            ms.query('select * from Create_setup',(r)=>{
                for(let i of r){
                  if(i.val.trim() == 'sid'){
                    arg.sid = i.vkey;
                  }
                }
                callback(null,arg);
            });
        },
        
        //check sid
        function(arg,callback){
          console.info('saync 2:');
          sync.series([
            function(callback){
                console.log(2.1);
                pro.Exec('whoami /user',(stu)=>{
                    var stus = stu.split(' ').reverse()[0].split('\\')[0];
                    if(typeof(arg.sid) == 'undefined'){
                        arg.sid = stus;
                        console.log('sid未定义，获取sid：'+stus+'写入create_setup...');
                        ms.query('insert into Create_setup (val,vkey) values (\'sid\',\''+arg.sid+'\')',(r)=>{
                            console.log('写入结果：');
                            console.log(r);
                        });
                    }
                    if(arg.sid != stus){
                        console.log('sid不匹配,old:'+arg.sid+',new:'+stus+',更新sid....');
                        ms.update({vkey:stus},{val:'sid'},'Create_setup',(r)=>{
                          console.log('update down');
                          console.log(r);
                        });
                    }
                    callback(null,arg);
                });
            },
            //more

            
          ],(err,arg)=>{
            //console.log(arg);
            callback(err,arg);
          });        
        },
        //sync 3
        //获取server——port
        function(r,callback){
            console.log('saync 3');
            

            ms.query('select * from Server_port',(r)=>{
                console.log(r);
            });

        }

        
    ],(err,r)=>{
        callback(err,r);
    });
};
//r();
async function ts(){
    var a ;
    a = await ms.query('select * from Server_port');
    
    console.log(a);
}
ts();
