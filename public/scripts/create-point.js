const IBGE_API_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch(IBGE_API_URL)
    .then((res) => res.json())
    .then((ufs) => {
      for (const uf of ufs) {
        ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`;
      }
    });
}

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const ufID = event.target.value;
  const url = `${IBGE_API_URL}/${ufID}/municipios`;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

populateUFs();

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];
const collectedItems = document.querySelector('input[name="items"]');

function handleSelectedItem(event) {
  const itemLi = event.target;
  const itemID = itemLi.dataset.id;

  itemLi.classList.toggle("selected");

  const alreadySelected = selectedItems.findIndex((item) => item == itemID);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => item != itemID);
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemID);
  }
  collectedItems.value = selectedItems;
}
