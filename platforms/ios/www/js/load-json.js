$(document).ready(function(){
	var output = $('#contents');

	$.ajax({
		url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
		    console.log(status);
		    //if(data != undefined && data.post != undefined){
    			$.each(data, function(i,item){
    				var landmark = '<br><br><a href="#page7" class="ui-btn ui-btn-inline" id="not-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
    				+item.Nombre+'</span></div><img id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img>';
    				
    				output.append(landmark);
    			});
		    //}
		},
		error: function(){
			alert('Hubo un error al cargar los datos');
		}
	});
});