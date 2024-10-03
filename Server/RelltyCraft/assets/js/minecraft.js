// Server IP and Port
const serverIp = 'play.relltycraft.my.id';
const serverIpPort = 50030;

// Constructing the server status URL
const serverStatusURL = `https://api.mcsrvstat.us/bedrock/3/${serverIp}:${serverIpPort}`;

// Function to get server status
async function getServerStatus() {
    try {
        const response = await fetch(serverStatusURL);
        const data = await response.json();

        // Pastikan ID elemen sesuai
        const serverIpElement = document.getElementById('serverIP');
        const serverPortElement = document.getElementById('serverPort');
        const serverStatusElement = document.getElementById('serverStatus');
        const playersOnElement = document.getElementById('playersOn');
        const playersMaxElement = document.getElementById('playersMax'); // Pastikan ID ini ada
        const serverVersionElement = document.getElementById('serverVersion');

        // Set IP and Port
        serverIpElement.textContent = serverIp;
        serverPortElement.textContent = serverIpPort;

        // Set Status
        if (data.online) {
            serverStatusElement.textContent = 'Online';
            serverStatusElement.classList.add('status-online');
            serverStatusElement.classList.remove('status-offline');
            playersOnElement.textContent = data.players.online; // Mengisi pemain yang online
            playersMaxElement.textContent = data.players.max; // Mengisi pemain maksimum
            serverVersionElement.textContent = data.version; // Mengisi versi server
        } else {
            serverStatusElement.textContent = 'Offline';
            serverStatusElement.classList.add('status-offline');
            serverStatusElement.classList.remove('status-online');
            playersOnElement.textContent = '0';
            playersMaxElement.textContent = '0';
            serverVersionElement.textContent = 'N/A';
        }
    } catch (error) {
        console.error('Failed to load server data', error);
        document.querySelector('.server-status').innerHTML = '❌ Failed to load server data ❌';
    }
}

// Call the function to get server status
document.addEventListener("DOMContentLoaded", getServerStatus);

