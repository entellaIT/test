//#region Templates
$(document).ready(function () {
    $("#lnkFavoriteTemplates").click(function (event) {
        event.preventDefault();
      
        $("#txtSearchValue").val("");
        $("#liFavoriteTemplates").addClass = "active";
        $("#liCustomTemplates").removeClass("active");
        $("#liLibraryTemplates").removeClass("active");

        $("#hdnCategory").val(0);
        $("#btnCategories").html('All Categories' + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-menu-down smallFont\" id=\"spnTCTitle\"></span>");

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val(); // == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindCategories(3, false, 0, vPageSize, "created", vSortOrder);
     
        fnBindTemplates(3, false, 0, vPageSize, "created", vSortOrder);
       
    });

    $("#lnkCustomTemplates").click(function (event) {
        event.preventDefault();
        $("#hdnCategory").val(0);
        $("#btnCategories").html('All Categories' + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-menu-down smallFont\" id=\"spnTCTitle\"></span>");
        $("#txtSearchValue").val("");
        $("#liFavoriteTemplates").removeClass = "active";
        $("#liCustomTemplates").addClass("active");
        $("#liLibraryTemplates").removeClass("active");

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val(); // == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
       fnBindCategories(1, false, 0, vPageSize, "created", vSortOrder);
      
        fnBindTemplates(1, false, 0, vPageSize, "created", vSortOrder);
        
    });

    $("#lnkLibraryTemplates").click(function (event) {
       
        event.preventDefault();
        $("#hdnCategory").val(0);
        $("#btnCategories").html('All Categories' + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-menu-down smallFont\" id=\"spnTCTitle\"></span>");
        $("#txtSearchValue").val("");
        $("#liFavoriteTemplates").removeClass = "active";
        $("#liCustomTemplates").removeClass("active");
        $("#liLibraryTemplates").addClass("active");

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val(); // == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindCategories(2, false, 0, vPageSize, "created", vSortOrder);
       
        fnBindTemplates(2, false, 0, vPageSize, "created", vSortOrder);
       
    });

    $("#lnkSortByPopularity, #lnkByPopularity").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkCreatedDate, #lnkByDate").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val()  == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkSortByName, #lnkByName").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindTemplates(vOwnership, false, 0, vPageSize, "title", vSortOrder);
    });

    $("#lnkSortByDuration, #lnkByDuration").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val()  == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindTemplates(vOwnership, false, 0, vPageSize, "duration", vSortOrder);
    });

    $("#lnkSearchTemplates").click(function (event) {
        event.preventDefault();
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val();// == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
    });
});

$(document).on('click', '#btnTEmailShare', function (event) {
    event.preventDefault();

    var vToEmail = $("#txtTToEmail").val().trim();

    if (vToEmail == "") {
        alertBox("Please enter an email address");
        $("#txtTToEmail").focus();
        return false;
    }
    else if (vToEmail != "" && !validateMultipleEmail(vToEmail)) {
        alertBox("Enter a valid email address");
        $("#txtTToEmail").focus();
        return false;
    }

    var vFromEmail = $("#txtTFromEmail").val().trim();

    //if (vFromEmail == "") {
    //    $("#txtTFromEmail").focus();
    //    alertBox("Enter your email address");
    //    return false;
    //}
    //else if (vFromEmail != "" && !validateEmail(vFromEmail)) {
    //    alertBox("Enter a valid from email address");
    //    $("#txtTFromEmail").focus();
    //    return false;
    //}

    var vEmailSubject = $("#txtTEmailSubject").val().trim();

    if (vEmailSubject == "") {
        alertBox("Enter a subject");
        $("#txtTEmailSubject").focus();
        return false;
    }

    var vEmailMessage = $("#txtTEmailMessage").val().trim();

    if (vEmailMessage == "") {
        $("#txtTEmailMessage").focus();
        alertBox("Enter your message");
        return false;
    }

    var vShareUrl = $("#txtTShareUrl").val().trim();

    if ($("#txtTShareUrl").val().trim() == "") {
        $("#txtTShareUrl").focus();
        alertBox("Enter a video url to share");
        return false;
    }

   // var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/SendEmail?emailSubject=" + vEmailSubject + "&fromEmail=" + vFromEmail + "&toEmail=" + vToEmail + "&emailMessage=" + vEmailMessage + "&videoUrl=" + vShareUrl;

    // Share through email quick-fix ( Fix with # sign email sending )
    var email = { emailSubject: vEmailSubject, fromEmail: vFromEmail, toEmail: vToEmail, emailMessage: vEmailMessage, videoUrl: vShareUrl };
    var MethodUrl = WebsiteRootPath + "Email";
     
    $.ajax({
        url: MethodUrl,
        type: "post",
        data: JSON.stringify(email),
        contentType: "application/json",
        success: function (response) {
            if (response == "success") {
                $("#txtTToEmail").val("");
                $("#txtTEmailSubject").val("");
                $("#txtTEmailMessage").val("Hi! Check out this cool video I made using VideoBurst!");
                $("#btnTShareCancel").trigger("click");
                alertBox("Email has been sent successfully");
            }
            else {
                alertBox("Email sending failed, please try after sometimes");
            }

        }, cache: false, async: false, crossDomain: true
    });
});

