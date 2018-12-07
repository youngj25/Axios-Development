var socket, Ax = io('/ax', {forceNew:true});

function setup() {
	 socket = io.connect('http://localhost:9000');
        
		 //Stops the Game, it's Over
	 Ax.on('Get Data', function(data){
		 document.getElementById("salesNumber").innerHTML =" Number of Real Estates Sales Between 2011-2014: "+data.count;
		 console.log(data);
	 });
			
			
			
			
	 document.getElementById("clickMe").addEventListener("click", function(){
		 console.log("Sent");
		 Ax.emit('Get Data');
	 });
	
		
}
window.onload = setup;	