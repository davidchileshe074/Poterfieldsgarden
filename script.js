document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Add hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'rgba(161, 98, 7, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
        });
    });

    // --- Back to Top & Progress ---
    const backToTop = document.getElementById('backToTop');
    window.onscroll = function() { 
        updateProgressBar();
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    };
    
    function updateProgressBar() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // Slight delay for smoothness
    });

    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        
        // Hamburger animation
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const goal = parseInt(target.getAttribute('data-target'));
                let current = 0;
                const increment = goal / 50;
                
                const updateCount = () => {
                    if (current < goal) {
                        current += increment;
                        target.innerText = Math.ceil(current);
                        setTimeout(updateCount, 20);
                    } else {
                        target.innerText = goal;
                    }
                };
                updateCount();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Form Handling ---
    const quoteForm = document.getElementById('quoteForm');
    const formStatus = document.getElementById('formStatus');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = quoteForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                quoteForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                
                formStatus.innerText = 'Thank you! Your request has been sent successfully. We will contact you soon.';
                formStatus.style.color = '#16A34A';
                
                setTimeout(() => {
                    formStatus.innerText = '';
                }, 5000);
            }, 1500);
        });
    }

    // --- Parallax Effect ---
    document.addEventListener('mousemove', (e) => {
        const parallaxImgs = document.querySelectorAll('.parallax-img');
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        parallaxImgs.forEach(img => {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
    });

    // --- Smooth Scroll for all links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
