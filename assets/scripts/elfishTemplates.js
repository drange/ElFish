function domGroup (groupId, groupName) {
    
    $(".app:first").loadFromTemplate({
        template:$("#template-group").html(),
        data: {
            group: {
                id: groupId,
                title: groupName
            }
        }
    });
    
}


function domEffort (groupId, effortId, effortName) {
    $("[data-id=group-"+ groupId +"]").loadFromTemplate({
	template:$("#template-effort").html(),
	data: {
	    effort: {
		id: effortId,
		groupid: groupId,
		title: effortName,
		est: "----",
		ke: "----",
		te: "----"
	    }
	}
    });
}