$(document).on('click', '.clsMAFavourite', function (event) {
    event.preventDefault();
    var anchor = $(this);

    var vFId = $(this).attr('id');
    var rel = $(this).attr('rel');
    var key = $(this).attr('data-key');

    var response = null;
    if (rel == 1) {
        var options = {
            type: 'DELETE',
            dataType: 'json',
            data: {},
            contentType: 'application/json; charset=utf-8',
            url: WebsiteRootPath + "api/VideoBurstAPI/fav/" + key,
            success: function (resp) {
                if (resp.hasOwnProperty("d")) {
                    response = $.parseJSON(resp.d);
                }
                else {
                    response = $.parseJSON(resp);
                }
                if (response.result == 'success') {
                    anchor.removeClass('active');
                    anchor.attr('rel', 0);
                    anchor.attr('title', 'Mark as favourite.');
                }
            },
            error: function (xhr, status, e) {
            },
            crossDomain: true
        };
        $.ajax(options);
    }
    else {
        response = MakeSyncWebCall(WebsiteRootPath + "api/VideoBurstAPI/fav/" + key, '{}', 'POST');
        response = $.parseJSON(response);
        if (response.result == 'success') {
            anchor.addClass('active');
            anchor.attr('rel', 1);
            anchor.attr('title', 'Remove from favourite');
        }
    }
});

$(document).on('keypress', '#txtSearchTemplates', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val();// == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
    }
});

$(document).on('click', '#lnkTPlay img.playButton', function (event) {
    if ($(this).attr("id") != null) {
        event.preventDefault();
        fnShowTJWPlayer($(this));
    }
});

function fnResetSortBy(vResetId) {
    $("#lnkByPopularity").removeClass("active");
    $("#lnkByDate").removeClass("active");
    $("#lnkByName").removeClass("active");
    $("#lnkByDuration").removeClass("active");

    $(vResetId).addClass("active");
}

function fnShowJWPlayer(obj) {    
    var tguid = 'null';
    var jguid = 'null';

    if ($(obj).attr("id").indexOf("MT_") >= 0 || $(obj).attr("id").indexOf("PT_") >= 0) {
        tguid = $(obj).attr("id").replace("MT_", "").replace("PT_", "");
    } else if ($(obj).attr("id").indexOf("MJ_") >= 0 || $(obj).attr("id").indexOf("PJ_") >= 0) {
        jguid = $(obj).attr("id").replace("MJ_", "").replace("PJ_", "");
    }

    var divid = 'vplayer_' + $(obj).attr("id");

    if (jwplayer(divid).getState() == undefined) {
        var vApiUrl = WebsiteRootPath + "api/VideoBurstAPI/preview/" + tguid + "/" + jguid;
        $.ajax({
            url: vApiUrl,
            type: "post",
            contentType: "application/json",
            success: function (data) {
                jwplayer(divid).setup(data);

                if ($(obj).attr("id").indexOf("MT_") >= 0 || $(obj).attr("id").indexOf("PT_") >= 0) {
                    $(obj).hide();
                }
            },
            error: function (msg) { alert(msg); }
        });
    }
    else {
        jwplayer(divid).play();
    }
    return false;
}

function fnShowTJWPlayer(obj) {
    

        //var index = $(obj).attr('data-preview-id');
        //var starttime = $(obj).attr('data-preview-starttime');
        //var endtime = $(obj).attr('data-preview-stoptime');
        //var url = $(obj).attr('data-video-file-url');
        //var preview = $(obj).attr('data-preview-url');
        var url = $(obj).attr('data-preview-url');
        console.log("url" + url);
       // var myPlayer = videojs("#tPreviewVideo", { fluid: true, "autoplay": true, "preload": "auto", "loop": true });
        
       // $("#myModal3").show();

        var myPlayer = videojs("#tPreviewVideo");
        myPlayer.src(url);
        myPlayer.play();
        //$("#myModal3").show();

    
}

jQuery('#myModal3').on('hidden.bs.modal', function (e) {
    // do something...    
    var myPlayer = videojs("#tPreviewVideo");    
    myPlayer.pause();
});
function fnShowTJWPlayer_old(obj) {
    // change here for new player
    var tguid = 'null';
    var jguid = 'null';
    var vImageId = "";

    if ($(obj).attr("id").indexOf("MT_") >= 0 || $(obj).attr("id").indexOf("PT_") >= 0) {
        tguid = $(obj).attr("id").replace("MT_", "").replace("PT_", "");
        vImageId = tguid;
    } else if ($(obj).attr("id").indexOf("MJ_") >= 0 || $(obj).attr("id").indexOf("PJ_") >= 0) {
        jguid = $(obj).attr("id").replace("MJ_", "").replace("PJ_", "");
        vImageId = jguid;
    }

    var divid = 'vplayer_' + $(obj).attr("id");

    var vPlayerWidth = $("#img" + vImageId).width();
    var vPlayerHeight = $("#img" + vImageId).height();

    if (vPlayerWidth == null || vPlayerWidth == "")
        vPlayerWidth = "320";

    if (vPlayerHeight == null || vPlayerHeight == "")
        vPlayerHeight = "180";

    if (jwplayer(divid).getState() == undefined) {
        var vApiUrl = WebsiteRootPath + "api/VideoBurstAPI/GetJWPlayer/" + tguid + "/" + jguid + "/" + vPlayerWidth + "/" + vPlayerHeight;
        $.ajax({
            url: vApiUrl,
            type: "post",
            contentType: "application/json",
            success: function (data) {
                jwplayer(divid).setup(data);

                if ($(obj).attr("id").indexOf("MT_") >= 0 || $(obj).attr("id").indexOf("PT_") >= 0) {
                    $(obj).hide();
                }
            },
            error: function (msg) { alert(msg); }
        });
    }
    else {
        jwplayer(divid).play();
    }
    return false;
}

