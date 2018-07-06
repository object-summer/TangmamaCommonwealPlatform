/**
 * author:summer
 */
$(function(){
    var progress=$(".over").attr("data-width");
    $(".over").animate({
        "width":progress
    },3000,'swing')
    $(".donationBtn").on("click", function(){
        $("#dialog").modal("show");
    })

    $(".item").on("click", function(){
        $(".item").removeClass("select");
        $(this).addClass("select");
    })
//成功项目切换
    $(".left").on("click", function(){
        $(".left").addClass("select");
        $(".right").removeClass("select");
        $(".raising-container").css({
            "opacity":"1",
            "z-index":"2"
        });
        $(".loveRank-container").css({
            "opacity":"0",
             "z-index":"1"
        });
    })

    $(".right").on("click", function(){
        $(".right").addClass("select");
        $(".left").removeClass("select");
       $(".loveRank-container").css({
            "opacity":"1",
            "z-index":"2"
        });
        $(".raising-container").css({
            "opacity":"0",
             "z-index":"1"
        });
    })
})