$(document).ready(function() {

    var gallery = $("#gallery");
    var statusArea = $("#status");

    var imgWidth = 300;
    var imgHeight = 250;

    var datas = {};
    var option = {};

    option.url = "/src/assets/data/images.json";
    option.method = "get";
    option.dataType = "json";
    option.success = function(data, textStatus, xhr) {

        datas = data.imgs;
        galleryMaker(datas, imgWidth, imgHeight);

        $(window).on("resize", function() {
            galleryMaker(datas, imgWidth, imgHeight);
        })
    }
    option.error = function(jqXHR, textStatus, errorThrown) {

        var html = $("<li><li>");
        html.text(textStatus);
        $("#gallery").append(html);

    }

    $.ajax(option);

    function galleryMaker(datas, imgWidth, imgHeight) {
        var areaWidth = $("#wrap").width();
        var dataLength = datas.length;
        var horizonItem = Math.floor(areaWidth / imgWidth);
        var verticalItem = Math.ceil(dataLength / horizonItem);
        var spaceRemain = (areaWidth - (imgWidth * horizonItem)) - 20;
        var spacing = spaceRemain / horizonItem + 1;

        var liftPosition = imgWidth;
        var topPosition = spacing;

        console.log("갯수 : " + dataLength + "  가로 :" + horizonItem + " 세로 : " + verticalItem + " 여백" + spacing);

        for (var i = 0; i < dataLength; i++) {
            var ele = $("<li id=imgSrc" + i + "></li>");
            gallery.append(ele);
        }

        for (var i = 0; i < dataLength; i++) {

            var numbering = i % horizonItem;
            liftPosition = (imgWidth * numbering) + (spacing * (numbering + 1));

            if (0 == numbering && 0 < i) {
                topPosition = topPosition + imgHeight + spacing;
            }
            $("#imgSrc" + i).css({
                "width": imgWidth + "px",
                "height": imgHeight + "px",
                "left": liftPosition + "px",
                "top": topPosition + "px",
                "backgroundImage": "url(" + datas[i].location + ")",
                "backgroundRepeat": "no-repeat",
                "backgroundSize": "cover",
                "backgroundPosition": "center",
                "position": "absolute"
            });
            console.log(numbering + " " + liftPosition + " " + horizonItem + " " + verticalItem + " " + topPosition);
        }

    }
});