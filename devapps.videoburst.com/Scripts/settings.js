var $image = null;
var selectedcontainer = null;
$(document).ready(function () {
    $("input[type=file]").change(function () {
        //We need to send dropped files to Server
        handleFileUpload(this.files, $(this).parent().find('div.dropZone'));
        $(this).val('');
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
                var input = $(selectedcontainer).parent('div').parent('div').find('input[type=hidden]');
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
                    url: "../api/fupload/Cropper",
                    type: "POST",
                    contentType: false,
                    processData: false,
                    cache: false,
                    data: dataURL,
                    success: function (data) {
                        status.setProgress(100);
                        var response = $.parseJSON(data);
                        if (response.uploaded) {
                            $(input).val(response.filename);
                            $(selectedcontainer).find('.statusbar').hide();
                            $(selectedcontainer).css({ 'background-image': 'url("' + response.path + response.filename + '")' });
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
    $("#croppopup").find('a[rel=croppopup-clockwise]').on('click', function () {
        $image.cropper('rotate', 90)
    });
    $("#croppopup").find('a[rel=croppopup-anticlockwise]').on('click', function () {
        $image.cropper('rotate', -90)
    });
});
    function handleFileUpload(files, obj) {
        if ($(obj).attr('data-type') == 'image' && files[0].type.indexOf('image') >= 0) {
            var fd = new FormData();
            fd.append('file', files[0]);
            //Clear any old selected value
            if ($(obj).parent('div').find('input[type=hidden]') != '')
                DeleteFile($(obj).parent('div').find('input[type=hidden]').val());

            $(obj).parent('div').find('input[type=hidden]').val('');
            $(obj).find('#preview').remove('#preview');

            var status = new createStatusbar(obj); //Using this we can set progress.
            sendFile(fd, files[0].type, obj, status);
        }
    }
    function sendFile(fileData, type, obj, status) {
        var uploadURL = "../api/fupload"; //Upload URL
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
                    $(obj).parent('div').parent('div').find('input[type=hidden]').val(response.filename);
                    this.preview = $('<div id="preview" style="position:absolute; top:5px;left:5px;z-index:101;"><div>');
                    $(obj).find('.statusbar').hide();
                    $(obj).css('background-image', 'url("' + response.path + response.filename + '")');
                    $('#ancEdit').show();
                    $('#anchDelete').show();
                    if ($(obj).find('#preview').length <= 0)
                        this.preview.appendTo(obj);
                }
            }
        });
        status.setAbort(jqXHR);
    }
    var rowCount = 0;
    function createStatusbar(obj) {
        $(obj).find('.statusbar').remove('.statusbar');
        //$(obj).find('input[type=hidden]').hide();

        $(obj).css('background-image', 'none');

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
        //StartProcessing();
        var obj = $(object).parent('div').parent('div').find('div').find('div.dropZone');
        selectedcontainer = obj;
        var input = $(object).parent('div').parent('div').find('input[type=hidden]');
        var oldfilename = $(input).val();
        
        if ($(input).val().indexOf('http://') >= 0 || $(input).val().indexOf('https://') >= 0 || $(input).val().indexOf('urlhandle.ashx?u=http') >= 0) {
            $(".cropper").attr('src', $(input).val());
        }
        else {
            $(".cropper").attr('src', "../uploads/" + $(input).val());
        }
        
        var aspect = $(obj).attr('data-width') / $(obj).attr('data-height');
        var windowInnerWidth = $(window).innerWidth(); 
        var MaxWidth = windowInnerWidth - 100 + "px !important;";
       
        if (windowInnerWidth < 365)
        { MaxWidth = windowInnerWidth - 20 + "px !important;"; }

        var MaxHeight = $(window).innerHeight() - 250 + "px !important;";
        var width = windowInnerWidth - 200 + "px !important;";
        var height = MaxHeight
        var left = "50px !important;";
        var top = "10px !important;";
        $("#croppopup").find('.modal-dialog').attr('style', 'width:' + MaxWidth + ';');
        //$("#croppopup").find('.popupContent').attr('style', 'width:' + width + 'height:' + height + 'left:' + left + 'top:' + top);
        $("#croppopup").find('#cropcontainer').attr('style', 'width:' + width + ';height:' + height + ';');
        //$("#croppopup").attr('style', );

        $image = $(".cropper");

        $image.cropper({
            aspectRatio: aspect,
            autoCropArea: 1,
            //rotatable:true,
            data: {
                x: 10,
                y: 10,
            },
            done: function (data) {
            },
            built: function () {
                var c = $('#croppopup');
                c.modal({
                    show: true,
                    keyboard: true,
                    backdrop: 'static',
                });
                //StopProcessing();
            }
        });
    }
    function _delete(object) {
        var obj = $(object).parent('div').parent('div').find('div').find('div.dropZone');
        var input = $(object).parent('div').parent('div').find('input[type=hidden]');
        $(obj).find('.statusbar').remove('.statusbar');
        $(obj).find('#preview').remove('#preview');
        if ($(obj).attr('data-type') == 'image') {
            $(obj).css('background-image', 'url("../images/img-default.png")');
         //   $(obj).css('background-image', 'url("../images/' + $(obj).attr('data-type') + 'img-default.png")');
        }

        DeleteFile($(input).val());
        $(input).val('');
        $('#ancEdit').hide();
        $('#anchDelete').hide();
    }
    function DeleteFile(filename) {
        if (filename != undefined && filename != '') {
            try {
                var jqXHR = $.ajax({
                    url: "../api/fupload/" + filename,
                    type: "DELETE",
                    contentType: false,
                    processData: false,
                    cache: false,
                    data: {},
                    success: function (data) {
                    },
                    error: function () {
                    }
                });
            } catch (ex) {
            }
        }
    }
