function constructInformativesTop(json) {
  const $headerInformation = document.querySelector(
    ".header__informations-top-wrap"
  );

  for (completeText of json) {
    const createSpan = document.createElement("span");
    $headerInformation.innerHTML += `
      <span class="header__informations-top--text${
        completeText.firstBoldType ? "-highlight" : ""
      }">${completeText.text}
        <strong class="header__informations-top--text${
          completeText.firstBoldType === false ? "-highlight" : "-margin"
        }">${completeText.bold}</strong>
        </strong>
      </span>
    `;
  }
}

function informativesTop() {
  fetch("./assets/mocks/INFORMATIVES_TOP.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructInformativesTop(json);
      console.log(json);
    });
}

function requestMenuDesktop() {
  fetch("./assets/mocks/MENU.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructMenuDesktop(json.menu);
    });
}

function constructMenuDesktop(json) {
  let strucureMenu = "";

  const $containerMenu = document.querySelector(".menu__nav");

  console.log(json);

  for (const menu of json) {
    console.log("*", menu);
    console.log("->", menu.children);

    strucureMenu += `
    <li class="menu__nav-wrapper" >
      <a href="${menu.url}" class="menu__nav-department-list--item">${menu.name}</a>
    `;

    if (menu.category) {
      let i = 0;
      menu.children.forEach(function () {
        strucureMenu += `<ul class="menu__nav-wrapper-category">
          <li class="menu__nav-wrapper">
            <a href="index.html" class="menu__nav-category-list">${menu.children[1].name}</a>
          </li> 
        </ul>`;
        i++;
      });
    } else {
      strucureMenu += `</li>`;
    }

    console.log;
  }

  $containerMenu.innerHTML = strucureMenu;
}

informativesTop();
// requestMenuDesktop();
