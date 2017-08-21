function UpdateCustomThumbNail() {
    
    var url = WebsiteRootPath + "Videos/UpdateThumbNail";
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({ 'imageUrl': $('#hiddenThumbUrl').val() }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.message == "Success")
                alertBox("Default thumbnail has been updated successfully");

            window.location.href = window.location.href;
        },
        error: function () {
            alertBox("Some error has occured.");
        }
    });
}