function constructInformativesTop(json) {
const $headerInformation = document.querySelector(".header__informations-top-wrap")

  for (completeText of json) {
    const createSpan = document.createElement('span')
    $headerInformation.innerHTML += `
      <span class="header__informations-top--text">
          ${completeText.text}
        <strong class="header__informations-top--highlight">${completeText.bold}</strong>
        </strong>
      </span>
    `
  }
}

function informativesTop() {
  fetch("./assets/mocks/INFORMATIVES_TOP.json").then(function (response){
    return response.json()
  }).then(function (json){
    constructInformativesTop(json)
    console.log(json)
  })
}

informativesTop()
