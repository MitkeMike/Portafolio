document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.querySelector('.header__menu');
    menu.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', function() {
    const text = "desarrollador Junior Proactivo en aplicaciones web y APIs RESTful.";
    const typewriterElement = document.getElementById('typewriter');
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); 
        }
    }

    typeWriter();

    // Handle contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const notification = document.getElementById('notification');

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                notification.textContent = 'Mensaje enviado con éxito!';
                notification.className = 'notification success';
                notification.style.display = 'block';
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        notification.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        notification.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
                    }
                    notification.className = 'notification error';
                    notification.style.display = 'block';
                });
            }
        })
        .catch(error => {
            notification.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
            notification.className = 'notification error';
            notification.style.display = 'block';
        });
    });
});
