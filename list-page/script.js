// Function to fetch JSON data
async function fetchMaterials() {
  try {
    const response = await fetch('materials.json')
    if (!response.ok) {
      throw new Error('Failed to load JSON data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// Function to create and display material elements
async function displayMaterials() {
  const materials = await fetchMaterials()
  if (!materials) {
    return
  }

  const materialsContainer = document.getElementById('materials-container')

  materials.forEach((material) => {
    const materialElement = document.createElement('div')
    materialElement.className = 'material'
    materialElement.innerHTML = `
            <h3>${material.name}</h3>
            <p>Quantity: ${material.quantity}</p>
        `
    materialsContainer.appendChild(materialElement)
  })
}

// Call the function to display materials
displayMaterials()
