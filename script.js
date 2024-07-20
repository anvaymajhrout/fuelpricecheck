const apiUrl = 'https://daily-fuel-prices-india.p.rapidapi.com/api';
const apiKey = 'Replace with your api key here';  

async function searchState() {
    const input = document.getElementById('stateSearch').value;
    const suggestions = document.getElementById('suggestions');

    if (input.length > 1) {
        try {
            const response = await fetch(apiUrl + '/states', {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "daily-fuel-prices-india.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            });
            const data = await response.json();
            suggestions.innerHTML = '';

            data.forEach(state => {
                if(state.toLowerCase().includes(input.toLowerCase())) {
                    let div = document.createElement('div');
                    div.textContent = state;
                    div.onclick = () => fetchPrice(state);
                    suggestions.appendChild(div);
                }
            });
        } catch (error) {
            console.error('Error fetching states:', error);
            suggestions.innerHTML = '<div>Failed to load data</div>';
        }
    } else {
        suggestions.innerHTML = '';
    }
}

async function fetchPrice(stateName) {
    const priceDisplay = document.getElementById('fuelPrice');
    try {
        const response = await fetch(`${apiUrl}/price/${stateName}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "daily-fuel-prices-india.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }
        });
        const { petrol, diesel } = await response.json();
        priceDisplay.textContent = `Petrol: ₹${petrol}, Diesel: ₹${diesel}`;
        document.getElementById('stateSearch').value = stateName;
        document.getElementById('suggestions').innerHTML = '';
    } catch (error) {
        console.error('Error fetching prices:', error);
        priceDisplay.textContent = 'Failed to fetch price';
    }
}
