efGUI.domSpecie = function (specieId, specieName) {
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
};

efGUI.domGroup = function (groupId, groupName, specieId) {
    var selector = ".specie-groups[data-species-id=" + specieId + "]";
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
};


efGUI.domEffort = function (effortId, effortName, groupId, specieId, value) {
    console.log("domEffort(" + effortId + "," + effortName + "," +
        groupId + "," + specieId + "," + value + ")");

    if (typeof value === "undefined") {
    value = "";
    }

    $(".group-efforts[data-id=group-"+ groupId +"][data-specie-id="+specieId+"]")
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
};

efGUI.showSpecie = function (specieId) {
    console.log("showSpecie", specieId);
    var s = $(".specie[data-species-id=" + specieId + "]:first");

    $(".specie").removeClass("visible");

    if (s.length === 0) {
        throw new Error("Cannot show specie " + specieId + ", does not exist");
    }
    s.addClass("visible");
    window.elfish.visibleSpecies = specieId;
};
