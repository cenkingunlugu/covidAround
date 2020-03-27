var formatNr = input => {
    // formats fi. 120000 to 120,000 (set the "," character below to "." to format as 120.000)
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(() => {
    $('.covid-around section').addClass('loading');
    $.getJSON({url: "http://ip-api.com/json"}).done( ipInfo => {
        $.ajax({url: `https://corona.lmao.ninja/countries/${ipInfo.country.toLowerCase()}`}).done(
            data => {                
                if (data) {
                    $(".covid-around .countryInfo").text(`Corona cases in ${ipInfo.country}`);
                    $(".covid-around #confirmed").text(`${formatNr(data.cases)}`);
                    $(".covid-around #confirmedtoday").text(`${formatNr(data.todayCases)}`);
                    $(".covid-around #recovered").text(`${formatNr(data.recovered)}`);
                    $(".covid-around #deaths").text(`${formatNr(data.deaths)}`);
                    $(".covid-around #deathstoday").text(`${formatNr(data.todayDeaths)}`);
                    $(".covid-around #deathrate").text(`${(Math.round((data.deaths / data.cases) * 10000) / 100) + " %"}`);
                } else {
                    $(".covid-around div").hide();
                    $(".covid-around .countryInfo").text(`Corona cases in ${ipInfo.country} could not be retrieved`);
                }
                $('.covid-around section').removeClass('loading');
            } 
        );
    });    
});