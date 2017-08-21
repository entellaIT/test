$(document).ready(function (e) {
    $('.vmTD.vmTD1>a.deleteRow').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        
        var parenttr = $(this).parent('td').parent('tr');
        var id = $(parenttr).attr("id");
        confirmBox('Are you sure you want to delete this album?', function () {
            StartProcessing();
            var options = {
                type: 'DELETE',
                dataType: 'json',
                data: "",
                contentType: 'application/json; charset=utf-8',
                url: "api/videoburst/album/" + id,
                success: function (resp) {
                    var result = null;
                    if (resp != null) {
                        if (resp.hasOwnProperty("d")) {
                            result = $.parseJSON(resp.d);
                        }
                        else {
                            result = $.parseJSON(resp);
                        }
                        try {
                            if (result.result == 'success') {
                                $(parenttr).remove();
                            }
                            else
                                alertBox(result.result);
                        }
                        catch (ex) {
                            console.log('error:' + ex.message);
                        }
                    }
                },
                error: function (xhr, status, e) {
                },
                cache: false,
                async: true,
                crossDomain: true
            };
            $.ajax(options);
            StopProcessing();
        });

    });

    $('.vmTD.vmTD1.albumtr').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var id = $(this).parent('tr').attr('id');
        $('tr').removeClass('select');
        $(this).parent('tr').addClass('select');

        parent = $(this).parent('tr').parent('tbody').parent('table#contenttable')
        containertr = $(parent).find('tr#contentrow' + id);
        containertd = $(containertr).find('td#contenttd' + id);
        if ($(containertd).find('table#content').length == 0) {
            StartProcessing();
            var medias = null;
            var options = {
                type: 'GET',
                dataType: 'json',
                data: "",
                contentType: 'application/json; charset=utf-8',
                url: "api/videoburst/media/" + id + "/null/0/1",
                success: function (resp) {
                    if (resp != null) {
                        if (resp.hasOwnProperty("d")) {
                            medias = resp.d;
                        }
                        else {
                            medias = resp;
                        }
                        try {

                            $table = $('<table id="content" width="100%" border="0" cellspacing="0" cellpadding="0" class="accordionTable" />');
                            $(containertd).append($table);
                            $(containertd).find('table#content')
                               .append($('<tr class="title">')
                               .append($('<td class="vmTD">').text('Preview')
                               ).append($('<td class="showText vmTD">').text('Date Uploaded')
                               ).append($('<td class="showText vmTD">').text('Uploaded By')
                               ).append($('<td class="showText vmTD">').text('WxH')
                               ).append($('<td class="showText vmTD">').text(' ')
                               ));

                            $(resp).each(function (e, item) {
                                $(containertd).find('table#content')
                               .append($('<tr>')
                               .append($('<td class="vmTD">').html('<img onclick="previewm(' + item.id + ')"  src="' + (item.thumburl != null ? item.thumburl.durl : "") + '" style="width:75px;height:42px;cursor:pointer;" />')
                               ).append($('<td class="showText vmTD">').text(item.created)
                               ).append($('<td class="showText vmTD">').text(item.createdby.name)
                               ).append($('<td class="showText vmTD">').text(((item.width != null && item.height != null) ? item.width + 'x' + item.height : "N/A"))
                               ).append($('<td class="lastcol vmTD">').append($('<a class="deleteRow">').attr('href', 'javascript:delmedia(' + item.id + ')').attr('id', 'med' + item.id))
                               ));
                            });
                        }
                        catch (ex) {

                            console.log('error:' + ex.message);
                        }
                    }
                },
                error: function (xhr, status, e) {
                },
                cache: false,
                async: true,
                crossDomain: true
            };
            $.ajax(options);
            StopProcessing();
        }
        visible = $(containertr).is(':visible');
        $('.accordionDiv').hide(0);
        if (!visible) {
            $(containertr).show(400);
        }
    });

    //$('img.previewA').on('click', function (e) {
    //    var id = $(this).parent('a').parent('td').parent('tr').attr('id');
       
    //    var ad = null;
    //    var options = {
    //        type: 'GET',
    //        dataType: 'json',
    //        data: "",
    //        contentType: 'application/json; charset=utf-8',
    //        url: "api/videoburst/album/details/" + id,
    //        success: function (resp) {
    //            if (resp != null) {
    //                if (resp.hasOwnProperty("d")) {
    //                    ad = resp.d;
    //                }
    //                else {
    //                    ad = resp;
    //                }
    //                try {
    //                    $("#viewpopup").append($('<img>', {'src':(ad.thumburl != null) ? ad.thumburl.durl : "", 'width': 384,'height': 216}));
    //                    $("#viewpopup").dialog({
    //                        width:384 + 30,
    //                        height: 216 + 60,
    //                        modal: true,
    //                        closeOnEscape: true,
    //                        draggable: true,
    //                        dialogClass: "viewpopup",
    //                        //buttons: {
    //                        //    Close: function (e) {
    //                        //        e.stopPropagation();
    //                        //        e.preventDefault();
    //                        //        $(this).dialog('close');
    //                        //        $(".popup.fadebg").hide();
    //                        //        $("#viewpopup").html('');
    //                        //    },
    //                        //},
    //                        close: function (event, ui) {
    //                            $(this).dialog('close');
    //                            $(".popup.fadebg").hide();
    //                            $("#viewpopup").html('');
    //                        }
    //                    });
    //                }
    //                catch (ex) {
    //                    console.log('error:' + ex.message);
    //                }
    //            }
    //        },
    //        error: function (xhr, status, e) {
    //        },
    //        cache: false,
    //        async: true,
    //        crossDomain: true
    //    };
    //    $.ajax(options);
    //});
   
});
function delmedia(id) {
    confirmBox('Are you sure you want to delete this item?', function() {
        var options = {
            type: 'DELETE',
            dataType: 'json',
            data: "",
            contentType: 'application/json; charset=utf-8',
            url: "api/videoburst/media/" + id,
            success: function (resp) {

                var result = null;
                if (resp != null) {
                    if (resp.hasOwnProperty("d")) {
                        result = $.parseJSON(resp.d);
                    }
                    else {
                        result = $.parseJSON(resp);
                    }
                    try {
                        if (result.result == 'success') {
                            console.log(result.result);
                            var parent = $('#med' + id).parent('td').parent('tr').parent('tbody').parent('table#content');
                            if ($(parent).find('tbody').children('tr').size() == 2) {
                                $(parent).parent('td').parent('tr.accordionDiv').remove();
                            } else {
                                $('#med' + id).parent('td').parent('tr').remove();
                            }
                        }
                        else
                            alertBox(result.result);
                    }
                    catch (ex) {
                        console.log('error:' + ex.message);
                    }
                }
            },
            error: function (xhr, status, e) {
            },
            cache: false,
            async: true,
            crossDomain: true
        };
        $.ajax(options);
    });
}
function previewm(id) {
    StartProcessing();
    var ad = null;
    var options = {
        type: 'GET',
        dataType: 'json',
        data: "",
        contentType: 'application/json; charset=utf-8',
        url: "api/videoburst/media/details/" + id,
        success: function (resp) {
            if (resp != null) {
                if (resp.hasOwnProperty("d")) {
                    ad = resp.d;
                }
                else {
                    ad = resp;
                }
                try {
                    $("div#popcontent").html('');
                    var w = $(window).innerWidth();
                    var h = $(window).innerHeight();
                    var iw = $(window).innerWidth();
                    var ih = $(window).innerHeight();
                    var diffw = 50;
                    var diffh = 28.126;

                    //var wd = $(window).innerWidth() - $(window).innerHeight();

                    //width:1903,height:989 //1.9241658240647118301314459049545
                    //ListPhotos.js:263 ad.width:1920,ad.height:1080//1.7777777777777777777777777777778
                    //ListPhotos.js:348 w:1803,h:1014.1875//1.7781065088757396449704142011834

                    console.log('width:' + $(window).innerWidth() + ',height:' + $(window).innerHeight());
                    console.log('ad.width:' + ad.width + ',ad.height:' + ad.height);
                    if (ad.mediatype == 1020)//Image
                    {
                        $('#aPhotoFullScreenLink').show();
                        $('#aPhotoFullScreenLink').attr('href', (ad.url != null) ? ad.url.durl : "javascript:void(0)");
                        var rd = 1;//1.1463880462869340523536681271767
                        if ((ad.width) > $(window).innerWidth() || (ad.height) > $(window).innerHeight()) {
                            var aspect = (ad.width / ad.height);
                            diffh = diffw / aspect;//56.27

                            if ((ad.width / ad.height) > (iw / ih)) {//
                                rd = 1 + (ad.width / ad.height) - (iw / ih);//1
                            }
                            else
                                rd = 1 + (iw / ih) - (ad.width / ad.height)//1.0427942722017866526537046768261

                            if ((ad.width) > $(window).innerWidth() && (ad.height) > $(window).innerHeight()) {
                                if (ad.width > ad.height) {
                                    w = iw / rd;//1659.99
                                    h = (iw / rd) / aspect;//1070.4375000000000000000000000047
                                }
                                else {
                                    h = ih / rd;//974.16529848493994084626063861898
                                    w = (ih / rd) * aspect;//1889.290275849580491338202450655
                                }
                            }
                            else if ((ad.width) > $(window).innerWidth()) {
                                aspect = ad.width / ad.height;
                                w = iw / rd;
                                h = (iw / rd) / aspect;
                            }
                            else {
                                aspect = ad.width / ad.height;
                                h = ih / rd;
                                w = (ih / rd) * aspect;
                            }
                        }
                        else if (ad.width == null || ad.width == 0 || ad.height == null || ad.height == 0) {
                            w = 640;
                            h = 360;
                        }
                        else {
                            w = ad.width;
                            h = ad.height;
                        }

                        $("div#popcontent").append($('<img>', { 'src': (ad.url != null) ? ad.url.durl : "", 'width': (w - diffw), 'height': (h - diffh)}));
                    }
                    else if (ad.mediatype == 1010 || ad.mediatype == 1000)//audio
                    {
                        $('#aPhotoFullScreenLink').hide();
                        $('#aPhotoFullScreenLink').attr('href', 'javascript:void(0)');
                        w = 640;
                        h = 360;
                        $("div#popcontent").append($('<div>', { id: 'vplayer' }));
                        jwplayer("vplayer").setup(
                            {
                                'file': ad.url.durl,
                                'image': ad.thumburl.durl,
                                'width': w,
                                'height': h,
                                'primary': 'html5'
                            });
                    }
                    console.log('w:' + w + ',h:' + h);
                    $("#viewpopup, .popup.fadebg").show();
                    $("#viewpopup").css({ 'position': 'fixed', 'width': w + 'px', 'height': h + 'px', 'top': ($(window).height() - h) / 2 + 'px', 'left': ($(window).width() - w) / 2 + 'px' });
                    $("body").css({ 'overflow-y': 'hidden' });
                    $(this).addClass("active");

                    $('.close').on('click', function () {
                        $("#viewpopup, .popup.fadebg").hide();
                        $("body").css({ 'overflow-y': 'auto' });
                        $("#viewpopup").css({ 'position': 'static' });
                        $(".baseLnkBtn").removeClass("active");
                        StopProcessing();
                    });
                }
                catch (ex) {
                    console.log('error:' + ex.message);
                }
            }
        },
        error: function (xhr, status, e) {
        },
        cache: false,
        async: true,
        crossDomain: true
    };
    $.ajax(options);
    StopProcessing();
}