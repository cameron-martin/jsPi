importScripts('bignum.js');

var precision = 500;

onmessage = function(e) {
	
	var a = new BigNumber(1, precision, BigNumber.ROUND_HALF_UP);
	
	var b = a.divide(new BigNumber(2, precision, BigNumber.ROUND_HALF_UP).sqrt());
	
	var t = a.divide(4);
	
	var p = a;
	
	var a_new;
	
	var i=0;
	
	//for(var i=0; a.toString() != b.toString(); i++) {
	(function() {
		
		a_new = a.add(b).divide(2);
		
		b = a.multiply(b).sqrt();
		
		t = t.subtract(a.subtract(a_new).pow(2).multiply(p));
		
		p = p.multiply(2);
		
		a = a_new;
		
		postMessage({
			pi: a.add(b).pow(2).divide(t).divide(4).toString(),
			error: a.subtract(b).toString()
		});
		
		a.toString() == b.toString() || arguments.callee();
		i++;
	})();
	//}

}