function fnBindCategories(userOwnership, isInitial, pageNo, pageSize, sortColumn, sortOrder) {
  //  alert("GetcAT");
    $("#ulCategories").empty();  
    var newOption = "<li id=\"" + 0 + "\" onclick=\"fnBindCTemplates(" + 0 + ",'" + 'All Categories' + "');\"><a href=\"javascript:void(0)\">" +'All Categories' + "</a></li>";
    $("#ulCategories").append(newOption);
   // var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetAllCategories?userOwnership=" + userOwnership;
    var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetTemplateCategories?userOwnership=" + userOwnership;

    $.getJSON(MethodUrl).done(function (data) {
        var varCategories = "";       
        if (Object.keys(data).length > 0) {
            // On success, 'data'
            $.each(data, function (key, Result) {
                
                varCategories += "<li id=\"" + Result.id + "\" onclick=\"fnBindCTemplates(" + Result.id + ",'" + Result.title + "');\"><a href=\"javascript:void(0)\">" + Result.title + "</a></li>";
              
            });
          //  alert("14" + varCategories.length);
            if (varCategories != "") {                            
                $("#ulCategories").append(varCategories);
            }
            //if(varCategorie.length >= 14000)
            //{
            //    $("#ulCategories").addClass("catcombolength");
            //}
        }        
    });
}

function fnTShareOnSocialMedia(vJobTitle, templateGuid) {

    var vJobShortUrl = "";
    $.ajax({
        url: WebsiteRootPath + "api/VideoBurstAPI/GetShortUrl/" + templateGuid,
        type: "post",
        contentType: "application/json",
        success: function (shortUrlResp) {
            vJobShortUrl = shortUrlResp;
        }, cache: false, async: false, crossDomain: true
    });

    $("#lnkTEmailShare").attr("onClick", "fnTShareOnEmail('" + vJobTitle + "','" + vJobShortUrl + "');");

    $("#lnkTTwShare").attr("onclick", "fnSocialMediaShare('tw','" + vJobShortUrl + "','" + vJobTitle + "');");

    $("#lnkTFbShare").attr("onclick", "fnSocialMediaShare('fb','" + vJobShortUrl + "','" + vJobTitle + "');");

    $("#lnkTGoShare").attr("onclick", "fnSocialMediaShare('go','" + vJobShortUrl + "','" + vJobTitle + "');");

    // $("#btnVEmbedCode").attr("onClick", "fnTShareEmbedCode('" + vJobShortUrl + "');");
    $("#txtTEmbedCode").val("<iframe src='" + vJobShortUrl + "' width='480' height='270' allowfullscreen frameborder='0' />");
    
}
    $(document).on('click', '#btnTEmbedCode', function (event) {
        event.preventDefault(); 
    });
 

function fnTShareOnEmail(vJobTitle, vJobShortUrl) {
    $("#txtTEmailSubject").val(vJobTitle);
    $("#txtTShareUrl").val(vJobShortUrl);
}

function fnBindCTemplates(vCategoryId, vCategoryTitle) {
   // alert("test");
     //debugger;
    $("#hdnCategory").val(vCategoryId);
    $("#btnCategories").html(vCategoryTitle + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-menu-down smallFont\" id=\"spnTCTitle\"></span>");
    var vPageSize = parseInt($("#hdnPageSize").val());
    var vOwnership = parseInt($("#hdnOwnership").val());
    var vSortOrder = $("#hdnSortOrder").val();// == "DESC" ? "ASC" : "DESC";
    StartProcessing(true, "Please wait...");
    fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
}

function fnBindDTemplates(vDurationId, vDurationTitle) {
    //debugger;
    $("#hdnDuration").val(vDurationId);
   // $("#btnDurations").html(vDurationTitle + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-down smallFont\"></span>");
    var vPageSize = parseInt($("#hdnPageSize").val());
    var vOwnership = parseInt($("#hdnOwnership").val());
    var vSortOrder = $("#hdnSortOrder").val();// == "DESC" ? "ASC" : "DESC";
    StartProcessing(true, "Please wait...");
    fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
}

// function to set opening tab on page load Custom or Library.
// 16-09-2012
function fnGetCustomCount(isInitial1, pageNo, pageSize, sortColumn, sortOrder) {
   
    var vCategory1 = parseInt($("#hdnCategory").val());
    var vDuration1 = parseFloat($("#hdnDuration").val());
    var vSearchValue1 = $("#txtSearchTemplates").val().trim();
    $("#hdnPageNo").val(pageNo);
    $("#hdnPageSize").val(pageSize);
    $("#hdnSortColumn").val(sortColumn)
    $("#hdnSortOrder").val(sortOrder);
    //$("#hdnOwnership").val(userOwnership);  
    
    StartProcessing(true, "Please wait...");
    var userOwnership = 2;
    var MethodUrl;
    if ($("#hdnOptimized").val() == 'true') {
        MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetTemplatesByCompanyCountNew/";
    } else {
        MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetTemplatesByCompanyCount/";
    }

    $.ajax({
        url: MethodUrl,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {           
            if (data > 0) {
                //if (isNaN(userOwnership)) {
                userOwnership = 1;
                //}                              
                //fnBindTemplates(userOwnership, true, 0, pageSize, "created", "DESC");
            }
            else {
                //if (isNaN(userOwnership)) {
                userOwnership = 2;
                //}
            }
            fnBindTemplates(userOwnership, true, 0, pageSize, "created", "DESC");
        },
        error: function () {
            StopProcessing();
        }
    });      
}

// Bind Format

function fnBindDFormat(vFormatId,vFormatTitle) {    
    $("#hdnFormat").val(vFormatId);
    var vPageSize = parseInt($("#hdnPageSize").val());
    var vOwnership = parseInt($("#hdnOwnership").val());
    var vSortOrder = $("#hdnSortOrder").val();// == "DESC" ? "ASC" : "DESC";
    StartProcessing(true, "Please wait...");
    fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
}




