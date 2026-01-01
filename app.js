const imageGrid = document.getElementById('image-grid');
const loading = document.getElementById('loading');
let page = 0;
const imagesPerPage = 12;
let isLoading = false;

function generateImageId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function createImageCard(imageUrl, id) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <img src="${imageUrl}" alt="Image ${id}" loading="lazy">
    `;
    
    card.addEventListener('click', () => {
        window.open(imageUrl, '_blank');
    });
    
    return card;
}

function loadImages() {
    if (isLoading) return;
    
    isLoading = true;
    loading.style.display = 'block';
    
    setTimeout(() => {
        for (let i = 0; i < imagesPerPage; i++) {
            const width = 400;
            const height = 300 + Math.floor(Math.random() * 200);
            const imageUrl = `https://picsum.photos/400/${height}?random=${Date.now() + i}`;
            const id = generateImageId();
            
            const imageCard = createImageCard(imageUrl, id);
            imageGrid.appendChild(imageCard);
        }
        
        page++;
        isLoading = false;
        loading.style.display = 'none';
    }, 500);
}

function checkScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollTop + windowHeight >= documentHeight - 500) {
        loadImages();
    }
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScroll, 100);
});

loadImages();
