
var initPagination = function(){
    var itemPerPage = 8;
    var totalItem = $(".pagination .item").length;
    var totalPage = Math.ceil((totalItem / itemPerPage)); 
    var activePage = 1;
    var pagenum = "";

    // hide the rest of element
    $(".pagination .item:gt(" + (itemPerPage - 1) + ")").hide();

    // insert page numbers
    pagenum += '<li class="page-item prev-btn"><a href="#" class="page-link">Prev</a></li>';
    for(var i=1; i <= totalPage; i++){ 
        pagenum += '<li class="page-item page-num" data-page='+ i +'><a href="#" class="page-link">'+ i +'</a></li>'
    } 
    pagenum += '<li class="page-item next-btn"><a href="#" class="page-link">Next</a></li>';
    $('.pagination-btns').html(pagenum);

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
}   

