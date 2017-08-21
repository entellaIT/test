
function GetCampaignDetails(id) {
    
    var varHtmlContent = "";
   // alert("mecall" +id); 
    var url = WebsiteRootPath + "CampaignStats/GetData";
    //$.ajax({
    //    type: "POST",
    //    //url: '@Url.Action("GetData")',
    //    url: url,
    //    data: "{'campaignid':'" + id + "'}",
    //    contentType: "application/json; charset=utf-8",
    //    //dataType: "json",
    //    success: function (response) {
    //        var t1 = performance.now();
    //        console.log("End Time:" + t1);
    //        if (response != null) { 
                //if (Object.keys(response).length > 0) { 
                //    $.each(response, function (key, Result) { 
                //        console.log("my response" + response.length);
                //        varHtmlContent += "<div class=\"form-group row\"> <label class=\"col-md-5 control-label\"><strong>Count of " + Result.pagename + " :</strong></label>";
                //        varHtmlContent += "<div class=\"col-sm-2\"><input type=\"text\" readonly value=\"" + Result.PageHitCount + "\" CssClass=\"form-control\"></div></div>";
                //    });

                //    $("#divcampaignstatsLists").html("");
                //    $("#divcampaignstatsLists").html(varHtmlContent.trim());                  
                //}
    //        }           
    //        return false;
    //    },
    //    failure: function (response) {
    //        console.log("my response" + response.d);
    //    }
    //});

    var response = null;
    $.ajax({
        type: 'POST',
        url: url,
        data: "{'campaignid':'" + id + "'}",
        contentType: "application/json",
        success: function (resp) {
            console.log("my response" + resp);
           // debugger;
            if (resp.hasOwnProperty("d")) {
                console.log("hasOwnProperty");
                response = $.parseJSON(resp.d);
            }
            else {
                console.log("parseJSON");
               // $.each(resp, function (key, Result) { console.log("key" + key); console.log("Result" + Result); });
                response = $.parseJSON(resp);
            }
            if (response != null) {
                if (Object.keys(response).length > 0) {
                    $.each(response, function (key, Result) {
                        if (Result.pagename == "Views" || Result.pagename == "Downloads") {
                            varHtmlContent += "<div class=\"form-group row\"> <label class=\"col-md-5 control-label\"><strong>" + Result.pagename + " :</strong></label>";
                            varHtmlContent += "<div class=\"col-sm-2\"><input type=\"text\" readonly value=\"" + Result.PageHitCount + "\" CssClass=\"form-control\"></div></div>";
                        }
                    });

                    $("#divcampaignstatsLists").html("");
                    $("#divcampaignstatsLists").html(varHtmlContent.trim());
                }
            }

            //if (response == "success") {
            //    $("#txtVToEmail").val("");
            //    $("#txtVEmailSubject").val("");
            //    $("#txtVEmailMessage").val("Hi! Check out this cool video I made using VideoBurst!");
            //    $("#btnVEShareCancel").trigger("click");
            //    alertBox("Email has been sent successfully");
            //}
            //else {
            //    alertBox("Email sending failed, please try after sometimes");
            //}

        }, cache: false, async: false, crossDomain: true
    });


}

function GetCampaignDetails1(id) {

    var varHtmlContent = "";
    // alert("mecall" +id); 
    var MethodUrl = WebsiteRootPath + "api/VideoBurstAPI/CampaignStats?campaignid=" + id;
    console.log("mecall:");
    $.getJSON(MethodUrl).done(function (data1) {
        var t1 = performance.now();
        console.log("End Time:" + t1);
        if (data1 != null) {
            if (Object.keys(data1).length > 0) {
                $.each(data1, function (key, Result) { 
                    if (Result.pagename == "Views" || Result.pagename == "Downloads") {
                        varHtmlContent += "<div class=\"form-group row\"> <label class=\"col-md-5 control-label\"><strong>" + Result.pagename + " :</strong></label>";
                        varHtmlContent += "<div class=\"col-sm-2\"><input type=\"text\" readonly value=\"" + Result.PageHitCount + "\" CssClass=\"form-control\"></div></div>";
                    }
                });
                $("#divcampaignstatsLists").html("");
                $("#divcampaignstatsLists").html(varHtmlContent.trim());
            }
        }
        console.log("data:" + data1);
    });

    return false;
    //$.ajax({
    //    type: "POST",
    //    //url: '@Url.Action("GetData")',
    //    url: url,
    //    data: "{'campaignid':'" + id + "'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (response) {
    //        if (response != null) {
    //            if (Object.keys(response).length > 0) {
    //                $.each(response, function (key, Result) {
    //                    console.log("my response" + response.length);
    //                    varHtmlContent += "<div class=\"form-group row\"> <label class=\"col-md-5 control-label\"><strong>Count of " + Result.pagename + " :</strong></label>";
    //                    varHtmlContent += "<div class=\"col-sm-2\"><input type=\"text\" readonly value=\"" + Result.PageHitCount + "\" CssClass=\"form-control\"></div></div>";
    //                });

    //                $("#divcampaignstatsLists").html("");
    //                $("#divcampaignstatsLists").html(varHtmlContent.trim());
    //            }
    //        }
    //        return false;
    //    },
    //    failure: function (response) {
    //        console.log("my response" + response.d);
    //    }
    //});
}


function GetCampaignUserDetails(id) {

    var varHtmlContent = "";
    //alert("mecall" +id);
   // debugger;
    $.ajax({
        type: "POST",
        url: "ViewCampaigns.aspx/GetCampaignUsers",
        data: "{'campaignid':'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response != null) {
                if (Object.keys(response).length > 0) {
                   // alert("mecall" + response.d);
                    varHtmlContent += "<tr><th  padding:5px;>&nbsp;JobID&nbsp;  </th><th align=\"center\">&nbsp;UserEmail&nbsp; </th><th align=\"center\">&nbsp;CreatedDate&nbsp; </th></tr>";
                    $.each(response.d, function (key, Result) {                      
                        var date = Result.created;
                        varHtmlContent += "<tr><td align=\"center\">" + Result.id + "</td><td align=\"center\">" + Result.email + "</td><td align=\"center\">" + Result.createddate; + "</td></tr>";
                    });
                    $("#divcampaignsuserdetails").html("");
                    $("#divcampaignsuserdetails").html(varHtmlContent.trim());
                }
            }
            return false;
        },
        failure: function (response) {
            alert(response.d);
        }
    });

}


function CancelUserPopup() {
    // alert("del");
    $("#divcampaignstatsLists").html("");
    //$("#txtLandingPage").val("");
    //$("#txtCreate").val("");
    //$("#txtCreate2").val("");
    //$("#txtCreate3").val("");
    //$("#txtCreate4").val("");
    //$("#txtthankyoupage").val("");
    //$("#txtEmailopen").val("");
    //$("#txllastdate").val("");
    //$("#txtAbandonmentrate").val("");
    //$("#txtdownloadallowed").val("");
    //$("#txtDownloadsofar").val("");
}