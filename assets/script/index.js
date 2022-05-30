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

//* HOVER MENU 
const $menuNavDepartment = document.querySelectorAll(".menu__nav-department-list--item")
const $menuNavCategory = document.querySelectorAll(".menu__nav-wrapper-category")

$menuNavDepartment.forEach(function ($department, index) {
  $department.addEventListener("mouseover", function (){
    for (let i = 0; i < $menuNavCategory.length; i++) {
      const $category = $menuNavCategory[index];
      $category.classList.add("menu__nav-wrapper-category--active")
    }
  })
  $department.addEventListener("mouseleave", function (){
    for (let i = 0; i < $menuNavCategory.length; i++) {
      const $category = $menuNavCategory[index];
      $category.classList.remove("menu__nav-wrapper-category--active")
    }
  })
})

//* MENU MOBILE */

function handlToggleMenu() {
  const $openMenuMobile = document.querySelector(".menu__hamburger");
  const $menuMobile = document.querySelector(".menu__mobile");
  const $closeMenuMobile = document.querySelector(".close-menu");
  const $closeMenuMobileIcon = document.querySelector(".menu__mobile-close--button");

  $openMenuMobile.addEventListener("click", function(){
    $menuMobile.classList.add("active");
  })

  $closeMenuMobile.addEventListener("click", function(){
    $menuMobile.classList.remove("active");
  })

  $closeMenuMobileIcon.addEventListener("click", function(){
    $menuMobile.classList.remove("active");
  })
}

function handlNavMenu() {
  const $menuMobileArrowDepartments = document.querySelectorAll(".departmentArrow")
  const $menuMobileCategories = document.querySelectorAll(".menu__mobile-nav-category")
  const $menuMobileArrowCategories = document.querySelectorAll(".categoryArrow")
  const $menuMobileSubcategories = document.querySelectorAll(".menu__mobile-nav-subcategory")
  
  $menuMobileArrowDepartments.forEach(function ($mobileDepartment, index) {
    $mobileDepartment.addEventListener("click", function (){
      for (let i = 0; i < $menuMobileCategories.length; i++) {
        const $mobileCategory = $menuMobileCategories[index];
        $mobileCategory.classList.toggle("active-category")
      }
  })
  })

  $menuMobileArrowCategories.forEach(function ($mobileCategory, index) {
  $mobileCategory.addEventListener("click", function (){
    for (let i = 0; i < $menuMobileSubcategories.length; i++) {
      console.log('ENTROU')
      const $mobileSubcategory = $menuMobileSubcategories[index];
      $mobileSubcategory.classList.toggle("active-subcategory")
      console.log($menuMobileSubcategories[index])
    }

    // for (const $mobileSubcategory of $menuMobileSubcategories) {
    //   $mobileSubcategory.classList.toggle("active-subcategory");
    //   console.log(index)
    // }

  })
  })
}

handlToggleMenu()
handlNavMenu()