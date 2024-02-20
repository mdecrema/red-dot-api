import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { disconnect } from 'process';
import { Server, Socket } from 'socket.io';

interface Room {  
  id: string;
  name: string;
 }

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: false,
  },
  allowEIO3: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  incrementer = 0;
  rooms: { [roomId: string]: Room[] } = {};
  socketToRoom: { [socketId: string]: string } = {};

  // handleConnection(socket: Socket) {
  //   console.log(`Client connected: ${socket.id}`);

  //   socket.on('join', data => {
  //     // let a new user join to the room
  //     this.incrementer += 1
  //     const roomId = data.room
  //     socket.join(roomId);
  //     this.socketToRoom[socket.id] = roomId;

  //     // persist the new user in the room
  //     if (this.rooms[roomId]) {
  //         this.rooms[roomId].push({id: this.incrementer, name: data.name});
  //     } else {
  //         this.rooms[roomId] = [{id: this.incrementer, name: data.name}];
  //     }

  //     // sends a list of joined users to a new user
  //     const users = this.rooms[data.room].filter(user => user.id !== socket.id);
  //     this.server.to(socket.id).emit('room_users', users);
  //     console.log('[joined] room:' + data.room + ' name: ' + data.name);
  // });

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', data => {
      // let a new user join to the room
      const roomId = data.room
      socket.join(roomId);
      this.socketToRoom[socket.id] = roomId;

      // persist the new user in the room
      if (this.rooms[roomId]) {
          this.rooms[roomId].push({id: socket.id, name: data.name});
      } else {
          this.rooms[roomId] = [{id: socket.id, name: data.name}];
      }

      // sends a list of joined users to a new user
      const users = this.rooms[data.room].filter(user => user.id !== socket.id);
      this.server.to(socket.id).emit('room_users', users);
      console.log('[joined] room:' + data.room + ' name: ' + data.name);
  });

  socket.on('clearRooms', data => {
    this.rooms = {}
  })

  /** OFFER */
  socket.on('offer', (sdp: any) => {
    socket.broadcast.emit('getOffer', sdp);
    console.log(`offer: ${socket.id}`);
  });

  /** ANSWER */
  socket.on('answer', (sdp: any) => {
    socket.broadcast.emit('getAnswer', sdp);
    console.log(`answer: ${socket.id}`);
  });

  /** ICE Candidate */
  socket.on('candidate', (candidate: any) => {
    socket.broadcast.emit('getCandidate', candidate);
    console.log(`candidate: ${socket.id}`);
  });
  
  /** JOIN REQUEST */
  socket.on('join-req', (socket: Socket) => {
    socket.emit(socket.id)
  })

  /** SOCKET ID */
  socket.on('socketId', (socketId: any) => {
    socket.emit('getSocketId', socket.id)
  })

  }

  // @SubscribeMessage('newMessage')
  // onNewMessage(@MessageBody() body: any) {
  //   console.log(body);
  //   // this.server.emit('onMessage', {
  //   // key: 'New Message',
  //   // value: body
  //   // })
  //   this.server.emit('onMessage', body);
  // }

  /************* NEW *************/

  handleDisconnect(socket: Socket) {
console.log('socket has disconnected')

socket.on("disconnect", () => {
  const roomId = this.socketToRoom[socket.id];
  let room = this.rooms[roomId];

  if (room) {

      room = room
        .filter(user => 
          user.id !== socket.id
        );
      
      this.rooms[roomId] = room;
      
  }

  socket.broadcast.to(roomId).emit("user_exit", {id: socket.id});
  console.log(`[${this.socketToRoom[socket.id]}]: ${socket.id} exit`);
});
  }
}
