$(function(){
var yArr=[];
var xArr=[];
var fromSymbol='';
var toSymbol='';
var startKey;
var yearforGraph='';
var url=`https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=EUR&to_symbol=USD&apikey=CRCM44NVB81BUDMU`;
$("#ControlSelect").change(function(){
    fromSymbol= parseCurrency();
    console.log(fromSymbol);
    });
$("#ControlSelect1").change(function(){
     toSymbol= parseCurrency1();
    console.log(toSymbol);
});
$("#ControlSelect3").change(function(){
    yearforGraph=$("#ControlSelect3").val();
   console.log(toSymbol);
});
$("#btnID").click(function(){
document.getElementById("myform").reset();
if(fromSymbol!==''&& toSymbol!==''&&yearforGraph!==''){
var i=parseInt(0);
$("#myDiv").css("display","block");
$("#diverr").css("display","block");
var url=`https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=CRCM44NVB81BUDMU`;

$.getJSON(url,function(data){
    //console.log(data);
var YEAR= new RegExp(yearforGraph);
$.each(data,function(key,val){
if(key==="Time Series FX (Monthly)"){
       console.log(val);
$.each(val,function(key1,val1){
startKey=key1;
if(YEAR.test(key1)){
i=i+1;
xArr.push(key1);
console.log(val1);
  $.each(val1,function(key2,val2){
  if(/close/.test(key2)){
  yArr.push(val2);
  }
  });
}

});
console.log(Array.from(yArr));
console.log(typeof yArr);
plottt(Array.from(yArr),Array.from(xArr));
}
});
if(i==0){
$("#diverr").html(`<p> <strong> Sorry!!! Data available only after ${startKey} </strong> </p>`);
$("#diverr").css("color","red");
$("#diverr").next().css("display","none");
}


});
}// End of the if that contains all the code
else{
$("#diverr").html(`<p> <strong> Enter All the parameters Please!!! </strong> </p>`);  
$("#diverr").css("color","red");
$("#diverr").css("font-size","large");
}
});// End of Button ID click function
function plottt(yr,xr){
$("#diverr").css("display","none");
var data1=[
{x:xr,
y:yr,
type: 'scatter'
}
];
Plotly.newPlot('myDiv', data1);
}
// Parse currency begins
function parseCurrency(){
    var x=$("#ControlSelect").val();
    return (x.slice(0, x.search(" ")));
}
function parseCurrency1(){
    var x=$("#ControlSelect1").val();
    return (x.slice(0, x.search(" ")));
     
}
})