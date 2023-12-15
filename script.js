document.getElementById('generateBtn').addEventListener('click', function() {
    const data = document.getElementById('dataInput').value;
    try {
        const jsonData = JSON.parse(data);
        generateKML(jsonData);
    } catch (error) {
        alert('Dados inválidos. Por favor, insira um JSON válido.');
    }
});

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
