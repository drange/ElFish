// Create a canvas that extends the entire screen
// and it will draw right over the other html elements, like buttons, etc


// Then you can draw a point at (10,10) like this:

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
    ctx.fillRect(0, 0, 210, 150);
    ctx.fillStyle = "#000";
    
    var arr = [];
    var est = [];
    var cf = [];
    
    if (window.elfish.species.length > sp
        && window.elfish.species[sp].groups.length > gr
        && window.elfish.species[sp].groups[gr].efforts.length > 0) {
        var efforts = window.elfish.species[sp].groups[gr].efforts;
        arr = [];
        for (var i = 0; i < efforts.length; i++) {
            arr.push(efforts[i].value);
            est.push(estimate(arr));
            cf.push(confidence(arr));
        }
        
    }

    //var maxVal = Math.max.apply(Math, arr);

    var maxVal = 2 * sum(arr); // current best upperbound of estimate?

    var scale = 150.0;
    var normalizer = scale / maxVal;
    
    var padding = 8;
    
    var totalWidth = 200 - (2*padding);
    var unitWidth = Math.min(30, Math.floor(totalWidth / arr.length));
    
    var barwidth = Math.max(1,Math.floor(0.6 * unitWidth));
    var spacing =  Math.max(1,Math.floor(0.4 * unitWidth));
    
    var prevX = null;
    var prevY = null;
    
    var namePrefix = "ef ";
    if (arr.length > 6) {
	namePrefix = "ef";
    }
    if (arr.length > 8) {
	namePrefix = "e";
    }
    if (arr.length > 10) {
	namePrefix = "";
    }

    for (var i = 0; i < arr.length; i++) {
	ctx.strokeStyle = "#000";
	
	// we don't draw 0 because it has no estimate, hence i-1
        var xVal = (spacing + barwidth) * (i-1) + padding;
        var yVal = est[i] * normalizer;

	if (i > 0) {
	    var nam = namePrefix + (1+i);
	    if ((arr.length > 10) && (i % 2 == 0)) {
		nam = "";
	    }
	    if ((arr.length > 20) && (i % 3 != 0)) {
		nam = "";
	    }
	    if ((arr.length > 40) && (i % 5 != 0)) {
		nam = "";
	    }
	    
	    
            drawErrorBar(ctx, xVal, scale - yVal, 
			 cf[i]*normalizer, barwidth, 
			 prevX, prevY, 
			 maxVal, normalizer, 
			 nam);
	    prevX = xVal;
            prevY = scale - yVal;
	}
    }
    ctx.fillText(est[est.length-1].toFixed(1), prevX + padding, prevY); 

    
    
    // LABELS on y-axis (all the way to the right side)
    
    ctx.fillText("0",              200 - spacing, maxVal * normalizer); 
    ctx.fillText(""+(maxVal/2)+"", 200 - spacing, (maxVal/2) * normalizer); 
    ctx.fillText(""+maxVal+"",     200 - spacing, 10); 
    
}

function drawErrorBar(ctx, x, y, error, barwidth, prevX, prevY, maxVal, normalizer, name) {
    
    var e = error/2;
    var w = barwidth/2;
    // console.log(x.toFixed(1) + "\t" + y.toFixed(1) + "\t" + maxVal.toFixed(1));
    // console.log("\t" + e.toFixed(1));
    // console.log("\t"+(y+e).toFixed(1) + "\t" + (y-e).toFixed(1));
    
    ctx.fillText(name, (x-w), maxVal * normalizer);
    
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    if (y >= maxVal || y < 0) {
	ctx.strokeStyle = "#f00";
	ctx.moveTo(x,0);
	ctx.lineTo(x,maxVal);
	ctx.stroke();
	return;
    }
    
    
    // vertical line up
    ctx.moveTo(x,y);
    if ((y - e) <= 0) {
	ctx.lineTo(x,barwidth);
	ctx.lineTo(x-w,barwidth+w); // down left

	ctx.lineTo(x,barwidth);
	ctx.lineTo(x+w,barwidth+w); // down right

	// plus a small arrow head
    } else {
	ctx.lineTo(x,y-e);
    }

    // vertical line down
    ctx.moveTo(x,y);
    if ((y + e) >= maxVal) {
	ctx.lineTo(x,maxVal-barwidth);
	ctx.lineTo(x-w,maxVal - (barwidth+w)); // up left

	ctx.lineTo(x,maxVal-barwidth);
	ctx.lineTo(x+w,maxVal - (barwidth+w)); // up right

	// plus a small arrow head
    } else {
	ctx.lineTo(x,y+e);
    }
    
    
    // horizontal line marking (x,y)
    ctx.moveTo(x-(w/2),y);
    ctx.lineTo(x+(w/2),y);
    
    // top (or bottom?) error bar
    ctx.moveTo(x-w,y+e);
    ctx.lineTo(x+w,y+e);

    // bottom (or top?) error bar
    ctx.moveTo(x-w,y-e);
    ctx.lineTo(x+w,y-e);
    
    if (prevX != null && prevY != null) {
        ctx.moveTo(prevX,prevY);
        ctx.lineTo(x,y);
    }
    
    ctx.stroke();   
}
