  document.addEventListener('DOMContentLoaded', () => {
        // ---- PAGE TRANSITION EFFECT when clicking navigation links ----
        const navAnchors = document.querySelectorAll('.nav-links a');
        const mainContainer = document.getElementById('main-content');
        
        function navigateWithTransition(targetId) {
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;
            
            mainContainer.classList.add('page-transition');
            mainContainer.classList.add('fade-out');
            
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    mainContainer.classList.remove('fade-out');
                }, 50);
            }, 180);
            
            setTimeout(() => {
                mainContainer.classList.remove('page-transition');
                mainContainer.classList.remove('fade-out');
            }, 600);
        }
        
        navAnchors.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                navigateWithTransition(targetId);
                history.pushState(null, null, href);
            });
        });
        
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
        
        // 1. VIEW MORE buttons toggle project details
        const viewBtns = document.querySelectorAll('.view-more-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projIndex = btn.getAttribute('data-proj');
                const detailsDiv = document.getElementById(`projDetail${projIndex}`);
                if (detailsDiv) {
                    detailsDiv.classList.toggle('show');
                    btn.innerHTML = detailsDiv.classList.contains('show') ? 'Show less <i class="fas fa-chevron-up"></i>' : 'View more <i class="fas fa-chevron-down"></i>';
                }
            });
        });

        // 2. "Show extra info" about me toggle
        const toggleAboutBtn = document.getElementById('toggleAboutExtraBtn');
        const extraNote = document.getElementById('extraAboutNote');
        if(toggleAboutBtn && extraNote) {
            toggleAboutBtn.addEventListener('click', () => {
                if(extraNote.style.display === 'none' || getComputedStyle(extraNote).display === 'none') {
                    extraNote.style.display = 'block';
                    toggleAboutBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide personal note';
                } else {
                    extraNote.style.display = 'none';
                    toggleAboutBtn.innerHTML = '<i class="fas fa-seedling"></i> Show personal note';
                }
            });
        }

        // 3. Download CV button
        const downloadBtn = document.getElementById('downloadCVBtn');
        if(downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const cvText = `Christian Borja — CV\nEducation: BSIT, Cavite State University - Tanza Campus\nSkills: SQL CRUD, Database Management, Web Dev (HTML/CSS/JS), Documentation\nExperience: POS System, CRUD scripts, Capstone Developer\nContact: christian.borja@csu.edu.ph`;
                const blob = new Blob([cvText], {type: 'application/pdf'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Christian_Borja_CV.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                alert("✓ CV download started (sample PDF).");
            });
        }

        // 4. Form validation
        const form = document.getElementById('contactFormEl');
        const nameField = document.getElementById('fullName');
        const emailField = document.getElementById('emailAddr');
        const msgField = document.getElementById('messageContent');
        const nameErr = document.getElementById('nameError');
        const emailErr = document.getElementById('emailError');
        const msgErr = document.getElementById('msgError');
        const globalFeedback = document.getElementById('formGlobalFeedback');

        function validateEmail(email) {
            return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
        }

        function clearErrors() {
            nameErr.textContent = '';
            emailErr.textContent = '';
            msgErr.textContent = '';
            globalFeedback.textContent = '';
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();
            let isValid = true;

            const nameVal = nameField.value.trim();
            const emailVal = emailField.value.trim();
            const msgVal = msgField.value.trim();

            if (nameVal === '') {
                nameErr.textContent = 'Name is required.';
                isValid = false;
            } else if (nameVal.length < 2) {
                nameErr.textContent = 'Name must be at least 2 characters.';
                isValid = false;
            }

            if (emailVal === '') {
                emailErr.textContent = 'Email address is required.';
                isValid = false;
            } else if (!validateEmail(emailVal)) {
                emailErr.textContent = 'Enter a valid email (e.g., name@domain.com).';
                isValid = false;
            }

            if (msgVal === '') {
                msgErr.textContent = 'Message cannot be empty.';
                isValid = false;
            } else if (msgVal.length < 5) {
                msgErr.textContent = 'Message too short (min 5 characters).';
                isValid = false;
            }

            if (isValid) {
                globalFeedback.style.color = '#74c69d';
                globalFeedback.innerHTML = `✨ Thanks ${nameVal}! Your message was delivered. (demo)`;
                form.reset();
                setTimeout(() => { globalFeedback.innerHTML = ''; }, 4000);
            } else {
                globalFeedback.style.color = '#e07c6c';
                globalFeedback.innerHTML = '❌ Please fix errors above.';
                setTimeout(() => { if(globalFeedback.innerHTML.includes('fix errors')) globalFeedback.innerHTML = ''; }, 3500);
            }
        });

        // 6. SCROLL REVEAL animation
        const fadeElements = document.querySelectorAll('.fade-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        fadeElements.forEach(el => observer.observe(el));
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight - 80) el.classList.add('visible');
        });
        
        // 7. active nav highlight
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(sec => {
                const secTop = sec.offsetTop - 130;
                if (pageYOffset >= secTop) current = sec.getAttribute('id');
            });
            navAnchors.forEach(link => {
                link.style.fontWeight = '500';
                if (current && link.getAttribute('href').includes(current)) {
                    link.style.fontWeight = 'bold';
                    link.style.color = '#95d5b2';
                } else {
                    link.style.color = '#cfe9cf';
                }
            });
        });
    });