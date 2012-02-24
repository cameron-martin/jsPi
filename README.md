jsPi
====

###The Aim
People's computers spend most of the time doing nothing. People browse
the web a lot.

My aim is to create a distributed computing platform in javascript,
so that any web browser can run it, with minimal level of entry.

###The Reality
I started by working on distributed pi computation, using the
Bailey–Borwein–Plouffe algorithm to split the computation of each base-16 digit
into bitesize chunks. It doesn't work yet. I'd appreciate it if anyone could tell me why.

###The limitations
* The computation must be able to be split up into quite self-contained chunks
* Javascript is quite inefficient for raw number-crunching (I think)
* There's probably other stuff too...
* How are results verified? The only way I can think of is to make multiple
clients do the computation, along with a proof of work, then assume that
most people aren't malicous.

### TODO
* Make it work
* Add the post-processing shizzazzle to get the lone digit.
* Work out what precision I need for the floats in the calculation.
* Either create a server-based backend, or P2P