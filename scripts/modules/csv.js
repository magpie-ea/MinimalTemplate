function createCSVForDownload(flattenedData) {
    var csvOutput = "";

    var t = flattenedData[0];

    for (var key in t) {
        if (t.hasOwnProperty(key)) {
            csvOutput += '"' + String(key) + '",';
        }
    }
    csvOutput += "\n";
    for (var i = 0; i < flattenedData.length; i++) {
        var currentTrial = flattenedData[i];
        for (var k in t) {
            if (currentTrial.hasOwnProperty(k)) {
                csvOutput += '"' + String(currentTrial[k]) + '",';
            }
        }
        csvOutput += "\n";
    }

    var blob = new Blob([csvOutput], {
        type: "text/csv"
    });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, "results.csv");
    } else {
        jQuery("<a/>", {
            class: "button download-btn",
            html: "Download the results as CSV",
            href: window.URL.createObjectURL(blob),
            download: "results.csv"
        }).appendTo($(".view"));
    }
};

function prepareDataFromCSV(practiceTrialsFile, trialsFile) {
    var data = {
        out: [] // mandatory field to store results in during experimental trials
    };

    // Need to use such a callback since AJAX is async.
    var addToContainer = function(container, name, results) {
        container[name] = results;
    };

    $.ajax({
        url: practiceTrialsFile,
        dataType: "text",
        crossDomain: true,
        success: function(file, _, jqXHR) {
            addToContainer(
                data,
                "practice_trials",
                processTrialsData(CSV.parse(file))
            );
        }
    });

    $.ajax({
        url: trialsFile,
        dataType: "text",
        crossDomain: true,
        success: function(file, textStatus, jqXHR) {
            addToContainer(
                data,
                "trials",
                _.shuffle(processTrialsData(CSV.parse(file)))
            );
        }
    });

    return data;
};

export { createCSVForDownload, prepareDataFromCSV` }