// strams

// process.stdin.pipe(process.stdout)

import { Readable } from "node:stream" 

class OneToHundredString extends Readable {
	index = 0

	_read(){
		const i = this.index++
		
		setTimeout(()=>{
			if( i >= 10000){
				this.push(null)
			}else{
				const buf = Buffer.from(String(i))
				this.push(buf)
			}
		}, 10)
		
	}
}

new OneToHundredString()
	.pipe(process.stdout)