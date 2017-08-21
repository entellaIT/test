//Cropping
//http://www.jqueryrain.com/?j2D4wPA1
//http://fengyuanchen.github.io/cropper/
var unsaved = false;
var selectdatatype = 'image';
var oldselectdatatype = null;
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
   
    $("a.uploadThumb").on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).parent('div').find('input[type=file]').click();
    });


    $("#croppopup").find('button[rel=croppopup-close]').on('click', function () {
        var c = $('#croppopup');
        c.modal('hide');
        if ($image != null)
            $image.cropper("destroy");
        selectedcontainer = null;
    });

    $("#croppopup").find('button[rel=croppopup-done]').on('click', function () {
        var c = $('#croppopup');
        c.modal('hide');
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
                                //Set progress
                                status.setProgress(percent);
                            }, false);
                        }
                        return xhrobj;
                    },
                    url: WebsiteRootPath + "api/fupload/Cropper",
                    type: "POST",
                    contentType: false,
                    processData: false,
                    cache: false,
                    data: dataURL,
                    success: function (data) {
                        status.setProgress(100);

                        var response = $.parseJSON(data);
                        if (response.uploaded) {
                            //UpdateInputUrl(input, response.filename);
                            try {
                                var teguid = $(selectedcontainer).attr('data-teguid');
                                console.log('teguid:' + teguid);
                                console.log('filename:' + response.filename);
                                updateTemplateElement(teguid, response.filename);
                            }
                            catch (exupdate) { }
                            $(input).val(response.filename);
                            $(selectedcontainer).find('.statusbar').hide();
                            //$(selectedcontainer).css({ 'background-image': 'url("' + response.filename + '")' });
                            $(selectedcontainer).find('.img-create-campaign').attr("src", response.filename);
                            DeleteFile(oldfilename);
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
    $("#croppopup").find('button[rel=croppopup-clockwise]').on('click', function () {
        console.log('rotate clockwise');
        $image.cropper('rotate', 90);
    });
    $("#croppopup").find('button[rel=croppopup-anticlockwise]').on('click', function () {
        console.log('rotate anticlockwise');
        $image.cropper('rotate', -90);
    });
    $("#croppopup").find('button[rel=croppopup-zoomin]').on('click', function () {
        console.log('zoom-in');
        $image.cropper("zoom", 0.1);
    });
    $("#croppopup").find('button[rel=croppopup-zoomout]').on('click', function () {
        console.log('zoom-out');
        $image.cropper("zoom", -0.1);
    });
});
function choosefile(obj)
{
    $(obj).parent('div').parent('div').parent('div').find('div.dropZone').find('input[type=file]').click();
}
function handleFileUpload(files, obj) {
    if (($(obj).attr('data-type') == 'image' && files[0].type.indexOf('image') >= 0) ||
        ($(obj).attr('data-type') == 'audio' && files[0].type.indexOf('audio') >= 0) ||
        ($(obj).attr('data-type') == 'video' && files[0].type.indexOf('video') >= 0)) {
        $('#spanSavingText').text("Saving..."); 
        var fd = new FormData();
        fd.append('file', files[0]);
        console.log($(obj).find('input[type=hidden]').val())
        //Clear any old selected value
        if ($(obj).find('input[type=hidden]').val() != '')
            DeleteFile($(obj).find('input[type=hidden]').val());

        $(obj).find('input[type=hidden]').val('');
        $(obj).parent('div').find('#preview').find('div').find('#delete').hide();
        $(obj).parent('div').find('#preview').find('div').find('#edit').hide();


        var status = new createStatusbar(obj); //Using this we can set progress.
        sendFile(fd, files[0].type, obj, status);
    }
    //for (var i = 0; i < files.length; i++) {

    // }
}
function sendFile(fileData, type, obj, status) {
    var uploadURL = WebsiteRootPath + "api/fupload";
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
            console.log(data);
            var response = $.parseJSON(data);
            if (response.uploaded) {
                status.setProgress(100);
                $(obj).find('input[type=hidden]').val(response.filename);

                var teguid = $(obj).attr('data-teguid');
                console.log('teguid:' + teguid);
                console.log('filename:' + response.filename);
                console.log('img-create-campaign:' + $(obj).find('.img-create-campaign').attr("src"));
                try {
                    //updateTemplateElement(teguid, response.filename);
                }
                catch (ex) {
                }
                if (type.indexOf('image/') >= 0) {
                    $(obj).find('.statusbar').hide();
                    //$(obj).css('background-image', 'url("' + response.filename + '")'); 
                   // $(obj).parent('div').find('#preview').find('div').find('#edit').show();
                    $(obj).find('.img-create-campaign').attr("src", response.filename);
                    $(obj).find('.img-create-campaign').show();
                    
                }
                //debugger;
                $(obj).find('#btnCampUpload').hide();
                $(obj).find('#btnGroupCampUpload').find('#edit').click();
                $(obj).find('#btnGroupCampUpload').show();
                $(obj).parent('div').find('#preview').find('div').find('#delete').show();
                
                if ($(obj).hasClass('required')) {
                    $(obj).css('border', '1px solid #3c763d');
                    $(obj).attr('data-valid', '1');
                    //try
                    //{
                    //    RefreshValidations();
                        
                    //}
                    //catch(ex)
                    //{

                    //}
                }
            }
        }
    });
    status.setAbort(jqXHR);
  }
