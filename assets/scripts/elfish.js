// window.elfish = {
//     "species": [{
// 	"name": "Species 0",
// 	"groups": [{
// 	    "name": "Gr 0",
// 	    "efforts": [{"name": "Effort 0", "value": 120},
// 			{"name": "Effort 1", "value": 80}]
// 	}]
//     }]
// }

window.elfish = {
    species: [{name: "Species 0",
	       groups: []}]
}

function store() {
    console.log("storing ... ");
    // Put the object into storage
    localStorage.setItem('elfish', JSON.stringify(window.elfish));
    console.log("done");
}

function retrieve() {
    console.log("retrieving ... ");
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('elfish');
    window.elfish = JSON.parse(retrievedObject);
    console.log("done");
    doUpdate();
}

/**
 * Clears local storage
 */
function clearLocalStorage() {
    console.log("Clearing local storage ... ");
    
    // TODO make backup copy
    
    window.localStorage.removeItem("elfish");
    doUpdate();
}


/**
 * Takes data from elfish and puts into DOM
 */
function doUpdate() {
    var species = window.elfish.species;
    
    $('.specie').remove();
    
    for (var s = 0; s < species.length; s++) {
	domSpecie(s, window.elfish.species[s].name);
	
	var specieName = species[s].name;
	var groups = species[s].groups;
	
	for (var g = 0; g < groups.length; g++) {
	    var groupName = groups[g].name;
	    var efforts = groups[g].efforts;
	    
	    for (var e = 0; e < efforts.length; e++) {
		var effortName = efforts[e].name;
		var value = efforts[e].value;
		
		console.log("update: " + specieName + " " + groupName + " " + effortName + " " + value);
	    }
	}
    }
}



function getInputValue(sp, gr, ef) {
    var elt = getInput(sp,gr,ef);
    
    retVal = NaN
    if (elt != null) {
	retVal = elt.value;
	console.log("input field " + sp + "," + gr + "," + ef + " → " + elt.value);
    }
    console.log("getInputValue(" + sp + "," + gr + "," + ef + ") → " + retVal);
    return retVal;
}

function getInput(sp, gr, ef) {
    var key = "ci-" + gr + "-" + ef;
    return document.getElementById(key);
}

function createNewSpecies () {
    // TODO fix species title/name
    window.elfish.species.push({name: "Art", groups: []});
    domSpecie(window.elfish.species.length, "Art");
}

function createNewGroup (specie) {
    if (specie >= window.elfish.species.length || specie < 0) {
	throw new Error("specie must be exisiting id: 0 <= " + specie + " < " + window.elfish.species.length);
    }
    
    console.log("createNewGroup(" + specie + ")");
    
    var species = window.elfish.species[specie];
    var groups = species.groups;
    
    var newGroupId = groups.length;
    
    // The number of efforts the new groups should have
    var numOfEfforts = 2;
    if (newGroupId > 0) {
	numOfEfforts = groups[0].efforts.length;
    } else {
	console.log("Congratulations on your first group, let me create 2 efforts");
    }
    
    console.log("Creating new group " + newGroupId + " for species " + species);
    
    groups.push({name:"Group " + newGroupId, efforts: []});
    
    domGroup(newGroupId, "Gruppe", specie);
    
    console.log("\tgroups: " + groups);
    
    for (var e = 0; e < numOfEfforts; e++)
	createNewEffortForGroup(specie, newGroupId, "Effort");


    return newGroupId;
}

function createNewEffort (effortName) {
    
    if (!effortName) {
	console.log("Creating effort without predefined name");
	var s0g0e0 = window.elfish.species[0].groups[0].efforts[0].name;
	
	var index = s0g0e0.indexOf(" ");
	if (index <= 0) {
	    effortName = "Effort";
	} else {
	    effortName = s0g0e0.substr(0,index);
	}
	console.log("Creating effort without predefined name: " + effortName);	
    }
    
    
    var species = window.elfish.species;
    for (var s = 0; s < species.length; s++) {
	for (var g = 0; g < species[s].groups.length; g++) {
	    console.log("New effort for S" + s + ".G" + g);
	    createNewEffortForGroup(s,g,effortName);
	}
    }	    
}

