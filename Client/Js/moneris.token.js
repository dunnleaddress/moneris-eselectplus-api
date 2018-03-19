/**
 * Created by dule on 3/18/2018.
 */

function doMonerisSubmit() {
    var monFrameRef = document.getElementById('monerisFrame').contentWindow;
    monFrameRef.postMessage('', 'https://esqa.moneris.com/HPPtoken/index.php');
    return false;
}

var respMsg = function (e) {
    var respData = eval("(" + e.data + ")");

    /*document.getElementById("monerisResponse").innerHTML = e.origin + " SENT " + " - " + respData.responseCode + "-" + respData.dataKey + "-" + respData.errorMessage;*/

    if (respData.dataKey) {alert(respData.dataKey);
        document.getElementById('data_key').value = respData.dataKey;
        document.getElementById('form').submit();
    }

}

window.onload = function () {
    if (window.addEventListener) {
        window.addEventListener("message", respMsg, false);
    }
    else {
        if (window.attachEvent) {
            window.attachEvent("onmessage", respMsg);
        }
    }
}
