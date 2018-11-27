$(function () {
    'use strict';
    $(document)
        .on('dragover', function (e) {
            e.preventDefault();
        })
        .on('drop', function (e) {
            e.preventDefault();
            var files = e.originalEvent.dataTransfer.files;
            
            if (files.length > 0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img></img>")
                            .load(function(){drawTheImage(this);})
                            .attr("src", e.target.result);
                };
                reader.readAsDataURL(files[0]);
            }
        });

  $("#canvasImage").click(function () {
        this.toBlob(
            function(blob){
                $("a").attr("href", URL.createObjectURL(blob));
            },
            "image/png"
        );
    });
/*
    $("#saveImage").click(function () {
        this.toBlob(
            function(blob){
                $("a").attr("href", URL.createObjectURL(blob));
            },
            "image/png"
        );
    });*/
    
    

});

function drawTheImage(img) {
    var cW = img.width, 
    cH = img.height;
    $("#canvasImage")
        .attr({ width: cW, height: cH });
    var ctx = $("#canvasImage")[0].getContext("2d");
    ctx.drawImage(img, 0, 0);


    
}
