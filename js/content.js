var formatNr = input => {
    // formats fi. 120000 to 120,000 (set the "," character below to "." to format as 120.000)
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(() => {
    $('section').addClass('loading');
    $.getJSON({url: "http://ip-api.com/json"}).done( ipInfo => {
        $.ajax({url: `https://corona.lmao.ninja/countries/${ipInfo.country.toLowerCase()}`}).done(
            data => {                
                if (data) {
                    $(".countryInfo").text(`Corona cases in ${ipInfo.country}`);
                    $("#confirmed").text(`${formatNr(data.cases)}`);
                    $("#confirmedtoday").text(`${formatNr(data.todayCases)}`);
                    $("#recovered").text(`${formatNr(data.recovered)}`);
                    $("#deaths").text(`${formatNr(data.deaths)}`);
                    $("#deathstoday").text(`${formatNr(data.todayDeaths)}`);
                    $("#deathrate").text(`${(Math.round((data.deaths / data.cases) * 10000) / 100) + " %"}`);
                } else {
                    $("div").hide();
                    $(".countryInfo").text(`Corona cases in ${ipInfo.country} could not be retrieved`);
                }
                $('section').removeClass('loading');
            } 
        );
    });    
});