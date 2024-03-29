
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                document.getElementById('cameraPermissionStatus').textContent = 'Camera permission granted!';
                displayCameraDetails(stream);
            } catch (error) {
                console.error('Error accessing camera:', error);
                document.getElementById('cameraPermissionStatus').textContent = 'Error accessing camera. Please grant permission.';
            }
        }

        function displayCameraDetails(stream) {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                const cameraDetails = document.getElementById('cameraDetails');
                cameraDetails.innerHTML = '';

                videoTracks.forEach(track => {
                    const label = track.label || 'Unknown Camera';
                    const deviceId = track.getSettings().deviceId || 'Unknown Device ID';
                    const capabilities = JSON.stringify(track.getCapabilities(), null, 2);

                    const detailsHTML = `
        <strong>Camera Name:</strong> ${label}<br>
        <strong>Device ID:</strong> ${deviceId}<br>
        <strong>Capabilities:</strong><br>
        <pre>${capabilities}</pre>
        <hr>
      `;
                    cameraDetails.innerHTML += detailsHTML;
                });
            } else {
                document.getElementById('cameraDetails').textContent = 'No camera found.';
            }
        }
