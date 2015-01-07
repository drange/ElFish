function domSpecie (specieId, specieName) {
    $(".app:first").loadFromTemplate({
        template:$("#template-specie").html(),
        data: {
            specie: {
                id: specieId,
                title: specieName
            }
        }
    });
    console.log("added new species, " + specieId, ": " + specieName);
}

function domGroup (groupId, groupName, specieId) {
    var selector = "[data-species-id=" + specieId + "]";
    $(selector).loadFromTemplate({
        template:$("#template-group").html(),
        data: {
            group: {
                id: groupId,
                title: groupName,
		specieid: specieId
	    }
        }
    });
}


function domEffort (effortId, effortName, groupId, specieId, value) {
    console.log("domEffort(" + effortId + "," + effortName + "," + 
		groupId + "," + specieId + "," + value + ")");
    
    if (typeof value === "undefined") {
	value = "";
    }
    
    $(".group[data-id=group-"+ groupId +"][data-specie-id="+specieId+"]")
	.loadFromTemplate({
	    template:$("#template-effort").html(),
	    data: {
		effort: {
		    id: effortId,
		    title: effortName,
		    groupid: groupId,
		    specieid: specieId,
		    est: "----",
		    ke: "----",
		    te: "----",
		    value: value
		}
	    }
	});
}
