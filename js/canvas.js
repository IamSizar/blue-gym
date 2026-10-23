/**
 * BLUE GYM - DIGITAL ANTI-GRAFFITI CANVAS ENGINE
 * Realistic aerosol spray paint simulator with Anti-Graffiti Pressure-Wash cleaning
 * Language: Kurdish Badini (کوردی بادینی)
 */

class GraffitiWall {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // State
    this.isDrawing = false;
    this.currentColor = '#3784AB'; // Default primary color
    this.brushRadius = 24;
    this.sprayDensity = 45;
    this.drips = [];
    this.lastPos = { x: 0, y: 0 };
    this.stationaryTime = 0;
    this.audioCtx = null;
    
    // Initialization
    this.initCanvasSize();
    this.setupEventListeners();
    this.startAnimationLoop();
  }

  initCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;

    // Draw initial faint Blue Gym watermark stencil on wall
    this.drawWallStencil();
  }

  drawWallStencil() {
    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'rgba(55, 132, 171, 0.08)';
    this.ctx.font = '900 68px "Arial Black", Impact, sans-serif';
    this.ctx.fillText('BLUE GYM', this.canvasWidth / 2, this.canvasHeight / 2 - 20);
    this.ctx.font = '700 24px "Segoe UI", sans-serif';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.fillText('دیوارێ گرافێتی یێ دیجیتاڵی', this.canvasWidth / 2, this.canvasHeight / 2 + 40);
    this.ctx.restore();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize());

    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.startSpray(e));
    window.addEventListener('mousemove', (e) => this.continueSpray(e));
    window.addEventListener('mouseup', () => this.stopSpray());

    // Touch events for mobile/tablet
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startSpray(e);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isDrawing) {
        this.continueSpray(e);
      }
    }, { passive: false });

    window.addEventListener('touchend', () => this.stopSpray());

    // Color Swatches
    const swatches = document.querySelectorAll('.color-btn');
    swatches.forEach(btn => {
      btn.addEventListener('click', (e) => {
        swatches.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentColor = btn.dataset.color || '#3784AB';
      });
    });

    // Custom color picker
    const customColor = document.getElementById('customColorPicker');
    if (customColor) {
      customColor.addEventListener('input', (e) => {
        this.currentColor = e.target.value;
        swatches.forEach(b => b.classList.remove('active'));
      });
    }

    // Brush Radius Slider
    const sizeSlider = document.getElementById('brushSizeSlider');
    const sizeValue = document.getElementById('brushSizeVal');
    if (sizeSlider) {
      sizeSlider.addEventListener('input', (e) => {
        this.brushRadius = parseInt(e.target.value, 10);
        if (sizeValue) sizeValue.textContent = this.brushRadius + 'px';
      });
    }

    // Anti-Graffiti Clean Button
    const cleanBtn = document.getElementById('cleanCanvasBtn');
    if (cleanBtn) {
      cleanBtn.addEventListener('click', () => this.antiGraffitiClean());
    }

    // Save Graffiti Artwork Button
    const saveBtn = document.getElementById('saveCanvasBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveArtwork());
    }
  }

  handleResize() {
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
    this.ctx.putImageData(imgData, 0, 0);
  }

  // Web Audio Synthetic Spray Sound
  playSpraySound() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (!this.noiseNode) {
        const bufferSize = this.audioCtx.sampleRate * 0.1;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        this.noiseNode = this.audioCtx.createBufferSource();
        this.noiseNode.buffer = buffer;
        this.noiseNode.loop = true;

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 3200;
        filter.Q.value = 2.5;

        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(0.04, this.audioCtx.currentTime);

        this.noiseNode.connect(filter);
        filter.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
        this.noiseNode.start();
      } else if (this.gainNode) {
        this.gainNode.gain.setTargetAtTime(0.04, this.audioCtx.currentTime, 0.05);
      }
    } catch (e) {
      // Audio might be blocked by browser policy until interaction
    }
  }

  stopSpraySound() {
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setTargetAtTime(0.0001, this.audioCtx.currentTime, 0.05);
    }
  }

  // Pressure Washer Water Swoosh Sound
  playCleanSound() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const bufferSize = this.audioCtx.sampleRate * 0.8;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3500, this.audioCtx.currentTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.8);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      noise.start();
    } catch (e) {
      // Audio optional
    }
  }

  startSpray(e) {
    this.isDrawing = true;
    this.lastPos = this.getPointerPos(e);
    this.stationaryTime = 0;
    this.playSpraySound();
    this.sprayAt(this.lastPos.x, this.lastPos.y);
  }

  continueSpray(e) {
    if (!this.isDrawing) return;
    const currentPos = this.getPointerPos(e);

    // Calculate distance moved
    const dx = currentPos.x - this.lastPos.x;
    const dy = currentPos.y - this.lastPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // If staying nearly in one place, increase stationary time to trigger paint drip
    if (dist < 4) {
      this.stationaryTime++;
      if (this.stationaryTime > 25 && Math.random() < 0.25) {
        this.createDrip(currentPos.x, currentPos.y);
      }
    } else {
      this.stationaryTime = Math.max(0, this.stationaryTime - 2);
    }

    // Interpolate spray dots along trajectory for smooth strokes
    const steps = Math.max(1, Math.floor(dist / 4));
    for (let i = 0; i <= steps; i++) {
      const interpX = this.lastPos.x + (dx * (i / steps));
      const interpY = this.lastPos.y + (dy * (i / steps));
      this.sprayAt(interpX, interpY);
    }

    this.lastPos = currentPos;
  }

  stopSpray() {
    this.isDrawing = false;
    this.stationaryTime = 0;
    this.stopSpraySound();
  }

  sprayAt(centerX, centerY) {
    const density = this.sprayDensity;
    const radius = this.brushRadius;
    const ctx = this.ctx;

    ctx.save();
    ctx.fillStyle = this.currentColor;

    for (let i = 0; i < density; i++) {
      // Gaussian distribution for realistic aerosol spray core
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 1.6) * radius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      // Particle size varies with distance from center
      const particleSize = Math.max(0.6, (1 - (r / radius)) * 2.2 * Math.random());
      const alpha = Math.max(0.1, 0.7 - (r / radius) * 0.55);

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  createDrip(x, y) {
    this.drips.push({
      x: x + (Math.random() * 6 - 3),
      y: y,
      length: Math.random() * 45 + 20,
      currentLength: 0,
      width: Math.random() * 2.5 + 1.2,
      color: this.currentColor,
      speed: Math.random() * 1.5 + 0.8
    });
  }

  startAnimationLoop() {
    const loop = () => {
      // Animate active paint drips
      if (this.drips.length > 0) {
        this.updateDrips();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  updateDrips() {
    const ctx = this.ctx;
    ctx.save();

    for (let i = this.drips.length - 1; i >= 0; i--) {
      const drip = this.drips[i];
      if (drip.currentLength < drip.length) {
        ctx.fillStyle = drip.color;
        ctx.globalAlpha = 0.85;

        ctx.beginPath();
        ctx.arc(drip.x, drip.y + drip.currentLength, drip.width / 2, 0, Math.PI * 2);
        ctx.fill();

        drip.currentLength += drip.speed;

        // Droplet tear at the tip of the drip
        if (drip.currentLength >= drip.length) {
          ctx.beginPath();
          ctx.arc(drip.x, drip.y + drip.currentLength + 2, drip.width * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        this.drips.splice(i, 1);
      }
    }
    ctx.restore();
  }

  /**
   * ANTI-GRAFFITI PRESSURE-WASH CLEANING
   * Animated pressure-jet wiping effect with Badini status updates
   */
  antiGraffitiClean() {
    const overlay = document.getElementById('cleaningOverlay');
    const statusText = document.getElementById('canvasStatusText');
    const cleanBtn = document.getElementById('cleanCanvasBtn');

    if (cleanBtn) cleanBtn.disabled = true;
    if (statusText) statusText.textContent = 'دژە-گرافێتی: دیوار دهێتە پاقژکرن ب ڕێکا ئاڤا ب هێز...';

    this.playCleanSound();

    if (overlay) {
      overlay.classList.add('cleaning');
    }

    // After sweep completes, wipe the canvas clean
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drips = [];
      this.drawWallStencil();

      if (overlay) {
        overlay.classList.remove('cleaning');
      }

      if (statusText) {
        statusText.innerHTML = '<span style="color: #10B981;">✓ دیوار ب تمامی هاتە پاقژکرن! هین دشێن تابلۆیەکێ نوی دروست بکەن.</span>';
      }

      if (cleanBtn) cleanBtn.disabled = false;
    }, 700);
  }

  saveArtwork() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Add sleek dark background for the download image
    tempCtx.fillStyle = '#0A0E13';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(this.canvas, 0, 0);

    // Add signature tag
    tempCtx.font = '700 24px sans-serif';
    tempCtx.fillStyle = '#3784AB';
    tempCtx.fillText('BLUE GYM - Digital Anti-Graffiti Wall', 30, tempCanvas.height - 30);

    const link = document.createElement('a');
    link.download = 'blue-gym-graffiti-' + Date.now() + '.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.blueGymGraffiti = new GraffitiWall('graffitiCanvas');
});
