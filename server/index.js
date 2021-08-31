const express=require('express')
const app=express()

app.use(express.urlencoded({ extended: true }))//post请求配置
const router=require('./router')

const cors=require('cors')
app.use(cors());

// 静态文件托管--访问图片http://localhost:3000/图片
app.use(express.static('upload'))

// 路由
app.use('/',router)

// app.post('/login',(req,res)=>{
//     let user=req.body.user
//     let pwd=req.body.pwd
//     res.send({
//         user,
//         token:'xxx'
//     })

// })

app.listen(3000,()=>{
    console.log(3000);
})