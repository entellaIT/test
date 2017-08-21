<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <script type="text/javascript" src="jwplayer/jwplayer.js"></script>
    <script>jwplayer.key = "4e1IQv0G6DJhYqsqFOup2euppOrMEKkehSVwuA==";</script>
</asp:Content>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <h3>Timeline Videos</h3>
    <div id="thePlayer"></div>
       
    <div class="actionIcon text-left">
        <div class="btn-group">
            <button type="button" class="btn border-flat btn-black rightborder" onclick="play();" aria-label="Left Align"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
            <button type="button" class="btn border-flat btn-black rightborder" onclick="jwplayer('thePlayer').pause();" aria-label="Center Align"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></button>
            <button type="button" class="btn border-flat btn-black rightborder" onclick="jwplayer('thePlayer').stop();" aria-label="Right Align"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
        </div>
    </div>
    <br />
    <br />
   <%-- <div class="series_graphic"></div>--%>
     <div id="thePlayer1"></div>
     <div class="actionIcon text-left">
        <div class="btn-group">
            <button type="button" class="btn border-flat btn-black rightborder" onclick="play1();" aria-label="Left Align"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
            <button type="button" class="btn border-flat btn-black rightborder" onclick="jwplayer('thePlayer1').pause();" aria-label="Center Align"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></button>
            <button type="button" class="btn border-flat btn-black rightborder" onclick="jwplayer('thePlayer1').stop();" aria-label="Right Align"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
        </div>
    </div>
    <script type="text/javascript">
        //$(".series_graphic").replaceWith('<div id="player-1">Loading</div>');
        jwplayer('thePlayer').setup({
            flashplayer: '/jwplayer/jwplayer.flash.swf',
            file: '/videos/SampleVideo.mp4',
            id: 'playerid',
            height: "120",
            width: "200",
            controls: 'false',
            autostart: 'false',
            primary: 'html5',            
            icons: 'true',           
            events: {
                onReady: function (event) {
                    jwplayer('thePlayer').seek(1).onTime(function (event) {
                        if (event.position > 1) {
                            jwplayer('thePlayer').pause();
                            /// alert("the video is finished!");
                        }
                    });
                }                
            }
        
        });

        jwplayer('thePlayer1').setup({
            flashplayer: '/jwplayer/jwplayer.flash.swf',
            file: '/videos/Test.mp4',
            id: 'playerid',
            height: "120",
            width: "200",
            controls: 'false',
            autostart: 'false',
            primary: 'html5',            
            icons: 'true',
            events: {
                onReady: function (event) {
                    jwplayer('thePlayer1').seek(1).onTime(function (event) {
                        if (event.position > 1) {
                            jwplayer('thePlayer1').pause();
                            // alert("the video is finished!");
                        }
                    });
                }                
            }
        });


        function play() {
            debugger;
            alert("play start");
            var startpostion = 5;
            var endpostion = 19;
         //   jwplayer('thePlayer').play();
            jwplayer().play().seek(startpostion).onTime(function (event) {
                if (event.position > endpostion) {
                    jwplayer().stop();
                    alert("the video is finished!");
                }
            });
        }
        //function pause() {
        //    jwplayer('thePlayer').addButton("/Images/pause.png", "Pause", function () {
        //        jwplayer().pause();
        //    }, "Pause")
        //}
        //function stop() {
        //    jwplayer('thePlayer').addButton("/Images/playbtn.png", "Stop", function () {
        //        jwplayer().stop()
        //    }, "Stop")
        //}


        function play1() {
            var startpostion = 4;
            var endpostion = 15;
            jwplayer('thePlayer1').play();
            jwplayer('thePlayer1').seek(startpostion).onTime(function (event) {
                if (event.position > endpostion) {
                    jwplayer().stop();
                    //alert("the video is finished!");
                }
            });
        }
        //function pause1() {
        //    jwplayer('thePlayer1').addButton("/Images/pause.png", "Pause", function () {
        //        jwplayer().pause();
        //    }, "Pause")
        //}
        //function stop1() {
        //    jwplayer('thePlayer1').addButton("/Images/playbtn.png", "Stop", function () {
        //        jwplayer().stop()
        //    }, "Stop")
        //}

    </script>
</asp:Content>
