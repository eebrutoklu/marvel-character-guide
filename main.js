const marContainer = document.querySelector(".mar-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
const marvelCount = 30;

const bg_color = {
  "Enhanced Physical Abilities": "#306020",
  "Unknown Source": "#D3963A",
  "Mystical Supernatural Powers": "#683C6A",
};

// search input start
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});
searchInput.addEventListener("input", (e) => {
  // console.log(searchInput.value);
  const searchValue = searchInput.value.toLowerCase();
  const marvelNames = document.querySelectorAll(".mar-name");
  // console.log(marvelNames);
  marvelNames.forEach((marvelName) => {
    if (marvelName.innerHTML.toLocaleLowerCase().includes(searchValue)) {
      marvelName.parentElement.parentElement.style.display = "block";
    } else {
      marvelName.parentElement.parentElement.style.display = "none";
    }
  });
});

// search input end
const fetchMarvels = async () => {
  for (let i = 1; i <= marvelCount; i++) {
    await getMarvel(i);
  }
};

const getMarvel = async (id) => {
  const response = `./marvel.json`;
  const res = await fetch(response);
  const data = await res.json();
  createMarvelCard(id, data.marvel[id - 1]);
};

const createMarvelCard = (id, marvel) => {
  const marvelDiv = document.createElement("div");
  marvelDiv.classList.add("marvel");

  const marvelPowerLevel = marvel.power_level.toString().padStart(3, "0");
  const marvelElement = marvel.element.replace(/\s+/g, "");

  const marvelBg = bg_color[marvel.element];
  marvelDiv.style.backgroundColor = marvelBg;

  const marvelDivInnerHTML = `
    <div class="image-container border">
      <img src="./images/${id}.png" alt="first marvel character" />
    </div>
    <div class="mar-info">
      <h2 class="mar-name">${marvel.name}</h2>
      <div class="mar-ability">
        <i class="fa-solid fa-shield-halved"></i> ${marvel.ability}
      </div>
      <div class="mar-power">
        <i class="fa-solid fa-power-off"></i> ${marvelPowerLevel}
      </div>
      <div class="mar-type">
        <i class="fa-brands fa-uncharted"></i> ${marvel.element}
      </div>
    </div>`;

  marvelDiv.innerHTML = marvelDivInnerHTML;
  marContainer.appendChild(marvelDiv);
};

fetchMarvels();