function fnBindTemplates(userOwnership, isInitial, pageNo, pageSize, sortColumn, sortOrder) {
   
    try {       
        $("#hdnPageNo").val(pageNo);
        $("#hdnPageSize").val(pageSize);
        $("#hdnSortColumn").val(sortColumn)
        $("#hdnSortOrder").val(sortOrder);
        $("#hdnOwnership").val(userOwnership);

        var vCategory = parseInt($("#hdnCategory").val());
        var vDuration = parseFloat($("#hdnDuration").val());
        var vFormat = parseFloat($("#hdnFormat").val());
        var vSearchValue = $("#txtSearchTemplates").val().trim();
        var t0 = performance.now();
      //  console.log("Start Time:"+t0);
      //  console.log("Call to api/VideoBurstAPI/GetTemplatesList1 Parameters: userOwnership=" + userOwnership + "&isInitial=" + isInitial + "&Category=" + vCategory + "&Duration=" + vDuration + "&Format=" + vFormat + "&SearchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder);
        
        //var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetTemplates?userOwnership=" + userOwnership + "&isInitial=" + isInitial + "&Category=" + vCategory + "&Duration=" + vDuration + "&SearchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder;
        var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetTemplatesList1?userOwnership=" + userOwnership + "&isInitial=" + isInitial + "&Category=" + vCategory + "&Duration=" + vDuration + "&Format=" + vFormat + "&SearchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder;
        $.getJSON(MethodUrl).done(function (data) {
            var t1 = performance.now();
         //   console.log("End Time:" + t1);
         //   console.log("Call to api took " + (t1 - t0) + " milliseconds.")
            var varTotalRecords = 0;
            var varMediaContent = "";

            if (data != null) {
                if (Object.keys(data).length > 0) {

                    //StartProcessing(true, "Please wait...");

                    $.each(data, function (key, Result) {
                        varMediaContent += "<div class=\"col-xs-6 col-sm-3 placeholder placeholder1\">";

                        varMediaContent += "<span class=\"videoPic\">";

                        var vIsFavourite = Result.isfavourite;

                        if (vIsFavourite == true)
                            varMediaContent += "<span id=\"" + Result.guid + "\" class=\"clsMAFavourite topStar active\" title=\"Remove from favourite\" rel=\"1\" data-key=\"" + Result.guid + "\">&nbsp;</span>";
                        else
                            varMediaContent += "<span id=\"" + Result.guid + "\" class=\"clsMAFavourite topStar\" title=\"Mark as favourite\" rel=\"0\" data-key=\"" + Result.guid + "\">&nbsp;</span>";

                        //var vTShortUrl = "";
                        //$.ajax({
                        //    url: WebsiteRootPath + "api/VideoBurstAPI/GetShortUrl/" + Result.guid,
                        //    type: "post",
                        //    contentType: "application/json",
                        //    success: function (shortUrlResp) {
                        //        vTShortUrl = shortUrlResp;
                        //    }, cache: false, async: false, crossDomain: true
                        //});

                        varMediaContent += "<a href=\"javascript:void(0)\" class=\"shareIcon\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"fnTShareOnSocialMedia('" + Result.title + "','" + Result.guid + "');\">&nbsp;</a>";
                        varMediaContent += "<div class=\"fixheightPic\"><div id=\"vplayer_MT_" + Result.guid + "\">";

                        // var vPrevImage = "http://stage.videoburst.com/Videoburst/live/urlhandle.ashx?u=" + encodeURIComponent(Result.previewimage);
                        var vPrevImage = Result.previewimagethumb;
                        //$.ajax({
                        //    url: WebsiteRootPath + "api/VideoBurstAPI/GetThumbnailUrl?thumbUrl=" + encodeURIComponent(vPrevImage),
                        //    type: "post",
                        //    contentType: "application/json",
                        //    success: function (thumbUrlResp) {
                        //        vPrevImage = thumbUrlResp;
                        //    }, cache: false, async: false, crossDomain: true
                        //});

                        varMediaContent += "<img id=\"img" + Result.guid + "\" src=\"" + vPrevImage + "\" class=\"img-responsive\" alt=\"\"></div></div>";
                        varMediaContent += "<a id=\"lnkTPlay\" href=\"javascript:void(0)\"><img id=\"MT_" + Result.guid + "\" src=\"" + WebsiteRootPath + "Content/themes/fastout/images/btn-play.png\"  data-toggle=\"modal\" data-target=\"#myModal3\"  data-preview-url=\"" + Result.link + "\" class=\"img-responsive playButton\" alt=\"\"></a>";

                        var vTDuration = sformatDuration(Result.duration); // Result.duration;

                        //var vTDuration = 0;
                        //$.ajax({
                        //    url: WebsiteRootPath + "api/VideoBurstAPI/GetDurationInfo/" + Result.duration,
                        //    type: "post",
                        //    contentType: "application/json",
                        //    success: function (durationResp) {
                        //        vTDuration = durationResp;
                        //    }, cache: false, async: false, crossDomain: true
                        //});

                        varMediaContent += "<span class=\"timeDiv\">" + vTDuration + "</span>";

                        var vTemplateLevel = Result.Level;
                        var vCompanyLevel = Result.CompanyLevel;

                        if (vTemplateLevel > vCompanyLevel)
                            varMediaContent += "<div class=\"overlaystrip\">&nbsp;</div>";

                        varMediaContent += "</span>";

                        varMediaContent += "<div class=\"lefttextTemp\">";
                        varMediaContent += "<h4 title=\"" + Result.title + "\" alt=\"" + Result.title + "\" class=\"ellipsisfixwidth\">" + Result.title + "</h4>";
                        varMediaContent += "<p class=\"text-muted bottomlessMargin ellipsisfixwidth\">" + Result.nooftexts + " texts, " + ((Result.noofimages > 0) ? Result.noofimages + " images, " : "") + ((Result.noofvideos > 0) ? Result.noofvideos + " videos, " : "") + Result.noofaudios + " audio track<br/>";
                        if (Result.categorytitle.trim() != "")
                            varMediaContent += "<span class=\"text-muted blueText\">" + Result.categorytitle + "</span></p>";
                        else
                            varMediaContent += "<span class=\"text-muted blueText\">&nbsp;</span></p>";

                        varMediaContent += "</div>";

                        //console.log("template video link:" + Result.link);

                        varMediaContent += "<div class=\"righttextTemp\">";
                        if (vTemplateLevel > vCompanyLevel)
                            varMediaContent += "<a href=\"" + WebsiteRootPath + "Payment/UpgradeAccount\" class=\"btn btn-default btn-md dropdown-toggle btn-outerRed btnCTempVideo\">Upgrade</a>";
                        else
                            varMediaContent += "<button id=\"" + Result.guid + "\" class=\"btn btn-default btn-md dropdown-toggle btn-outerRed btnCTempVideo\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Create</button>";
                        varMediaContent += "</div>";

                        varMediaContent += "</div>";
                        varTotalRecords = Result.totalrecords;

                    });


                    $("#hdnPageNo").val(pageNo);
                    $("#hdnPageSize").val(pageSize);

                    if (varMediaContent.trim() != "") {
                        if (pageNo == 0) {
                            $("#divTemplates").html("");
                            $("#divTemplates").html(varMediaContent.trim());
                            varMediaContent = "";
                        }
                        else {
                            $("#divTemplates").append(varMediaContent.trim());
                            varMediaContent = "";
                        }
                    }

                    StopProcessing();
                }
                else {
                    if (pageNo == 0) {
                        $("#divTemplates").html("");
                        var tNoTemplateText = "";
                        if (userOwnership == 1)
                            tNoTemplateText = "You do not have any custom templates right now. To fill this space, place an order on a unique template made just for you!";
                        else if (userOwnership == 3)
                            tNoTemplateText = "You have no favorites right now! Click the star in the upper left corner of a template thumbnail to add a template to your library.";
                        else
                            tNoTemplateText = "No template found !";

                        $("#divTemplates").html("<div class=\"col-xs-12 col-sm-12 placeholder \">" + tNoTemplateText + "</div>");
                    }
                }
            }
            var t2 = performance.now();
         //   console.log("Time:" + t2);
        //    console.log(" Data to Html took " + (t2 - t1) + " milliseconds.")
            if (varTotalRecords == 0 && pageNo == 0) {                
                if (userOwnership == 1)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Custom") &&
                    $("#liCustomTemplates").addClass("active") && $("#liLibraryTemplates").removeClass("active");
                else if (userOwnership == 2)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Library") &&
                        $("#liCustomTemplates").removeClass("active") && $("#liLibraryTemplates").addClass("active");
                else if (userOwnership == 3)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Favorites");
            }
            else if (varTotalRecords > 0 && pageNo >= 0) {
                if (userOwnership == 1)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Custom") &&
                    $("#liCustomTemplates").addClass("active") && $("#liLibraryTemplates").removeClass("active");
                else if (userOwnership == 2)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Library") &&
                         $("#liCustomTemplates").removeClass("active") && $("#liLibraryTemplates").addClass("active");
                else if (userOwnership == 3)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Favorites");
            }

            StopProcessing();
        });
    }
    catch (ex) {
        StopProcessing();
    }

    return false;
}

