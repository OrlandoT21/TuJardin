// Import the plant data
import { plantData } from './plants-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const searchButton = document.getElementById('search-button');
    const cleanButton = document.createElement('button');
    cleanButton.textContent = 'Limpiar';
    cleanButton.id = 'clean-button';
    const resultsContainer = document.getElementById('results-container');
    const plantDetailsDiv = document.getElementById('plant-details');
    const resultsHeading = resultsContainer.querySelector('h2');
    const imageModal = document.createElement('div');
    imageModal.id = 'image-modal';
    const enlargedImage = document.createElement('img');
    enlargedImage.id = 'enlarged-image';
    const closeButton = document.createElement('span');
    closeButton.id = 'close-button';
    closeButton.textContent = 'X';

    imageModal.appendChild(enlargedImage);
    imageModal.appendChild(closeButton);
    document.body.appendChild(imageModal);

    let allPlants = plantData.plants;
    const selectedPlants = []; // Array to hold selected plants
    const plantListContainer = document.getElementById('plant-list-container');
    const plantListDiv = document.getElementById('plant-list');
    const selectedPlantsList = document.getElementById('selected-plants-list');
    const printButton = document.getElementById('print-button');
    const MAX_SELECTED_PLANTS = 6;

    function updateSelectedPlantsList() {
        selectedPlantsList.innerHTML = '';
        selectedPlants.forEach((plant, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = plant.scientificName;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.classList.add('remove-plant-button');
            removeButton.addEventListener('click', () => {
                selectedPlants.splice(index, 1);
                updateSelectedPlantsList();
                // Re-enable the 'Add to List' button if it was disabled
                const allPlantLinks = plantListDiv.querySelectorAll('a');
                allPlantLinks.forEach(link => {
                    if (link.dataset.plantId === plant.scientificName) {
                        const addButton = link.nextElementSibling;
                        if (addButton && addButton.textContent === 'Añadir a la lista') {
                            addButton.disabled = false;
                        }
                    }
                });
            });
            listItem.appendChild(removeButton);
            selectedPlantsList.appendChild(listItem);
        });

        // Disable 'Add to List' buttons for already selected plants and when limit is reached
        const allPlantLinks = plantListDiv.querySelectorAll('a');
        allPlantLinks.forEach(link => {
            const plantId = link.dataset.plantId;
            const addButton = link.nextElementSibling;
            if (addButton && addButton.textContent === 'Añadir a la lista') {
                if (selectedPlants.some(p => p.scientificName === plantId) || selectedPlants.length >= MAX_SELECTED_PLANTS) {
                    addButton.disabled = true;
                } else {
                    addButton.disabled = false;
                }
            }
        });
    }

    function displayPlantDetails(plant) {
        plantDetailsDiv.innerHTML = '';
        suggestionsContainer.innerHTML = '';
        if (plant) {
            resultsHeading.textContent = `Información sobre ${plant.scientificName}`;
            const detailsList = document.createElement('ul');
            detailsList.classList.add('plant-details-list');

            const etiquetasEspanol = {
                scientificName: "Nombre Científico",
                commonNames: "Nombres Comunes",
                descripcion: "Descripción",
                iluminacion: "Iluminación",
                riego: "Riego",
                suelo: "Suelo",
                floracion: "Floración",
                humedad: "Humedad",
                notas: "Notas",
                images: "Imágenes"
            };

            for (const key in plant) {
                if (plant.hasOwnProperty(key) && key !== 'species' && key !== 'genus' && key !== 'images') {
                    const listItem = document.createElement('li');
                    listItem.classList.add('plant-info-item');
                    let etiqueta = etiquetasEspanol[key] || key.replace(/([A-Z])/g, ' $1').trim();
                    let valor = plant[key];
                    if (key === 'commonNames' && Array.isArray(valor)) {
                        valor = valor.join(', ');
                    }
                    listItem.innerHTML = `<strong>${etiqueta}:</strong> ${valor}`;
                    detailsList.appendChild(listItem);
                }
            }
            plantDetailsDiv.appendChild(detailsList);

            if (plant.images && plant.images.length > 0) {
                const imageSection = document.createElement('div');
                imageSection.classList.add('plant-images');
                plant.images.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.classList.add('plant-thumbnail');
                    imageSection.appendChild(img);
                });
                plantDetailsDiv.appendChild(imageSection);
            }

            resultsContainer.appendChild(cleanButton);
        } else {
            resultsHeading.textContent = 'Información';
            plantDetailsDiv.innerHTML = '<p>No se encontró ninguna planta que coincida con su búsqueda.</p>';
            if (document.getElementById('clean-button')) {
                document.getElementById('clean-button').remove();
            }
        }
    }

    function showSuggestions(searchTerm) {
        suggestionsContainer.innerHTML = '';
        if (searchTerm) {
            const suggestions = allPlants.filter(plant =>
                plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (plant.commonNames && plant.commonNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())))
            );

            if (suggestions.length > 0) {
                suggestions.forEach(plant => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    let displayText = plant.scientificName;
                    if (plant.commonNames && plant.commonNames.length > 0) {
                        displayText += ` (${plant.commonNames.join(', ')})`;
                    }
                    suggestionItem.textContent = displayText;
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = '';
                        displayPlantDetails(plant);
                        suggestionsContainer.innerHTML = '';
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
            }
        }
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = '';

        if (searchTerm) {
            const matchingPlants = allPlants.filter(plant =>
                plant.scientificName.toLowerCase().includes(searchTerm) ||
                (plant.commonNames && plant.commonNames.some(name => name.toLowerCase().includes(searchTerm)))
            );

            if (matchingPlants.length > 0) {
                resultsHeading.textContent = 'Resultados de la búsqueda:';
                plantDetailsDiv.innerHTML = '';

                matchingPlants.forEach(plant => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('suggestion-item');
                    let displayText = plant.scientificName;
                    if (plant.commonNames && plant.commonNames.length > 0) {
                        displayText += ` (${plant.commonNames.join(', ')})`;
                    }
                    resultItem.textContent = displayText;
                    resultItem.addEventListener('click', () => {
                        searchInput.value = '';
                        displayPlantDetails(plant);
                        suggestionsContainer.innerHTML = '';
                    });
                    plantDetailsDiv.appendChild(resultItem);
                });

                if (!document.getElementById('clean-button')) {
                    resultsContainer.appendChild(cleanButton);
                }

            } else {
                resultsHeading.textContent = 'Información';
                plantDetailsDiv.innerHTML = '<p>No se encontró ninguna planta que coincida con su búsqueda.</p>';
                if (document.getElementById('clean-button')) {
                    document.getElementById('clean-button').remove();
                }
            }
        } else {
            resultsHeading.textContent = 'Información';
            plantDetailsDiv.innerHTML = '<p>Busque una planta para ver sus detalles aquí.</p>';
            if (document.getElementById('clean-button')) {
                document.getElementById('clean-button').remove();
            }
        }
    }

    searchInput.addEventListener('input', () => {
        const currentInput = searchInput.value.trim();
        showSuggestions(currentInput);
    });

    searchButton.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    cleanButton.addEventListener('click', () => {
        searchInput.value = '';
        resultsHeading.textContent = 'Información';
        plantDetailsDiv.innerHTML = '<p>Busque una planta para ver sus detalles aquí.</p>';
        if (document.getElementById('clean-button')) {
            document.getElementById('clean-button').remove();
        }
        suggestionsContainer.innerHTML = '';
    });

    function displayAllPlants() {
        const sortedPlants = [...allPlants].sort((a, b) => a.scientificName.localeCompare(b.scientificName));
        plantListDiv.innerHTML = '';

        const plantCount = sortedPlants.length;
        const plantListHeading = plantListContainer.querySelector('h2');
        plantListHeading.innerHTML = `Actualmente, te podemos presentar información de las siguientes <strong>${plantCount}</strong> plantas:`;

        const ul = document.createElement('ul');
        sortedPlants.forEach(plant => {
            const listItem = document.createElement('li');
            const plantLink = document.createElement('a');
            plantLink.href = '#';
            plantLink.dataset.plantId = plant.scientificName; // Store plant ID
            let displayText = plant.scientificName;
            if (plant.commonNames && plant.commonNames.length > 0) {
                displayText += ` (${plant.commonNames.join(', ')})`;
            }
            plantLink.textContent = displayText;
            plantLink.addEventListener('click', (event) => {
                event.preventDefault();
                displayPlantDetails(plant);
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            });

            const addButton = document.createElement('button');
            addButton.textContent = 'Añadir a la lista';
            addButton.classList.add('add-to-list-button');
            addButton.addEventListener('click', () => {
                if (selectedPlants.length < MAX_SELECTED_PLANTS && !selectedPlants.some(p => p.scientificName === plant.scientificName)) {
                    selectedPlants.push(plant);
                    updateSelectedPlantsList();
                }
            });

            listItem.appendChild(plantLink);
            listItem.appendChild(addButton);
            ul.appendChild(listItem);
        });
        plantListDiv.appendChild(ul);
        plantListDiv.classList.add('two-columns');
        updateSelectedPlantsList(); // Initial update
    }

    displayAllPlants();

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.textContent = '🍂';
        leaf.classList.add('leaf');
        document.body.appendChild(leaf);

        leaf.style.left = Math.random() * window.innerWidth + 'px';
        leaf.style.top = Math.random() * window.innerHeight + 'px';

        setTimeout(() => {
            leaf.remove();
        }, 3000);
    }

    function sprinkleFairyDust() {
        const numberOfLeaves = 3;
        for (let i = 0; i < numberOfLeaves; i++) {
            createLeaf();
        }
    }

    setInterval(sprinkleFairyDust, 500);

    function createLeafy() {
        const leaf = document.createElement('div');
        leaf.textContent = '🍃';
        leaf.classList.add('leafy');
        document.body.appendChild(leaf);

        leaf.style.left = Math.random() * window.innerWidth + 'px';
        leaf.style.top = Math.random() * window.innerHeight + 'px';

        setTimeout(() => {
            leaf.remove();
        }, 3000);
    }

    function FallingLeaves() {
        const numberOfLeaves = 2;
        for (let i = 0; i < numberOfLeaves; i++) {
            createLeafy();
        }
    }

    setInterval(FallingLeaves, 500);
    // End of Falling leaves

    // Image modal functionality
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('plant-thumbnail')) {
            enlargedImage.src = event.target.src;
            imageModal.style.display = 'flex';
        }
    });

    closeButton.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Direct attachment of the print button listener
    if (printButton) {
        printButton.addEventListener('click', () => {
            console.log("Print button clicked!"); // Test log
            console.log(selectedPlants);
            if (selectedPlants.length > 0) {
                const pdf = new window.jspdf.jsPDF();
                pdf.setFontSize(16);
                pdf.text('Mi Lista de Plantas', 15, 20);
                pdf.setFontSize(12);
                let y = 30;
                const etiquetasEspanol = {
                    scientificName: "Nombre Científico",
                    commonNames: "Nombres Comunes",
                    descripcion: "Descripción",
                    iluminacion: "Iluminación",
                    riego: "Riego",
                    suelo: "Suelo",
                    floracion: "Floración",
                    humedad: "Humedad",
                    notas: "Notas"
                };
                selectedPlants.forEach(plant => {
                    pdf.setFontSize(14);
                    pdf.setTextColor(0, 100, 0); // Sets the text color to dark green
                
                    let displayName = plant.scientificName;
                
                    if (plant.commonNames && plant.commonNames.length > 0) {
                        displayName += ` (${plant.commonNames.join(', ')})`;
                    }
                
                    pdf.text(displayName, 15, y); // Adds the 'displayName' (scientific name with common names) to the PDF at position (15, y). 'y' is the vertical position, which is updated as content is added to the page.
                
                    pdf.setTextColor(0); // Resets the text color to black (RGB: 0, 0, 0) for the rest of the plant's information.
                    y += 8; // Increases the vertical position 'y' by 8 units to create some space after the plant's name.
                
                    pdf.setFontSize(8); // Sets the font size for the plant's details.
                
                    for (const key in plant) {
                        // This loop iterates through the properties (keys) of the current 'plant' object.
                        if (plant.hasOwnProperty(key) && key !== 'scientificName' && key !== 'commonNames' && key !== 'genus' && key !== 'species' && key !== 'images') {
                            // Checks if the property belongs directly to the plant object (not its prototype) and excludes
                            // specific properties that we are handling separately or don't want to print in this section.
                
                            let etiqueta = etiquetasEspanol[key] || key.replace(/([A-Z])/g, ' $1').trim();
                            // Gets the Spanish label for the current property 'key' from the 'etiquetasEspanol' object.
                            // If a Spanish label doesn't exist, it tries to create a more readable label by inserting a space
                            // before any uppercase letters in the key and trimming any leading/trailing spaces.
                            let valor = plant[key]; // Gets the value of the current property from the 'plant' object.
                            const labelText = `${etiqueta}: `; // Creates the label text by appending a colon and a space to the 'etiqueta'.
                            const valueText = `${valor}`; // Converts the 'valor' to a string.
                            const labelWidth = pdf.getTextWidth(labelText, { fontSize: 10, fontStyle: 'bold' });
                            // Calculates the width of the 'labelText' in the PDF with the specified font size and bold style.
                            // This is used to position the 'valueText' correctly.
                            const availableWidth = 190 - 20;
                            // Calculates the available width for the value text on the PDF page (total width minus left margin).
                            const valueLines = pdf.splitTextToSize(valueText, availableWidth - labelWidth);
                            // Splits the 'valueText' into an array of strings, where each string fits within the 'availableWidth'
                            // minus the width of the label. This handles text wrapping for longer values.
                            pdf.setFont('helvetica', 'bold');
                            // Sets the font to Helvetica and bold style for the label.
                            pdf.text(labelText, 12, y);
                            // Adds the bold 'labelText' to the PDF at position (12, y).
                            y += 6; // Move to the next line after printing the label
                            pdf.setFont('helvetica', 'normal'); // Sets the font to Helvetica and normal style for the value.
                            valueLines.forEach((line, index) => {
                                // This loop iterates through each line of the wrapped 'valueText'.
                                pdf.text(line, 12, y);
                                // Adds the current 'line' of the value text to the PDF.
                                // It's positioned at (12, y).
                                y += 6;
                                // Increases the vertical position 'y' by 6 units for the next line of text.
                            });
                            y += 2; // Reduced space after each property
                            // Increases the vertical position 'y' by 2 units to add a small space after the current property's information.
                        }
                    }
                    pdf.line(15, y - 2, 195, y - 2);
                    // Draws a horizontal line to separate the information of different plants.
                    // The line starts at x=15, ends at x=195, and its vertical position is 'y - 2'.
                
                    y += 5; // Increases the vertical position 'y' by 5 units to create space after the separator line.
                
                    if (y > 270) {
                        // Checks if the current vertical position 'y' has exceeded a certain limit (approaching the bottom of the page).
                        pdf.addPage();
                        // If it has, a new page is added to the PDF.
                        y = 20;
                        // The vertical position 'y' is reset to 20 (near the top of the new page).
                    }
                });
                pdf.save('mi_lista_de_plantas.pdf');
            } else {
                alert('No has seleccionado ninguna planta para imprimir.');
            }
        });
    }

});

document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.location.href = "problemas.html";
        });
    }
})
