var img_edge = "300px";
$(document).ready(function()
{
	$('.JSUploadPreview').each(function()
	{
	    initProcess($(this));   //要用each才不會同時作用
	});

});
function initProcess(previewDiv)
{
	var input = previewDiv.find("input");
	var img = previewDiv.find("img");
	var div = previewDiv.find("div");
	initImgCSS(img);
	initCancelCSS(div);
	input.change(function()//可以偵測到input的file改變
	{
		readURI(this, img, div);
	});
	img.load(function()
	{
        div.css("left", minus20px(img.css("width")));   //把cancel本身的寬度平移掉
        div.css("top", "-"+img.css("height"));
	    div.show();
    });
	div.click(function()
	{
        input.val(null);
        readURI(input, img, div);
	});
}
function initImgCSS(img) //設定預覽img的CSS
{
    img.css("max-height", img_edge);
    img.css("max-width", img_edge);
}
function initCancelCSS(div)  //設定預覽圖的取消
{
    div.css("z-index", "1");
    div.css("position", "relative");
    div.css("text-align", "center");
    div.css("width", "20px");
    div.css("height", "20px");
    div.css("background", "rgba(0, 0, 0, 0.7)");
    div.css("color", "#f00");
    div.css("cursor", "pointer");
}
function readURI(input, img, div) //可以讀到客戶端圖片檔案路徑
{
	if (input.files && input.files[0]) 
	{
	    var reader = new FileReader();
	    reader.onload = function (e) 
	    {
	        img.attr('src', e.target.result);
	        img.show();
	    }
	    reader.readAsDataURL(input.files[0]);
	}
	else
	{
		img.hide();
		div.hide();
	}
}
function minus20px(edge)
{
    var edgeInt = parseInt(edge.substring(0, edge.length - 2));
    var newEdge = (edgeInt - 20).toString() + "px";
    return newEdge;
}