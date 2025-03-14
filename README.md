# pointcloud

## concept

1. use udp to receive coordinates of points (between 0 and 1)
2. assign interpolated positions from received numbers on a grid
3. visualize in a loop received positions as points in cli
4. fun!

## example output visuals

> after starting
```bash
$ bun --watch pointcloud.js 
listening on 56244
waiting for data

```

> client starts
```bash
$ PORT=56244 bun points.js 
UDPSocket {
  address: {
    address: "127.0.0.1",
    family: "IPv4",
    port: 44851,
  },
  binaryType: "buffer",
  close: [Function: close],
  closed: false,
  hostname: "0.0.0.0",
  port: 44851,
  ref: [Function: ref],
  reload: [Function: reload],
  remoteAddress: {
    address: "127.0.0.1",
    family: "IPv4",
    port: 56244,
  },
  send: [Function: send],
  sendMany: [Function: sendMany],
  unref: [Function: unref],
  [Symbol(Symbol.dispose)]: [Function: dispose],
}
```

> server visualization after 9 UDP Packets from client
```bash
game field - 60x20 [9]

                                                            
                                                            
                                                         *  
                                                            
      *                         *                           
                     *                                      
                                                            
                                                            
                                                            
                                                            
                                                            
                                                            
                                                            
                                                            
                           *                                
                                                            
                                                            
                                                            
                            *                               
           *                                      *  *      

```

> a smaller field after all coordinates have been received
```bash
game field - 8x4 [32]

********
********
********
********
pointcloud is saturated
```

## requirements

[Bun](https://bun.sh/)

## server

How to run server:

`bun pointcloud.js`

It will listen on a random UDP port. Use this port number to communicate from client to server locally.

## client

How to send random coordinates from client:

`PORT=<randomnumber> bun points.js`.


