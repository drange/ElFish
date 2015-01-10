// Create a canvas that extends the entire screen
// and it will draw right over the other html elements, like buttons, etc


//Then you can draw a point at (10,10) like this:

function updatePlot(sp, gr) {
    // console.log("updatePlot(" + sp + "," + gr + ")");
    
    var selector = "canvas.canvas-group-plot[data-group-id='" + gr + "'][data-specie-id='" + sp + "']";
    
    // console.log("plot selector: " + selector);
    
    var canvas = $(selector);
    
    // console.log("plot canvas: " + canvas);
    
    if (canvas == null){
        console.log("canvas null for " + sp + ", " + gr);
        return;
    }
    
    var ctx = canvas[0].getContext("2d");
    
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, 200, 150);
    ctx.fillStyle = "#000";
    
    var arr = [];

    if (window.elfish.species.length > sp
        && window.elfish.species[sp].groups.length > gr
        && window.elfish.species[sp].groups[gr].efforts.length > 0) {
        var efforts = window.elfish.species[sp].groups[gr].efforts;
        arr = [];
        for (var i = 0; i < efforts.length; i++) {
            arr.push(efforts[i].value);
        }
    }

    var maxVal = Math.max.apply(Math, arr);

    var scale = 150.0;
    var normalizer = scale / maxVal;
    
    var padding = 8;
    
    var totalWidth = 200 - (2*padding);
    var unitWidth = Math.min(30, Math.floor(totalWidth / arr.length));
    
    var barwidth = Math.max(1,Math.floor(0.6 * unitWidth));
    var spacing =  Math.max(1,Math.floor(0.4 * unitWidth));
    
    for (var i = 0; i < arr.length; i++) {
        ctx.lineWidth = barwidth;
        ctx.beginPath();
        
        var xVal = (spacing+ctx.lineWidth) * i + padding;
        
        var yVal = arr[i] * normalizer;
        
        var x0 = xVal;
        var y0 = scale; // scale
        
        var x1 = x0;
        var y1 = scale - yVal; // normalizer-yVal
        
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();   
        
        // console.log("plot: (" + x0.toFixed(1) + "   " + y0.toFixed(1) + ")\t→\t(" + x1.toFixed(1) + "   " + y1.toFixed(1) + ")");
        
    }
    
}
