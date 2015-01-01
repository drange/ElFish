function est (arr) {
    var ITERATIONS = 7;

    // k = number of removals

    var k = arr.length;

    // TOTAL CATCH
    var totalCatch = 0.0;
    for (var i = 0; i < k; i++) {
       totalCatch += arr[i];
    }

    var summand = 0.0;
    for (var i = 1; i <= k; i++) {
        summand += (i * arr[i-1]);
    }
    summand = summand / totalCatch;

    // c_1 / T can be used as first guess
    var q = arr[0] / totalCatch;

    for (var i = 1; i <= ITERATIONS; i++) {
        q = iterate(summand, q, i);
    }

    console.log("q = " + q);

    return q;
}

function iterate (summand, q, k) {
    console.log("iterate(" + summand + ", " + q + ", " + k + ")");
    var kqk = k * Math.pow(q, k);
    kqk /= (1 - Math.pow(q, k));

    console.log("\tkqk " + kqk);
    return (summand + kqk) * (1 - q);
}

function showAndroidToast(toast) {
    Android.showToast(toast);
}

function run () {
    $( ".app" )
    .delegate(".catch-input", "change", function (eventObject) {
    var val = eventObject.target.value;
    val = parseInt(val);
    console.log(val);
    if (eventObject.target.id == "ci-1-3") {
        var c11 = document.getElementById("ci-1-1").value;
        var c12 = document.getElementById("ci-1-2").value;
        var c13 = document.getElementById("ci-1-3").value;
        console.log(c11 + " " + c12 + " " + c13);

        var i11 = parseInt(c11);
        var i12 = parseInt(c12);
        var i13 = parseInt(c13);

        var estim = est([i11,i12,i13]);
        var t = i11+i12+i13;

        document.getElementById("est-1-3").innerHTML = "EST = " + estim.toFixed(2);
        document.getElementById("ke-1-3").innerHTML = "k/E = " + t;
        document.getElementById("te-1-3").innerHTML = "T/E = " + (t/estim).toFixed(2);
    }
    });

}

// same-ish as window.onload
$(function () {
    var groups = 2;
    var efforts = 3;

    for (var i = 1; i <= groups; i++) {
        $(".app:first").loadFromTemplate({
            template:$("#template-group").html(),
            data: {
                group: {
                    id: i,
                    title: "Group"
                }
            }
        });
    }

    for (var j = 1; j <= groups; j++) {
        for (var i = 1; i <= efforts; i++) {
            $("[data-id=group-"+j+"]").loadFromTemplate({
                template:$("#template-effort").html(),
                data: {
                    effort: {
                        id: i,
                        groupid: j,
                        title: "g"+j+ " Effort",
                        est: "----",
                        ke: "----",
                        te: "----"
                    }
                }
            });
        }
    }

    run();
})
