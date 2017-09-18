$(document).ready(function() {
    
    var gallery = $("#gallery");

    var datas = {};
    var option = {};

    option.url = "/src/assets/data/images.json";
    option.method = "get";
    option.dataType = "json";
    option.success = function(data, textStatus, xhr) {

        datas = data.imgs;

        galleyMaker(datas);

    }
    option.error = function(jqXHR, textStatus, errorThrown) {

        var html = $("<li><li>");
        html.text(textStatus);
        $("#gallery").append(html);

    }

    $.ajax(option);
    
    function galleyMaker(datas) {
    
        for(var i = 0; i < datas.length; i++) {
            var ele = $("<li id=imgSrc"+i+"></li>");
            gallery.append(ele);
            $("#imgSrc"+i).css(
                {
                    "backgroundImage":"url("+datas[i].location+")", 
                    "backgroundRepeat":"no-repeat", 
                    "backgroundSize":"cover", 
                    "backgroundPosition":"center"
                }
            );
        }
    
    }

    var statusArea = $("#status");
    $(window).on("resize", function() {
        
        var winWidth = $(window).width();

        // statusArea.text("가능한 박스 겟수 : " + Math.floor(winWidth/300));
        statusArea.text( winWidth - (300 * Math.floor(winWidth/300)) + (5 * (Math.floor(winWidth/300)-1))/2 );

        for(var i = 0; i < datas.length; i++) {
            $("#imgSrc"+i).css({"left":300*i});
        }

    });

});