const API_KEY = '8a7d76f827c14a429074d257ecbfed64';

document.getElementById('leagueSelect').addEventListener('change', function () {
    const leagueCode = this.value;
    if (leagueCode) {
        fetchStandings(leagueCode);
    }
});

async function fetchStandings(leagueCode) {
    const spinner = document.getElementById('loadingSpinner');
    const standingsContainer = document.getElementById('standingsContainer');

    spinner.classList.remove('d-none');
    standingsContainer.innerHTML = '';

    // طلب مباشر إلى API كرة القدم
    const apiUrl = `https://api.football-data.org/v4/competitions/${leagueCode}/standings`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`خطأ في الـ API (كود ${response.status})`);
        }

        const data = await response.json();
        spinner.classList.add('d-none');

        if (data.standings && data.standings.length > 0) {
            const standingsTable = data.standings[0].table;
            renderApiTable(standingsTable, data.competition.name);
        } else {
            standingsContainer.innerHTML = `<div class="alert alert-warning text-center">لا يوجد جدول ترتيب متوفر حالياً لهذه البطولة.</div>`;
        }

    } catch (error) {
        console.error('API Error:', error);
        spinner.classList.add('d-none');
        standingsContainer.innerHTML = `
            <div class="alert alert-danger text-center">
                تعذر جلب البيانات مباشرة من الـ API (خطأ قيود المتصفح CORS). 
                <br>
                <small class="text-muted">نصيحة: يمكنك تجربة الملحق Extension المسمى (Allow CORS) في متصفحك عند التطوير المحلي.</small>
            </div>
        `;
    }
}

function renderApiTable(tableData, competitionName) {
    const standingsContainer = document.getElementById('standingsContainer');

    let tableHTML = `
        <h3 class="text-center text-secondary mb-3 fs-5">${competitionName}</h3>
        <table class="table table-hover table-striped align-middle table-custom mt-2">
            <thead>
                <tr>
                    <th style="width: 8%">الترتيب</th>
                    <th style="width: 32%" class="text-start pe-3">الفريق</th>
                    <th style="width: 10%">لعب</th>
                    <th style="width: 10%">فاز</th>
                    <th style="width: 10%">تعادل</th>
                    <th style="width: 10%">خسر</th>
                    <th style="width: 10%">له / عليه</th>
                    <th style="width: 10%" class="bg-primary text-white">النقاط</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableData.forEach(row => {
        let rankClass = "rank-other";
        if (row.position === 1) rankClass = "rank-1";
        else if (row.position === 2) rankClass = "rank-2";
        else if (row.position === 3) rankClass = "rank-3";

        const teamLogo = row.team.crest ? `<img src="${row.team.crest}" alt="${row.team.name}" class="team-flag me-2">` : '';

        tableHTML += `
            <tr>
                <td><span class="rank-badge ${rankClass}">${row.position}</span></td>
                <td class="text-start fw-bold pe-3">${teamLogo} ${row.team.name}</td>
                <td>${row.playedGames}</td>
                <td class="text-success fw-bold">${row.won}</td>
                <td class="text-warning fw-bold">${row.draw}</td>
                <td class="text-danger fw-bold">${row.lost}</td>
                <td class="small dir-ltr">${row.goalsFor}:${row.goalsAgainst}</td>
                <td class="fw-bold fs-5 bg-light text-primary">${row.points}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    standingsContainer.innerHTML = tableHTML;
}