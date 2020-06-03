const IBGE_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'


function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');

    fetch(IBGE_API_URL)
        .then(res => res.json())
        .then(ufs => {
            for (const uf of ufs) {

                ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`
            }

        })
}

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');
    const ufID = event.target.value;
    const url = `${IBGE_API_URL}/${ufID}/municipios`

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {

                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false;

        })
}

populateUFs()

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);