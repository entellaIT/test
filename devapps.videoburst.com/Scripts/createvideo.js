//Cropping
//http://www.jqueryrain.com/?j2D4wPA1
//http://fengyuanchen.github.io/cropper/
var isGroupCompleted = 0;
$(document).ready(function () {   
    $("input[type=text], textarea").on('keyup keypress', function () {
        $('#spanSavingText').text("Saving...");
        if ($(this).attr('id').indexOf('txtValue') >= 0) {
            updateTextModified();
            if ($(this).autocomplete("instance") == undefined) {
                var teguid = $(this).attr('data-teguid')
                var item = $(this);
                var options = {
                    type: 'GET',
                    dataType: 'json',
                    data: "",
                    contentType: 'application/json; charset=utf-8',
                    url: WebsiteRootPath + "api/VideoBurstAPI/toptions/" + teguid,
                    success: function (resp) {
                        var opts = null;
                        if (resp != null) {
                            if (resp.hasOwnProperty("d")) {
                                opts = resp.d;
                            }
                            else {
                                opts = resp;
                            }
                            try {
                                var arropts = [];
                                $(opts).each(function (e, item) {
                                    arropts.push({ label: item.value, value: item.value });
                                });

                                item.autocomplete({
                                    source: arropts,
                                    minLength: 0
                                });
                                item.autocomplete("search", item.val());
                            }
                            catch (ex) {
                                console.log('error:' + ex.message);
                            }
                        }
                        else {
                            item.autocomplete({
                                source: [],
                                minLength: 0
                            });
                            item.autocomplete("search", item.val());
                        }
                    },
                    error: function (xhr, status, e) {
                    },
                    cache: false,
                    async: true,
                    crossDomain: true
                };
                $.ajax(options);
            }
        }
    });
    $("input[type=text], textarea").on('blur', function () {
        if ($(this).attr('id').indexOf('txtValue') >= 0 && $(this).hasClass('required')) {
            if ($(this).val().trim() == '') {
                $(this).css('border', '1px solid #a94442');
                $(this).attr('data-valid', '0');
            }
            else {
                $(this).css('border', '1px solid #3c763d');
                $(this).attr('data-valid', '1');
            }
            //RefreshValidations();
        }
         
        if ($(this).attr('id').indexOf('txtValue') >= 0 || $(this).attr('id').indexOf('divColorPicker') >= 0) {

            //if ($(this).attr('id').indexOf('txtValue') >= 0 && $(this).val().trim() != '') {
            //    var teguid = $(this).attr('data-teguid');
            //    console.log('teguid:' + teguid);
            //    console.log('txtValue:' + $(this).val());
            //}


            if ($(this).attr('title') != undefined && ($(this).val().trim() != $(this).attr('title').trim()) || ($(this).attr('title') == undefined && $(this).val().trim() != '')) {
                var teguid = $(this).attr('data-teguid');
                var eleValue = $(this).val();
                console.log('teguid:' + teguid);
                console.log('txtValue:' + eleValue);
                //if ($(this).attr('title') != undefined)
                //    $(this).attr('title', eleValue);
                updateTemplateElement(teguid, eleValue);
                

            }
        }

        if ($(this).attr('id').indexOf('txtTitle') >= 0) {
            var vJobGUId = document.getElementById("hdnJobGuid").value;
            var vtitle = $(this).val();
            if (vtitle.trim() != '') {
                var title = { JobGUId: vJobGUId, Title: vtitle };
                var url = WebsiteRootPath + "Videos/UpdateVideoTitle";
                $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify(title),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.message == "Success") {
                            console.log('Updated title for JobGUId:' + vJobGUId);
                            $('#spanSavingText').text("All changes saved");
                        }
                        //alertBox('@Resources.ApplicationTranslations.Title_Updation_Success_Message');
                    },
                    error: function () {
                        //alertBox('@Resources.ApplicationTranslations.Error_Message');
                        console.log('Failed updating title for JobGUId:' + vJobGUId);
                    }


                });
            }
        }

    });

    //var hdnjguid = document.getElementById("hdnJobGuid").value;
    // var urlPost ="http://local.videoburstmvc.com/Videos/Create/384207bb-1605-e511-9708-06093a5c5472/1234";

    //var urlPost = window.location.href.toLowerCase().replace("create", "createnew") + "/JobGuid/" + hdnjguid;

    //$("form").on("submit", function (event) {
    //    event.preventDefault();
    //    $.post(urlPost, $(this).serialize()).done(function () {
    //        console.log("Done");
    //        // update your target id here and re-fetch your partial view
    //    }).fail(function () {
    //        console.log("Failed");
    //        // show error in validation summary
    //    });
    //});

    $('#btnCreateVideo').on('click', function (event) {

        result = ValidateJob(1);
        if (result) {
            


            //if ($('#chkTandC').prop('checked') == true) {
                $('form').submit();
                StartProcessing(true, "Creating Video. Please wait..");
            //}
            //else {
            //    alertBox('Please agree to terms and conditions to continue.')
            //}
        }
    });
    $('#btnEditVideo').on('click', function (event) {

        result = ValidateJob(1);
        if (result) {
            Submit();
        }
    });
    $('#btnCreateTemplate').on('click', function (event) {
        $('#hdnCreateTemplate').val('1');
        result = ValidateJob(1);
        if (result) {
            $('form').submit();
            StartProcessing(true, "Creating Template. Please wait..");
        }
    });

    //$(function () {

    //    $("form").on("submit", function (event) {
    //        event.preventDefault();
    //        $.post(urlPost, $(this).serialize()).done(function () {
    //            // update your target id here and re-fetch your partial view
    //        }).fail(function () {
    //            // show error in validation summary
    //        });
    //    });

    //    $("#personCreate").click(function () {
    //        var person = getPerson();

    //        // poor man's validation
    //        if (person == null) {
    //            alert("Specify a name please!");
    //            return;
    //        }

    //        var json = $.toJSON(person);

    //        $.ajax({
    //            url: '/home/save',
    //            type: 'POST',
    //            dataType: 'json',
    //            data: json,
    //            contentType: 'application/json; charset=utf-8',
    //            success: function (data) {
    //                // get the result and do some magic with it
    //                var message = data.Message;
    //                $("#resultMessage").html(message);
    //            }
    //        });
    //    });
    //});

    //ValidateJob(0);
    $('#accordion').on('show.bs.collapse', function (event) {
        try{
            $('#accordion .in').collapse('hide');
        }
        catch(ex)
        {
        }
        $(this).show();
    });
    //$('#collapse-init').click(function () {
    //    if (active) {
    //        active = false;
    //        $('.panel-collapse').collapse('show');
    //        $('.panel-title').attr('data-toggle', '');
    //        $(this).text('Enable accordion behavior');
    //    } else {
    //        active = true;
    //        $('.panel-collapse').collapse('hide');
    //        $('.panel-title').attr('data-toggle', 'collapse');
    //        $(this).text('Disable accordion behavior');
    //    }
    //});
});
function Submit()
{
    if ($('#chkTandC').prop('checked') == true) {
        $('form').submit();
        StartProcessing(true, " Updating Video. Please wait..");
    }
    else {
        alertBox('Please agree to terms and conditions to continue.')
    }
}
function updateTextModified() {
    try {
        if ($('#hdRegenerate').attr('id') != undefined && $('#hdRegenerate').attr('id') != null) {
            var inputs = [];
            $('input[type=text], textarea').each(function () {
                if ($(this).attr('id').indexOf('txtValue') >= 0 || $(this).attr('id').indexOf('divColorPicker') >= 0) {
                    if ($(this).attr('title') != undefined && ($(this).val().trim() != $(this).attr('title').trim()) || ($(this).attr('title') == undefined && $(this).val().trim() != '')) {
                        inputs.push($(this).attr('id'));
                    }
                }
            });
            if ($(inputs).length != undefined && $(inputs).length > 0) {
                try {
                    $('#hdRegenerate').val('1');
                } catch (ex) { console.log(ex.message); }
            }
            //else
            //{
            //    try {
            //        $('#hdRegenerate').val('0');
            //    } catch (ex) { console.log(ex.message); }
            //}
        }
    }catch(ex1)
    {
        console.log(ex1.message);
    }
}
function ValidateJob(showmessage) {
    var result = true;
    console.log(showmessage)
    if ($('#txtTitle').val().trim() == '' && showmessage == 1)
    {
        $('#txtTitle').css('border', '1px solid #a94442');
        $('#txtTitle').attr('data-valid', '0');
        result = false;
        //$('html, body').animate({ scrollTop: $('#txtTitle').offset().top }, 500);
        //$(window).scrollTop(0);
        //$('#spanTitle').hide(); $('#txtTitle').show();
        //$("#txtTitle").focus();
        //alertBox('Please enter the video title.');

        var c = $('#alertVideoTitle');  
        c.modal({
            show: true,
            keyboard: true,
            backdrop: true
        });
        $('#txtVideoTitle').focus();

        return result;
    } else {
        $('#txtTitle').css('border', '1px solid #3c763d');
        $('#txtTitle').attr('data-valid', '1');
        result = true;
    }

    var reqdDropZones = $('div.dropZone.required');
    var reqdInputs = $('input.required');
    var reqdTextAreas = $('textarea.required');

    for (i = 0; i < reqdDropZones.length; i++) {
        if ($(reqdDropZones[i]).find('input[type=hidden]').val().trim() == '') {
            $(reqdDropZones[i]).css('border', '1px solid #a94442');
            $(reqdDropZones[i]).attr('data-valid', '0');
            result = false;
        }
        else {
            $(reqdDropZones[i]).css('border', '1px solid #3c763d');
            $(reqdDropZones[i]).attr('data-valid', '1');
        }
    }
    for (i = 0; i < reqdInputs.length; i++) {
        if ($(reqdInputs[i]).val().trim() == '') {
            if ($(reqdInputs[i]).attr('id').indexOf('divColorPicker') >= 0 && $(reqdInputs[i]).attr('title') != undefined && $(reqdInputs[i]).attr('title').trim() != '') {
                $(reqdInputs[i]).css('border', '1px solid #3c763d');
                $(reqdInputs[i]).attr('data-valid', '1');

            }
            else {
                $(reqdInputs[i]).attr('data-valid', '0');
                $(reqdInputs[i]).css('border', '1px solid #a94442');
                result = false;
            }
        } else {
            $(reqdInputs[i]).attr('data-valid', '1');
            $(reqdInputs[i]).css('border', '1px solid #3c763d');
        }
    }
    for (i = 0; i < reqdTextAreas.length; i++) {
        if ($(reqdTextAreas[i]).val().trim() == '') {
            $(reqdTextAreas[i]).attr('data-valid', '0');
            $(reqdTextAreas[i]).css('border', '1px solid #a94442');
            result = false;

        } else {
            $(reqdTextAreas[i]).attr('data-valid', '1');
            $(reqdTextAreas[i]).css('border', '1px solid #3c763d');
        }
    }
    if ($('#txtTitle').val().trim() == '' && showmessage == 1) {
        $('#spanTitle').hide();
        $('#txtTitle').show();
    }

    //var boxes = $('#accordion').find('div[role=tabpanel]');

    //for (i = 0; i < boxes.length; i++) {
    //    $('li#' + $(boxes[i]).attr('data-remove')).removeClass('active');
    //    $('li#' + $(boxes[i]).attr('data-remove')).removeClass('complete');
    //    $('li#' + $(boxes[i]).attr('data-remove')).removeClass('error');

    //    if ($(boxes[i]).find('.required[data-valid=0]').length > 0) {
    //        $('li#' + $(boxes[i]).attr('data-remove')).addClass('error');
    //    } else {
    //        $('li#' + $(boxes[i]).attr('data-remove')).addClass('complete');
    //    }
    //}
    RefreshValidations();

    if (!result && showmessage==1)
        alertBox('Please enter information in sections marked red.');
    else {
        //StartProcessing()
    }
    updateTextModified();
    if (
        ((result && $('#hdRegenerate').attr('id') != undefined && $('#hdRegenerate').attr('id') != null && $('#hdRegenerate').val() == "1")
        ||
        ($('#hdCurrentProfileId').attr('id') != undefined && $('#hdCurrentProfileId').attr('id') != null && $('#hdCurrentProfileId').val() != $('#ddlCompanyUsers').find(":selected").val()))
        && showmessage == 1) {

        if ($('#hdnIsDraft').val() == "1")
        {
            unsaved = false; Submit(); 
        }
        else
        {
            confirmBox('This will need to regenerate the video. Are you sure you want to continue?', function () { unsaved = false; Submit(); }, function () { }, "Regeneration Warning");
        }
        //StopProcessing();
        result = false;
    }
    try {
        if (result && showmessage == 1) {
            unsaved = false;
        }

    }
    catch (ee)
    { }
    return result;
}
function RefreshValidations()
{
    var boxes = $('#accordion').find('div[role=tabpanel]');

    for (i = 0; i < boxes.length; i++) {
        $('li#' + $(boxes[i]).attr('data-remove')).removeClass('active');
        $('li#' + $(boxes[i]).attr('data-remove')).removeClass('complete');
        $('li#' + $(boxes[i]).attr('data-remove')).removeClass('error');

        if ($(boxes[i]).find('.required[data-valid=0]').length > 0) {
            $('li#' + $(boxes[i]).attr('data-remove')).addClass('error');
        } else {
            $('li#' + $(boxes[i]).attr('data-remove')).addClass('complete');
        }
    }
}

