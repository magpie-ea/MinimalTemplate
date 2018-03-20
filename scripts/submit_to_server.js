// I'll just define a global variable here, following mmturkey.js' lead.

var serverSubmiter;
serverSubmiter = serverSubmiter || {};

serverSubmiter.submit = function (data, isMTurk, contactEmail) {
    // By default, isMTurk will be set to `false`.
    isMTurk = typeof isMTurk !== 'undefined' ? isMTurk : false;
    contactEmail = typeof contactEmail !== 'undefined' ? contactEmail : "mchfranke@gmail.com";
    $.ajax({
        type: 'POST',
        url: 'https://procomprag.herokuapp.com/api/submit_experiment',
        // url: 'http://localhost:4000/api/submit_experiment',
        crossDomain: true,
        data: data,
        success: function (responseData, textStatus, jqXHR) {
            console.log(textStatus)
            if (isMTurk) {
                // For now we still use the original turk.submit to inform MTurk that the experiment has finished.
                turk.submit(data);
            }
        },
        error: function (responseData, textStatus, errorThrown) {
            // There is this consideration about whether we should still allow such a submission that failed on our side to proceed on submitting to MTurk. Maybe we should after all.
            if (isMTurk) {
                // For now we still use the original turk.submit to inform MTurk that the experiment has finished.
                // Stela might have another implementation which submits only the participant id.
                // Not notifying the user yet since it might cause confusion. The webapp should report errors.
                turk.submit(data);
            } else {
                // It seems that this timeout (waiting for the server) is implemented as a default value in many browsers, e.g. Chrome. However it is really long (1 min) so timing out shouldn't be such a concern.
                if (textStatus == "timeout") {
                    alert("Oops, the submission timed out. Please try again. If the problem persists, please contact " + contactEmail + ", including your Prolific ID");
                } else {
                    alert("Oops, the submission failed. Please try again. If the problem persists, please contact " + contactEmail + ", including your Prolific ID");
                }
            }
        }
    })
}