function sformatDuration(s) {
    if (s > 0) {
        var fm = [
           // Math.floor(s / 60 / 60 / 24), // DAYS
           // Math.floor(s / 60 / 60) % 24, // HOURS
            Math.floor(s / 60) % 60, // MINUTES
            s % 60 // SECONDS
        ];
        return $.map(fm, function (v, i) { return ((v < 10) ? '0' : '') + v; }).join(':');
    }
    else
        return '00:00';
}

//#endregion

//#region Videos
$(document).ready(function () {
   
    $("#lnkVPublished").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(1);

        var vPageSize = parseInt($("#hdnPageSize").val());
        StartProcessing(true, "Please wait...");
        fnBindVideos(2, 1, 0, vPageSize, "updated", "DESC");
        $("#lnkVDoneByMe.filters").show();
    });

    $("#lnkVDrafts").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(2);

        var vPageSize = parseInt($("#hdnPageSize").val());
        StartProcessing(true, "Please wait...");
        fnBindVideos(2, 2, 0, vPageSize, "created", "DESC");
        $("#lnkVDoneByMe.filters").show();
    });

    $("#lnkVFApproval").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(3)

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindVideos(2, 3, 0, vPageSize, "created", vSortOrder);
    });
    $("#lnkVCampaigns").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(6);

        var vPageSize = parseInt($("#hdnPageSize").val());
        StartProcessing(true, "Please wait...");
        fnBindVideos(2, 6, 0, vPageSize, "created", "DESC");         
        $("#lnkVDoneByMe.filters").hide();
    });

    $("#lnkVByDate, #lnkVDate").click(function (event) {
        event.preventDefault();
       
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        if (vVideoType == 1) {
            fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "updated", vSortOrder);
        }
        else {
            fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "created", vSortOrder);
        }
    });

    $("#lnkVByViews, #lnkVViews").click(function (event) {
      
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "totalviews", vSortOrder);
    });

    $("#lnkVByName, #lnkVName").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val()  == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "title", vSortOrder);
    });

    $("#lnkVByDuration, #lnkVDuration").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val()  == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "duration", vSortOrder);
    });

    $("#lnkVDoneByMe, #lnkVDoneByMe").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "duration", vSortOrder,true);
    });

    $("#lnkVSearch").click(function (event) {
     
        event.preventDefault();
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val();// == "DESC" ? "ASC" : "DESC";
        StartProcessing(true, "Please wait...");
        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkVFbShare").click(function (event) {
        event.preventDefault();
        $("#lnkFbShare").trigger("click");
    });

    $("#btnVEmailShare").click(function (event) {
        event.preventDefault();       
        var vToEmail = $("#txtVToEmail").val().trim();

        if (vToEmail == "") {
            alertBox("Please enter an email address");
            $("#txtVToEmail").focus();
            return false;
        }
        else if (vToEmail != "" && !validateMultipleEmail(vToEmail)) {
            alertBox("Enter a valid email address");
            $("#txtVToEmail").focus();
            return false;
        }

        var vFromEmail = $("#txtVFromEmail").val().trim();

        if (vFromEmail == "") {
            $("#txtVFromEmail").focus();
            alertBox("Enter your email address");
            return false;
        }
        else if (vFromEmail != "" && !validateEmail(vFromEmail)) {
            alertBox("Enter a valid from email address");
            $("#txtVToEmail").focus();
            return false;
        }

        var vEmailSubject = $("#txtVEmailSubject").val().trim();

        if (vEmailSubject == "") {
            alertBox("Enter a subject");
            $("#txtVEmailSubject").focus();
            return false;
        }

        var vEmailMessage = $("#txtVEmailMessage").val().trim();

        if (vEmailMessage == "") {
            $("#txtVEmailMessage").focus();
            alertBox("Enter your message");
            return false;
        }

        var vShareUrl = $("#txtVShareUrl").val().trim();

        if ($("#txtVShareUrl").val().trim() == "") {
            $("#txtVShareUrl").focus();
            alertBox("Enter a video url to share");
            return false;
        }
        // Share through email quick-fix ( Fix with # sign email sending )
        var email = { emailSubject: vEmailSubject, fromEmail: vFromEmail, toEmail: vToEmail, emailMessage: vEmailMessage, videoUrl: vShareUrl };

      //  var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/SendEmail?emailSubject=" + vEmailSubject + "&fromEmail=" + vFromEmail + "&toEmail=" + vToEmail + "&emailMessage=" + vEmailMessage + "&videoUrl=" + vShareUrl;

        var MethodUrl = WebsiteRootPath + "Email";

        $.ajax({
            type: 'POST',
            url: MethodUrl,           
            data: JSON.stringify(email),
            contentType: "application/json",
            success: function (response) {
                if (response == "success") {
                    $("#txtVToEmail").val("");
                    $("#txtVEmailSubject").val("");
                    $("#txtVEmailMessage").val("Hi! Check out this cool video I made using VideoBurst!");
                    $("#btnVEShareCancel").trigger("click");
                    alertBox("Email has been sent successfully");
                }
                else {
                    alertBox("Email sending failed, please try after sometimes");
                }

            }, cache: false, async: false, crossDomain: true
        });
    });
});

