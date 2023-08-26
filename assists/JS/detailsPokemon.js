function displayPokemonDetails(pokemonId) {
    const pokemon = pokeApi.getPokemonById(pokemonId);
    const detailsCard = document.getElementById('pokemonDetailsCard');
    detailsCard.style.display = 'block';
    
    pokemon.then((pokemonDetails) => {
        fillDetailsCard(pokemonDetails)
        statsPokemon(pokemonDetails);
    });

    const closeButton = document.getElementById('closeDetailsButton');
    closeButton.addEventListener('click', () => {
        detailsCard.style.display = 'none';
    });
}

function fillDetailsCard(pokemonDetails) {
    const nameElement = document.getElementById('pokemonName');
    const numberElement = document.getElementById('pokemonNumber');
    const typesElement = document.getElementById('pokemonTypes');
    const imageElement = document.getElementById('pokemonImage');
    const detailsCard = document.getElementById('pokemonDetailsCard');
    detailsCard.classList = `pokemon-details-card ${pokemonDetails.type}`;

    nameElement.textContent = pokemonDetails.name;
    numberElement.textContent = `#${pokemonDetails.number}`;
    typesElement.innerHTML = pokemonDetails.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
    imageElement.src = pokemonDetails.photo;
}


function statsPokemon(pokemonDetails) {
    //console.log(pokemonDetails);

    const statsList = document.getElementById('pokemonStats');
    statsList.innerHTML = '';

    pokemonDetails.stats.forEach((stat) => {
        const statItem = document.createElement('li');
        statItem.textContent = `${stat.name}: ${stat.base_stat}`;
        statsList.appendChild(statItem);
    });

    const abilitiesList = document.getElementById('pokemonAbilities');
    abilitiesList.innerHTML = '';

    pokemonDetails.abilities.forEach((ability) => {
        const abilityItem = document.createElement('li');
        abilityItem.textContent = ability;
        abilitiesList.appendChild(abilityItem);
    });

    const experienceElement = document.getElementById('pokemonExperience');
    experienceElement.textContent = `Base Experience: ${pokemonDetails.base_experience}`;

    //Chame a função para criar o gráfico de estatísticas
   createStatsChart(pokemonDetails.stats);
}

function createStatsChart(stats) {
    const statNames = stats.map(stat => stat.name);
    const statValues = stats.map(stat => stat.base_stat);
    // console.log(statNames, statValues)

    const ctx = document.getElementById('statsChart').getContext('2d');


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statNames,
            datasets: [{
                label: 'Base Stats',
                data: statValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}
