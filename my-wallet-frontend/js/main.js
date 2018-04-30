$(document).ready(function(){
    $('#sidebar a').click(function(){
        $('.active').removeClass('active');
        if($(this).attr('data-toggle') !== "collapse"){
            $(this).addClass("active");
            document.getElementById("content-title").innerHTML = $(this).text();
        }
    });
});