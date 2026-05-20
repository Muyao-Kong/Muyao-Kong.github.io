// two DOM queries:
const logoImg      = document.querySelector('#navbar .logo');
const contactLinks = document.querySelectorAll('.contact-details a');

// clicking logo → back home
logoImg.addEventListener('click', () => {
    window.location.href = '../../index.html';
});

// simple hover effect to show interactivity
contactLinks.forEach(link => {
    link.addEventListener('mouseover', () => link.style.opacity = '0.7');
    link.addEventListener('mouseout',  () => link.style.opacity = '1');
});
