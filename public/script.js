// Add event listener to the form on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  fetchAllPlants();
  const form = document.getElementById("plant-form");
  form.addEventListener("submit", handleSearch); 
});

// Handle search on form submission
const handleSearch = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  const searchValue = document.getElementById("plant-search").value.trim();
  if (searchValue) {
    fetchPlants(searchValue); // Call fetchPlants with the search value
  } else {
    console.log("Please enter a search term.");
  }
};

// Fetch plants based on the search term
const fetchPlants = async (plantSearch) => {
  try {
    const response = await fetch(
      `/api/plant/${plantSearch}`
    ); // Adjust the endpoint to include search query
    console.log(response)
    if (!response.ok) {
      throw new Error("No results found");
    }
    const data = await response.json();
    displaySearchResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

// Display search results
const displaySearchResults = (data) => {
  const searchContainer = document.getElementById("search-results");
  searchContainer.innerHTML = "";

  if (data.data && data.data.length > 0) {
    data.data.forEach((plant) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      resultItem.innerHTML = `
                  <article>
                      <h3>${plant.common_name}<span>(${
        plant.scientific_name
      })</span></h3>
                      <section>
                          <img class="plant-image" src="${plant.image_url}" />
                          <p><strong>ID:</strong> ${plant.id}</p>
                          <p><strong>Year:</strong> ${plant.year}</p>
                          <p><strong>Bibliography:</strong> ${
                            plant.bibliography
                          }</p>
                          <p><strong>Author:</strong> ${plant.author}</p>
                          <p><strong>Status:</strong> ${plant.status}</p>
                          <p><strong>Rank:</strong> ${plant.rank}</p>
                          <p><strong>Family Common Name:</strong> ${
                            plant.family_common_name || "N/A"
                          }</p>
                      </section>
                  </article>
              `;
      searchContainer.appendChild(resultItem);
    });
  } else {
    searchContainer.innerHTML = "<p>No results found.</p>";
  }
};

// Fetch all plants
const fetchAllPlants = async () => {
  try {
    const response = await fetch("/api/plants"); // Adjust the endpoint as needed
    const data = await response.json();
    displayPlants(data);
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
};

// Display all plants
const displayPlants = (data) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";

  data.data.forEach((plant) => {
    const plantElement = document.createElement("div");
    plantElement.className = "plant-item";
    plantElement.innerHTML = `
              <img src="${plant.image_url}" alt="${
      plant.common_name
    }" class="plant-image">
              <h3>${plant.common_name} (${plant.scientific_name})</h3>
              <p><strong>ID:</strong> ${plant.id}</p>
              <p><strong>Year:</strong> ${plant.year}</p>
              <p><strong>Bibliography:</strong> ${plant.bibliography}</p>
              <p><strong>Status:</strong> ${plant.status}</p>
              <p><strong>Family Common Name:</strong> ${
                plant.family_common_name || "N/A"
              }</p>
          `;

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "Add to Collection";
    addButton.addEventListener("click", () => {
      addToCollection(plant);
    });

    plantElement.appendChild(addButton);
    plantsContainer.appendChild(plantElement);
  });
};

// Add to collection - in local storage
const addToCollection = (plant) => {
  const collection = JSON.parse(localStorage.getItem("plantCollection")) || [];
  collection.push(plant);
  localStorage.setItem("plantCollection", JSON.stringify(collection));
  console.log(`${plant.common_name} added to collection`);

  const myCollection = document.getElementById("my-collection");
  myCollection.innerHTML += `<p>${plant.common_name}</p>`;
};
