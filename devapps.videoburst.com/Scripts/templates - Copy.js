//#region Templates
$(document).ready(function () {
    $("#lnkFavoriteTemplates").click(function (event) {
        event.preventDefault();
        $("#txtSearchValue").val("");
        $("#liFavoriteTemplates").addClass = "active";
        $("#liCustomTemplates").removeClass("active");
        $("#liLibraryTemplates").removeClass("active");

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(3, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkCustomTemplates").click(function (event) {
        event.preventDefault();
        $("#txtSearchValue").val("");
        $("#liFavoriteTemplates").removeClass = "active";
        $("#liCustomTemplates").addClass("active");
        $("#liLibraryTemplates").removeClass("active");

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(1, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkLibraryTemplates").click(function (event) {
        event.preventDefault();
        $("#txtSearchValue").val("");
        $("#liFavoriteTemplates").removeClass = "active";
        $("#liCustomTemplates").removeClass("active");
        $("#liLibraryTemplates").addClass("active");

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(2, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkSortByPopularity, #lnkByPopularity").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkCreatedDate, #lnkByDate").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkSortByName, #lnkByName").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(vOwnership, false, 0, vPageSize, "title", vSortOrder);
    });

    $("#lnkSortByDuration, #lnkByDuration").click(function (event) {
        event.preventDefault();
        fnResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindTemplates(vOwnership, false, 0, vPageSize, "duration", vSortOrder);
    });

    $("#lnkSearchTemplates").click(function (event) {
        event.preventDefault();
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

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
    else if (vToEmail != "" && !validateEmail(vToEmail)) {
        alertBox("Enter a valid email address");
        $("#txtTToEmail").focus();
        return false;
    }

    var vFromEmail = $("#txtTFromEmail").val().trim();

    if (vFromEmail == "") {
        $("#txtTFromEmail").focus();
        alertBox("Enter your email address");
        return false;
    }
    else if (vFromEmail != "" && !validateEmail(vFromEmail)) {
        alertBox("Enter a valid from email address");
        $("#txtTFromEmail").focus();
        return false;
    }

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

    var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/SendEmail?emailSubject=" + vEmailSubject + "&fromEmail=" + vFromEmail + "&toEmail=" + vToEmail + "&emailMessage=" + vEmailMessage + "&videoUrl=" + vShareUrl;

    $.ajax({
        url: MethodUrl,
        type: "post",
        contentType: "application/json",
        success: function (response) {
            if (response == "success") {
                $("#txtTToEmail").val("");
                $("#txtTEmailSubject").val("");
                $("#txtTEmailMessage").val("");
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
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

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

function fnBindCategories() {
    var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetAllCategories/";
    $.getJSON(MethodUrl).done(function (data) {
        var varCategories = "";

        if (Object.keys(data).length > 0) {
            // On success, 'data'
            $.each(data, function (key, Result) {
                varCategories += "<li id=\"" + Result.id + "\" onclick=\"fnBindCTemplates(" + Result.id + ",'" + Result.title + "');\"><a href=\"javascript:void(0)\">" + Result.title + "</a></li>";
            });

            if (varCategories != "") {
                $("#ulCategories").append(varCategories);
            }
        }
    });
}

function fnTShareOnSocialMedia(vJobTitle, vJobShortUrl) {
    $("#lnkTEmailShare").attr("onClick", "fnTShareOnEmail('" + vJobTitle + "','" + vJobShortUrl + "');");

    $("#lnkTTwShare").attr("onclick", "fnSocialMediaShare('tw','" + vJobShortUrl + "','" + vJobTitle + "');");

    $("#lnkTFbShare").attr("onclick", "fnSocialMediaShare('fb','" + vJobShortUrl + "','" + vJobTitle + "');");

    $("#lnkTGoShare").attr("onclick", "fnSocialMediaShare('go','" + vJobShortUrl + "','" + vJobTitle + "');");
}

function fnTShareOnEmail(vJobTitle, vJobShortUrl) {
    $("#txtTEmailSubject").val(vJobTitle);
    $("#txtTShareUrl").val(vJobShortUrl);
}

function fnBindCTemplates(vCategoryId, vCategoryTitle) {
    $("#hdnCategory").val(vCategoryId);
    $("#btnCategories").html(vCategoryTitle + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-down smallFont\" id=\"spnTCTitle\"></span>");
    var vPageSize = parseInt($("#hdnPageSize").val());
    var vOwnership = parseInt($("#hdnOwnership").val());
    var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

    fnBindTemplates(vOwnership, false, 0, vPageSize, "created", vSortOrder);
}

function fnBindDTemplates(vDurationId, vDurationTitle) {
    $("#hdnDuration").val(vDurationId);
    $("#btnDurations").html(vDurationTitle + "<span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-down smallFont\"></span>");
    var vPageSize = parseInt($("#hdnPageSize").val());
    var vOwnership = parseInt($("#hdnOwnership").val());
    var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

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
        var vSearchValue = $("#txtSearchTemplates").val().trim();

        var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetTemplates?userOwnership=" + userOwnership + "&isInitial=" + isInitial + "&Category=" + vCategory + "&Duration=" + vDuration + "&SearchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder;
        $.getJSON(MethodUrl).done(function (data) {

            var varTotalRecords = 0;
            var varMediaContent = "";

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

                    var vTShortUrl = "";
                    $.ajax({
                        url: WebsiteRootPath + "api/VideoBurstAPI/GetShortUrl/" + Result.guid,
                        type: "post",
                        contentType: "application/json",
                        success: function (shortUrlResp) {
                            vTShortUrl = shortUrlResp;
                        }, cache: false, async: false, crossDomain: true
                    });

                    varMediaContent += "<a href=\"javascript:void(0)\" class=\"shareIcon\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"fnTShareOnSocialMedia('" + Result.title + "','" + vTShortUrl + "');\">&nbsp;</a>";
                    varMediaContent += "<div class=\"fixheightPic\"><div id=\"vplayer_MT_" + Result.guid + "\">";

                    var vPrevImage = Result.previewimage;
                    $.ajax({
                        url: WebsiteRootPath + "api/VideoBurstAPI/GetThumbnailUrl?thumbUrl=" + encodeURIComponent(vPrevImage),
                        type: "post",
                        contentType: "application/json",
                        success: function (thumbUrlResp) {
                            vPrevImage = thumbUrlResp;
                        }, cache: false, async: false, crossDomain: true
                    });

                    varMediaContent += "<img id=\"img" + Result.guid + "\" src=\"" + vPrevImage + "\" class=\"img-responsive\" alt=\"\"></div></div>";
                    varMediaContent += "<a id=\"lnkTPlay\" href=\"javascript:void(0)\"><img id=\"MT_" + Result.guid + "\" src=\"" + WebsiteRootPath + "Content/themes/fastout/images/btn-play.png\" class=\"img-responsive playButton\" alt=\"\"></a>";

                    var vTDuration = 0;

                    $.ajax({
                        url: WebsiteRootPath + "api/VideoBurstAPI/GetDurationInfo/" + Result.duration,
                        type: "post",
                        contentType: "application/json",
                        success: function (durationResp) {
                            vTDuration = durationResp;
                        }, cache: false, async: false, crossDomain: true
                    });

                    varMediaContent += "<span class=\"timeDiv\">" + vTDuration + "</span>";
                    varMediaContent += "</span>";

                    varMediaContent += "<div class=\"lefttextTemp\">";
                    varMediaContent += "<h4 class=\"ellipsisfixwidth\">" + Result.title + "</h4>";
                    varMediaContent += "<p class=\"text-muted bottomlessMargin\">" + Result.nooftexts + " texts, " + Result.noofimages + " images, " + Result.noofaudios + " audio track<br/>";
                    if (Result.categorytitle.trim() != "")
                        varMediaContent += "<span class=\"text-muted blueText\">" + Result.categorytitle + "</span></p>";
                    else
                        varMediaContent += "<span class=\"text-muted blueText\">&nbsp;</span></p>";

                    varMediaContent += "</div>";

                    varMediaContent += "<div class=\"righttextTemp\">";
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
                    $("#divTemplates").html("<div class=\"col-xs-6 col-sm-3 placeholder placeholder1\">No template found !</div>");
                }
            }

            if (varTotalRecords == 0 && pageNo == 0) {
                if (userOwnership == 1)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Custom");
                else if (userOwnership == 2)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Library");
                else if (userOwnership == 3)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Favorites");
            }
            else if (varTotalRecords > 0 && pageNo >= 0) {
                if (userOwnership == 1)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Custom");
                else if (userOwnership == 2)
                    $("#divTotalRecords").html("<span class=\"blueText\">" + varTotalRecords + "</span> in Library");
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

//#endregion

//#region Videos
$(document).ready(function () {
    $("#lnkVPublished").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(1);

        var vPageSize = parseInt($("#hdnPageSize").val());

        fnBindVideos(2, 1, 0, vPageSize, "created", "DESC");
    });

    $("#lnkVDrafts").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(2);

        var vPageSize = parseInt($("#hdnPageSize").val());

        fnBindVideos(2, 2, 0, vPageSize, "created", "DESC");
    });

    $("#lnkVFApproval").click(function (event) {
        event.preventDefault();
        $("#txtVSearch").val("");
        fnResetVideoOptions(3)

        var vPageSize = parseInt($("#hdnPageSize").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindVideos(2, 3, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkVByDate, #lnkVDate").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "created", vSortOrder);
    });

    $("#lnkVByViews, #lnkVViews").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "totalviews", vSortOrder);
    });

    $("#lnkVByName, #lnkVName").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "title", vSortOrder);
    });

    $("#lnkVByDuration, #lnkVDuration").click(function (event) {
        event.preventDefault();
        fnVResetSortBy($(this));
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

        fnBindVideos(vOwnership, vVideoType, 0, vPageSize, "duration", vSortOrder);
    });

    $("#lnkVSearch").click(function (event) {
        event.preventDefault();
        var vPageSize = parseInt($("#hdnPageSize").val());
        var vOwnership = parseInt($("#hdnOwnership").val());
        var vVideoType = parseInt($("#hdnVideoType").val());
        var vSortOrder = $("#hdnSortOrder").val() == "DESC" ? "ASC" : "DESC";

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
        else if (vToEmail != "" && !validateEmail(vToEmail)) {
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

        var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/SendEmail?emailSubject=" + vEmailSubject + "&fromEmail=" + vFromEmail + "&toEmail=" + vToEmail + "&emailMessage=" + vEmailMessage + "&videoUrl=" + vShareUrl;

        $.ajax({
            url: MethodUrl,
            type: "post",
            contentType: "application/json",
            success: function (response) {
                if (response == "success") {
                    $("#txtVToEmail").val("");
                    $("#txtVEmailSubject").val("");
                    $("#txtVEmailMessage").val("");
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

function fnBindVideos(vOwnership, vJobType, pageNo, pageSize, sortColumn, sortOrder) {
    try {
        $("#hdnPageNo").val(pageNo);
        $("#hdnPageSize").val(pageSize);
        $("#hdnSortColumn").val(sortColumn)
        $("#hdnSortOrder").val(sortOrder);
        $("#hdnOwnership").val(vOwnership);
        $("#hdnVideoType").val(vJobType);

        var vSearchValue = $("#txtVSearch").val().trim();
        var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/GetVideos?ownerShip=" + vOwnership + "&jobType=" + vJobType + "&searchValue=" + vSearchValue + "&pageNo=" + pageNo + "&pageSize" + pageSize + "&sortColumn=" + sortColumn + "&sortOrder=" + sortOrder;
        $.getJSON(MethodUrl).done(function (response) {
            var varTotalRecords = 0;
            var varHtmlContent = "";
            var varCreatedDesc = "";

            if (Object.keys(response).length > 0) {
                //StartProcessing(true, "Please wait...");

                $.each(response, function (key, Result) {
                    varHtmlContent += "<div class=\"col-xs-6 col-sm-3 placeholder placeholder1\">";
                    varHtmlContent += "<span class=\"videoPic\">";

                    var varVideoThumb = "";
                    if ((Result.customthumb != null && Result.customthumb.url != null) || (Result.customcover != null && Result.customcover.url != null)) {
                        if (Result.customthumb != null && Result.customthumb.url != null) {
                            varVideoThumb = Result.customthumb.url.durl;
                        }
                        else if (Result.customcover != null && Result.customcover.url != null) {
                            varVideoThumb = Result.customcover.url.durl;
                        }
                    }
                    else if (((Result.status == "completed" || Result.status == "completedpartially") && Result.media != null && Result.media.length > 0)) {
                        //Media oMedia = oJob.media.OrderBy(x => x.profile).Where(x => x.mediatype == EnumeratedTypes.MediaTypes.image.ToString()).FirstOrDefault();
                        if (Result.media != null && Result.media.url != null) {
                            varVideoThumb = Result.media.url.durl;
                        }
                    }
                    else {
                        //Retrun creating video.
                        varVideoThumb = vVideoThumbUrl;
                    }

                    $.ajax({
                        url: WebsiteRootPath + "api/VideoBurstAPI/GetThumbnailUrl?thumbUrl=" + encodeURIComponent(varVideoThumb),
                        type: "post",
                        contentType: "application/json",
                        success: function (vidThumbUrlResp) {
                            varVideoThumb = vidThumbUrlResp;
                        }, cache: false, async: false, crossDomain: true
                    });

                    varHtmlContent += "<div class=\"fixheightPic\"><img id=\"" + Result.id + "\" src=\"" + varVideoThumb + "\" class=\"img-responsive\" alt=\"" + Result.title + "\"/></div>";
                    varHtmlContent += "<a id=\"lnkVPlay\" href=\"javascript:void(0)\">";
                    varHtmlContent += "<img id=\"" + Result.guid + "\" src=\"" + WebsiteRootPath + "Content/themes/fastout/images/btn-play.png\" class=\"img-responsive playButton\" alt=\"\"></a>";

                    var vVDuration = 0;

                    $.ajax({
                        url: WebsiteRootPath + "api/VideoBurstAPI/GetDurationInfo/" + Result.duration,
                        type: "post",
                        contentType: "application/json",
                        success: function (durationResp) {
                            vVDuration = durationResp;
                        }, cache: false, async: false, crossDomain: true
                    });

                    varHtmlContent += "<span class=\"timeDiv\">" + vVDuration + "</span>";
                    varHtmlContent += "</span>";

                    varHtmlContent += "<div class=\"lefttextTemp\">";
                    varHtmlContent += "<h4 class=\"ellipsisfixwidth\">" + Result.title + "</h4>";
                    varHtmlContent += "<p class=\"text-muted bottomlessMargin\">";
                    varHtmlContent += "<span class=\"videobottomText\">";

                    varCreatedDesc = "";

                    $.ajax({
                        url: WebsiteRootPath + "api/VideoBurstAPI/GetCreatedDesc/" + Result.created,
                        type: "post",
                        contentType: "application/json",
                        success: function (createdResp) {
                            varCreatedDesc = createdResp;
                        }, cache: false, async: false, crossDomain: true
                    });

                    varHtmlContent += "<span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\"></span> " + varCreatedDesc + "</span>";
                    varHtmlContent += "<span class=\"videobottomText\">";
                    varHtmlContent += "<span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\"></span> " + Result.totalviews + "</span>";
                    varHtmlContent += "</p></div>";

                    varHtmlContent += "<div class=\"righttextTemp\">";
                    varHtmlContent += "<div class=\"dropdown\">";
                    varHtmlContent += "<button id=\"dLabel\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"videoIcon\">&nbsp;</button>";

                    varHtmlContent += "<ul class=\"dropdown-menu videoDD\" aria-labelledby=\"dLabel\">";
                    //varHtmlContent += "<li><a href=\"" + WebsiteRootPath + "Videos/Detail/" + Result.guid + "\">Show Detail</a></li>";
                    varHtmlContent += "<li><a href=\"javascript:void(0)\" onClick=\"fnShowVideoDetail('" + Result.guid + "');\">Show Detail</a></li>";
                    varHtmlContent += "<li><a href=\"" + WebsiteRootPath + "Videos/Duplicate/" + Result.guid + "\">Duplicate Video</a></li>";
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

            if (varTotalRecords == 0 && pageNo == 0) {
                if (vJobType == 1)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Published videos");
                else if (vJobType == 2)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Draft(s) ");
                else if (vJobType == 3)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Video(s) for approval");
            }
            else if (varTotalRecords > 0 && pageNo >= 0) {
                if (vJobType == 1)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Published videos");
                else if (vJobType == 2)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Draft(s)");
                else if (vJobType == 3)
                    $("#divTotalVideoInfo").html("<span class=\"blueText\">" + varTotalRecords + "</span> Video(s) for approval");
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
//#endregion
