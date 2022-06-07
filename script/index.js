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
  fetch("./mocks/INFORMATIVES_TOP.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructInformativesTop(json);
      console.log(json);
    });
}

function requestMenu() {
  fetch("./mocks/MENU.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const sizeWindow = window.innerWidth;

      if (sizeWindow >= 1024) {
        constructMenuDesktop(json.menu);
      } else {
        constructMenuMobile(json.menu);
      }
    });
}

informativesTop();
requestMenu();

function constructMenuDesktop(json) {
  let structureMenu = "";

  const $containerMenu = document.querySelector(".menu__nav");

  for (const menu of json) {
    structureMenu += `
    <li class="menu__nav-wrapper" >
      <a href="${menu.url}" class="menu__nav-department-list--item">${
      menu.name
    }</a>
    ${
      menu.children
        ? `
      <ul class="menu__nav-wrapper-category ${
        menu.name === `Turmalina` ? `menu__nav-wrapper-category--color` : ``
      } ${menu.name === `Outros` ? `menu__nav-wrapper-scrollbar` : ``}">
        ${menu.children.map(function (child) {
          return `
          <li class="menu__nav-wrapper menu__nav-wrapper--category-item">
            <a href=${
              child.url
            } class="menu__nav-category-list ${menu.name === `Turmalina` ? `menu__nav-category-list--color` : ``}">${child.name}</a>
            ${
              child.children
                ? `
              <ul class=" menu__nav-wrapper-subcategory">
              ${child.children.map(function (subchild) {
                return `
                <li class="menu__nav-wrapper subcategory-list">
                  <a href=${subchild.url} class="menu__nav-category-list">${subchild.name}</a>
                </li>
                `;
              })}
              </ul>`
                : ``
            }
          </li>
          `;
        })}
      </ul>`
        : ``
    }
    </li>`;
  }
  $containerMenu.innerHTML = structureMenu;
}

function handlNavMenuMobile() {
  const $menuMobileArrowDepartments =
    document.querySelectorAll(".department-arrow");
  const $menuMobileCategories = document.querySelectorAll(
    ".menu__mobile-nav-category"
  );
  const $menuMobileArrowCategories = document.querySelectorAll(
    ".menu__mobile-nav-category--arrow"
  );
  const $menuMobileSubcategories = document.querySelectorAll(
    ".menu__mobile-nav-subcategory"
  );

  $menuMobileArrowDepartments.forEach(function ($mobileDepartment, index) {
    $mobileDepartment.addEventListener("click", function () {
      for (let i = 0; i < $menuMobileCategories.length; i++) {
        const $mobileCategory = $menuMobileCategories[index];
        $mobileCategory.classList.toggle("active-category");
        $menuMobileArrowDepartments[index].classList.toggle(
          "menu__mobile-nav--arrow-active"
        );
      }
    });
  });

  $menuMobileArrowCategories.forEach(function ($mobileCategory, index) {
    $mobileCategory.addEventListener("click", function () {
      for (let i = 0; i < $menuMobileSubcategories.length; i++) {
        const $mobileSubcategory = $menuMobileSubcategories[index];
        $menuMobileArrowCategories[index].classList.toggle("active");
        $mobileSubcategory.classList.toggle("active-subcategory");
      }
    });
  });
}

function constructMenuMobile(json) {
  let structureMenuMobile = "";
  const $containerMenuMobile = document.querySelector(
    ".menu__mobile-nav-department"
  );

  json.map(function (menu) {
    structureMenuMobile += `
    <li class="menu__mobile-nav-department--items ${
      menu.children ? `menu__department-with-category` : ``
    }">
      <div class="menu__mobile-nav-wrapper menu__mobile-nav-wrapper-department">
        <a href=${
          menu.url
        } class="menu__mobile-nav--item menu__mobile-nav-department--item">${
      menu.name
    }</a>
        ${
          menu.children
            ? `
        <span class="menu__mobile-nav--arrow department-arrow">
          <img class="menu__mobile-nav-department--arrow" src="./assets/img/arrow-down-department.png"
          alt="ícone de seta apontando para baixo"
          title="ícone de seta baixo em branco, composto por duas linhas diagonais">
        </span>
        `
            : ``
        }
      </div>
      ${
        menu.children
          ? `
      <ul class="menu__mobile-nav-category ">
      ${menu.children.map(function (child) {
        return `
        <li class="menu__mobile-nav-category--items">
          <div class="menu__mobile-nav-wrapper menu__mobile-nav-wrapper-category">
            <a href=${
              child.url
            } class="menu__mobile-nav--item menu__mobile-nav-category--item">${child.name}</a>
            ${
              child.children
                ? `
              <span class="menu__mobile-nav-category--arrow category-arrow">
              <img class="menu__mobile-nav-category--arrow-icon" src="./assets/img/arrow-down-category.png"
              alt="ícone de seta apontando para baixo"
              title="ícone de seta baixo em branco, composto por duas linhas diagonais">
              </span>
            `
                : ``
            }
          </div>
          ${
            child.children
              ? `
              <ul class=" menu__mobile-nav-subcategory">
            ${child.children.map(function (subchild) {
              return `
              <li class="menu__mobile-nav-subcategory--items">
                <div class="menu__mobile-nav-wrapper menu__mobile-nav-wrapper-subcategory">
                  <a href=${subchild.url} class="menu__mobile-nav--item menu__mobile-nav-subcategory--item">${subchild.name}</a>
                </div>
              </li>
              `;
            })}
            </ul>`
              : ``
          }
        </li>
        `;
      })}
      </ul>
      `
          : ``
      }
  </li>
    `;
  });
  $containerMenuMobile.innerHTML = structureMenuMobile;

  handlNavMenuMobile();
}

//* MENU MOBILE - OPEN AND CLOSE  */
function handlToggleMenu() {
  const $openMenuMobile = document.querySelector(".menu__hamburger");
  const $menuMobile = document.querySelector(".menu__mobile");
  const $closeMenuMobile = document.querySelector(".close-menu");
  const $closeMenuMobileIcon = document.querySelector(
    ".menu__mobile-close--button"
  );

  $openMenuMobile.addEventListener("click", function () {
    $menuMobile.classList.add("active");
  });

  $closeMenuMobile.addEventListener("click", function () {
    $menuMobile.classList.remove("active");
  });

  $closeMenuMobileIcon.addEventListener("click", function () {
    $menuMobile.classList.remove("active");
  });
}

handlToggleMenu();