function makeactive(obj, past) {
    //if (recursive== undefined || (recursive != undefined && !recursive)) {
    //    var counter = -1
    //    if ($(obj).parent('div').find('a[rel=NextButton]') != null && $(obj).parent('div').find('a[rel=NextButton]').attr('id') != undefined && $(obj).parent('div').find('a[rel=NextButton]').attr('id') != '') {
    //        counter = parseInt($(obj).parent('div').find('a[rel=NextButton]').attr('id').replace("aNext_", ""));
    //    }
    //    console.log(counter)
    //    if (counter > 0) {
    //        makeactive($('#liBox' + (counter)).find('a[role=button]'), false);
    //    }
    //}
    
    var hasfile = $(obj).parent('div').parent('li').hasClass('active');
    var isexpanded = $(obj).attr('aria-expanded');
    console.log(isexpanded)

    var box = $(obj).parent('div').find('div[role=tabpanel]');
    $('li#' + $(box).attr('data-remove')).removeClass('active');
    $('li#' + $(box).attr('data-remove')).removeClass('complete');
    $('li#' + $(box).attr('data-remove')).removeClass('error');

    if ($(box).find('.required[data-valid=0]').length > 0) {
        $('li#' + $(box).attr('data-remove')).addClass('error');
        isGroupCompleted = 1;
        $(obj).parent('div').parent('li').find('.glyphicon-ok').css('display', 'none');
    } else {
        $('li#' + $(box).attr('data-remove')).addClass('complete');
        if (isGroupCompleted != undefined) {
            if (past == undefined && isGroupCompleted != 1) {
                isGroupCompleted = 0;
            }
        }
        $(obj).parent('div').parent('li').find('.glyphicon-ok').css('display', 'block');
    }
   
    if (isexpanded == 'false' && !past) {
        $(obj).parent('div').parent('li').find('.glyphicon-ok').css('display', 'none');
        $(obj).parent('div').parent('li').removeClass('complete')
        $(obj).parent('div').parent('li').removeClass('error')
        $(obj).parent('div').parent('li').removeClass('last')
        $(obj).parent('div').parent('li').addClass('active')
    }
}
function NextSection(obj) {
    isGroupCompleted = 0;    
    var counter = parseInt($(obj).attr('id').replace("aNext_", ""));
    $('#collapse' + counter).collapse('hide');
    makeactive($('#liBox' + (counter)).find('a[role=button]'), true);
    makeactive($('#liBox' + (counter + 1)).find('a[role=button]'));
    $('#collapse' + (counter + 1)).collapse('show');

    var _chkId = $('#spanBadge' + (counter));

    if (isGroupCompleted == 0) {       
        $(_chkId).css("display", "block");
    }
    else {       
        $(_chkId).css("display", "none");
    }
}

