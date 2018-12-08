// Using express: http://expressjs.com/
var express = require('express');

//Webworker
//https://www.youtube.com/watch?v=SfS1xGMg2Qw

// Create the app
var app = express();
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 9000, listen);
console.log(new Date().toLocaleTimeString());

//Experiment with CPU
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
console.log("Number of CPU = " + numCPUs);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

////////////////////////////////////////////////////////////////
//Axios

var Ax = io.of('/ax'), AxData = [];
//https://flaviocopes.com/axios/const 
const axios = require('axios');


Ax.on('connection',function(socket){
	 
	 const getDeaths = async () => {
		 try {
			 return await axios.get('https://data.ct.gov/resource/5mzw-sjtu.json');
			 //return await axios.get('https://data.ct.gov/resource/hzu6-5ujw.json');
			 //return await axios.get('https://data.ct.gov/resource/nahi-zqrt.json')
			 //return await axios.get('https://data.ct.gov/resource/deaths.json')
			 //https://data.ct.gov/resource/wvv7-dnrt.json
			 
			 //https://data.ct.gov/Housing-and-Development/Real-Estate-Sales-By-Town-for-2011-2012-2013-2014/8udc-aepg
			 
		 }catch (error) {
			 console.error(error)
		 }
	 }
	 
	 const countDeaths = async () => {
		 const stats = await getDeaths()

		 if(stats){
		  
			 console.log(stats.data[0]);
			 //console.log(stats.data.length);
			 //console.log(Object.entries(stats.data).length);
			 AxData = stats.data;
			 var statsLength = stats.data.length;
			 //console.log("---");
			 //console.log(statsLength);
			 var results = 0, opioidsCount = 0;
			 var males = 0, females = 0;
			 /**
			 //Sex and Opioid
			 for(var x=0; x<statsLength; x++){
				 //console.log(stats.data[x].any_opioid);
				 if(stats.data[x].any_opioid == 'Y'){
					 if(stats.data[x].sex == 'Male')
						 males++;
					 
					 else if(stats.data[x].sex == 'Female')
						 females++;
					 
					 opioidsCount++;
				 }
			 }
			 **/
			// results =Math.floor(1000*males/opioidsCount)/10;
			 //console.log("Males overdose deaths with opioids: "+males+" / "+ opioidsCount+" ("+results+"%)");
			 //results =Math.floor(1000*females/opioidsCount)/10;
			 //console.log("Females overdose deaths with opioids: "+females+" / "+ opioidsCount+" ("+results+"%)");
			 //console.log();
			 
			 //var differentCity = 0;
			 /**
			 //Seasons
			 var winter = 0, spring = 0, summer = 0, fall = 0;
			 for(var x=0; x<statsLength; x++)
				 if(stats.data[x].any_opioid == 'Y'){
					 var date = new Date(stats.data[x].date);
					 var month = date.getMonth();
					 
					 if(month%11 <2)
						 winter++;
					 else if(month >= 2 && month <5)
						 spring++;
					 else if(month >= 5 && month <8)
						 summer++;
					 else if(month >= 8 && month <11)
						 fall++;
				 }
				 **/
				 
			 //results =Math.floor(1000*winter/opioidsCount)/10;
			// console.log("Overdosed with opioids Death in the Winter: "+winter+" / "+ opioidsCount+" ("+results+"%)");
			 //results =Math.floor(1000*spring/opioidsCount)/10;
			 //console.log("Overdosed with opioids Death in the Spring: "+spring+" / "+ opioidsCount+" ("+results+"%)");
			 //results =Math.floor(1000*summer/opioidsCount)/10;
			 //console.log("Overdosed with opioids Death in the Summer: "+summer+" / "+ opioidsCount+" ("+results+"%)");
			 //results =Math.floor(1000*fall/opioidsCount)/10;
			 //console.log("Overdosed with opioids Death in the Fall: "+fall+" / "+ opioidsCount+" ("+results+"%)");
		 }
	 }
	 
	 //Incase we have no data
	 if(AxData.length == 0){
		 countDeaths();
	 }
	
	 socket.on('Get Data', function(data) {
		 console.log("Data Request - Axios");
		 console.log(data);
		 var min= 0, max=0;
		 
		 //Incase the numbers are reversed
		 if(data.minYear < data.maxYear){
			 min = data.minYear;
			 max = data.maxYear;
		 }
		 else{
			 min = data.maxYear;
			 max = data.minYear;
		 }
		 
		 if(min <= 2000) min = 2000;
		 if(max >= 2020) max = 2020;
		 
		 var count = 0;
		 var dataTable=[];
		 //Filling the dataTable with Months between the MinYear and MaxYear
		 for(var x = 0; x<=(max-min); x++){
			 for(var y = 0; y <= 11; y++){
				 //Month variable
				 var month = {
					 name : null,
					 count: 0,
					 year: (min+x)					 
				 }
				 //Set the Month Name
				 if(y == 0) month.name = "January";
				 else if(y == 1) month.name = "February";
				 else if(y == 2) month.name = "March";
				 else if(y == 3) month.name = "April";
				 else if(y == 4) month.name = "May";
				 else if(y == 5) month.name = "June";
				 else if(y == 6) month.name = "July";
				 else if(y == 7) month.name = "August";
				 else if(y == 8) month.name = "September";
				 else if(y == 9) month.name = "October";
				 else if(y == 10) month.name = "November";
				 else if(y == 11) month.name = "December";
				 
				 dataTable.push(month);
			 }
			 
			 
		 }
		 
		 //Fill Data Table
		 for(var x = 0; x<AxData.length;x++){
			 var dataDate = new Date(AxData[x].daterecorded);
			 if(min <= dataDate.getFullYear() && dataDate.getFullYear() <= max){
				 //Data Table Increase Count
				 dataTable[(dataDate.getFullYear()-min)*12+dataDate.getMonth()].count+=1;
				 //Increase Count
				 count++;
			 }
		 }
		 
		 
		 
		 var data = {
			 total: AxData.length,
			 count: count,
			 table: dataTable
		 }
		 socket.emit('Get Data',data);
	 });
	
	 socket.on('disconnect', function() {
		 console.log("Left Axios");
	 });
	
});
	