export function initMap()
{
    // const copy = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const basemap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const layer = L.tileLayer(basemap, {attribution: '<a href="https://openstreetmap.org">OpenStreetMap</a> ', noWrap: true, tileSize: 256 });


    // Define the bounds for the map
    const bounds = [
        [-90, -180], // Southwest coordinates
        [90, 180] // Northeast coordinates
    ];
    const options = {
        layers: [layer],
        minwidth: 200,
        minZoom: 2,
        maxZoom: 18,
        maxBounds: bounds
    }
    // Create the Leaflet map

    // Return the map object
    return L.map('map', options);
}

export function initDropdown(id, options, fieldDescription, placeholder, disabledPlaceholder)// create dropdown fields
{
    let dropdownHTML = `<label for=${id}>${fieldDescription}:</label>`
    dropdownHTML += `<select id='${id}'>`;

    if (disabledPlaceholder)
    {
        dropdownHTML += `<option value='' selected>${placeholder}</option>`;

    }
    for (const option of options) {
        if (option.value.toString().includes(placeholder) && !disabledPlaceholder)
        {
            dropdownHTML += `<option value='${option.value}' selected>${option.label}</option>`;
        } else
        {
            dropdownHTML += `<option value='${option.value}'>${option.label}</option>`;
        }
    }
    dropdownHTML += `</select>`;
    return dropdownHTML;
}