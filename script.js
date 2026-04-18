document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Project Detail Toggle
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const extraContent = card.querySelector('.extra-content');
            
            if (extraContent.classList.contains('hidden')) {
                extraContent.classList.remove('hidden');
                e.target.textContent = 'View Less';
            } else {
                extraContent.classList.add('hidden');
                e.target.textContent = 'View More';
            }
        });
    });

    // 2. Form Validation
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields before submitting.");
        } else {
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
        }
    });

    // 3. Download CV Button
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
        alert("Preparing Christian Borja's Resume for download...");
        // In a real scenario, you'd use: window.location.href = 'path/to/resume.pdf';
    });

    // 4. Simple Fade-in Animation on Scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease-out";
        observer.observe(section);
    });
});