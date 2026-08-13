class TypeWriter {
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    
    // Configurable options with robust defaults
    this.typeSpeed = options.typeSpeed || 100;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.delayBeforeDelete = options.delayBeforeDelete || 2000;
    this.delayBeforeType = options.delayBeforeType || 500;

    // Create and append inner wrappers to avoid overriding original element styles
    this.textContainer = document.createElement('span');
    this.textContainer.className = 'typewriter-text';
    
    this.cursor = document.createElement('span');
    this.cursor.className = 'typewriter-cursor';
    this.cursor.textContent = '|';
    
    this.element.innerHTML = '';
    this.element.appendChild(this.textContainer);
    this.element.appendChild(this.cursor);

    this.injectStyles();
    this.type();
  }

  injectStyles() {
    if (!document.getElementById('typewriter-styles')) {
      const style = document.createElement('style');
      style.id = 'typewriter-styles';
      style.textContent = `
        .typewriter-cursor {
          font-weight: 100;
          margin-left: 2px;
          animation: typewriter-blink 0.8s infinite;
        }
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  type() {
    const currentSuite = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentSuite];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.textContainer.textContent = this.txt;

    let dynamicSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    // Add a natural slight variation to typing speed
    if (!this.isDeleting) {
      dynamicSpeed += Math.random() * 40 - 20; 
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      dynamicSpeed = this.delayBeforeDelete;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      dynamicSpeed = this.delayBeforeType;
    }

    setTimeout(() => this.type(), dynamicSpeed);
  }
}

// Initialize typing effect on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const taglineElement = document.querySelector('.hero-tagline');
  
  if (taglineElement) {
    // Define the phrases to cycle through
    const roles = [
      'Frontend Developer.',
      'UI/UX Enthusiast.',
      'Creative Problem Solver.',
      'JavaScript Specialist.'
    ];

    // Instantiate typewriter with options
    new TypeWriter(taglineElement, roles, {
      typeSpeed: 80,
      deleteSpeed: 40,
      delayBeforeDelete: 2000,
      delayBeforeType: 500
    });
  }
});