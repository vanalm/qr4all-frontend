
document.getElementById('qrCreate').addEventListener('click', async function () {
    var inputString = document.getElementById('qr-text').value;

    // Example JSON data you want to send in the body of the request
    const data = {
        text: 'Example text for QR code',
        light_main: 'white',
        dark_main: 'black',
        border_color: 'white',
        // Add any other data fields you need
    };

    // Make the POST request
    const resp = await fetch('http://localhost:3000/generate', {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json', // Indicate we're sending JSON data
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
    }); console.log(resp)
    const json = await resp.json()
    console.log(json)
    makeImage(json.filename)
    // Here you could add more functionality, such as generating a QR code based on the input string.
});


function makeImage(filename) {
    const img = document.createElement('img');
    img.src = `http://127.0.0.1:3000/${filename}`;
    document.body.appendChild(img);
}