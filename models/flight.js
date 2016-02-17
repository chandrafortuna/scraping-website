var mongoose = require('mongoose');

var flightSchema = mongoose.Schema({
    flightNo: String,
    origCity: Number,
    destCity: Number,
    cabinClass: String,
    date: Date,
    fare: Number,
    directFlight: boolean,
    crawledDate: Date
});

var Flight = mongoose.model('Flight', flightSchema);




// http://booknow.jetstar.com/LowFareFinder.aspx?culture=id-ID&RadioButtonMarketStructure=RoundTrip&Origin1=CGK&Destination1=HKT&Day1=10&MonthYear1=2016-03&Origin2=HKT&Destination2=CGK&Day2=25&MonthYear2=2016-02&ADT=1&CHD=0&INFANT=0&AutoSubmit=Y