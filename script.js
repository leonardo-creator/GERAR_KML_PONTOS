document.getElementById('parseBtn').addEventListener('click', function() {
    const input = document.getElementById('dataInput').value;
    parseAndDisplayData(input);
});

document.getElementById('generateBtn').addEventListener('click', function() {
    const input = document.getElementById('dataInput').value;
    const data = parseData(input);
    if(data) {
        generateKML(data);
    }
});

function parseAndDisplayData(input) {
    const data = parseData(input);
    if(data) {
        populateTable(data);
    }
}

function parseData(input) {
    const rows = input.trim().split('\n');
    const data = rows.map(row => {
        const columns = row.split('\t');
        return {
            nome: columns[0],
            descricao: columns[1],
            latitude: columns[2],
            longitude: columns[3]
        };
    });
    return data;
}

function populateTable(data) {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpa a tabela existente

    data.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.nome;
        row.insertCell(1).textContent = item.descricao;
        row.insertCell(2).textContent = item.latitude;
        row.insertCell(3).textContent = item.longitude;
    });
}

function generateKML(data) {
    let kmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    kmlContent += '<kml xmlns="http://www.opengis.net/kml/2.2">';
    kmlContent += '<Document>';

    data.forEach(item => {
        kmlContent += `<Placemark>
            <name>${item.nome}</name>
            <description>${item.descricao}</description>
            <Point>
                <coordinates>${item.longitude},${item.latitude},0</coordinates>
            </Point>
        </Placemark>`;
    });

    kmlContent += '</Document></kml>';

    downloadKML(kmlContent);
}

function downloadKML(kmlContent) {
    const blob = new Blob([kmlContent], {type: 'application/vnd.google-earth.kml+xml'});
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'pontos.kml';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Baixar KML';
}
