$(document).ready(function() {
    var dropbox = $(".dropbox");
    

    // dropbox hover styling
    dropbox.mouseover(function() {
        $(this).addClass("dropbox-hover");
        $(this).removeClass("dropbox-error");
    }).mouseout(function() {
        $(this).removeClass("dropbox-hover");
        $(this).removeClass("dropbox-error");
    });
    
    // dropbox drop functionality
    dropbox.bind('dragenter', function() {
        $(this).addClass("dropbox-hover");
        $(this).removeClass("dropbox-error");
        return false;
    });
    dropbox.bind('dragover', function() {
        return false;
    });
    
    // the actual drop
    dropbox.bind('drop', function(e) {
        var event = e.originalEvent;
        var data = event.dataTransfer;
        var files = data.files;
        
        // check files for image type
        var imageType = /image.*/;
        for(var i=0; i<files.length; i++) {
            if (!files[i].type.match(imageType)) {
                $(this).toggleClass("dropbox-error", 1000 );
                return false;
            }
        }
        
        // we have all the files we need
        console.log(files);
        add_data_urls(files);
        
        // scrollto
        $(document).scrollTop(350);
    
        return false;
    });
    
    // extract data url and add them to the list
    function add_data_urls(files) {
        // target
        var data_urls = $("#dataurls");
        // templates
        var div = $("<div />", {
                className: "data_url",
            }),
            h4 =  $("<h4 />"),
            img = $("<img />"),
            text = $("<textarea />");
        
        for(var i=0; i<files.length; i++) {
            var reader = new FileReader();
            
            var thumb = img.clone();
            var txt = text.clone();
            
            var d = div.clone()
                .append(thumb)
                .append(h4.clone()
                    .text(files[i].fileName))
                .append(txt);
                    
            d.appendTo(data_urls);
            
            reader.onload = (function(image, textarea) { 
                return function(e) {
                    var data = e.target.result;
                    console.log(data);
                    image.attr('src', data);
                    textarea.val(data);
                }
            })(thumb, txt);
            
            reader.readAsDataURL(files[i]);
        }
    }
});
