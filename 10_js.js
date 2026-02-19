function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  // Hide the other form
  newForm.style.display = "none";

  // Toggle filter menu on/off
  filterForm.style.display = (filterForm.style.display === "none" || filterForm.style.display === "")
    ? "block"
    : "none";
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  // Hide the other form
  filterForm.style.display = "none";

  // Toggle add form on/off
  newForm.style.display = (newForm.style.display === "none" || newForm.style.display === "")
    ? "flex"
    : "none";
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  document.querySelectorAll("article.opinion").forEach(a => {
    a.style.display = showOpinion ? "" : "none";
  });

  document.querySelectorAll("article.recipe").forEach(a => {
    a.style.display = showRecipe ? "" : "none";
  });

  document.querySelectorAll("article.update").forEach(a => {
    a.style.display = showUpdate ? "" : "none";
  });
}

function addNewArticle() {
  const title = document.getElementById("inputHeader").value.trim();
  const text = document.getElementById("inputArticle").value.trim();

  const opinion = document.getElementById("opinionRadio").checked;
  const recipe = document.getElementById("recipeRadio").checked;
  const life = document.getElementById("lifeRadio").checked;

  if (!title || !text || (!opinion && !recipe && !life)) {
    alert("Please enter a title, choose a type, and enter text.");
    return;
  }

  let typeClass = "opinion";
  let markerText = "Opinion";

  if (recipe) {
    typeClass = "recipe";
    markerText = "Recipe";
  } else if (life) {
    typeClass = "update";
    markerText = "Update";
  }

  const article = document.createElement("article");
  article.className = typeClass;

  // Build the same structure your existing articles use
  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = markerText;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = "moreDetails.html";
  link.textContent = "Read more...";
  pLink.appendChild(link);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  // Add it to the list
  document.getElementById("articleList").appendChild(article);

  // Clear inputs
  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  document.getElementById("opinionRadio").checked = false;
  document.getElementById("recipeRadio").checked = false;
  document.getElementById("lifeRadio").checked = false;

  // Re-apply current filters so the new one hides/shows correctly
  filterArticles();
}

// Make sure filters apply on initial load too
document.addEventListener("DOMContentLoaded", () => {
  // If you didn't change CSS, this still works fine
  // but if you DID change CSS to display:none, this sets the initial state.
  document.getElementById("filterContent").style.display = "none";
  document.getElementById("newContent").style.display = "none";

  filterArticles();
});