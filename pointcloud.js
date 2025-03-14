let data = new Set()

const X = 60 
const Y = 20
const maxsize = X * Y
const pos = (v, max = 10) => Math.floor(v*max)
let stop = false

const server = await Bun.udpSocket({
  socket: {
    data(socket, buf, port, addr) {
      // console.log(`message from ${addr}:${port}:`)
      const j = buf.toString();
      // console.log(j)
      try {
	const [x, y] = JSON.parse(j)
	const coordinate = `${pos(x, X)}x${pos(y, Y)}`
	if(!data.has(coordinate)) {
		// console.log(coordinate)
		data.add(coordinate)
	}
	if(data.size === maxsize) {
		stop = true
	}
      } catch (e) {
	console.info(e)
      }
    }
  }
})

const client = await Bun.udpSocket({});
// client.send("Hello!", server.port, "127.0.0.1");
//

console.log('listening on', server.port)

const visualize = (points) => {
	if(points.size === 0) { return }
	console.clear()
	console.log(`game field - ${X}x${Y} [${points.size}]`)
	// console.log(points)
	Array.from({length: Y}).map((_,j) => {
		console.log()
		Array.from({length: X}).map(async (_,i) => {
		if(points.has((`${i}x${j}`))){
			console.write('*')
		} else {
			console.write(' ')
		}
		})
	})
	// console.log(JSON.stringify(Array.from(points)))
	// console.table(points)
	if(stop) {
		console.info('\npointcloud is saturated')
		process.exit()
	}
}

setInterval(() => visualize(data), 200)

console.log('waiting for data')
