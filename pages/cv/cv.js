// two DOM queries:
const tabs     = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

// set up tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document
            .getElementById(tab.dataset.target)
            .classList.add('active');
    });
});

// also allow clicking the logo to go back home
const logoImg = document.querySelector('#navbar .logo');
logoImg.addEventListener('click', () => {
    window.location.href = '../../index.html';
});