$(document).on('keypress', '#txtVSearch', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val();
        StartProcessing(true, "Please wait...");
        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "created", vSortOrder);
    }
});
function fnVResetSortBy(vResetId) {
    $("#lnkVDate").removeClass("active");
    $("#lnkVName").removeClass("active");
    $("#lnkVViews").removeClass("active");
    $("#lnkVDuration").removeClass("active");

    $(vResetId).addClass("active");
}

function fnResetVideoOptions(vOptions) {
    $("#liVPublished").removeClass("active");
    $("#liVDrafts").removeClass("active");
    $("#liVFApproval").removeClass("active");
    $("#liVCompleted").removeClass("active");
    $("#liVFailed").removeClass("active");
    $("#liVCampaigns").removeClass("active");

    if (vOptions == 1)
        $("#liVPublished").addClass("active");
    else if (vOptions == 2)
        $("#liVDrafts").addClass("active");
    else if (vOptions == 3)
        $("#liVFApproval").addClass("active");
    else if (vOptions == 4)
        $("#liVCompleted").addClass("active");
    else if (vOptions == 5)
        $("#liVFailed").addClass("active");
    else if (vOptions == 6)
        $("#liVCampaigns").addClass("active");
}

function fnVDownload(vJobIdentifier, vJobProfile) {
    window.location.href = WebsiteRootPath + "download.aspx?i=" + vJobIdentifier + "&p=" + vJobProfile

    //var vDownloadInfo = vJobIdentifier + '¤' + vJobProfile;

    //$.ajax({
    //    url: WebsiteRootPath + "api/VideoBurstAPI/DownloadJob/" + vDownloadInfo,
    //    type: "post",
    //    contentType: "application/json",
    //    success: function (downloadResp) {
    //        if (downloadResp == "success") {
    //            alert("Video has been downloaded successfully");
    //            return false;
    //        }
    //        else {
    //            alertBox("Unable to download this video, please try again");
    //        }
    //    }, cache: false, async: true, crossDomain: true
    //});
}