function createNewEffortForGroup (speciesId, groupId, effortName) {
    var group = window.elfish.species[speciesId].groups[groupId];
    
    group.efforts.push({name: effortName, value: ""});
    
    domEffort(group.efforts.length-1, effortName, groupId, speciesId);
}



function exportCSV () {
    var csv = "";
    
    var species = window.elfish.species;
    for (var s = 0; s < species.length; s++) {
	
	var groups = species[s].groups;
	csv += "Species " + (1+s);
	for (var g = 0; g < groups.length; g++) {
	    
	    var efforts = groups[g].efforts;
	    
	    // INPUT
	    csv += "\nGroup " + (g);
	    for (var e = 0; e < efforts.length; e++) {
		csv += "," + getInputValue(s,g,e);
	    }
	    
	    // EST
	    csv += "\n";
	    for (var e = 0; e < efforts.length; e++) {
		if (e < 2)
		    csv += ",---";
		else
		    csv += "," + document.getElementById("est-"+(g)+"-"+(e)).innerHTML;
	    }
	    
	    // k/E
	    csv += "\n";
	    for (var e = 0; e < efforts.length; e++) {
		if (e < 2)
		    csv += ",---";
		else
		    csv += "," + document.getElementById("ke-"+(g)+"-"+(e)).innerHTML;
	    }
	    
	    // T/E
	    csv += "\n";
	    for (var e = 0; e < efforts.length; e++) {
		if (e < 2)
		    csv += ",---";
		else
		    csv += "," + document.getElementById("te-"+(g)+"-"+(e)).innerHTML;
	    }
	}
	csv += "\n";
    }
    
    // TODO add also EST,k/E,T/E data
    // var est = document.getElementById("est-1-3").innerHTML;
    // var ke = document.getElementById("ke-1-3").innerHTML;
    // var te = document.getElementById("te-1-3").innerHTML;
    
    return csv;
}



function run () {
    $( ".app" )
	.delegate(".editable", "click", function (evtObj) {
	    console.log("Clicked editable");
	    $(evtObj.target).attr('contenteditable','true');
	    $(evtObj.target).focus();
	});
    
    $( ".app" )
	.delegate(".editable", "blur", function (evtObj) {
	    // TODO update window.elfish to reflect changes
	    var sp = parseInt($(evtObj.target).attr("data-effort-header-specie"));
	    var gr = parseInt($(evtObj.target).attr("data-effort-header-group"));
	    var ef = parseInt($(evtObj.target).attr("data-effort-header-effort"));
	    
	    var header = $(evtObj.target).text();
	    window.elfish.species[sp].groups[gr].efforts[ef].name = header;
	    
	    console.log("Updating " + sp + "," + gr + "," + ef + " to " + header);
	    $(evtObj.target).attr('contenteditable','false');
	});
    
    $(document).ready(function() {
	$('.app').on("keydown",'.editable', function(evtObj) {
            if (evtObj.key == "Enter") {
		console.log('disable edit for' + evtObj.target);
		$(evtObj.target).blur();
	    } else if (evtObj.key == "Esc" || evtObj.key == "Escape" ) {
		// TODO reset to old innerHTML
		var sp = parseInt($(evtObj.target).attr("data-effort-header-specie"));
		var gr = parseInt($(evtObj.target).attr("data-effort-header-group"));
		var ef = parseInt($(evtObj.target).attr("data-effort-header-effort"));
		var old = window.elfish.species[sp].groups[gr].efforts[ef].name;
		
		console.log('edit cancelled');
		$(evtObj.target).blur();
		
		window.elfish.species[sp].groups[gr].efforts[ef].name = old;
		var header = $(evtObj.target).text(old);
	    }
	});
    });
    
    $( ".app" )
	.delegate(".catch-input", "change", function (evtObj) {
	    var val = evtObj.target.value;
	    val = parseInt(val);
	    
	    window.elfish[evtObj.target.id] = val;
	    
	    // TODO must find input id and put into window.elfish
	    inSpecies = parseInt($(evtObj.target).attr("data-input-species"))
	    inGroup = parseInt($(evtObj.target).attr("data-input-group"))
	    inEffort = parseInt($(evtObj.target).attr("data-input-effort"))
	    
	    console.log("Setting value for s" + inSpecies + ", g" + inGroup + 
			", e" + inEffort + " → " + val);
	    
	    window.elfish.species[inSpecies].groups[inGroup].efforts[inEffort].value = val;
	    
	    var species = window.elfish.species;
	    for (var s = 0; s < species.length; s++) {
		
		var groups = species[s].groups;
		for (var g = 0; g < groups.length; g++) {
		    
		    var efforts = groups[g].efforts;
		    var vals = [];
	    	    for (var e = 0; e < efforts.length; e++) {
			vals.push(getInputValue(s,g,e));
			
			
			if (e > 0) {
			    // one effort is not enough.
			    
			    var arr = [];
			    var t = 0;
			    for (var i = 0; i < vals.length; i++) {
				var v = parseInt(vals[i],10)
				arr.push(v);
				t += v;
			    }
			    
			    console.log(arr);
			    if (t != t) {
				console.warn("Contains NaN so abort");
				return; // NaN
			    }
			    

			    var estimateString = getEstimateString(arr);
			    
			    document.getElementById("est-"+g+"-" + e).innerHTML =
				"N̂ =" + estimateString; 
			    
			    document.getElementById("ke-"+g+"-" + e).innerHTML = 
				"k/E =" + getKE(arr);
			    
			    document.getElementById("te-"+g+"-" + e).innerHTML = 
				"T/E =" + getTE(arr);
			    
			    if (estimateString.indexOf("*") >= 0) {
				document.getElementById("est-"+g+"-" + e).className = "est red";
			    } else {
				document.getElementById("est-"+g+"-" + e).className = "est";
			    }
			}
		    }
		    store();
		    updateSummary(s,g);
		    doUpdate();
		}
	    }
	});
}

