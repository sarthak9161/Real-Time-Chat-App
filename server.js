const exp = require('constants')
const { Socket } = require('dgram')
const express=require('express')
const app=express()

const port=process.env.port || 3000
const http=require('http').createServer(app)

http.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})


app.use(express.static(__dirname +'/public'))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//socket
const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('Connected....')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)

    })
})