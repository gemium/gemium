const {expect} = require("chai");

const Pages = require("./pages");

let p = new Pages();

// <1> Just go forward (x3)
p.to("a");
p.to("b");
p.to("c");
expect(p.current).to.equal("c");

// <2> Then, go backward
p.toLast();
expect(p.current).to.equal("b");

// <3> Go to the previous "forward"
p.toNext();
expect(p.current).to.equal("c");

// <4> Start a new direction
p.toLast(); // b
p.toLast(); // a
p.to("d"); // => [a,d]
expect(p.next).to.not.exist;
