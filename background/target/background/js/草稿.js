function $domOfSth(text) {
    return $("<a href='#' class=''>"+text+"<span class=''></span></a>").on('click','.tags_closebtn',function() {
        console.log("");
    })
}

$("#xxx").append($domOfSth("ddd"));