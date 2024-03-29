
document.getElementById('scale').addEventListener('input', function (event) {
    var scale = event.target.value;
    document.getElementById('scaleValue').innerText = scale;
    generateQRCode();
});

["qr-text", "light_main", "dark_main", "data_light", "data_dark", "quiet_zone"]
    .forEach(id => document.getElementById(id).addEventListener('input', generateQRCode));

async function generateQRCode() {
    var inputString = document.getElementById('qr-text').value;
    var scaleValue = document.getElementById('scale').value;  // Directly use the range input's value
    var light_main = document.getElementById('light_main').value;
    var dark_main = document.getElementById('dark_main').value;
    var data_light = document.getElementById('data_light').value;
    var data_dark = document.getElementById('data_dark').value;
    var quiet_zone = document.getElementById('quiet_zone').value;

    const data = {
        inputString,
        scaleValue,
        light_main,
        dark_main,
        data_light,
        data_dark,
        quiet_zone,
    };

    try {
        const resp = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(resp);
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        const json = await resp.json();
        console.log(json);
        makeImage(json.filename);
    } catch (error) {
        console.error('Error:', error);
    }
}

function makeImage(filename) {
    const img = document.getElementById('qrImage') || document.createElement('img');
    img.id = 'qrImage';  // Ensure the image has an ID for future updates
    img.src = `http://127.0.0.1:3000/static/qr-images/${filename}`;
    document.body.appendChild(img);
}
