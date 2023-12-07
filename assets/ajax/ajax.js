$(function () {
    const response = $("#response");
    const resultLimit = 5; // You can adjust this number as needed
    let currentPage = 1; // Initial page

    function displayData(data) {
        // Clear existing content in response element
        response.html("");

        // Check if data is an array
        if (Array.isArray(data)) {
            // Calculate the starting index and ending index for the current page
            const startIndex = (currentPage - 1) * resultLimit;
            const endIndex = startIndex + resultLimit;

            // Slice the array to get only the data for the current page
            const slicedData = data.slice(startIndex, endIndex);

            // Loop through the sliced data and create HTML for each league
            $.each(slicedData, function (index, league) {
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

            // Update pagination controls
            updatePaginationControls(data.length);
        } else {
            console.log("Invalid data format");
        }
    }

    function updatePaginationControls(totalItems) {
        const totalPages = Math.ceil(totalItems / resultLimit);

        // Add or remove pagination controls based on the total number of pages
        if (totalPages > 1) {
            // If there's more than one page, display pagination controls
            // You can customize this part based on your UI requirements
            const paginationControls = `
            <div class="my-4 flex items-center justify-between">
            <button 
                onclick="prevPage()" 
                class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                ${currentPage === 1 ? 'disabled' : ''}
            >
                Previous
            </button>
            <span class="text-gray-600">${currentPage} of ${totalPages}</span>
            <button 
                onclick="nextPage()" 
                class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                ${currentPage === totalPages ? 'disabled' : ''}
            >
                Next
            </button>
        </div>
                    `;
            response.append(paginationControls);
        }
    }

    // Function to go to the previous page
    window.prevPage = function () {
        if (currentPage > 1) {
            currentPage--;
            fetchDataAndDisplay();
        }
    };

    // Function to go to the next page
    window.nextPage = function () {
        // Assuming you want to fetch more data when going to the next page
        currentPage++;
        fetchDataAndDisplay();
    };

    function fetchDataAndDisplay() {
        // Make your AJAX request to get data
        $.ajax({
            method: "GET",
            url: "https://apiv3.apifootball.com/?action=get_leagues&APIkey=d780e90873b4c9a24359187ed7105ce96a51627b2b3b4e41cc8a71b35582fee9",
            dataType: "json",
            success: function (data, status, xhr) {
                console.log("success");
                displayData(data);
            },
            error: function (xhr, status, error) {
                console.log("Error:", error);
            }
        });
    }

    // Initial data display
    fetchDataAndDisplay();
});
