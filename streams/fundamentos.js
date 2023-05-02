// strams

// process.stdin.pipe(process.stdout)

import { Readable, Transform, Writable } from "node:stream" 

class OneToHundredString extends Readable {
	index = 0

	_read(){
		const i = this.index++
		
		setTimeout(()=>{
			if( i >= 1000000){
				this.push(null)
			}else{
				const buf = Buffer.from(String(i))
				this.push(buf)
			}
		}, 0)
		
	}
}

class InverseNumberStream extends Transform{
	_transform(chunk, encoding, callback){
		const transformed = Number(chunk.toString())*-1

		callback(null,Buffer.from(String(transformed)))
	}
}
class MultiplyByTenStream extends Writable{
	_write(chunk, encoding, callback=()=>{console.log('teste')}) {

		console.log(Number(chunk.toString())*100000000000)		


		callback()
	}
}

new OneToHundredString()
	.pipe(new InverseNumberStream)
	.pipe(new MultiplyByTenStream())