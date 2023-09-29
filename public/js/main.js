// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the server and update the page
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        // Update the page with the fetched data
        const ul = document.querySelector('ul');
        ul.innerHTML = '';
  
        for (const item of data) {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>Stage Name:</strong> ${item.stageName}<br>
            <strong>Birth Name:</strong> ${item.birthName}<br>
            <strong>Likes:</strong> ${item.likes}<br>
            <hr>
          `;
          ul.appendChild(li);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  