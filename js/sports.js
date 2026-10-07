async function getSportsData() {
    var sportsApiKey = 'bcd495c361e96ccce459ebee06dbfc62';
    var sportsApiUrl = "https://v3.football.api-sports.io/fixtures?live=all&timezone=Europe/London";
    
    var myHeaders = new Headers();
    myHeaders.append("x-apisports-key", sportsApiKey);
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        var response = await fetch(sportsApiUrl, requestOptions);
        var data = await response.json();

        var container = document.querySelector('#live-matches');
        if (!container) return;

        container.innerHTML = '<h4 class="mb-3 display-5 text-primary">Live Matches</h4>';

        if (!data.response || data.response.length === 0) {
            container.innerHTML += `
                <div class="alert alert-light text-muted border my-3">
                    <small>لا توجد مباريات جارية حالياً</small>
                </div>`;
            return;
        }

        var limit = Math.min(data.response.length, 5);
        for (var i = 0; i < limit; i++) {
            var match = data.response[i];
            
            var matchRow = document.createElement('div');
            matchRow.classList.add('row', 'align-items-center', 'mb-3', 'pb-2', 'border-bottom');

            var matchData = `
                <div class="col-12 text-start mb-1">
                    <small class="text-muted fw-bold">
                        <img src="${match.league.logo}" style="width: 16px;" alt=""> ${match.league.name}
                    </small>
                    <span class="badge bg-danger float-end">${match.fixture.status.elapsed}'</span>
                </div>
                <div class="col-4 text-center px-1">
                    <img src="${match.teams.home.logo}" style="width: 24px;" alt="">
                    <small class="d-block text-truncate fw-semibold" style="font-size: 0.8rem">${match.teams.home.name}</small>
                </div>
                <div class="col-4 text-center fw-bold fs-6">
                    ${match.goals.home ?? 0} - ${match.goals.away ?? 0}
                </div>
                <div class="col-4 text-center px-1">
                    <img src="${match.teams.away.logo}" style="width: 24px;" alt="">
                    <small class="d-block text-truncate fw-semibold" style="font-size: 0.8rem">${match.teams.away.name}</small>
                </div>
            `;

            matchRow.innerHTML = matchData;
            container.appendChild(matchRow);
        }
    } catch (error) {
        console.error('Error in getSportsData:', error);
    }
}