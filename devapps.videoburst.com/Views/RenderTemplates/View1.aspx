<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<VideoBurstAPI.Entities.RenderTemplateElements>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title>View1</title>
</head>
<body>
    <script src="<%: Url.Content("~/Scripts/jquery-1.8.2.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/jquery.validate.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/jquery.validate.unobtrusive.min.js") %>"></script>
    
    <% using (Html.BeginForm()) { %>
        <%: Html.AntiForgeryToken() %>
        <%: Html.ValidationSummary(true) %>
    
        <fieldset>
            <legend>RenderTemplateElements</legend>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.guid) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.guid) %>
                <%: Html.ValidationMessageFor(model => model.guid) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.rendertemplateguid) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.rendertemplateguid) %>
                <%: Html.ValidationMessageFor(model => model.rendertemplateguid) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.typetext) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.typetext) %>
                <%: Html.ValidationMessageFor(model => model.typetext) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.complex) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.complex) %>
                <%: Html.ValidationMessageFor(model => model.complex) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.filename) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.filename) %>
                <%: Html.ValidationMessageFor(model => model.filename) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.starttime) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.starttime) %>
                <%: Html.ValidationMessageFor(model => model.starttime) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.stoptime) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.stoptime) %>
                <%: Html.ValidationMessageFor(model => model.stoptime) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.width) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.width) %>
                <%: Html.ValidationMessageFor(model => model.width) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.height) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.height) %>
                <%: Html.ValidationMessageFor(model => model.height) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.minlength) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.minlength) %>
                <%: Html.ValidationMessageFor(model => model.minlength) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.maxlength) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.maxlength) %>
                <%: Html.ValidationMessageFor(model => model.maxlength) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.group) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.group) %>
                <%: Html.ValidationMessageFor(model => model.group) %>
            </div>
    
            <div class="editor-label">
                <%: Html.LabelFor(model => model.active) %>
            </div>
            <div class="editor-field">
                <%: Html.EditorFor(model => model.active) %>
                <%: Html.ValidationMessageFor(model => model.active) %>
            </div>
    
            <p>
                <input type="submit" value="Create" />
            </p>
        </fieldset>
    <% } %>
    
    <div>
        <%: Html.ActionLink("Back to List", "Index") %>
    </div>
</body>
</html>
