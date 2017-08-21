var ue = false;
var ce = '';
$(document).ready(function () {
    //login starts
    $("#btnLogin").click(function (event) {
        
        var email = $('#txtEmail').val();
        var pwd = $('#txtPwd').val();
        var msg = '';
        var focusid = '';
        if (email == '' || email == 'TranslateString(EmailAddressText)') {
            msg = 'TranslateString(EmailEmpty)';
            focusid = '#txtEmail';
            event.preventDefault();
        }
        else if (!validateEmail(email)) {
            msg = 'TranslateString(EmailInvalid)';
            focusid = '#txtEmail';
            event.preventDefault();
        }
        else if (pwd == '') {
            msg = 'TranslateString(PasswordEmpty)';
            focusid = '#txtPwd';
            event.preventDefault();
        }
        if (msg != '') {
            alertBox(msg);
            if (focusid != '')
                $(focusid).focus();
        }
    });
    $("#txtEmail").focusin(function (event) {
        //if ($(this).val() == 'TranslateString(EmailAddressText)') {
        //    $(this).val('');
        //}
    });
    $("#txtEmail").focusout(function (event) {
        //if ($(this).val() == '') {
        //    $(this).val('TranslateString(EmailAddressText)');
        //}
        if ($(this).val().trim() != '' && $(this).val().trim() != 'TranslateString(EmailAddressText)' && !validateEmail($(this).val().trim())) {
            alertBox('TranslateString(EmailInvalid)');
        }
    });
    $("#btnSignUp").click(function (event) {
        event.preventDefault();
        document.location.href = 'register.aspx';
    });
    //login ends

    //register starts
    $("#txtRegisterEmail").blur(function (event) {
        event.preventDefault();
        var msg = '';
        if ($(this).val().trim() != '' && $(this).val().trim() != 'TranslateString(EmailAddressText)' && validateEmail($(this).val().trim())) {
            if (ce == '' || ce != $(this).val().trim() || !ue) {
                ce = $(this).val().trim();
                var objData = new Object();
                objData.email = encodeURI($(this).val().trim());
                $.ajax({
                    url: $(this).attr('data-validate-url'),
                    type: 'POST',
                    cache: false,
                    data: objData,
                    dataType: "json",
                    success: function (data) {
                        var response = filterresponse(data);
                        if (response) {
                            ue = true;
                            msg = 'TranslateString(User_Exists)';
                            console.log(msg);
                        }
                        else if (!response) {
                            ue = false;
                        }
                        else {
                            ue = null;
                            try {
                                msg = response;
                            }
                            catch (ex1) {
                                msg = response;
                            }
                        }
                        if (msg != '') {
                            $($(this).attr('id')).focus();
                            alertBox(msg);
                        }
                    },
                    error: function (data) {
                        var response = filterresponse(data);
                        ue = null;
                        try {
                            msg = response;
                        }
                        catch (ex1) {
                            msg = response;
                        }
                        if (msg != '') {
                            $($(this).attr('id')).focus();
                            alertBox(msg);
                        }
                    }
                });
            }
        }
    });

    $("#btnCreateAcc").click(function (event) {
        var email = $('#txtRegisterEmail').val();
        var pwd = $('#txtRegisterPwd').val();
        var msg = '';
        var focusid = ''
         
        if (email == '' || email == 'TranslateString(EmailAddressText)') {
            msg = 'TranslateString(EmailEmpty)';
            focusid = '#txtRegisterEmail';
            event.preventDefault();
        }
        else if (!validateEmail(email)) {
            msg = 'TranslateString(EmailInvalid)';
            focusid = '#txtRegisterEmail';
            event.preventDefault();
        }
        else if (pwd == '') {
            msg = 'TranslateString(PasswordEmpty)';
            focusid = '#txtRegisterPwd';
            event.preventDefault();
        }
        else if (pwd.length < 6) {
            msg = 'TranslateString(PasswordMinLength)';
            focusid = '#txtRegisterPwd';
            event.preventDefault();
        }
        else if (ue == null) {
            msg = 'TranslateString(User_Exists)'; //Your request cannot be processed at this time. Please try later.
            focusid = '#txtRegisterEmail';
            event.preventDefault();
        }
        else if (ue == true) {
            msg = 'TranslateString(User_Exists)';
            focusid = '#txtRegisterEmail';
            event.preventDefault();
        } 
        //var url = "api/oauth/register";
        //var response = MakeSyncWebCall(url, "{email:'" + email + "',pwd:'" + pwd + "'}", "post");
        //if (response == "User_Exists") {
        //    msg = 'TranslateString(User_Exists)';
        //}
        //else if (response == "success") {
        //    document.location.href = 'registernext.aspx?t=1&q=success&e=' + email;
        //}
        //else if (response == "requestalreadyregistered") {
        //    document.location.href = 'registernext.aspx?t=1&q=ral&e=' + email;
        //}
        //else {
        //    try {
        //        msg = response;
        //    }
        //    catch (ex1) {
        //        msg = response;
        //    }
        //}
        if (msg != '') {
            alertBox(msg);
            if (focusid != '')
                $(focusid).focus();
        }
    });
    $("#txtRegisterEmail").focusin(function (event) {
        //if ($(this).val() == 'TranslateString(EmailAddressText)') {
        //    $(this).val('');
        //}
    });
    $("#txtRegisterEmail").focusout(function (event) {
        //if ($(this).val() == '') {
        //    $(this).val('TranslateString(EmailAddressText)');
        //}
        if ($(this).val().trim() != '' && $(this).val().trim() != 'TranslateString(EmailAddressText)' && !validateEmail($(this).val().trim())) {
            alertBox('TranslateString(EmailInvalid)');
        }
    });

    //recover starts
    $("#txtRecoveryEmail").blur(function (event) {
        event.preventDefault();
        var msg = '';
        if ($(this).val().trim() != '' && $(this).val().trim() != 'TranslateString(EmailAddressText)' && validateEmail($(this).val().trim())) {

            if (ce == '' || ce != $(this).val().trim() || !ue) {
                ce = $(this).val().trim();
                var objData = new Object();
                objData.email = encodeURI($(this).val().trim());
                $.ajax({
                    url: $(this).attr('data-validate-url'),
                    type: 'POST',
                    cache: false,
                    data: objData,
                    dataType: "json",
                    success: function (data) {
                        var response = filterresponse(data);
                        if (response) {
                            cs = true;
                        }
                        else {
                            msg = response
                        }
                        if (msg != '') {
                            $($(this).attr('id')).focus();
                            alertBox(msg);
                        }
                    },
                    error: function (data) {
                        var response = filterresponse(data);
                        ue = null;
                        try {
                            msg = response;
                        }
                        catch (ex1) {
                            msg = response;
                        }
                        if (msg != '') {
                            $($(this).attr('id')).focus();
                            alertBox(msg);
                        }
                    }
                });
            }
        }
    });
    $("#btnRecoveryChangePwd").click(function (event) {
        var email = $('#txtRecoveryEmail').val();
        var msg = '';
        if (email == '' || email == 'TranslateString(EmailAddressText)') {
            msg = 'TranslateString(EmailEmpty)';
            event.preventDefault();
        }
        else if (!validateEmail(email)) {
            msg = 'TranslateString(EmailInvalid)';
            event.preventDefault();
        }
        else {
            //var url = "api/oauth/recover/" + encodeURI(email.trim());
            //var response = MakeSyncWebCall(url, "", "get");
            //if (response == "success") {
            //    document.location.href = 'registernext.aspx?t=3&q=success&e=' + email;
            //}
            //else {
            //    try {
            //        msg = response;
            //    }
            //    catch (ex1) {
            //        msg = response;
            //    }
            //}
        }
        if (msg != '')
            alertBox(msg);
    });

    $("#txtRecoveryEmail").focusin(function (event) {
        //if ($(this).val() == 'TranslateString(EmailAddressText)') {
        //    $(this).val('');
        //}
    });
    $("#txtRecoveryEmail").focusout(function (event) {
        //if ($(this).val() == '') {
        //    $(this).val('TranslateString(EmailAddressText)');
        //}
        if ($(this).val().trim() != '' && $(this).val().trim() != 'TranslateString(EmailAddressText)' && !validateEmail($(this).val().trim())) {
            alertBox('TranslateString(EmailInvalid)');
        }
    });
    $("#btnChangePwd").click(function (event) {
        var cpwd = $('#txtConfNewPassword').val();
        var pwd = $('#txtNewPassword').val();
        var msg = '';
        if (pwd == null || pwd == '') {
            msg = 'TranslateString(PasswordEmpty)';
            focusid = '#txtNewPassword';
            event.preventDefault();
        }
        else if (cpwd == null || cpwd == '') {
            msg = 'TranslateString(ConfirmPasswordEmpty)';
            focusid = '#txtConfNewPassword';
            event.preventDefault();
        }
        else if (pwd != cpwd) {
            msg = "TranslateString(PasswordAndConfirmMismatch)";
            event.preventDefault();
        }
        
        if (msg != '')
            alertBox(msg);
    });
    

    //recover ends
});