function updateTemplateElement(teguid, eleValue) {

    var hdnjguid = document.getElementById("hdnJobGuid").value;
    var jobElement = { uJobGUId: hdnjguid, uTeGuid: teguid, uElementValue: eleValue };
    var url = WebsiteRootPath + "Videos/UpdateJobElement";
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        async: true,
        data: JSON.stringify(jobElement),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var response = filterresponse(data);
                if (response.code == 1) {
                    console.log('Updated value for teGuid:' + teguid);
                    $('#spanSavingText').text("All changes saved");
                }
            }
        },
        error: function () {
            console.log('Failed updating value for teGuid:' + teguid);
        }
    });
}

function fnUpdateJobTitle(teguid, eleValue) {

    var hdnjguid = document.getElementById("hdnJobGuid").value;
    var jobElement = { uJobGUId: hdnjguid, uTeGuid: teguid, uElementValue: eleValue };
    var url = WebsiteRootPath + "Videos/UpdateJobElement";
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        async: true,
        data: JSON.stringify(jobElement),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var response = filterresponse(data);
                if (response.code == 1) {
                    console.log('Updated value for teGuid:' + teguid);
                }
            }
        },
        error: function () {
            console.log('Failed updating value for teGuid:' + teguid);
        }
    });
}

function fnSaveTitle() {
    var vidtitle = $('#txtVideoTitle').val();
    alert(vidtitle);        
    $('#txtTitle').val(vidtitle);
}

$(document).on('click', '#btnAlertVideoTitleOk', function (event) {
    event.preventDefault();
    if ($('#txtVideoTitle').val().trim() == '') {
    }
    var vidtitle = $('#txtVideoTitle').val();
    //alert(vidtitle);
    $('#txtTitle').val(vidtitle);
    $('#spanTitle').text(vidtitle); 
    if ($('#btnCreateVideo').attr('id') != undefined && $('#btnCreateVideo').attr('id') != null) {
        $('#btnCreateVideo').click(); 
    }

    if ($('#btnEditVideo').attr('id') != undefined && $('#btnEditVideo').attr('id') != null) {
        $('#btnEditVideo').click(); 
    }
});