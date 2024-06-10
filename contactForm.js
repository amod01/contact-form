document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const question = document.getElementById('question').value;

    // Create a contact object
    const contactData = {
        name: name,
        email: email,
        phone: phone,
        question: question
    };

    // Send the data to the Google Apps Script endpoint
    fetch('https://script.google.com/macros/library/d/1e0mpl4YVhpdkdndaLqb6q5vi92ANA9Lcunodn52XexMUrCn1DQjZ1pAJ/1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Display a success message
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.style.display = 'block';
            responseMessage.textContent = 'Thank you for your message. We will get back to you shortly.';
            
            // Reset the form
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Failed to submit');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting your message. Please try again later.');
    });
});
