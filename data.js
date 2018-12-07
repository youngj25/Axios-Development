var socket, Ax = io('/ax', {forceNew:true});

function setup() {
	 socket = io.connect('http://localhost:9000');
        
	 //Insert Data from the Server
	 Ax.on('Get Data', function(data){
		 document.getElementById("salesNumber").innerHTML =" Number of Real Estates Sales Between "+document.getElementById("minYear").value+"-"+document.getElementById("maxYear").value+": "+data.count+" ("+Math.floor(data.count*1000/data.total)/10+"%)";
		 console.log(data);
		 
		 /**
			 name : null,
			 count: 0,
			 year: (min+x)	
		 **/
		 
		 
		 var labels =[], dataValues = [];
		 for(var x = 0; x<data.table.length;x++){
			 labels.push(data.table[x].name);
			 dataValues.push(data.table[x].count);
		 }
		 chart.config.data.labels = labels;
		 chart.config.data.datasets[0].data = dataValues;
		 console.log(chart);
		 chart.update();
	 });
			
	

	 var ctx = document.getElementById('myChart').getContext('2d');
	 var chart = new Chart(ctx, {
		 // The type of chart we want to create
		 type: 'line',
		 // The data for our dataset
		 data: {
			 labels: ["January", "February", "March", "April", "May", "June", "July"],
			 datasets: [{
				 label: "My First dataset",
				 backgroundColor: 'rgb(255, 99, 132)',
				 borderColor: 'rgb(255, 99, 132)',
				 data: [0, 10, 5, 2, 20, 30, 45],
			 }]
		 },

		 // Configuration options go here
		 options: {}
	 });
	 console.log(chart);
	 //Buttons
	 document.getElementById("clickMe").addEventListener("click", function(){
		 console.log("Sent");
		 var data = {
			 minYear : document.getElementById("minYear").value,
			 maxYear : document.getElementById("maxYear").value
		 }
		 console.log(data);
		 Ax.emit('Get Data',data);
	 });
	
		
}
window.onload = setup;	