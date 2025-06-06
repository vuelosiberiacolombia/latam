document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('nav .tab');
    const sections = document.querySelectorAll('main section');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            sections[index].classList.add('active');
        });
    });
});
