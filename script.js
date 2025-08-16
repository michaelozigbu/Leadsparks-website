// Waitlist Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');
    const emailInput = document.getElementById('email');
    const ctaButton = document.querySelector('.cta-button');

    // Form submission handler
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        submitWaitlist(email);
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Submit waitlist function
    function submitWaitlist(email) {
        // Change button state
        const originalText = ctaButton.innerHTML;
        ctaButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
        ctaButton.disabled = true;
        
        // Try to send to backend API first
        fetch('/api/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server not available');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                showMessage(data.message, 'success');
                emailInput.value = '';
                
                // Update social proof number if available
                if (data.totalSubscribers) {
                    updateSocialProof(data.totalSubscribers);
                }
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Backend error:', error);
            // Fallback: simulate success for demo purposes
            setTimeout(() => {
                showMessage('Welcome to the waitlist! We\'ll notify you when we launch.', 'success');
                emailInput.value = '';
                ctaButton.innerHTML = originalText;
                ctaButton.disabled = false;
                
                // Store in localStorage as fallback
                const existingEmails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
                if (!existingEmails.includes(email)) {
                    existingEmails.push(email);
                    localStorage.setItem('waitlist_emails', JSON.stringify(existingEmails));
                    console.log('Email stored locally:', email);
                    console.log('Total local emails:', existingEmails.length);
                }
            }, 1500);
        })
        .finally(() => {
            if (ctaButton.disabled) {
                ctaButton.innerHTML = originalText;
                ctaButton.disabled = false;
            }
        });
    }
    
    // Update social proof number
    function updateSocialProof(count) {
        const socialProofText = document.querySelector('.social-proof h2');
        if (socialProofText) {
            socialProofText.textContent = `Join ${count}+ people waiting to spark their sales`;
        }
    }

    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            messageDiv.style.background = 'linear-gradient(135deg, #87ceeb 0%, #5f9ea0 100%)';
            messageDiv.style.color = '#000000';
        } else {
            messageDiv.style.background = 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)';
        }
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 5000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.value-card, .logo-placeholder');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Admin Password Protection
function showAdminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'SOMTO') {
        window.open('/admin.html', '_blank');
    } else if (password !== null) {
        alert('Incorrect password. Please try again.');
    }
}
