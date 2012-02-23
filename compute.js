importScripts('bignum.js');

var precision = 50;

onmessage = function(e) {
	
	postMessage(calculateDigit(3));
	
}

var calculateDigit = function(n) {
	
	var r = [];
		
	[1,4,5,6].forEach(function(number) {
		// Step 1 - Calculate the finite part
		var s = new BigNumber(0, precision);
		var _16 = new BigNumber(16, precision);
		for(var i=0; ; i++) {
			
			var modulo = new BigNumber(8, precision).multiply(i).add(number);

			if(i<=n) {		
				
				// Step 1 - calculate the finite part.
				
				s = s.add(_16.modpow(n-i, modulo).divide(modulo));
				
				//i==n && postMessage(s.toString());
			
			} else {
			
				// Step 2 - calculate the infinite part
				s_new = s.add(_16.pow(n-i).divide(modulo));
				
				
				if(s_new.compare(s) === 0) {
					postMessage(s.toString());
					break;
				}
				s = s_new;
			}
			
		}
		
		r.push(s);
		
	});
	
	return r[0].multiply(4).subtract(r[1].multiply(2)).subtract(r[2]).subtract(r[4]).toString();
}