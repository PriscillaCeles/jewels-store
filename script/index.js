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
  fetch("../mocks/INFORMATIVES_TOP.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructInformativesTop(json);
      console.log(json);
    });
}

function requestMenuDesktop() {
  fetch("../mocks/MENU.json")
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
  }
  $containerMenu.innerHTML = strucureMenu;
}

informativesTop();
// requestMenuDesktop();

//* HOVER MENU 
const $menuNavDepartmentItems = document.querySelectorAll(".department-list-item")
const $menuNavCategory = document.querySelectorAll(".menu__nav-wrapper-category")
const $menuNavCategoryItems = document.querySelectorAll(".category-list-item")
const $menuNavSubcategory = document.querySelectorAll(".menu__nav-wrapper-subcategory")

$menuNavDepartmentItems.forEach(function ($department, index) {
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

$menuNavCategoryItems.forEach(function ($category, index) {
  $category.addEventListener("mouseover", function (){
    for (let i = 0; i < $menuNavSubcategory.length; i++) {
      const $subcategoryNav = $menuNavSubcategory[index];
      $subcategoryNav.classList.add("menu__nav-wrapper-subcategory--active")
    } 
  })
  $category.addEventListener("mouseleave", function (){
    for (let i = 0; i < $menuNavSubcategory.length; i++) {
      const $subcategoryNav = $menuNavSubcategory[index];
      $subcategoryNav.classList.remove("menu__nav-wrapper-subcategory--active")
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
  const $menuMobileArrowDepartments = document.querySelectorAll(".department-arrow")
  const $menuMobileCategories = document.querySelectorAll(".menu__mobile-nav-category")
  const $menuMobileArrowCategories = document.querySelectorAll(".category-arrow")
  const $menuMobileSubcategories = document.querySelectorAll(".menu__mobile-nav-subcategory")
  
  $menuMobileArrowDepartments.forEach(function ($mobileDepartment, index) {
    $mobileDepartment.addEventListener("click", function (){
      for (let i = 0; i < $menuMobileCategories.length; i++) {
        const $mobileCategory = $menuMobileCategories[index];
        $mobileCategory.classList.toggle("active-category")
        $menuMobileArrowDepartments[index].classList.toggle("menu__mobile-nav--arrow-active")
      }
  })
  })

  $menuMobileArrowCategories.forEach(function ($mobileCategory, index) {
  $mobileCategory.addEventListener("click", function (){
    for (let i = 0; i < $menuMobileSubcategories.length; i++) {
      const $mobileSubcategory = $menuMobileSubcategories[index];
      $mobileSubcategory.classList.toggle("active-subcategory")
      $menuMobileArrowCategories[index].classList.toggle("menu__mobile-nav-category--arrow-active")
    }
  })
  })
}

handlToggleMenu()
handlNavMenu()
