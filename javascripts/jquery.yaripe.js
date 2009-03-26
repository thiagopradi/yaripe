jQuery.fn.yaripe = function(url, objectName, attributeName) {
    var e = this;
    function clickFunction() {
        var oldValue = e.html();
        rails_authenticity_token = e.attr("token");

        switch(e.attr("field_type")) {
        case "textarea":
            var input = '<textarea  id="inplace_input" cols=' + e.attr("textarea_cols") + ' rows=' + e.attr("textarea_rows") + '>' + oldValue + ' </textarea>';
            break;
        case "select":
            var input ='<select id="inplace_input">';
            var arr = new Array();
            arr = e.attr("select_options").split(',');
            jQuery.each(arr, function() {
                input = input + '<option value="' + this + '">' +this + '</option>'
            });
            input = input + '</select>'
            break;
        case "date":
            input = e.attr("date_helper");
            break;
        default:
            var input = '<input id="inplace_input" type="text" value="' + oldValue + '">';
            break;
        }

        e.html('<form id="inplace" action="javascript:void(0)" style="display:inline;" onkeypress="cancelInPlaceEdit(event, this);">' + input + '<input name="submit" value="Save" type="submit"> <input name="cancel" id="cancel" type="button" value="Cancel"></form>');
        e.find("input")[0].select();
        e.unbind('click');

        $(this).find("#cancel").click(function(event){
            $("form#inplace").remove();
            e.html(oldValue);
            event.stopPropagation();
            e.bind('click',clickFunction);
        })

        e.find("form#inplace").submit(function(){
            var value = e.find("#inplace_input").val();
            var value1 = $("#inplace_input").val();
            var value2 = $("#inplace_input").next().val();
            var value3 = $("#inplace_input").next().next().val();
            e.html("saving...");

            if (e.attr("field_type") == "date") {
                var datavalue = "_method=put&"+objectName+"["+attributeName+"(1i)]="+ value1 + "&" + objectName+"["+attributeName+"(2i)]="+ value2 + "&" + objectName+"["+attributeName+"(3i)]="+ value3 + "&authenticity_token=" + rails_authenticity_token;
            } else {
                var datavalue = "_method=put&"+objectName+"["+attributeName+"]="+encodeURIComponent(value)+ "&authenticity_token="+ rails_authenticity_token;
            }

            jQuery.ajax({
                "url" : url+ ".json",
                "type" : "post",
                "data" : datavalue,
                "success" : function(result){
                    var array = eval('(' + result + ')' );
                    jQuery.each(array, function(i) {
                        element = i;
                    });
                    var data = array[element][attributeName];
                    if (e.attr("field_type") == "date") {
                        e.html(data.substr(5, 6) + "/" + data.substr(0, 4))
                    } else {
                        e.html(data); }
                    e.bind('click',clickFunction);
                }
            });
            return false;
        })
    }
    this.click(clickFunction);
}

    jQuery(function($){
        $(".yaripe").each(function(){
            var e = jQuery(this);
            var url; var obj; var attrib;
            url    = e.attr("rel")       ;
            obj    = e.attr("object")    || obj;
            attrib = e.attr("attribute") || attrib;
            e.yaripe(url, obj, attrib);
        });
    });
    
function cancelInPlaceEdit(e, form) {
   var kC  = (window.event) ?    // MSIE or Firefox?
              event.keyCode : e.keyCode;
   var Esc = (window.event) ?   
             27 : e.DOM_VK_ESCAPE // MSIE : Firefox
   if(kC==Esc)
   {
     jQuery("#cancel",form).click();
   }
}
