const express = require('express');
const express_ws = require('express-ws');
var cors = require('cors')
let {loginSelect,searchRelationShip} =require('./DBPool')
const app = express();
const wsObj = {};
var timer=Date.parse(new Date())/1000;
// var dataList=[
//     {
//         userid:timer,badge:0,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'A',total:'2',
//         messtop:[
//                     {userid:timer+1,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'B',time:'2019-09-18 17：00',content:'你好2'},
//                     {userid:timer+2,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'C',time:'2019-09-18 18：00',content:'你好3'},
//                 ],
//         },
//     {
//         userid:timer+1,badge:0,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'B',total:'2',
//          messtop:[
//                     {userid:timer,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'A',time:'2019-09-18 16：00',content:'你好4'},
//                     {userid:timer+2,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'C',time:'2019-09-18 18：00',content:'你好6'},
//                 ],
//     },
//     {
//         userid:timer+2,badge:0,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'C',total:'2',
//          messtop:[
//                     {userid:timer,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'A',time:'2019-09-18 16：00',content:'你好7'},
//                     {userid:timer+1,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'B',time:'2019-09-18 17：00',content:'你好8'},
//                 ],
//     },
//     {
//         userid:timer+3,badge:0,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'D',total:'3',
//          messtop:[
//                     {userid:timer,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'A',time:'2019-09-18 16：00',content:'你好10'},
//                     {userid:timer+1,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'B',time:'2019-09-18 17：00',content:'你好11'},
//                     {userid:timer+2,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'C',time:'2019-09-18 18：00',content:'你好12'},
//                 ],
//     },
//     {
//         userid:timer+4,badge:0,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'E',total:'3',
//          messtop:[
//                     {userid:timer,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'A',time:'2019-09-18 16：00',content:'你好1'},
//                     {userid:timer+1,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'B',time:'2019-09-18 17：00',content:'你好2'},
//                     {userid:timer+2,avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'C',time:'2019-09-18 18：00',content:'你好3'},
//                 ],
//     },
  
// ];
app.use(cors())
express_ws(app);
// app.ws('/',function(ws,req){
// console.log('获取服务器数据')
// ws.send(JSON.stringify(dataList))
// })
// var flag=0;

//登录验证接口
app.get('/login',async (req,res)=>{
//    var loginkey=[];
let loginname=req.query.loginname,passworld=req.query.passworld;
   try{
    if(loginname!=null&&loginname!=''&&passworld!=null&&passworld!='')
    {
        let result= await loginSelect('base_user',loginname,passworld)
        res.send(result[0])
    }
    else {
        res.status(500).send({message:'帐号密码不能为空！'})
    }
    // dataList.map(item=>{
    //     if(item.name==req.query.loginname){
    //         loginkey=[]
    //         loginkey.push(200)
    //         loginkey.push(item.userid)
    //         loginkey.push(dataList)
    //         throw new Error('onlogin')
    //     }
    //     else{
    //         loginkey=[]
    //         loginkey.push(500)
    //     }
    // })
   }catch(e){
       
   }
})
app.get('/getRelationshipList',async (req,res,next)=>{
    let searchUserid=req.query.userid;
    try{
        if(searchRelationShip!=''&&searchRelationShip!=null){
            let result=await searchRelationShip('base_user',searchUserid)
            result[0].messtop=[]
            res.send(result[0])
        }
        else{
            res.status(500).send({message:'userid不能为空'})
        }
       
    }
    catch(e){
        res.status(500).send({message:'userid不能为空'})
    }
})
// //获取用户列表
// app.get('/getUserList',function(req,res){
//     let sendData=[];
//     if(req.query.moduleid==1){
//         dataList.forEach(item=>{
//             sendData.push({userid:item.userid,badge:item.badge,avater:item.avater,name:item.name})
//         })
//         res.send(dataList)
//     }
   
//  })
 app.get('/getchat',function(req,res){
        dataList.map(item=>{
            if(item.userid==req.query.userid){
                res.send(item)
            }
        })
 })
// let savedata=dataList;

//WS服务
let data=null;
app.ws('/communications/:userid', (ws, req) => {
    const uid = req.params.userid;
    // let savedata=dataList;
    console.log(uid)
    // if(data!=null){
    //     savedata.push(data);
    //     data=null;
    // }
    //     for( let i=0;i<savedata.length;i++){
    //         if(savedata[i].userid==uid){
    //             data=savedata[i]
    //             savedata.splice(i,1)
    //         }
    //     }
    // ws.send(JSON.stringify(savedata))
    wsObj[uid] = ws;
    ws.onmessage = (msg) => {
        // let fromname=''
        let { toId, type, data} = JSON.parse(msg.data)
        const fromId = uid;
        console.log('22220000')
        console.log(msg.data)
        // dataList.forEach(item=>{
        //     if(item.userid==fromId){
        //         fromname=item.name
        //     }
        // })
        // wsObj[toId]   表示 接收方 与服务器的那条连接
        // wsObj[fromId] 表示 发送方 与服务器的那条连接
        try{
            if(wsObj[toId]==undefined||wsObj[fromId]==undefined){
                throw new Error('senderror')
            }
            else{
                wsObj[toId].send(JSON.stringify( { fromId,toId, type, data } ))
                wsObj[fromId].send(JSON.stringify( { fromId,toId, type, data } ))
            }
        }
        catch(e){
            if(e.message!='senderror')throw e;
        }
        // console.log(msg.data)
        // if(msg.data==1003){
            
        // }
        // let { toId, type, data} = JSON.parse(msg.data);
        // const fromId = uid;
        // console.log({ toId, type, data})
        // console.log(fromId)
        // if (fromId != toId && wsObj[toId]) {
        //     // wsObj[toId]   表示 接收方 与服务器的那条连接
        //     // wsObj[fromId] 表示 发送方 与服务器的那条连接
        //     wsObj[toId].send(JSON.stringify( { fromId, type, data } ))
        //     wsObj[fromId].send(JSON.stringify( { toId,fromId, type, data } ))
        // }
    }
});

app.listen(8888);