function fnAdDownload(vJobIdentifier, vJobProfile) {
     
    window.location.href = WebsiteRootPath + "download.aspx?i=" + vJobIdentifier + "&p=" + vJobProfile + "&z=1";
}
function fnDownloadQRCode(jguid) {
    var url = document.getElementById("hdQrCodeUrl").value; 
    window.location.href = WebsiteRootPath + "download.aspx?url=" + url + "&jguid=" + jguid + "&format=.png";
}
//  fnBindVideos(2, 1, 0, vPageSize, "updated", "DESC");
function fnBindVideos(vOwnership, vJobType, pageNo, pageSize, sortColumn, sortOrder, doneByMe) {
   // alert("Sorting Start");
    try {
        $("#hdnPageNo").val(pageNo); //0
        $("#hdnPageSize").val(pageSize);  //18
        $("#hdnSortColumn").val(sortColumn)  // Created
        $("#hdnSortOrder").val(sortOrder);  // DESC
        $("#hdnOwnership").val(vOwnership); //2
        $("#hdnVideoType").val(vJobType); //2

        if (doneByMe == undefined){
            doneByMe = false;
        }

        var vSearchValue = $("#txtVSearch").val().trim();
        var MethodUrl;
        //if ($("#hdnOptimized").val() == 'true') {
        MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetVideosNew?ownerShip=" + vOwnership + "&jobType=" + vJobType + "&searchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder + "&doneByMe=" + doneByMe;
        //}
        //else {
        //    MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetVideoList?ownerShip=" + vOwnership + "&jobType=" + vJobType + "&searchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder;
        //}
        $.getJSON(MethodUrl).done(function (response) {
            var varTotalRecords = 0;
            var varHtmlContent = "";
            var varCreatedDesc = "";
            if (response != null) {
                if (Object.keys(response).length > 0) {
                    //StartProcessing(true, "Please wait...");

                    $.each(response, function (key, Result) {
                        varHtmlContent += "<div class=\"col-xs-6 col-sm-3 placeholder placeholder1\">";
                        varHtmlContent += "<span class=\"videoPic\">";

                        var varVideoThumb = "";
                        //if ((Result.customthumb != null && Result.customthumb.url != null) || (Result.customcover != null && Result.customcover.url != null)) {
                        //    if (Result.customthumb != null && Result.customthumb.url != null) {
                        //        varVideoThumb = Result.customthumb.url.durl;
                        //    }
                        //    else if (Result.customcover != null && Result.customcover.url != null) {
                        //        varVideoThumb = Result.customcover.url.durl;
                        //    }
                        //}
                        //else if (((Result.status == "completed" || Result.status == "completedpartially") && Result.media != null && Result.media.length > 0)) {
                        //    //Media oMedia = oJob.media.OrderBy(x => x.profile).Where(x => x.mediatype == EnumeratedTypes.MediaTypes.image.ToString()).FirstOrDefault();
                        //    if (Result.media != null && Result.media.url != null) {
                        //        varVideoThumb = Result.media.url.durl;
                        //    }
                        //}
                        if (Result.previewimagethumb != null && Result.previewimagethumb != "") {
                            varVideoThumb = Result.previewimagethumb;
                        }
                        else {
                            var cStatus = Result.status;
                            //Retrun creating video.
                            //if (cStatus > 1000)
                            //{
                           
                       //     varVideoThumb = "images/thumbnail_vb_icon.png"; // vVideoThumbUrl;                            
                            varVideoThumb = $('#hdnRootPath').val();
                            //}
                            //else {
                            //    varVideoThumb =  vVideoThumbUrl;
                            //}
                            
                        }
                        //console.log("Result.status:" + Result.status);
                        //if (Result.previewimagethumb != null && Result.previewimagethumb != "" && Result.status == "completed")
                        //$.ajax({
                        //    url: WebsiteRootPath + "api/VideoBurstAPI/GetThumbnailUrl?thumbUrl=" + encodeURIComponent(varVideoThumb),
                        //    type: "post",
                        //    contentType: "application/json",
                        //    success: function (vidThumbUrlResp) {
                        //        varVideoThumb = vidThumbUrlResp;
                        //    }, cache: false, async: false, crossDomain: true
                        //});


                        varHtmlContent += "<div class=\"fixheightPic\"><img id=\"" + Result.id + "\" src=\"" + varVideoThumb + "\" class=\"img-responsive\" alt=\"" + Result.title + "\"/></div>";
                        varHtmlContent += "<a id=\"lnkVPlay\" href=\"javascript:void(0)\">";
                        varHtmlContent += "<img id=\"" + Result.guid + "\" src=\"" + WebsiteRootPath + "Content/themes/fastout/images/btn-play.png\" class=\"img-responsive playButton\" alt=\"\"></a>";

                        var vVDuration = sformatDuration(Result.duration);
                        //var vVDuration = 0;

                        //$.ajax({
                        //    url: WebsiteRootPath + "api/VideoBurstAPI/GetDurationInfo/" + Result.duration,
                        //    type: "post",
                        //    contentType: "application/json",
                        //    success: function (durationResp) {
                        //        vVDuration = durationResp;
                        //    }, cache: false, async: false, crossDomain: true
                        //});

                        varHtmlContent += "<span class=\"timeDiv\">" + vVDuration + "</span>";
                        if (Result.status == 100)
                            varHtmlContent += "<div class=\"vidoverlaystrip\">&nbsp;</div>";

                        if (Result.status > 1000 && Result.status < 100000)
                            varHtmlContent += "<div class=\"videorenderstrip\">&nbsp;</div>";

                        varHtmlContent += "</span>";

                        varHtmlContent += "<div class=\"lefttextTemp\">";
                        varHtmlContent += "<h4 title=\"" + Result.title + "\" alt=\"" + Result.title + "\" class=\"ellipsisfixwidth\">" + Result.title + "</h4>";
                        varHtmlContent += "<p class=\"text-muted bottomlessMargin\">";
                        varHtmlContent += "<span class=\"videobottomText\">";
                        varCreatedDesc = Result.createddesc;

                        //$.ajax({
                        //    url: WebsiteRootPath + "api/VideoBurstAPI/GetCreatedDesc/" + Result.created,
                        //    type: "post",
                        //    contentType: "application/json",
                        //    success: function (createdResp) {
                        //        varCreatedDesc = createdResp;
                        //    }, cache: false, async: false, crossDomain: true
                        //});

                        varHtmlContent += "<span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\"></span> " + varCreatedDesc + "</span>";
                        varHtmlContent += "<span class=\"videobottomText\">";
                        varHtmlContent += "<span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span> " + Result.totalviews + "</span>";
                        //varHtmlContent += "<br><span class=\"text-muted blueText\" title=\"" + Result.templatetitle + "\" alt=\"" + Result.templatetitle + "\" >" + Result.templatetitle + "</span>";
                        varHtmlContent += "</p></div>";

                        varHtmlContent += "<div class=\"righttextTemp\">";
                        varHtmlContent += "<div class=\"dropdown\">";
                        varHtmlContent += "<button id=\"dLabel\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"videoIcon\">&nbsp;</button>";

                        varHtmlContent += "<ul class=\"dropdown-menu videoDD\" aria-labelledby=\"dLabel\">";
                        //varHtmlContent += "<li><a href=\"" + WebsiteRootPath + "Videos/Detail/" + Result.guid + "\">Show Detail</a></li>";                        
                        varHtmlContent += "<li><a href=\"javascript:void(0)\" onClick=\"fnShowVideoDetail('" + Result.guid + "');\">Show Detail</a></li>";
                        if (Result.status == '111111' || Result.status == '100000') {
                            varHtmlContent += "<li><a href=\"javascript:void(0)\" onClick=\"fnCopyVideo('" + Result.guid + "');\">Make a copy</a></li>";
                        }                        
                        //varHtmlContent += "<li><a href=\"" + WebsiteRootPath + "Videos/Duplicate/" + Result.guid + "/true \">Make a copy</a></li>";
                        varHtmlContent += "<li><a href=\"javascript:void(0)\" onClick=\"fnDeleteVideo('" + Result.guid + "','" + Result.title + "');\">Delete video</a></li>";
                        varHtmlContent += "</ul>";
                        varHtmlContent += "</div></div></div>";

                        varTotalRecords = Result.totalrecords;
                    });

                    $("#hdnPageNo").val(pageNo);
                    $("#hdnPageSize").val(pageSize);

                    if (varHtmlContent.trim() != "") {
                        if (pageNo == 0) {
                            $("#divVideoLists").html("");
                            $("#divVideoLists").html(varHtmlContent.trim());
                            varHtmlContent = "";
                        }
                        else {
                            $("#divVideoLists").append(varHtmlContent.trim());
                            varHtmlContent = "";
                        }
                    }

                    StopProcessing();
                }
                else {
                    if (pageNo == 0) {
                        $("#divVideoLists").html("");
                        $("#divVideoLists").html("<div class=\"col-xs-6 col-sm-3 placeholder placeholder1\">No video found !</div>");
                    }
                }

            } else {
                if (pageNo == 0) {
                    $("#divVideoLists").html("");
                    $("#divVideoLists").html("<div class=\"col-xs-6 col-sm-3 placeholder placeholder1\">No video found !</div>");
                }
            }

            if (varTotalRecords == 0 && pageNo == 0) {
                if (vJobType == 1)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Published videos");
                else if (vJobType == 2)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Draft(s) ");
                else if (vJobType == 3)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Video(s) for approval");
                else if (vJobType == 6)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Campaigns");
            }
            else if (varTotalRecords > 0 && pageNo >= 0) {
                if (vJobType == 1)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Published videos");
                else if (vJobType == 2)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Draft(s)");
                else if (vJobType == 3)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Video(s) for approval");
                else if (vJobType == 6)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Campaigns");
            }

            StopProcessing();
        });

    }
    catch (ex) {
        StopProcessing();
    }

    return false;
}

