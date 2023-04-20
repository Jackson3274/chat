// Get the message list element
const messageList = document.querySelector('.message-list');

// Add an event listener to the send button
document.querySelector('button').addEventListener('click', function() {
  // Get the input value
  const message = document.querySelector('input[type="text"]').value;

  // Send the message to the server
  fetch('/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  }).then(function(response) {
    // Clear the input field
    document.querySelector('input[type="text"]').value = '';
  });

});

// Poll the server for new messages every 5 seconds
setInterval(function() {
  fetch('/messages').then(function(response) {
    return response.json();
  }).then(function(data) {
    // Update the message list
    messageList.innerHTML = '';
    data.messages.forEach(function(message) {
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.textContent = message;
      li.appendChild(p);
      messageList.appendChild(li);
    });
  });
}, 5000);
