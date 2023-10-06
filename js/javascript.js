(function readyJS(win,doc){
		
	if(doc.querySelectorAll('.deletar')){
		
		
		for(let i=0; i<doc.querySelectorAll('.deletar').length; i++){
			
			
			//console.log(i);
			
			doc.querySelectorAll('.deletar')[i].addEventListener('click',function(event){
				
				if(confirm("Confirmação de exclusão de dado")){
					return true;
				}else{
					event.preventDefault();
				};
			});
			
		}
}

})(window,document);