function fnSocialMediaShare(shareType, shareUrl, shareTitle) {
    if (shareType != "") {
        var vShareUrl = "";

        if (shareType == "fb") {
            vShareUrl = "http://www.facebook.com/sharer.php?u=" + shareUrl + "&title=" + shareTitle;
        }
        else if (shareType == "tw") {
            vShareUrl = "http://twitter.com/intent/tweet?status=" + shareTitle + " " + shareUrl;
        }
        else if (shareType == "go") {
            vShareUrl = "https://plus.google.com/share?url=" + shareUrl;
        }

        window.open(vShareUrl, 'social-share-dialog', 'toolbar=no, scrollbars=yes, resizable=yes, top=100, left=400, width=625,height=450');
    }
}

function fnDeleteVideo(vJobGUId, vJobTitle) {
    
    confirmBox("Are you sure you want to delete '" + vJobTitle + "' ?", function () {
        var vPgScrollTo = Math.round($('#' + vJobGUId).offset().top);
        $.ajax({
            url: WebsiteRootPath + "api/VideoBurstAPI/DeleteJob/" + vJobGUId,
            type: "post",
            contentType: "application/json",
            success: function (deleteResp) {
                if (deleteResp == "success") {
                    alertBox('Video has been deleted successfully'); 
                    var vJobType = $("#hdnVideoType").val();
                    var vPgNumber = $("#hdnPageNo").val();  
                    var vSortColumn = $("#hdnSortColumn").val();

                    var vSortByColumn = 0;
                    if (vSortColumn.trim().toLowerCase() == "created")
                        vSortByColumn = 1;
                    if (vSortColumn.trim().toLowerCase() == "totalviews")
                        vSortByColumn = 2;
                    if (vSortColumn.trim().toLowerCase() == "title")
                        vSortByColumn = 3;
                    if (vSortColumn.trim().toLowerCase() == "duration")
                        vSortByColumn = 4;
                     
                    var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? 2 : 1; 

                    if (vJobType == 1)
                        vJobStatusId = "Published";
                    else
                        vJobStatusId = "Drafts";

                    window.location.href = window.location.href = WebsiteRootPath + "Videos/Index/" + vJobStatusId + "~" + vSortByColumn + "~" + vSortOrder + "~" + vPgNumber + "~" + vPgScrollTo;
                }
                else {
                    alertBox('Unable to delete this video, please try after sometime');
                }
            }, cache: false, async: false, crossDomain: true
        });
    }, function () { return false; });
}
//#endregion
