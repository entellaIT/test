$(document).ready(function () {
    $("img.playButton").on('click', function (event) {
        if ($(this).attr("id") != null) {
            event.preventDefault();
            Preview($(this));
        }
    });
    $(function () {
        $(".texttrim70").each(function (i) {
            len = $(this).text().trim().length;
            if (len > 90) {
                $(this).text($(this).text().trim().substr(0, 90) + '...');
            }
        });
    });
});
function Preview(obj) {

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
            type: 'POST',
            cache: false,
            data: {},
            dataType: "json",
            success: function (data) {
                var response = filterresponse(data);
                if (response) {
                    if (response != null && response != '') {
                        try {
                            jwplayer(divid).setup(response);
                        }
                        catch (ex) {
                            alertBox(ex.message);
                        }
                    }
                }
            },
            error: function (data) {
                 
            }
        });
    }
    else {
        jwplayer(divid).play();
    }
    return false;
}

function PreviewJobVideo(jguid) {

    var tguid = 'null';
    //var jguid = 'null';
    //if ($(obj).attr("id").indexOf("MT_") >= 0 || $(obj).attr("id").indexOf("PT_") >= 0) {
    //    tguid = $(obj).attr("id").replace("MT_", "").replace("PT_", "");
    //} else if ($(obj).attr("id").indexOf("MJ_") >= 0 || $(obj).attr("id").indexOf("PJ_") >= 0) {
    //    jguid = $(obj).attr("id").replace("MJ_", "").replace("PJ_", "");
    //}

    var divid = 'JobPreviewVideoDiv';
    if (jwplayer(divid).getState() == undefined) {
        var vApiUrl = WebsiteRootPath + "api/VideoBurstAPI/preview/" + tguid + "/" + jguid;
        $.ajax({
            url: vApiUrl,
            type: 'POST',
            cache: false,
            data: {},
            dataType: "json",
            success: function (data) {
                var response = filterresponse(data);
                if (response) {
                    if (response != null && response != '') {
                        try {
                            jwplayer(divid).setup(response);
                        }
                        catch (ex) {
                            alertBox(ex.message);
                        }
                    }
                }
            },
            error: function (data) {

            }
        });
    } 
    return false;
}