function updateSummary (sp,gr) {
    var elt = document.getElementById("group-summary-" + gr);
    
    var groups = window.elfish.species[sp].groups[gr];
    var numOfEfforts = groups.efforts.length;
    var totalCatch = 0;
    for (var e = 0; e < numOfEfforts; e++) {
	console.log("totalCatch += " + groups.efforts[e].value);
	totalCatch += parseInt(groups.efforts[e].value);
    }
    
    var data = "<p>Efforts = " + numOfEfforts + "</p>";
    data += "<p>EST = " + "est" + "</p>"; // TODO get arr
    data += "<p>T = " + totalCatch + "</p>";
    
    console.log("Set summary for " + gr);
    
    elt.innerHTML = data;
}


// same-ish as window.onload
$(function () {
    // var species = window.elfish.species;
    // var groups = window.elfish.groups;
    // var efforts = window.elfish.efforts;
    
    // for (var i = 1; i <= groups; i++) {
    //     $(".app:first").loadFromTemplate({
    //         template:$("#template-group").html(),
    //         data: {
    //             group: {
    //                 id: i,
    //                 title: "Group"
    //             }
    //         }
    //     });
    // }
    
    // for (var j = 1; j <= groups; j++) {
    //     for (var i = 1; i <= efforts; i++) {
    //         $("[data-id=group-"+j+"]").loadFromTemplate({
    //             template:$("#template-effort").html(),
    //             data: {
    //                 effort: {
    //                     id: i,
    //                     groupid: j,
    //                     title: "g"+j+ " Effort",
    //                     est: "----",
    //                     ke: "----",
    //                     te: "----"
    //                 }
    //             }
    //         });
    //     }
    // }

    if (window.localStorage.getItem("elfish") === null) {
	console.log("No local storage, starting fresh ... ");
    } else {
	console.log("Has local storage, reloading ... ");
	retrieve();
    }
    
    run();
    
    // var arr = [34, 46, 22, 26, 18, 16, 20, 12];
    // console.log("arr = " + arr);
    // var T = 0;
    // $.each(arr,function(){T+=parseFloat(this) || 0;});
    
    // console.log("T = " + T);
    // console.log("catch="+catchability(arr));
    // console.log("est="+estimate(arr));
})
