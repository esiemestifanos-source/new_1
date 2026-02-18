// ======================================================
// GEARSOULS - SHOP PAGE
// Simple shop functionality with Shopify integration
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== CANVAS BACKGROUND ====================
  const canvas = document.getElementById('shopCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function initCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = [];
      const particleCount = Math.floor(width * height / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          color: `rgba(0, ${Math.floor(Math.random() * 155 + 100)}, 255, ${Math.random() * 0.3})`
        });
      }
    }
    
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      
      requestAnimationFrame(animateCanvas);
    }
    
    initCanvas();
    animateCanvas();
    
    window.addEventListener('resize', initCanvas);
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // ==================== SCROLL TO TOP ====================
  const scrollTop = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  });
  
  if (scrollTop) {
    scrollTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== NOTIFICATION FUNCTION ====================
  window.showNotification = function(message) {
    const notification = document.getElementById('shopNotification');
    const messageSpan = document.getElementById('notificationMessage');
    
    messageSpan.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  };

  // ==================== OBSERVE SHOPIFY BUTTON LOAD ====================
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        // Check if Shopify button has loaded
        const shopifyBtn = document.querySelector('.shopify-buy__btn');
        if (shopifyBtn) {
          // Style the Shopify button to match your theme
          shopifyBtn.classList.add('cyber-shopify-btn');
          
          // Add click notification
          shopifyBtn.addEventListener('click', function() {
            setTimeout(() => {
              showNotification('Product added to cart');
            }, 500);
          });
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
// ======================================================
// GEARSOULS - SHOP PAGE
// Simple shop functionality with Shopify integration
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== GENTLE BACKGROUND ANIMATION ====================
  const canvas = document.getElementById('shopCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    
    function initCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      
      // Gentle gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#001a1a');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Gentle flowing waves
      time += 0.002;
      
      // Draw multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        const opacity = 0.03 - (layer * 0.01);
        const speed = 0.5 + (layer * 0.3);
        const amplitude = 30 + (layer * 15);
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
        ctx.lineWidth = 2 - layer * 0.5;
        
        for (let x = 0; x < width; x += 30) {
          const y = height / 2 + 
                    Math.sin(x * 0.005 + time * speed) * amplitude + 
                    Math.cos(x * 0.003 + time * 0.7) * (amplitude * 0.5);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Second wave going opposite direction
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 0, 255, ${opacity * 0.7})`;
        
        for (let x = 0; x < width; x += 30) {
          const y = height / 3 + 
                    Math.cos(x * 0.004 + time * (speed + 0.2)) * (amplitude * 0.8) + 
                    Math.sin(x * 0.002 + time * 0.5) * (amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      // Gentle floating particles (very subtle)
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i) * width * 0.4) + width * 0.5;
        const y = (Math.cos(time * 0.3 + i) * height * 0.3) + height * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, 0.1)`;
        ctx.fill();
      }
      
      requestAnimationFrame(animateCanvas);
    }
    
    initCanvas();
    animateCanvas();
    
    window.addEventListener('resize', initCanvas);
  }

  // ==================== ENHANCED LOGO ANIMATION ====================
  const brand = document.querySelector('.brand');
  const brandLogo = document.querySelector('.brand-logo');
  const brandText = document.querySelector('.brand-text');
  const brandHighlight = document.querySelector('.brand-highlight');
  
  if (brand) {
    brand.addEventListener('mouseenter', function() {
      // Logo animation
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1.15) rotate(5deg)';
        brandLogo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        brandLogo.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)';
        brandLogo.style.borderColor = '#0ff';
      }
      
      // Text animation
      if (brandText) {
        brandText.style.color = '#0ff';
        brandText.style.textShadow = '0 0 10px #0ff, 0 0 20px #f0f';
        brandText.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
        brandText.style.letterSpacing = '3px';
      }
      
      // Highlight animation
      if (brandHighlight) {
        brandHighlight.style.color = '#f0f';
        brandHighlight.style.textShadow = '0 0 10px #f0f, 0 0 30px #0ff';
        brandHighlight.style.transition = 'color 0.3s ease, text-shadow 0.3s ease';
      }
      
      // Add a gentle pulse animation class
      this.classList.add('brand-hover');
    });
    
    brand.addEventListener('mouseleave', function() {
      // Reset logo
      if (brandLogo) {
        brandLogo.style.transform = 'scale(1) rotate(0)';
        brandLogo.style.boxShadow = 'none';
        brandLogo.style.borderColor = 'transparent';
      }
      
      // Reset text
      if (brandText) {
        brandText.style.color = '#fff';
        brandText.style.textShadow = 'none';
        brandText.style.letterSpacing = '1px';
      }
      
      // Reset highlight
      if (brandHighlight) {
        brandHighlight.style.color = '#0ff';
        brandHighlight.style.textShadow = 'none';
      }
      
      // Remove pulse animation class
      this.classList.remove('brand-hover');
    });
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // ==================== SCROLL TO TOP ====================
  const scrollTop = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  });
  
  if (scrollTop) {
    scrollTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== NOTIFICATION FUNCTION ====================
  window.showNotification = function(message) {
    const notification = document.getElementById('shopNotification');
    const messageSpan = document.getElementById('notificationMessage');
    
    messageSpan.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  };

  // ==================== OBSERVE SHOPIFY BUTTON LOAD ====================
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        const shopifyBtn = document.querySelector('.shopify-buy__btn');
        if (shopifyBtn) {
          shopifyBtn.classList.add('cyber-shopify-btn');
          
          shopifyBtn.addEventListener('click', function() {
            setTimeout(() => {
              showNotification('Product added to cart');
            }, 500);
          });
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
// ==================== MOBILE MENU (LIKE INDEX.HTML) ====================
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      
      // Change icon
      const icon = this.querySelector('i');
      if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      const icon = document.querySelector('.menu-toggle i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && menuToggle) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  });
  
  // Close menu on window resize
  window.addEventListener('resize', function() {
    if (nav && window.innerWidth > 768 && nav.classList.contains('active')) {
      nav.classList.remove('active');
      const icon = document.querySelector('.menu-toggle i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
});