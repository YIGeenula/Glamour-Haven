// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Sample services data
    const services = [
        {
            title: 'Haircut & Styling',
            description: 'Professional haircut and styling by our expert stylists',
            image: 'images/Our-Service/HaircutStyling.jpg',
            price: '$60',
            duration: '60 min'
        },
        {
            title: 'Hair Coloring',
            description: 'Full hair coloring service with premium products',
            image: 'images/Our-Service/HairColoring.jpg',
            price: '$120',
            duration: '120 min'
        },
        {
            title: 'Spa Treatment',
            description: 'Relaxing spa treatment for ultimate rejuvenation',
            image: 'images/Our-Service/Treatment.jpg',
            price: '$90',
            duration: '90 min'
        }
    ];

    // Populate services section
    const servicesContainer = document.querySelector('.services-section .grid');
    if (servicesContainer) {
        services.forEach(service => {
            const serviceCard = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden service-card">
                    <img src="${service.image}" alt="${service.title}" class="w-full h-48 object-cover">
                    <div class="p-6 card-content">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">${service.title}</h3>
                        <p class="text-gray-600 mb-4">${service.description}</p>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-purple-600 font-bold">${service.price}</span>
                            <span class="text-gray-500">${service.duration}</span>
                        </div>
                        <div class="card-footer">
                            <a href="/booking.html" class="block text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            `;
            servicesContainer.innerHTML += serviceCard;
        });
    }

    // Updated testimonials data with profile photos
    const testimonials = [
        {
            name: 'Sarah Johnson',
            rating: 5,
            text: 'Amazing service! The staff was professional and friendly. My hair looks fantastic!',
            photo: 'images/Testimonials/p2.jpg',
            role: 'Regular Client'
        },
        {
            name: 'Michael Brown',
            rating: 5,
            text: 'Best salon experience I\'ve ever had. Will definitely be coming back!',
            photo: 'images/Testimonials/p1.jpg',
            role: 'First-time Client'
        },
        {
            name: 'Emily Davis',
            rating: 4,
            text: 'Great atmosphere and excellent service. Highly recommended!',
            photo: 'images/Testimonials/p3.jpg',
            role: 'Loyal Customer'
        },
        {
            name: 'Jessica Wilson',
            rating: 5,
            text: 'The attention to detail is amazing. Love my new look!',
            photo: 'images/Testimonials/p4.jpg',
            role: 'Regular Client'
        }
    ];

    // Populate testimonials section with new carousel
    const testimonialsTrack = document.querySelector('.testimonials-track');
    if (testimonialsTrack) {
        // First clone the testimonials for infinite loop
        const cloneTestimonials = () => {
            testimonials.forEach(testimonial => {
                const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
                const testimonialCard = `
                    <div class="testimonial-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                        <div class="bg-white p-6 rounded-xl shadow-lg mb-4 h-full flex flex-col">
                            <div class="flex items-center mb-4">
                                <img src="${testimonial.photo}" alt="${testimonial.name}" 
                                    class="w-16 h-16 rounded-full object-cover border-2 border-purple-200">
                                <div class="ml-4">
                                    <h4 class="font-bold text-gray-900">${testimonial.name}</h4>
                                    <p class="text-sm text-gray-600">${testimonial.role}</p>
                                </div>
                            </div>
                            <div class="text-yellow-400 mb-3 text-lg">${stars}</div>
                            <p class="feedback-text text-gray-600 mb-4">${testimonial.text}</p>
                        </div>
                    </div>
                `;
                testimonialsTrack.innerHTML += testimonialCard;
            });
        };

        // Clone testimonials at start and end
        cloneTestimonials(); // Original set
        cloneTestimonials(); // Clone at end
        cloneTestimonials(); // Clone at end again

        // Carousel functionality
        const track = document.querySelector('.testimonials-track');
        let currentIndex = testimonials.length; // Start from middle set
        let startX;
        let currentTranslate = 0;
        let isDragging = false;
        let startPos = 0;
        let animationID = 0;
        let currentPosition = 0;

        function updateCarousel(withTransition = true) {
            const cardWidth = track.querySelector('.testimonial-card').offsetWidth;
            currentPosition = -currentIndex * cardWidth;
            
            if (withTransition) {
                track.style.transition = 'transform 0.3s ease-out';
            } else {
                track.style.transition = 'none';
            }
            
            setTransform(currentPosition);
            startPos = currentPosition;
        }

        function checkInfiniteLoop() {
            const totalSets = 3; // We have 3 sets of testimonials
            const cardsPerSet = testimonials.length;
            
            if (currentIndex >= cardsPerSet * 2) { // If we're in the last set
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = cardsPerSet; // Jump to middle set
                    updateCarousel(false);
                }, 300);
            } else if (currentIndex <= cardsPerSet - 1) { // If we're in the first set
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = cardsPerSet * 2 - 1; // Jump to second set
                    updateCarousel(false);
                }, 300);
            }
        }

        function dragEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            track.style.cursor = 'grab';

            const movedBy = currentPosition - startPos;
            const cardWidth = track.querySelector('.testimonial-card').offsetWidth;
            
            // Determine if we should move to next/prev slide
            if (Math.abs(movedBy) > cardWidth / 3) {
                if (movedBy < 0) {
                    currentIndex++;
                } else {
                    currentIndex--;
                }
            }

            // Update carousel and check for infinite loop
            updateCarousel(true);
            checkInfiniteLoop();
        }

        // Initialize carousel
        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            updateCarousel(false);
        });
        
        // Initial position
        updateCarousel(false);

        // Mouse Events
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', drag);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', dragEnd);

        // Touch Events
        track.addEventListener('touchstart', dragStart);
        track.addEventListener('touchmove', drag);
        track.addEventListener('touchend', dragEnd);

        function dragStart(event) {
            startPos = currentPosition;
            isDragging = true;
            startX = event.type.includes('mouse') 
                ? event.pageX 
                : event.touches[0].clientX;

            animationID = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';
        }

        function drag(event) {
            if (!isDragging) return;
            
            event.preventDefault();
            const currentX = event.type.includes('mouse')
                ? event.pageX
                : event.touches[0].clientX;
            
            const diff = currentX - startX;
            currentPosition = startPos + diff;
        }

        function animation() {
            setTransform(currentPosition);
            if (isDragging) requestAnimationFrame(animation);
        }

        function setTransform(position) {
            track.style.transform = `translateX(${position}px)`;
        }

        // Prevent context menu on long press
        track.addEventListener('contextmenu', e => e.preventDefault());
    }

    // Team members data
    const teamMembers = [
        {
            name: 'Emma Thompson',
            role: 'Senior Hair Stylist',
            experience: '12 years',
            photo: 'images/Staff/sm1.jpg',
            specialties: 'Hair Coloring, Bridal Styling'
        },
        {
            name: 'David Chen',
            role: 'Color Specialist',
            experience: '8 years',
            photo: 'images/Staff/sm3.jpg',
            specialties: 'Balayage, Fashion Colors'
        },
        {
            name: 'Sofia Rodriguez',
            role: 'Creative Director',
            experience: '15 years',
            photo: 'images/Staff/sm2.jpg',
            specialties: 'Precision Cuts, Hair Extensions'
        }
    ];

    // Add this inside your DOMContentLoaded event handler
    const teamContainer = document.querySelector('.team-grid');
    if (teamContainer) {
        teamMembers.forEach(member => {
            const memberCard = `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                    <div class="relative h-80">
                        <img src="${member.photo}" alt="${member.name}" 
                            class="w-full h-full object-cover">
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <h3 class="text-xl font-bold text-white">${member.name}</h3>
                            <p class="text-gray-200">${member.role}</p>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="h-1 w-20 bg-purple-600 rounded"></div>
                            <p class="ml-4 text-gray-600 font-medium">${member.experience} Experience</p>
                        </div>
                        <p class="text-gray-600">Specialties: ${member.specialties}</p>
                    </div>
                </div>
            `;
            teamContainer.innerHTML += memberCard;
        });
    }

    // Add this after the team members data
    const pricingData = [
        {
            category: "Hair Services",
            services: [
                { name: "Women's Haircut & Style", price: "$60+" },
                { name: "Men's Haircut", price: "$35+" },
                { name: "Color & Highlights", price: "$120+" },
                { name: "Balayage", price: "$150+" },
                { name: "Hair Treatment", price: "$45+" }
            ],
            icon: "fas fa-cut"
        },
        {
            category: "Styling Services",
            services: [
                { name: "Blowout", price: "$45+" },
                { name: "Special Occasion Style", price: "$85+" },
                { name: "Bridal Hair", price: "$150+" },
                { name: "Hair Extensions", price: "$200+" },
                { name: "Keratin Treatment", price: "$250+" }
            ],
            icon: "fas fa-magic"
        },
        {
            category: "Treatment Services",
            services: [
                { name: "Deep Conditioning", price: "$35+" },
                { name: "Scalp Treatment", price: "$45+" },
                { name: "Hair Repair Therapy", price: "$65+" },
                { name: "Color Protection", price: "$40+" },
                { name: "Anti-Frizz Treatment", price: "$55+" }
            ],
            icon: "fas fa-spa"
        }
    ];

    // Add this inside your DOMContentLoaded event handler
    const pricingContainer = document.querySelector('.pricing-grid');
    if (pricingContainer) {
        pricingData.forEach(category => {
            const pricingCard = `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl pricing-card">
                    <div class="p-6 bg-purple-600 text-white text-center">
                        <i class="${category.icon} text-3xl mb-3"></i>
                        <h3 class="text-xl font-bold">${category.category}</h3>
                    </div>
                    <div class="p-6 card-content">
                        <ul class="space-y-4">
                            ${category.services.map(service => `
                                <li class="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span class="text-gray-700">${service.name}</span>
                                    <span class="text-purple-600 font-semibold">${service.price}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="card-footer mt-6">
                            <a href="/booking.html" class="block text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            `;
            pricingContainer.innerHTML += pricingCard;
        });
    }

    // Add this after the pricing data
    const specialOffers = [
        {
            title: "Holiday Special",
            description: "Get ready for the holidays with our complete makeover package",
            services: ["Haircut & Style", "Deep Conditioning", "Makeup Application"],
            originalPrice: "$200",
            discountedPrice: "$160",
            validUntil: "December 31, 2023",
            image: "images/Special-Offers/holiday.jpg",
            tag: "Save 20%"
        },
        {
            title: "Bridal Package",
            description: "Make your special day even more beautiful with our bridal package",
            services: ["Trial Styling", "Wedding Day Style", "Makeup", "3 Bridesmaids Styles"],
            originalPrice: "$500",
            discountedPrice: "$400",
            validUntil: "Valid all year",
            image: "images/Special-Offers/bridal.jpg",
            tag: "Most Popular"
        },
        {
            title: "First-Time Client",
            description: "Experience our premium services with a special welcome discount",
            services: ["Consultation", "Haircut & Style", "Hair Treatment"],
            originalPrice: "$150",
            discountedPrice: "$99",
            validUntil: "For new clients only",
            image: "images/Special-Offers/client.jpg",
            tag: "New Client Offer"
        }
    ];

    // Add this inside your DOMContentLoaded event handler
    const offersContainer = document.querySelector('.offers-grid');
    if (offersContainer) {
        specialOffers.forEach(offer => {
            const offerCard = `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl offer-card">
                    <div class="relative">
                        <img src="${offer.image}" alt="${offer.title}" class="w-full h-48 object-cover">
                        <div class="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ${offer.tag}
                        </div>
                    </div>
                    <div class="p-6 card-content">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">${offer.title}</h3>
                        <p class="text-gray-600 mb-4">${offer.description}</p>
                        <ul class="space-y-2 mb-4">
                            ${offer.services.map(service => `
                                <li class="flex items-center text-gray-600">
                                    <i class="fas fa-check text-purple-600 mr-2"></i>
                                    ${service}
                                </li>
                            `).join('')}
                        </ul>
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <span class="text-gray-400 line-through text-sm">${offer.originalPrice}</span>
                                <span class="text-purple-600 font-bold text-2xl ml-2">${offer.discountedPrice}</span>
                            </div>
                            <span class="text-sm text-gray-500">${offer.validUntil}</span>
                        </div>
                        <div class="card-footer">
                            <a href="/booking.html" class="block text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            `;
            offersContainer.innerHTML += offerCard;
        });
    }

    // Add this after the special offers data
    const faqData = [
        {
            question: "How do I book an appointment?",
            answer: "You can book an appointment through our online booking system, by calling us at (555) 123-4567, or by using the booking form on our website. We recommend booking at least a week in advance for the best availability."
        },
        {
            question: "What is your cancellation policy?",
            answer: "We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee of 50% of the service price. We understand emergencies happen, so please contact us as soon as possible if you need to reschedule."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), cash, and digital payments including Apple Pay and Google Pay. We also offer gift cards which can be purchased in-salon or online."
        },
        {
            question: "Do you use vegan and cruelty-free products?",
            answer: "Yes! We are proud to offer a wide range of vegan and cruelty-free products. Our staff can help you identify which products match your preferences and are best suited for your hair type."
        },
        {
            question: "How long will my appointment take?",
            answer: "Service duration varies depending on the treatment. Basic haircuts typically take 45-60 minutes, while color services can take 2-3 hours. We'll provide a time estimate when you book your appointment."
        },
        {
            question: "Do you offer consultations?",
            answer: "Yes, we offer complimentary 15-minute consultations for new clients or before major style changes. This helps ensure we understand your vision and can achieve the best possible results."
        }
    ];

    // Add this inside your DOMContentLoaded event handler
    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {
        faqData.forEach((faq, index) => {
            const faqItem = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <button class="w-full px-6 py-4 text-left focus:outline-none flex justify-between items-center" 
                            onclick="toggleFAQ(${index})">
                        <span class="font-medium text-gray-900">${faq.question}</span>
                        <i class="fas fa-chevron-down text-purple-600 transition-transform duration-300" id="faq-icon-${index}"></i>
                    </button>
                    <div class="faq-answer" id="faq-answer-${index}">
                        <p class="text-gray-600">${faq.answer}</p>
                    </div>
                </div>
            `;
            faqContainer.innerHTML += faqItem;
        });
    }

    // Add this function outside the DOMContentLoaded event handler
    window.toggleFAQ = function(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach((el, i) => {
            if (i !== index) {
                el.classList.remove('active');
                document.getElementById(`faq-icon-${i}`).classList.remove('rotate-180');
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('active');
        icon.classList.toggle('rotate-180');
    };

    // Add fade-in class to sections
    const sections = document.querySelectorAll('section > div');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Initialize scroll animation
    handleScrollAnimation();

    // Add this function after your existing code but inside the DOMContentLoaded event handler
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            element.textContent = currentCount;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Add this to initialize the counting animation when the about section is visible
    const aboutSection = document.querySelector('.about-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animations with updated values
                animateCount(document.getElementById('years-count'), 0, 8, 2000);
                animateCount(document.getElementById('clients-count'), 0, 5000, 2000);
                animateCount(document.getElementById('stylists-count'), 0, 15, 2000);
                // Stop observing after animation starts
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Update the selector to match the current HTML structure
    const aboutStats = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
});

// Add this after your DOMContentLoaded event handler
function handleScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

function createServiceCard(service) {
    return `
        <div class="service-card">
            <img src="${service.image}" alt="${service.name}" class="service-card-image">
            <div class="service-card-content">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${service.name}</h3>
                <p class="text-gray-600 mb-4">${service.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-purple-600 font-bold text-xl">$${service.price}</span>
                    <span class="text-gray-500">${service.duration} min</span>
                </div>
                <button onclick="location.href='/booking.html'" class="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                    Book Now
                </button>
            </div>
        </div>
    `;
}

// Add this to initialize services
const services = [
    {
        name: "Spa Treatment",
        description: "Relaxing spa treatment for ultimate rejuvenation",
        price: 90,
        duration: 90,
        image: "images/Treatment.jpg"
    },
    // Add more services as needed
];

// Insert services into the grid
document.querySelector('.services-section .grid').innerHTML = 
    services.map(service => createServiceCard(service)).join('');