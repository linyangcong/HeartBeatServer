var mysql = require("mysql")
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'Communication'
})
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}//对数据库进行查找操作

exports.loginSelect=(tablename,loginname,passworld)=>{
    return new Promise((resolve,reject)=>{
        query(`select * from ${tablename} where mobile=${loginname} and passworld=${passworld}`,(err,rows)=>{
            if(err) reject(err)
            resolve(rows)
        })
    })
}

exports.searchRelationShip=(tablename='base_user',userid)=>{
    return new Promise((resolve,reject)=>{
        query(`select * from ${tablename} where userid=${userid}`,(err,rows)=>{
            if(err) reject(err)
            resolve(rows)
        })
    })
}

exports.updateOnline=(onlineflag,userid)=>{
    new Promise((resolve,reject)=>{
        query(`update base_user set onLine=${onlineflag} where userid=${userid}`,(err,status)=>{
            if(err) reject(err)
            resolve('sucess!')
        })
        
    })
}