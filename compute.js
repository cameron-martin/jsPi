importScripts('bignum.js');

var precision = 17;

onmessage = function(e) {
	
	
	var startTime = new Date().getTime();
	var pi = '';
	var digit;
	
	if(e.data.bignum) {
		for(var i=new BigNumber(e.data.start), stop=i.add(e.data.len); i.compare(stop) == -1; i=i.add(1)) {
			digit = calculateDigitBigNum(i);
			postMessage(digit);
			pi += digit;
		}
	} else {
		for(var i = e.data.start, stop = i+e.data.len; i < stop; i++) {
			digit = calculateDigit(i);
			postMessage(digit);
			pi += digit;
			
		}
	}
	
	postMessage('PI: '+pi);
	postMessage('Calculated '+e.data[1]+' digits in '+(((new Date).getTime()-startTime)/1000)+' seconds');
	
}

/*
http://en.wikipedia.org/wiki/Bailey-Borwein-Plouffe_formula
*/

var calculateDigitBigNum = function(n) {
	
	var r = [];
	
	var hex = '0123456789abcdef'.split('');

		
	[1,4,5,6].forEach(function(number) {
		// Step 1 - Calculate the finite part
		var s = new BigNumber(0, precision);
		var _16 = new BigNumber(16, precision);
		for(var i=new BigNumber(0); ; i=i.add(1)) {
			
			var modulo = new BigNumber(8, precision).multiply(i).add(number);
						
			if(i.compare(n) !== 1) {
				
				// Step 1 - calculate the finite part.
				
				s = s.add(_16.modpow(n.subtract(i), modulo).divide(modulo));
				
				//i==n && postMessage(s.toString());
			
			} else {
			
				// Step 2 - calculate the infinite part
				s_new = s.add(_16.pow(n.subtract(i)).divide(modulo));
				
				
				// If theres no change, break.
				if(s_new.compare(s) === 0) {
					//postMessage([s.toString(), s_new.toString()]);
					break;
				}
				s = s_new;
			}
			
		}
		
		r.push(s);
	});
	
	postMessage(r.map(function(elem) {
		return elem.toString();
	}));
	
	// Add together the results
	var result = r[0].multiply(4).subtract(r[1].multiply(2)).subtract(r[2]).subtract(r[3]);
	
	// Scrap the integer part, base-shift, then scrap decimal part.
	var position = parseInt(result.subtract(result.intPart()).multiply(16).intPart().toString());
	
	postMessage([result.toString(), position.toString()]);
	
	return hex[position] ;
}

var modpow = function(base, exponent, modulus) {
    var result = 1;
    while(exponent) {
        if (exponent & 1) {
           result = (result * base) % modulus;
        }
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

var calculateDigit = function(n) {

	var r = [];
	
	var hex = '0123456789abcdef'.split('');


	[1,4,5,6].forEach(function(number) {
		// Step 1 - Calculate the finite part
		var s = 0;
		for(var i=0; ; i++) {
			
			var modulo = 8 * i + number;
						
			if(i<=n) {
				
				// Step 1 - calculate the finite part.
								
				s += modpow(16, n-i, modulo) / modulo;
				
				//i==n && postMessage(s.toString());
			
			} else {
						
				// Step 2 - calculate the infinite part
				s_new = s + Math.pow(16, n-i) / modulo;
				
				
				// If theres no change, break.
				if(s_new === s) {
					//postMessage([s, s_new]);
					break;
				}
				s = s_new;
			}
			
			
		}
		
		r.push(s);
	});
	
	postMessage(r);
	
	// Add together the results
	var result = r[0]*4 - 2*r[1] - r[2] - r[3];
	
	// Scrap the integer part, base-shift, then scrap decimal part.
	var position = (result % 1) * 16;
	position -= (position % 1);
	
	postMessage([result, position]);
	
	return hex[position] ;
}