var rowCount = 0;
function createStatusbar(obj) {
    $(obj).find('.statusbar').remove('.statusbar');
    //$(obj).css('background-image', 'none');

    rowCount++;
    var row = "odd";
    if (rowCount % 2 == 0) row = "even";
    this.statusbar = $("<div class='statusbar'></div>");
    this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
    this.abort = $("<div class='abort'>X</div>").appendTo(this.statusbar);
    this.statusbar.appendTo(obj);

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
function savefile(object)
{
    var obj = $(object).parent('div').parent('div').parent('div').find('div.dropZone');
    var input = $(obj).find('input[type=hidden]');
    var url = WebsiteRootPath + "uploads/" + $(input).val();

    if ($(input).val().indexOf('http://') >= 0 || $(input).val().indexOf('https://') >= 0 || $(input).val().indexOf('urlhandle.ashx?u=http') >= 0) {
        url = $(input).val();
    }
    window.open(url, "_blank");
}
function editimage(object) {
    //StartProcessing();
    //$('#spanSavingText').text("Saving...");
    //debugger;
    var obj = $(object).parent('div').parent('div').parent('div').find('div.dropZone');
    selectedcontainer = obj;
    var input = $(obj).find('input[type=hidden]');
    var oldfilename = $(input).val();
    if ($(input).val().indexOf('http://') >= 0 || $(input).val().indexOf('https://') >= 0 || $(input).val().indexOf('urlhandle.ashx?u=http') >= 0) {
        $(".cropper").attr('src', $(input).val());
    }
    else {
        $(".cropper").attr('src', WebsiteRootPath + "uploads/" + $(input).val());
    }

    var aspect = $(obj).attr('data-width') / $(obj).attr('data-height');
    var windowInnerWidth = $(window).innerWidth();
    var MaxWidth = windowInnerWidth - 20;

    if (windowInnerWidth > 450)
    { MaxWidth = windowInnerWidth - 100; }

    var MaxHeight = $(window).innerHeight() - 250 + "px !important;";
    var width = windowInnerWidth - 200 + "px !important;";
    var height = MaxHeight
    var left = "50px !important;";
    var top = "10px !important;";
    $("#croppopup").find('.modal-dialog').attr('style', 'width:' + MaxWidth + 'px !important;');
    //$("#croppopup").find('.popupContent').attr('style', 'width:' + width + 'height:' + height + 'left:' + left + 'top:' + top);
    $("#croppopup").find('#cropcontainer').attr('style', 'width:' + width + ';height:' + height + ';');
    //$("#croppopup").attr('style', );

    $image = $(".cropper");

    $image.cropper({
        aspectRatio: aspect,
        autoCropArea: 1,
        //autoCrop:false,
        data: {
            x: 10,
            y: 10,
        }, 
        touchDragZoom: false, 
        //minCropBoxWidth: ($(window).innerWidth() - 100) > 100 ? ($(window).innerWidth() - 200) : $(window).innerWidth() - 100,
        //minCropBoxHeight: ($(window).innerHeight() - 150) > 100 ? ($(window).innerHeight() - 250) : $(window).innerHeight() - 150,
        //preview: ".img-preview",

        minContainerWidth: (windowInnerWidth) < 450 ? MaxWidth - 30 : windowInnerWidth - 150,
        done: function (data) {
        },
        built: function () {
            var c = $('#croppopup');
            c.modal({
                show: true,
                keyboard: true,
                backdrop: 'static',
            });
           // StopProcessing();
        }
    });

}
function _delete(object) {
    var obj = $(object).parent('div').parent('div').parent('div').find('div.dropZone');
    var input = $(obj).find('input[type=hidden]'); 

    $(obj).find('.statusbar').remove('.statusbar');
    $(obj).parent('div').find('#preview').find('div').find('#delete').hide(); 

    //$(obj).css('background-image', 'url("' + WebsiteRootPath + 'images/img-default.png")');
    //$(obj).find('.create-video-img').attr("src", WebsiteRootPath + 'images/img-default.png');
    //$('#btnCampUpload').show();
    //$('#btnGroupCampUpload').hide();
    $(obj).find('#btnCampUpload').show();
    $(obj).find('#btnGroupCampUpload').hide();

    DeleteFile($(input).val());
    $(input).val('');
     
    var default_img = $(obj).attr('data-default-img'); 
    $(obj).find('.img-create-campaign').attr("src", default_img);

    if ($(obj).hasClass('required')) {
        //$(obj).css('border', '1px solid #a94442');
        $(obj).attr('data-valid', '0');
        try {
            //RefreshValidations();
        } catch (ex)
        { }
    }
}
function DeleteFile(filename) {
    //debugger;
    if (filename!=undefined && filename!=null && filename.indexOf('http://') < 0 && filename.indexOf('https://') < 0) {
        //debugger;
        try {
            var jqXHR = $.ajax({
                url: WebsiteRootPath + "api/fupload/" + filename,
                type: "DELETE",
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
}
 
 
