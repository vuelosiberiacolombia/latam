document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const contents = document.querySelectorAll('.content');
    const menuItemsContainer = document.querySelector('.menu-items');
    const menuItemsWrapper = document.querySelector('.menu-items-wrapper');
    let currentIndex = 0;

    function updateContent(index) {
        menuItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                contents[i].classList.add('active');
            } else {
                item.classList.remove('active');
                contents[i].classList.remove('active');
            }
        });
        const itemWidth = menuItems[0].offsetWidth;
        const containerWidth = menuItemsWrapper.offsetWidth;
        const maxScroll = menuItems.length * itemWidth - containerWidth;
        let scrollPosition = itemWidth * index - containerWidth / 2 + itemWidth / 2;
        scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
        menuItemsContainer.style.transform = `translateX(-${scrollPosition}px)`;
    }

    document.getElementById('next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % menuItems.length;
        updateContent(currentIndex);
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        updateContent(currentIndex);
    });

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateContent(currentIndex);
        });
    });

    // Initialize the first content
    updateContent(currentIndex);
});
