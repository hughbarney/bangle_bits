
function radians(a) { return a * Math.PI / 180; }

/*
function rotate(array, angle) {
    return array.map(function (p) {
        return [
            Math.cos(radians(angle)) * p[0] - Math.sin(radians(angle)) * p[1],
            Math.sin(radians(angle)) * p[0] - Math.cos(radians(angle)) * p[1],
        ];
    });
}
*/

function rotate(array, angle) {
    return array.map(function (p) {
      return [Math.sin(radians(angle)) * p[0], Math.cos(radians(angle)) * p[1] ];
    });
}

function offset(array, offset) {
    return array.map(function (p) {
      return [p[0] + offset[0], p[1] + offset[1]];
    });
}
    
function flatten(arr) {
  return [].concat.apply([], arr);
}

var square = [[ 80, 100], [140, 100], [140, 140], [80, 140]];

//console.log(rotate(square, 45));
//console.log( 

g.clear();
g.setColor(0,1,0);
//g.fillPoly( flatten(offset( rotate(square, 30), [120,120]) ) );
g.fillPoly( flatten(square) );

