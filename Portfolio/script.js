// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky Header Logic
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Update active state in nav manually (optional)
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// GitHub API Fetch
async function fetchGithubRepos() {
    const repoContainer = document.getElementById('repo-container');
    
    // Initial skeleton loading state
    repoContainer.innerHTML = `
        <div class="repo-card" style="opacity: 0.6;">Loading repos...</div>
        <div class="repo-card" style="opacity: 0.6;">Loading repos...</div>
        <div class="repo-card" style="opacity: 0.6;">Loading repos...</div>
    `;

    try {
        const response = await fetch('https://api.github.com/users/Nishanth1205-web/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const repos = await response.json();
        repoContainer.innerHTML = ''; // Clear placeholders
        
        if (repos.length === 0) {
            repoContainer.innerHTML = '<p style="color: var(--text-muted);">No public repositories found yet.</p>';
            return;
        }

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <div class="repo-header">
                    <i class="fab fa-github"></i>
                    <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                </div>
                <p class="repo-desc">${repo.description || 'No description available.'}</p>
                <div class="repo-lang"><span style="color:var(--emerald-green); font-family:var(--font-heading); font-size: 0.8rem;">● ${repo.language || 'Code'}</span></div>
            `;
            repoContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching repos:', error);
        repoContainer.innerHTML = '<p style="color: var(--text-muted);">Unable to load repositories at this time.</p>';
    }
}

// Call on load
fetchGithubRepos();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        
        // Mock Submission Delay
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            submitBtn.style.background = 'var(--emerald-green)';
            submitBtn.style.color = '#000';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
            
        }, 1500);
    });
}

// Word Transition Effect
const words = ["Full Stack", "Frontend", "Web"];
let textIndex = 0;
const textElement = document.querySelector('.animated-text');

if (textElement) {
    setInterval(() => {
        textElement.style.opacity = 0;
        
        setTimeout(() => {
            textIndex = (textIndex + 1) % words.length;
            textElement.textContent = words[textIndex];
            textElement.style.opacity = 1;
        }, 500);
    }, 3000);
}

// Premium Fluid Mouse Cursor
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
    // Dot instantly follows mouse
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    // Ring has a smooth trailing effect
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
});

// Interactive hover effects
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-chip, .icon-link, .slider-btn');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '70px';
        cursorDot.style.height = '70px';
        cursorDot.innerHTML = '<i class="fas fa-hand-pointer" style="display: block;"></i>';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorDot.innerHTML = '';
    });
});

// Portfolio Slider
const frames = document.querySelectorAll('.portfolio-frame');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentFrameIndex = 0;

if (frames.length > 0) {
    const navigateSlider = (direction) => {
        const outFrame = frames[currentFrameIndex];
        outFrame.classList.remove('active', 'entering');
        
        // Force reflow
        void outFrame.offsetWidth;
        outFrame.classList.add('leaving');
        
        if (direction === 'next') {
            currentFrameIndex = (currentFrameIndex + 1) % frames.length;
        } else {
            currentFrameIndex = (currentFrameIndex - 1 + frames.length) % frames.length;
        }
        
        const inFrame = frames[currentFrameIndex];
        inFrame.classList.remove('leaving');
        
        // Force reflow
        void inFrame.offsetWidth;
        inFrame.classList.add('active', 'entering');
    };

    if (nextBtn) nextBtn.addEventListener('click', () => navigateSlider('next'));
    if (prevBtn) prevBtn.addEventListener('click', () => navigateSlider('prev'));
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: Play once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

// tsParticles Deep Space Background
if (typeof tsParticles !== "undefined") {
    tsParticles.load("tsparticles", {
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 }
            }
        },
        particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
            move: { enable: true, outModes: { default: "out" }, random: true, speed: 0.8, straight: false },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.3, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } }
        },
        detectRetina: true
    });
}
