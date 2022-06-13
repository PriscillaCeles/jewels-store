function constructInformativesTop(json) {
  const $headerInformation = document.querySelector(
    ".header__informations-top-wrap"
  );

  for (completeText of json) {
    $headerInformation.innerHTML += `
      <span class="header__informations-top--text${
        completeText.firstBoldType ? "-highlight" : ""
      } swiper-slide">${completeText.text}
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
    });
}

informativesTop();


//#region MENU
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
              }).join('')}
              </ul>`
                : ``
            }
          </li>
          `;
        }).join('')}
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
            }).join('')}
            </ul>`
              : ``
          }
        </li>
        `;
      }).join('')}
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
//#endregion

//#region DEFERENTIALS
function constructDifferentials(information) {
  const $differentialsContainer = document.querySelector(".highlights__wrapper")

  information.map(function (info) {
    const containerDifferential = document.createElement("div")
    const iconDifferential = document.createElement("img")
    const textContainerDifferential = document.createElement("div")
    const strongDifferential = document.createElement("strong")
    const spanDifferential = document.createElement("span")

    //* CONTAINER
    containerDifferential.classList.add("highlights__information")
    containerDifferential.classList.add("swiper-slide")
    containerDifferential.classList.add("script")

    //* IMG
    iconDifferential.classList.add("highlights__information--img")
    iconDifferential.src = info.src
    iconDifferential.alt = info.alt
    iconDifferential.title = info.title

    //* TEXT CONTAINER
    textContainerDifferential.classList.add("highlights__information--text")

    //* STRONG
    strongDifferential.classList.add("highlights__information--text-strong")
    strongDifferential.textContent = info.bold

    //* STRONG
    spanDifferential.classList.add("highlights__information--text-span")
    spanDifferential.textContent = info.text

    textContainerDifferential.appendChild(strongDifferential)
    textContainerDifferential.appendChild(spanDifferential)

    containerDifferential.appendChild(iconDifferential)
    containerDifferential.appendChild(textContainerDifferential)

    $differentialsContainer.appendChild(containerDifferential) 
  })
}

function requestDiferentials() {
  fetch("./mocks/DIFFERENTIALS.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructDifferentials(json);
    });
}

requestDiferentials();
//#region 

//#region PRODUCTS
function constructShelf(products) {
  const $productsShelfSwiper = document.querySelector(".shelf__product--swiper")
  products.map(function (product){
    const containerProduct = document.createElement("div")

    const productImage = document.createElement("img")
    const seals = document.createElement("div")
    const name = document.createElement("h3")
    const details = document.createElement("span")
    const priceWrapper = document.createElement("div")
    const price = document.createElement("span")
    const priceDetails = document.createElement("span")
    const button = document.createElement("button")

    //* CONTAINER
    containerProduct.classList.add("shelf__product")
    containerProduct.classList.add("swiper-slide")

    //* IMG
    productImage.classList.add("shelf__product--img")
    productImage.src = product.image
    productImage.alt = product.title
    
    //* SEALS
    seals.classList.add("shelf__product--seals")
    seals.textContent = product.category

    //* PRODUCT NAME
    name.classList.add("shelf__product--title")
    name.textContent = product.title

    //* PRODUCT DETAILS
    details.classList.add("shelf__product--details")
    details.textContent = "9,73mm x 9,63mm"

    //* WRAPPER
    priceWrapper.classList.add("shelf__product--wrap")
    
    //* PRICE
    price.classList.add("shelf__product--price")
    price.textContent = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.price)

    //* PRICE DETAILS
    priceDetails.classList.add("shelf__product--buy-details")
    priceDetails.textContent = "Compre em até 8x sem juros"

    //* BUTTON
    button.classList.add("shelf__product--button")
    button.textContent = "Comprar"

    priceWrapper.appendChild(price) 
    priceWrapper.appendChild(priceDetails) 
    priceWrapper.appendChild(button) 


    containerProduct.appendChild(productImage) 
    containerProduct.appendChild(seals) 
    containerProduct.appendChild(name) 
    containerProduct.appendChild(details) 
    containerProduct.appendChild(priceWrapper) 

    $productsShelfSwiper.appendChild(containerProduct) 
  })
}

function requestProducts() {
  fetch('https://fakestoreapi.com/products').then( function (response) {
    return response.json()
  }).then( function (json) {
    constructShelf(json)
  })
}

requestProducts()
//#endregion