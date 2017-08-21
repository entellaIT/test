function MakeSyncWebCall(URL, parameters, method) {
    var varResp = null;
    var options = {
        type: method,
        dataType: 'json',
        data: parameters,
        contentType: 'application/json; charset=utf-8',
        url: URL,
        success: function (resp) {
            varResp = filterresponse(resp);
        },
        error: function (xhr, status, e) {
        },
        cache: false,
        async: false,
        crossDomain: true
    };
    $.ajax(options);
    return varResp;
}
function filterresponse(resp)
{
    if (resp != null && resp.hasOwnProperty("d")) {
        return resp.d;
    }
    else {
        return resp;
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
function validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    
    return regex.test(email);
}

// Add method to validate multiple emails
function validateMultipleEmail(email) {
    var strarray = email.split(';');
    var returnval = false
    for (var i = 0; i < strarray.length; i++) {     
        var regex = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        returnval = regex.test(strarray[i].trim());
    }
    return returnval
}

function isvalidPhone(phone) {
    var regex = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/;
    return regex.test(phone)
}
//function validateDOB(dob) {
//    var regex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
//    return regex.test(dob)
//}
function validateDOB(dob) {
    var validformat = /^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
    var returnval = false
    if (!validformat.test(dob))
        returnval = false;
    else { //Detailed check for valid date ranges
        var monthfield = dob.split("/")[0]
        var dayfield = dob.split("/")[1]
        var yearfield = dob.split("/")[2]
        var dayobj = new Date(yearfield, monthfield - 1, dayfield)
        if ((dayobj.getMonth() + 1 != monthfield) || (dayobj.getDate() != dayfield) || (dayobj.getFullYear() != yearfield))
            returnval = false;
        else
            returnval = true
    }
    return returnval
}

$(document).ready(function () {
    $('textarea').on('keyup keypress blur change', function () {
        if ($(this).attr('data-max') != null && $(this).attr('data-max') != undefined && $(this).attr('data-max') != '') {
            if ($(this).val().length > $(this).attr('data-max')) {
                $(this).val($(this).val().substring(0, $(this).attr('data-max')));
            }
        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.simple-popup.confirm').hide();
            $('.simple-popup.alert').hide();
            $('.popup.fadebg').hide();
            $('.popup').hide();
            $('#processing').hide();
            $("body").css({ 'overflow-y': 'auto' });
            try
            {
                if ($image != undefined && $image != null)
                    $image.cropper("destroy");
            } catch (ex) { }
            StopAllPlayers();
            return false;
        }
    });
    if (FindErrorParameter() != null) {
        alertBox(FindErrorParameter());
    }
});

function StartProcessing(fixed, message) {
    var c = $('#processingModal');
    if (message != undefined && message != null && message != '') {
        c.find('#lblProcessingPopMessage').html(message);
    }
    if (fixed != undefined && fixed != null)
    {
        if(fixed!= true || fixed!= false)
        {
            fixed = true;
        }
    }
    else
    {
        fixed = false;
    }
    if (fixed)
    {
        $(document).keydown(function (e) {
            if (e.keyCode == 27) return false;
        });
    }
    c.modal({
        show: true,
        keyboard: !fixed,
        backdrop: fixed ? 'static' : true,
    });
}
function StopProcessing() {
    var c = $('#processingModal');
    c.modal('hide');
}
function confirmBox(text, yesFunc, noFunc, headertext, yesbuttontext, nobuttontext) {
    var c = $('#confirmModal');
    c.find('#pConfirmModalText').html(text);
    if (headertext != undefined && headertext != null && headertext != '') {
        c.find('#h2ConfirmModalHeader').html(headertext);
    }
    if (yesbuttontext != undefined && yesbuttontext != null && yesbuttontext != '') {
        c.find('#btnConfirmModalOk').text(yesbuttontext);
    }
    if (nobuttontext != undefined && nobuttontext != null && nobuttontext != '') {
        c.find('#btnConfirmModalCancel').text(nobuttontext);
    }
    if (noFunc == undefined || noFunc == null || noFunc == '') {
        c.find('#btnConfirmModalCancel').hide();
    }
    c.modal({
        show: true,
        keyboard: true,
        backdrop: 'static',
    });
    $('#btnConfirmModalCancel').focus();
    c.find('#btnConfirmModalOk').on('click', function (event) {
        event.preventDefault();
        yesFunc();
        c.modal('hide');
        yesFunc = function () { };
        noFunc = function () { };
    });
    c.find('#btnConfirmModalCancel').on('click', function (event) {
        event.preventDefault();
        if (noFunc != undefined || noFunc != null) {
            noFunc();
        }
        c.modal('hide');
        noFunc = function () { };
        yesFunc = function () { };
    });
}

function confirmDialog(text) {
    var c = $('.simple-popup.confirm');
    c.find('span.simple-popup-confirm-text').text(text);
    c.show();
    $(".popup.fadebg").show();
    c.find('input[data-type=OK]').on('click', function () {
        $(".popup.fadebg").hide();
        c.hide();
        return true;
    });
    c.find('input[data-type=CANCEL]').on('click', function () {
        $(".popup.fadebg").hide();
        c.hide();
        return false;
    });
    c.find('a.close').on('click', function () {
        $(".popup.fadebg").hide();
        c.hide();
        return false;
    });
}

function alertBox(text, OkButtonText, event) {
    if (event != undefined && event != null) {
        try {
            event.preventDefault();
        }
        catch (ex) { }
    }
    var c = $('#alertModal');
    c.find('#pAlertModalText').html(text);
    

    if (OkButtonText != undefined && OkButtonText != null && OkButtonText != '')
    {
        c.find('#btnAlertModalOk').text(OkButtonText);
    }
    c.modal({
        show: true,
        keyboard: true,
        backdrop: true
    });
    $('#btnAlertModalOk').focus();
}
function StickyAlertBox(text) {
    var c = $('#divStickyAlertBox');
    c.find('#divStickyAlertBoxContent').html(text);
    c.show();
    c.find('a.close').on('click', function () {
        c.hide();
    });
}

function OnColorPicked(sender) {
    try {
        try {
            updateTextModified();
        } catch (exq) {
            console.log(exq.message);
        }
        $(sender).val('#' + sender.color);
        try {
            unsaved = true;
        } catch (exq) {
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
}
function focusout(element) {
    $(element).blur()
}
//function validateEmail(email) {
//    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//    //([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})
//    var valid = emailReg.test(email);

//    if (!valid) {
//        return false;
//    } else {
//        return true;
//    }
//}
function StopAllPlayers() {
    try {
        var i = 0;
        while (true) {
            var player = jwplayer(i);
            if (!player)
                break;
            player.stop();
            i++;
        }
    } catch (ex) { }
}
function FindErrorParameter() {
    var results = new RegExp('[\?#]error=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return 'TranslateString(Error)' + ": " + decodeURIComponent(results[1].replace(/\+/g, " ")) || 0;
    }
}