var socket, Ax = io('/ax', {forceNew:true});

function setup() {
	 socket = io.connect('http://localhost:9000');
        
	 //Insert Data from the Server
	 Ax.on('Get Data', function(data){
		 document.getElementById("salesNumber").innerHTML =" Number of Real Estates Sales Between "+document.getElementById("minYear").value+"-"+document.getElementById("maxYear").value+": "+data.count+" ("+Math.floor(data.count*1000/data.total)/10+"%)";
		 console.log(data); 
		 
		 var labels =[], dataValues = [], years=[];
		 for(var x = 0; x<data.table.length;x++){
			 labels.push(data.table[x].name);
			 dataValues.push(data.table[x].count);
			 years.push(data.table[x].year)
		 }
		 chart.config.data.labels = labels;
		 chart.config.data.datasets[0].data = dataValues;
		 chart.config.data.datasets[0].year = years;
		 chart.update();
	 });
			
	

	 var ctx = document.getElementById('myChart').getContext('2d');
	 var chart = new Chart(ctx, {
		 // The type of chart we want to create
		 type: 'bar',
		 // The data for our dataset
		 data: {
			 labels: [],
			 datasets: [{
				 label: "Monthly Sales:",
				 backgroundColor: 'rgb(132, 99, 255)',
				 borderColor: 'rgb(33, 33, 99)',
				 data: [],
			 }]
		 },

		 // Configuration options go here
		 options: {
			 tooltips: {
				 mode: 'index',
				 callbacks: {
					 // Use the footer callback to display the sum of the items showing in the tooltip
					 footer: function(tooltipItems, data) {
						var year = 0;

						 tooltipItems.forEach(function(tooltipItem) {
							 year = data.datasets[tooltipItem.datasetIndex].year[tooltipItem.index];
						 });
						 return 'Year: ' + year;
					 }
				 },
			 }
		 }
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
	 
	 //Line Buttons
	 document.getElementById("lineButton").addEventListener("click", function(){
		 console.log("Line Clicked");
		 chart.type = 'line';
		 chart.update();
	 });
	
	 //Bar Buttons
	 document.getElementById("barButton").addEventListener("click", function(){
		 console.log("Bar Clicked");
		 chart.type = 'bar';
		 chart.update();
	 });
		
}
window.onload = setup;	