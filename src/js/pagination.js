$(function(){
    var itemPerPage = 4;
    var totalItem = $(".pagination .item").length;
    var totalPage = Math.ceil((totalItem / itemPerPage)); 
    var activePage = 1;

    // hide the rest of element
    $(".pagination .item:gt(" + (itemPerPage - 1) + ")").hide();

    for(var i=totalPage; i >= 1; i--){ 
       $('.pagination-btns .prev-btn')
       .after('<li class="page-item page-num" data-page='+ i +'><a href="#" class="page-link">'+ i +'</a></li>');
    } 

    // set active to page 1 by default
    $(".page-item[data-page="+ activePage +"]").addClass("active");

    $(".pagination .page-item").on('click', function(){
        var currentBtn =  $(this);

        if(currentBtn.hasClass("next-btn")){
            if(activePage != totalPage){
                activePage++;
            }   
        }else if(currentBtn.hasClass("prev-btn")){
            if(activePage > 1){
                activePage--; 
            }            
        }else{
            activePage = $(this).attr("data-page");
        }
        
        var startItem = (activePage * itemPerPage) - 1;
        var endItem = (startItem - itemPerPage + 1);

        $(".pagination .item").show();
        $(".pagination .item:gt(" + startItem + ")").hide();
        $(".pagination .item:lt(" + endItem + ")").hide();

        $(this).siblings().removeClass("active"); 
        $(".page-num:nth-child("+ (parseInt(activePage) + 1) +")").addClass("active");

    });

});