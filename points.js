const {PORT} = process.env

const client = await Bun.udpSocket({connect: {port: PORT, hostname: '127.0.0.1'}});
console.log(client)

const points = () => Array.from({length:2}).map(() => Math.random())

setInterval(() => client.send(JSON.stringify(points())), 300)
