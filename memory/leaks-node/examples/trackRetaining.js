// node --allow-natives-syntax --track-retaining-path --expose-gc trackRetaining.js

let a = {};
%DebugTrackRetainingPath(a);
let b = { AAAAAAAAAAAAAAAAAAAA: a };
let c = { BBBBBBBBBBBBBBBBBBBB: b };
let d = { CCCCCCCCCCCCCCCCCCCC: c };

a = null;
b = null;
c = null;

gc();
// fun, but it crashes :D 
