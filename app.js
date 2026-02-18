// ======================================================
// GEARSOULS - MASTER APPLICATION v3.0
// All animations, cart, and shop functionality
// ======================================================

// ==================== GLOBAL STATE ====================
const products = [
  { id: 1, name: 'NEON RIDER JACKET', price: 299, category: 'outerwear', image: 'img/0000.jpeg' },
  { id: 2, name: 'CYBERPUNK HOODIE', price: 159, category: 'hoodies', image: 'img/0001.jpeg' },
  { id: 3, name: 'GLITCH EFFECT TEE', price: 79, category: 'tees', image: 'img/0002.jpeg' },
  { id: 4, name: 'TECHWEAR PANTS', price: 229, category: 'bottoms', image: 'img/0003.jpeg' },
  { id: 5, name: 'NEON HOODIE', price: 179, category: 'hoodies', image: 'img/0004.jpeg' },
  { id: 6, name: 'SKULL TEE', price: 89, category: 'tees', image: 'img/0005.jpeg' }
];

let cart = JSON.parse(localStorage.getItem('gearsouls_cart')) || [];

// ==================== CUSTOM CURSOR ====================
function initCursor() {
  if (window.innerWidth <= 768) return;
  
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  if (!cursor || !follower) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .product-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

// ==================== STARS ANIMATION (Cursor Following) ====================
function initStars() {
  const container = document.getElementById('starsContainer');
  if (!container) return;
  
  const starCount = 50;
  const stars = [];
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    container.appendChild(star);
    stars.push({
      element: star,
      x: parseFloat(star.style.left),
      y: parseFloat(star.style.top),
      speed: Math.random() * 0.2 + 0.1
    });
  }
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;
    
    stars.forEach(star => {
      const dx = mouseX - star.x;
      const dy = mouseY - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 20) {
        const angle = Math.atan2(dy, dx);
        const moveX = Math.cos(angle) * (20 - distance) * star.speed;
        const moveY = Math.sin(angle) * (20 - distance) * star.speed;
        
        star.element.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      } else {
        star.element.style.transform = 'translate(0, 0)';
      }
    });
  });
}

// ==================== CANVAS BACKGROUND ====================
function initCanvas() {
  const canvas = document.getElementById('heroCanvas') || document.getElementById('accountCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Create particles
    particles = [];
    const particleCount = Math.floor(width * height / 10000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5})`
      });
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', resize);
  resize();
  animate();
}

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  
  grid.innerHTML = products.map(product => `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">$${product.price}</div>
      <button class="add-to-cart" onclick="addToCart(${product.id})">
        Add to Cart <i class="fas fa-shopping-bag"></i>
      </button>
    </div>
  `).join('');
}

// ==================== CART FUNCTIONS ====================
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  updateCartUI();
  animateCartIcon();
  showNotification('Added to cart!', 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function saveCart() {
  localStorage.setItem('gearsouls_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<div style="text-align: center; padding: 40px;">Your cart is empty</div>';
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price}</div>
            <div class="cart-item-controls">
              <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
  
  if (cartTotal) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total}`;
  }
}

function animateCartIcon() {
  const icon = document.getElementById('cartIcon');
  if (icon) {
    icon.style.transform = 'scale(1.3)';
    setTimeout(() => icon.style.transform = 'scale(1)', 200);
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--primary)' : 'var(--secondary)'};
    color: var(--darker);
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    z-index: 10001;
    animation: slideUp 0.3s;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ==================== CART SIDEBAR ====================
function initCartSidebar() {
  const cartIcon = document.getElementById('cartIcon');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  
  if (cartIcon && cartSidebar) {
    cartIcon.addEventListener('click', () => {
      cartSidebar.classList.add('open');
    });
  }
  
  if (closeCart && cartSidebar) {
    closeCart.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
    });
  }
}

// ==================== GALLERY FILTERS ====================
function initGalleryFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  if (!filters.length) return;
  
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      const items = document.querySelectorAll('.gallery-item');
      
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px' });
  
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
}

// ==================== CHECKOUT ====================
window.checkout = function() {
  if (cart.length === 0) {
    showNotification('Your cart is empty', 'error');
    return;
  }
  
  showNotification('Proceeding to checkout...', 'success');
  // Add your checkout logic here
}

// ==================== EXPOSE FUNCTIONS GLOBALLY ====================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.showSignup = function() {
  document.getElementById('signinForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
};
window.showSignin = function() {
  document.getElementById('signinForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
};

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
  // Remove preloader
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.classList.add('fade-out');
  }, 2000);
  
  // Initialize all features
  initCursor();
  initStars();
  initCanvas();
  renderProducts();
  updateCartUI();
  initCartSidebar();
  initGalleryFilters();
  initScrollReveal();
  initMobileMenu();
  
  // Add reveal class to elements
  document.querySelectorAll('.hero-content, .gallery-item, .product-card, .auth-card').forEach(el => {
    el.classList.add('reveal');
  });
});