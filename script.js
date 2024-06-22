import axios from "axios";

const videos = document.querySelector(".videos__container");
const searchBar = document.querySelector(".pesquisar__input");
const buttonType = document.querySelectorAll(".superior__item");

async function apiSearch() {

  const urlForAPI = () => {
    if (import.meta.env.PROD) return "https://gist.githubusercontent.com/RianDelou/8366c450ea7ead4d1721c04474a54cca/raw/af19840bda3bb1e29826aa7c47e48a11d649f6ec/videos.txt" // se for TRUE estamos no ambiente de produção, entao use esse link
    else return "http://localhost:3000/videos" // se nao, use o JSON SERVER
  }

  try {
    const busca = await axios.get(urlForAPI());
    const resposta = await busca.data;
    resposta.forEach((element) => {
      videos.innerHTML += `
        <li class = "videos__item">
            <iframe src="${element.url}" title="${element.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${element.imagem}">
                    <h3 class="titulo-video">${element.titulo}</h3>
                    <p class"titulo-canal">${element.descricao}</p>
                    <p class="categoria" hidden>${element.categoria}</p>
                </div>
        </li>`;
    });
  } catch (error) {
    videos.innerHTML = `<p> houve um erro ao carregar os vídeos --> ${error}.`;
  }
}
function searchForInput() {
  const videosList = document.querySelectorAll(".videos__item"); // isso não pode ser criado no inicio do código, pois é apenas adicionado com o script, ou seja, eu tenh0 que declarar isso depois disso ser adicionado pelo script

  if (searchBar.value) {
    videosList.forEach((element) => {
      let title = element
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let valueInput = searchBar.value.toLowerCase();

      if (title.includes(valueInput)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
}

apiSearch();

searchBar.addEventListener("input", searchForInput);

buttonType.forEach((element) => {
  let type = element.getAttribute("name").toLowerCase();
  element.addEventListener("click", () => {
    searchForType(type);
  });
});

function searchForType(type) {
  const videosList = document.querySelectorAll(".videos__item"); // isso não pode ser criado no inicio do código, pois é apenas adicionado com o script, ou seja, eu tenh0 que declarar isso depois disso ser adicionado pelo script
  videosList.forEach((element) => {
    let typeVideo = element
      .querySelector(".categoria")
      .textContent.toLowerCase();

    if (typeVideo.includes(type) || type == "tudo") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}