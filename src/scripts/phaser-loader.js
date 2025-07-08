/**
 * Phaser.js Scene Loading Utilities
 * Provides visual loading indicators for async database operations
 */

class PhaserLoader {
  constructor() {
    this.activeLoaders = new Map();
    this.loaderId = 0;
    this.currentLoaderId = null; // Track single active loader
  }

  /**
   * Show loading indicator in a Phaser scene
   * @param {Phaser.Scene} scene - The Phaser scene to show loader in
   * @param {string} message - Loading message to display
   * @param {object} options - Styling options
   * @returns {string} loaderId - ID to use when hiding the loader
   */
  showLoader(scene, message = 'Loading...', options = {}) {
    // Hide any existing loader first
    if (this.currentLoaderId) {
      this.hideLoader(this.currentLoaderId);
    }

    const id = `loader_${++this.loaderId}`;
    this.currentLoaderId = id; // Set as current active loader
    
    const config = {
      x: options.x || scene.cameras.main.centerX,
      y: options.y || scene.cameras.main.centerY,
      backgroundColor: options.backgroundColor || 0x000000,
      backgroundAlpha: options.backgroundAlpha || 0.7,
      textColor: options.textColor || '#ffffff',
      textSize: options.textSize || '24px',
      ...options
    };

    // Create overlay background
    const overlay = scene.add.graphics();
    overlay.fillStyle(config.backgroundColor, config.backgroundAlpha);
    overlay.fillRect(0, 0, scene.cameras.main.width, scene.cameras.main.height);
    overlay.setScrollFactor(0); // Stay fixed on screen
    overlay.setDepth(1000); // High depth to appear above everything

    // Create loading text
    const loadingText = scene.add.text(config.x, config.y, message, {
      fontSize: config.textSize,
      fill: config.textColor,
      align: 'center'
    });
    loadingText.setOrigin(0.5);
    loadingText.setScrollFactor(0);
    loadingText.setDepth(1001);

    // No spinner - keeping only text overlay
    
    // Store loader components
    this.activeLoaders.set(id, {
      overlay,
      text: loadingText,
      scene
    });

    return id;
  }

  /**
   * Hide loading indicator
   * @param {string} loaderId - ID returned from showLoader
   */
  hideLoader(loaderId) {
    const loader = this.activeLoaders.get(loaderId);
    if (!loader) return;

    // Clean up all components
    loader.overlay.destroy();
    loader.text.destroy();
    
    // Clean up progress bar if it exists
    if (loader.progressBar) {
      loader.progressBar.destroy();
    }

    this.activeLoaders.delete(loaderId);
    
    // Clear current loader if this was the active one
    if (this.currentLoaderId === loaderId) {
      this.currentLoaderId = null;
    }
  }

  /**
   * Update loading message
   * @param {string} loaderId - ID of the loader
   * @param {string} message - New message to display
   */
  updateMessage(loaderId, message) {
    const loader = this.activeLoaders.get(loaderId);
    if (loader && loader.text) {
      loader.text.setText(message);
    }
  }

  /**
   * Wrapper function for async operations with loading
   * @param {Phaser.Scene} scene - Phaser scene
   * @param {Function} asyncFunction - Async function to execute
   * @param {string} message - Loading message
   * @param {object} options - Loader styling options
   * @returns {Promise} - Result of the async function
   */
  async withLoader(scene, asyncFunction, message = 'Loading...', options = {}) {
    const loaderId = this.showLoader(scene, message, options);
    
    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      console.error('Async operation failed:', error);
      throw error;
    } finally {
      this.hideLoader(loaderId);
    }
  }

  /**
   * Hide current active loader if any
   */
  hideCurrent() {
    if (this.currentLoaderId) {
      this.hideLoader(this.currentLoaderId);
    }
  }

  /**
   * Check if there's an active loader
   * @returns {boolean}
   */
  isActive() {
    return this.currentLoaderId !== null;
  }

  /**
   * Show progress loader with percentage
   * @param {Phaser.Scene} scene - Phaser scene
   * @param {string} message - Base message
   * @param {number} progress - Progress percentage (0-100)
   * @param {object} options - Styling options
   * @returns {string} loaderId
   */
  showProgressLoader(scene, message = 'Loading...', progress = 0, options = {}) {
    // Hide any existing loader first
    if (this.currentLoaderId) {
      this.hideLoader(this.currentLoaderId);
    }

    const id = this.showLoader(scene, `${message} ${progress}%`, options);
    
    // Add progress bar
    const loader = this.activeLoaders.get(id);
    if (loader) {
      const progressBar = scene.add.graphics();
      progressBar.setScrollFactor(0);
      progressBar.setDepth(1001);
      
      const barWidth = 200;
      const barHeight = 10;
      const barX = loader.scene.cameras.main.centerX - barWidth / 2;
      const barY = loader.scene.cameras.main.centerY + 30;
      
      // Background bar
      progressBar.fillStyle(0x333333);
      progressBar.fillRect(barX, barY, barWidth, barHeight);
      
      // Progress fill
      progressBar.fillStyle(0x00ff00);
      progressBar.fillRect(barX, barY, (barWidth * progress) / 100, barHeight);
      
      loader.progressBar = progressBar;
    }
    
    return id;
  }

  /**
   * Update progress loader
   * @param {string} loaderId - Loader ID
   * @param {string} message - Updated message
   * @param {number} progress - Progress percentage (0-100)
   */
  updateProgress(loaderId, message, progress) {
    const loader = this.activeLoaders.get(loaderId);
    if (!loader) return;
    
    // Update text
    loader.text.setText(`${message} ${progress}%`);
    
    // Update progress bar
    if (loader.progressBar) {
      loader.progressBar.clear();
      
      const barWidth = 200;
      const barHeight = 10;
      const barX = loader.scene.cameras.main.centerX - barWidth / 2;
      const barY = loader.scene.cameras.main.centerY + 30;
      
      // Background bar
      loader.progressBar.fillStyle(0x333333);
      loader.progressBar.fillRect(barX, barY, barWidth, barHeight);
      
      // Progress fill
      loader.progressBar.fillStyle(0x00ff00);
      loader.progressBar.fillRect(barX, barY, (barWidth * progress) / 100, barHeight);
    }
  }
}

// Global instance
window.phaserLoader = new PhaserLoader();

export default PhaserLoader; 