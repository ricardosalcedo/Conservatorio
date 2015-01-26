$(document).ready(function(){
	var output = $('#contents');

	$.ajax({
		url: 'http://127.0.0.1:8888/Conservatorio/connect.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
		    console.log(status);
		    if(data != undefined && data.post != undefined){
    			$.each(data, function(i,item){
    				var landmark = '<br><br><a href="#page7" class="ui-btn ui-btn-inline" id="not-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
    				+item.Nombre+'</span></div><div id="imgnot" src="../img/'+item.Foto+'"></div>';
    				
    				output.append(landmark);
    			});
		    }
		},
		error: function(){
			alert('Hubo un error al cargar los datos');
		}
	});
});