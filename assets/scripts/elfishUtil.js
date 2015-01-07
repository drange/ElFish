/**
 * Takes a string and returns the first token of the string, where a
 * token is defined as consecutive non-whitespace non-numeric
 * characters.  I.e., breaks the string at whitespace and numeric
 * characters and returns the first piece.
 *
 */
function firstToken (str) {
    var s = $.trim(str);
    
    var preCut = 0;
    
    for (var i = 0; i < s.length; i++) {
	
	// is character whitespace?
	if (' \t\n\r\v'.indexOf(s.charAt(i)) > -1) {
	    if (i == preCut) {
		preCut++;
	    } else {
		return s.substr(preCut, i);
	    }
	}

	// is character numeric?
	if (/[0-9]/.test(s.charAt(i))) {
	    if (i == preCut) {
		preCut++;
	    } else {
		return s.substr(preCut, i);
	    }
	}
    }
    return s.substr(preCut);
}
