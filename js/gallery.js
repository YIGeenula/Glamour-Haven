document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('imageModal');
    const modalImage = modal.querySelector('.modal-image');
    let currentImageIndex = 0;
    
    // Gallery data with categories
    const galleryItems = [
        { src: 'images/Gallery/1.jpg', category: 'haircuts' },
        { src: 'images/Gallery/2.jpg', category: 'styling' },
        { src: 'images/Gallery/3.jpg', category: 'coloring' },
        { src: 'images/Gallery/4.jpg', category: 'treatments' },
        { src: 'images/Gallery/5.jpg', category: 'styling' },
        { src: 'images/Gallery/6.jpg', category: 'haircuts' },
        { src: 'images/Gallery/7.jpg', category: 'coloring' },
        { src: 'images/Gallery/8.jpg', category: 'treatments' },
        { src: 'images/Gallery/9.jpg', category: 'styling' },
        { src: 'images/Gallery/10.jpg', category: 'haircuts' },
        { src: 'images/Gallery/11.jpg', category: 'coloring' },
        { src: 'images/Gallery/12.jpg', category: 'treatments' },
        { src: 'images/Gallery/13.jpg', category: 'styling' },
        { src: 'images/Gallery/14.jpg', category: 'haircuts' },
        { src: 'images/Gallery/15.jpg', category: 'coloring' },
        { src: 'images/Gallery/16.jpg', category: 'treatments' },
        { src: 'images/Gallery/17.jpg', category: 'styling' },
        { src: 'images/Gallery/18.jpg', category: 'haircuts' },
        { src: 'images/Gallery/19.jpg', category: 'coloring' },
        { src: 'images/Gallery/20.jpg', category: 'treatments' },
        { src: 'images/Gallery/21.jpg', category: 'styling' },
        { src: 'images/Gallery/22.jpg', category: 'haircuts' },
        { src: 'images/Gallery/23.jpg', category: 'coloring' },
        { src: 'images/Gallery/24.jpg', category: 'treatments' },
        { src: 'images/Gallery/25.jpg', category: 'styling' }
    ];

    // Initialize gallery
    function initGallery() {
        galleryItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'masonry-item ' + item.category;
            div.innerHTML = `
                <img src="${item.src}" alt="Gallery image" loading="lazy">
                <div class="masonry-item-overlay">
                    <i class="fas fa-expand-alt"></i>
                </div>
            `;
            div.addEventListener('click', () => openModal(index));
            gallery.appendChild(div);
        });
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterGallery(filter);
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    function filterGallery(filter) {
        const items = document.querySelectorAll('.masonry-item');
        items.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Modal functionality
    function openModal(index) {
        currentImageIndex = index;
        modalImage.src = galleryItems[index].src;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function navigateModal(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryItems.length) % galleryItems.length;
        modalImage.src = galleryItems[currentImageIndex].src;
    }

    // Modal event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.prev').addEventListener('click', () => navigateModal(-1));
    modal.querySelector('.next').addEventListener('click', () => navigateModal(1));

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }
    });

    // Initialize gallery
    initGallery();
}); 