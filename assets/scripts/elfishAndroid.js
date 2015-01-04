function showAndroidToast(toast) {
    Android.showToast(toast);
}



/**
 * Copy to CSV to clipboard
 */
function androidCopy() {
    Android.toClipboard(exportCSV());
}

function androidShare() {
    var date = new Date();
    
    var datestr = date.toUTCString(); 
    
    // to use the below, add zero indexing to month and date
    // (1900+date.getYear()) + "-" + (1+date.getMonth()) + "-" + date.getDate();
    
    var subject = "ElFish export data " + datestr;
    var body = exportCSV();
    
    body += "\n\nShared to you via ElFish App, a Marius and Sessility production.";
    
    console.log("SHARING");
    console.log(subject);
    console.log(body);
    
    Android.share(subject, body);
}

function androidWrite() {
    var filename = "elfish-";
    var date = new Date();
    filename += (1900+date.getYear());     // YEAR
    filename += "-";
    if (date.getMonth()<9) filename+="0";  // MONTH
    filename += (1+date.getMonth());
    filename += "-";
    if (date.getDate()<10) filename+="0";  // DATE
    filename += date.getDate();
    filename += "-";
    if (date.getHours()<9) filename+="0";  // HOURS
    filename += (1+date.getHours());
    filename += "-";
    if (date.getMinutes()<9) filename+="0";// MINUTES 
    filename += (1+date.getMinutes());
    filename += "-";
    if (date.getSeconds()<9) filename+="0";// SECONDS
    filename += (1+date.getSeconds());
    
    Android.write(filename,exportCSV());
}
