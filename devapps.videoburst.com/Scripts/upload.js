//Cropping
//http://www.jqueryrain.com/?j2D4wPA1
//http://fengyuanchen.github.io/cropper/
var selectedcontainer = null;
var $image = null;

$(document).ready(function () {
    // grab your file object from a file input
    $("input[type=file].dropZone").change(function () {
        //We need to send dropped files to Server
        handleFileUpload(this.files, $(this).parent());
        control = $(this);
        control.replaceWith(control = control.clone(true));
    });
    $('div.dropZone').on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '1px solid #0B85A1');
    });

    $('div.dropZone').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $('div.dropZone').on('drop', function (e) {
        $(this).css('border', '1px dotted #0B85A1');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;
        //We need to send dropped files to Server
        handleFileUpload(files, this);
    });
    $(document).on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $('#btnAddMedia').on('click', function (e) {
        if ($('#txtAlbumName').val() == '' && $('#hdnAlbumId').val().trim() == '') {
            alertBox('Enter Album name first or select existing album.')
        }
        else {
            $('#albumDiv').hide();
            $('#divUploadArea').show();
        }
    });
    $('#btnSave').on('click', function (e) {
        if ($('#hdnFiles').val() == '') {
            alertBox('No file uploaded.');
            return false;
        }
        return true;
    });
    $('#chooseAlbum').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("#popupAlbum, .popup.fadebg").show();
        $("#popupAlbum").css({ 'position': 'fixed' });
    });
    $("#popupAlbum").find('a[rel=albumpopup-close]').on('click', function () {
        $("#popupAlbum, .popup.fadebg").hide();
        $("body").css({ 'overflow-y': 'auto' });
        $("#popupAlbum").css({ 'position': 'static' });
    });
    $("#popupAlbum").find('a[rel=albumpopup-done]').on('click', function () {
        $("#popupAlbum, .popup.fadebg").hide();
        $("body").css({ 'overflow-y': 'auto' });
        $("#popupAlbum").css({ 'position': 'static' });
    });
    $("#croppopup").find('a[rel=croppopup-close]').on('click', function () {
        $("#croppopup, .popup.fadebg").hide();
        $("body").css({ 'overflow-y': 'auto' });
        $("#croppopup").css({ 'position': 'static' });
        if ($image != null)
            $image.cropper("destroy");
        selectedcontainer = null;
    });
    $("#croppopup").find('a[rel=croppopup-done]').on('click', function () {
        $("#croppopup, .popup.fadebg").hide();
        $("body").css({ 'overflow-y': 'auto' });
        $("#croppopup").css({ 'position': 'static' });
        if ($image != null && selectedcontainer != null) {
            try {
                var input = $(selectedcontainer).find('input[type=hidden]');
                var oldfilename = $(input).val();

                var dataURL = $image.cropper("getDataURL", {
                    width: $(selectedcontainer).attr('data-width'),
                    height: $(selectedcontainer).attr('data-height'),
                });
                var status = new createStatusbar(selectedcontainer);
                status.setProgress(0);

                var jqXHR = $.ajax({
                    xhr: function () {
                        var xhrobj = new window.XMLHttpRequest();
                        if (window.ActiveXObject) {
                            xhrobj = new window.ActiveXObject("Microsoft.XMLHTTP");
                        }
                        //var xhrobj = $.ajaxSettings.xhr();
                        if (xhrobj.upload) {
                            xhrobj.upload.addEventListener('progress', function (event) {
                                var percent = 0;
                                var position = event.loaded || event.position;
                                var total = event.total;
                                if (event.lengthComputable) {
                                    percent = Math.ceil(position / total * 100);
                                }
                                console.log("position:" + position + ",total:" + total);
                                //Set progress
                                status.setProgress(percent);
                            }, false);
                        }
                        return xhrobj;
                    },
                    url: "Cropper.ashx",
                    type: "POST",
                    contentType: false,
                    processData: false,
                    cache: false,
                    data: dataURL,
                    success: function (data) {
                        status.setProgress(100);
                        var response = $.parseJSON(data);
                        if (response.uploaded) {
                            AddFile(response.filename, $(selectedcontainer).parent('.dropZone').find('#hdnFiles'));
                            $(input).val(response.filename);
                            $(selectedcontainer).find('.statusbar').hide();
                            $(selectedcontainer).css('background-image', 'url("uploads/' + response.filename + '")');
                            DeleteFile(oldfilename, $(selectedcontainer).parent('.dropZone').find('#hdnFiles'));
                        }
                        selectedcontainer = null;
                    },
                    error: function () {
                        status.setProgress(0);
                        selectedcontainer = null;
                    }
                });
            }
            catch (ex) {
                selectedcontainer = null;
            }
            $image.cropper("destroy");
        }

    });

});
function handleFileUpload(files, obj) {
    try {
        console.log(files.length);
        for (i = 0; i < files.length; i++) {
            var fd = new FormData();
            fd.append('file', files[i]);
            ////Clear any old selected value
            //if ($(obj).find('input[type=hidden]').val() != '')
            //    DeleteFile($(obj).find('input[type=hidden]').val());

            //$(obj).find('input[type=hidden]').val('');
            //$(obj).find('#preview').remove('#preview');
            this.FileDiv = $("<div class='FileBox'></div>");
            var status = new createStatusbar(this.FileDiv, obj); //Using this we can set progress.
            sendFile(fd, files[i].type, this.FileDiv, status);
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
}
function sendFile(fileData, type, obj, status) {
    var uploadURL = "upload.ashx"; //Upload URL
    var jqXHR = $.ajax({
        xhr: function () {
            var xhrobj = new window.XMLHttpRequest();
            if (window.ActiveXObject) {
                xhrobj = new window.ActiveXObject("Microsoft.XMLHTTP");
            }
            //var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    console.log("position:" + position + ",total:" + total);
                    //Set progress
                    status.setProgress(percent);
                }, false);
            }
            return xhrobj;
        },
        url: uploadURL,
        type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        data: fileData,
        success: function (data) {
            var response = $.parseJSON(data);
            if (response.uploaded) {
                status.setProgress(100);
                //$(obj).attr('data-url', response.filename);
                //$(obj).find('input[type=hidden]').val(response.filename);
                this.input = $('<input type="hidden" value="' + response.filename + '" />');
                this.input.appendTo(obj);
                console.log(response.filename);
                AddFile(response.filename, $(obj).parent('.dropZone').find('#hdnFiles'));

                this.preview = $('<div id="preview" style="position:absolute; top:5px;left:5px;z-index:101;"><div>');
                if (type.indexOf('image/') >= 0) {
                    $(obj).find('.statusbar').hide();

                    $(obj).css('background-image', 'url("uploads/' + response.filename + '")');

                    //$('<span id="preview"><a href="javascript:void(0)" style="position:relative; right:93px;top:0px;z-index:101;">edit</a><img src="uploads/' + response.filename + '" style="position:relative; top:-34px;z-index:100;"/></span>').appendTo(obj);
                    $('<a class="editThumb" id="edit" onclick="edit(this)">Edit</a>').appendTo(this.preview);

                    if (response.ratio != null) {
                        if (response.ratio > 1) {
                            //$(obj).css("background-size", "200px " + (200 / response.ratio) + "px");
                            $(obj).attr('data-height', (200 / response.ratio));
                            $(obj).attr('data-width', 200);
                        }
                        else {
                            //$(obj).css("background-size", (200 * response.ratio) + "px 200px");
                            $(obj).attr('data-width', (200 * response.ratio));
                            $(obj).attr('data-height', 200);
                        }
                    }
                    else {
                        //$(obj).css("background-size", "200px 200px");
                    }
                    $(obj).css("background-size", "100%");

                }
                else {

                }
                $('<a class="deleteThumb" id="delete" onclick="_delete(this)">Delete</a>').appendTo(this.preview);
                if ($(obj).find('#preview').length <= 0)
                    this.preview.appendTo(obj);
            }
        }
    });
    status.setAbort(jqXHR);
}
function createStatusbar(obj, container) {
    //$(obj).find('.statusbar').remove('.statusbar');
    //$(obj).find('input[type=hidden]').hide();
    $(container).css('background-image', 'none');
    this.statusbar = $("<div class='statusbar'></div>");
    this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
    this.abort = $("<div class='abort'>X</div>").appendTo(this.statusbar);
    this.statusbar.appendTo(obj);
    obj.appendTo(container);

    this.setFileNameSize = function (name, size) {
        var sizeStr = "";
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        }
        else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }
        //this.filename.html(name);
        this.size.html(sizeStr);
    }
    this.setProgress = function (progress) {
        var progressBarWidth = progress * this.progressBar.width() / 100;
        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
        if (parseInt(progress) >= 100) {
            this.abort.hide();
        }
    }
    this.setAbort = function (jqxhr) {
        var sb = this.statusbar;
        this.abort.click(function () {
            jqxhr.abort();
            sb.hide();
        });
    }
}
function edit(object) {
    StartProcessing();
    var obj = $(object).parent('#preview').parent('.FileBox');
    selectedcontainer = obj;
    var input = $(obj).find('input[type=hidden]');
    var oldfilename = $(input).val();
    if ($(input).val().indexOf('http://') >= 0 || $(input).val().indexOf('https://') >= 0 || $(input).val().indexOf('urlhandle.ashx?u=http') >= 0) {
        $(".cropper").attr('src', $(input).val());
    }
    else {
        $(".cropper").attr('src', "uploads/" + $(input).val());
    }

    $(".popup.fadebg").show();

    var aspect = $(obj).attr('data-width') / $(obj).attr('data-height');
    var MaxWidth = $(window).innerWidth() - 100 + "px !important;";
    var MaxHeight = $(window).innerHeight() - 150 + "px !important;";
    var width = MaxWidth;//(($("#croppopup").width() < $(window).innerWidth()) ? $("#croppopup").width() + "px !important;" : MaxWidth);
    var height = MaxHeight;//(($("#croppopup").height() < $(window).innerHeight()) ? $("#croppopup").height() + "px !important;" : MaxHeight);
    var left = "50px !important;";
    var top = "10px !important;";
    $("#croppopup").find('#cropcontainer').attr('style', 'width:' + width + 'height:' + height);
    $("#croppopup").attr('style', 'left:' + left + 'top:' + top);

    $image = $(".cropper");
    $image.cropper({
        aspectRatio: aspect,
        // autoCropArea: 1,
        data: {
            x: 10,
            y: 10,
            //width: 640,
            //height: 360
        },
        //preview: ".img-preview",
        done: function (data) {
        },
        built: function () {
            $("#croppopup, .popup.fadebg").show();
            $("#croppopup").css({ 'position': 'fixed' });
            $("body").css({ 'overflow-y': 'hidden' });
            StopProcessing();
        }
    });
}
function _delete(object) {
    var parentDiv = $(object).parent('#preview');
    var obj = $(parentDiv).parent('.FileBox');
    var input = $(obj).find('input[type=hidden]');
    DeleteFile($(input).val(), $(obj).parent('.dropZone').find('#hdnFiles'));
    $(input).val('');
    $(obj).remove();
}
function DeleteFile(filename, inputobj) {
    try {
        RemoveFile(filename, inputobj);
        var jqXHR = $.ajax({
            url: "delete.ashx",
            type: "POST",
            contentType: false,
            processData: false,
            cache: false,
            data: filename,
            success: function (data) {
            },
            error: function () {
            }
        });
    } catch (ex) {
    }
}
function AddFile(filename, inputobj) {
    var currentvalue = $(inputobj).val();
    var array = [];
    if (currentvalue != '') {
        array = currentvalue.split(',');
    }
    array.push(filename);
    $(inputobj).val(array.join(','));
}

function RemoveFile(filename, inputobj) {
    var currentvalue = $(inputobj).val();
    var array = [];
    if (currentvalue != '') {
        array = currentvalue.split(',');
        array.splice($.inArray(filename, array), 1);
    }
    if (array.length > 0)
        $(inputobj).val(array.join(','));
    else
        $(inputobj).val('');
}
function selectme(li, item) {
    $('#hdnAlbumId').val($(item).attr('data-id'));
    $('li.liCheck').removeClass('select');
    $(li).addClass('select');
    //$('li.liCheck').find('span.thumbbg').find('span.thumbcheckbox').find('input[type=radio]').prop('checked', false);
    $(li).find('span.thumbbg').find('span.thumbcheckbox').find('input[type=radio]').prop('checked', true);
    $('#txtAlbumName').val($(li).find('span.thumbTitle').find('strong').attr('title'));
}