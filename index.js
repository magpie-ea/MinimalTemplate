import { babeInit } from "./node_modules/babe-project/babe-init.js";
import { findNextView } from "./node_modules/babe-project/babe-main.js";
import { views_seq } from "./config/views.js";
import { config_deploy } from './config/config_deploy.js';

// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };

    babeInit({
        views_seq: views_seq,
        deploy: config_deploy,
        progress_bar: {
            in: ["forcedChoice"],
            style: "default",
            width: 100
        }
    });
});
