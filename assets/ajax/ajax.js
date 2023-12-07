$(function () {
    const response = $("#response");

    $.ajax({
        method: "GET",
        url: "https://apiv3.apifootball.com/?action=get_leagues&APIkey=d780e90873b4c9a24359187ed7105ce96a51627b2b3b4e41cc8a71b35582fee9",
        dataType: "json",
        success: function (data, status, xhr) {
            console.log("success");

            // Clear existing content in response element
            response.html("");

            // Check if data is an array
            if (Array.isArray(data)) {
                // Loop through the received data and create HTML for each league
                $.each(data, function (index, league) {
                    // Construct HTML for each league
                    const leagueHtml = `
                        <div class="my-4 text-center flex flex-col items-center justify-center">
                            <div class="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
                                <img class="mb-2 w-16 h-16 object-cover rounded-full" src="${league.league_logo}" alt="League Logo">
                                <p class="text-lg font-bold mb-2">${league.country_name}</p>
                                <p class="text-lg font-bold mb-2">${league.league_name}</p>
                                <p class="text-lg font-bold mb-4">${league.league_season}</p>
                                <img class="mb-4 w-16 h-16 object-cover rounded-full" src="${league.country_logo}" alt="Country Logo">
                            </div>
                        </div>
                    `;
                    
                    // Append HTML to the response element
                    response.append(leagueHtml);
                });
            } else {
                console.log("Invalid data format");
            }
        },
        error: function (xhr, status, error) {
            console.log("Error:", error);
        }
    });
});
