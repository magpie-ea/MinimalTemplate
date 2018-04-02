// From JSON2JS. Will only install the JSON object if the browser doesn't support it.
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

// function for submitting the results of the experiment
// submission method depends on the deployment method

var submitResults = function(isMTurk, contactEmail, data) {
    // if isMTurk is not given, sets it to false
    isMTurk = typeof isMTurk !== 'undefined' ? isMTurk : false;
    // set a default contact email
    contactEmail = typeof contactEmail !== 'undefined' ? contactEmail : "mchfranke@gmail.com";

    $.ajax({
	type: 'POST',
	url: config_deploy.deployMethod === "localServer" ? 'http://localhost:4000/api/submit_experiment' : 'https://procomprag.herokuapp.com/api/submit_experiment',
	crossDomain: true,
	contentType: 'application/json',
	data: JSON.stringify(data),
	success: function (responseData, textStatus, jqXHR) {
	    console.log(textStatus);
	    
	    if (isMTurk) {
		// For now we still use the original turk.submit to inform MTurk that the experiment has finished.
		// submits to MTurk's server if isMTurk = true
		submitToMTurk();
	    }
	    // shows a thanks message after the submission
	    $('.thanks-message').removeClass('hidden');
	},
	error: function (responseData, textStatus, errorThrown) {
	    // There is this consideration about whether we should still allow such a submission that failed on our side to proceed on submitting to MTurk. Maybe we should after all.
	    if (isMTurk) {
		// For now we still use the original turk.submit to inform MTurk that the experiment has finished.
		// Stela might have another implementation which submits only the participant id.
		// Not notifying the user yet since it might cause confusion. The webapp should report errors.

		// submits to MTurk's server if isMTurk = true
		submitToMTurk();
		// shows a thanks message after the submission
		$('.thanks-message').removeClass('hidden');
	    } else {
		// It seems that this timeout (waiting for the server) is implemented as a default value in many browsers, e.g. Chrome. However it is really long (1 min) so timing out shouldn't be such a concern.
		if (textStatus == "timeout") {
		    alert("Oops, the submission timed out. Please try again. If the problem persists, please contact " + contactEmail + ", including your ID");
		} else {
		    alert("Oops, the submission failed. Please try again. If the problem persists, please contact " + contactEmail + ", including your ID");
		}
	    }
	}
    });
};

// submits to MTurk's servers if config.is_MTurk is set to true
// and the correct url is given in config.MTurk_server
var submitToMTurk = function() {
    var form = $('#mturk-submission-form');
    console.log(form.attr('action'));
    console.log('submits to mturk');
    form.submit();
};

// parses the url to get the assignment_id and worker_id
var getHITData = function() {
    var url = window.location.href;
    var qArray = url.split('?');
    qArray = qArray[1].split('&');
    var HITData = {};

    for (var i=0; i<qArray.length; i++) {
	HITData[qArray[i].split('=')[0]] = qArray[i].split('=')[1];
    }

    console.log(HITData);

    return HITData;
};
