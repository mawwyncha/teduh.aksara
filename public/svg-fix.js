// ULTIMATE SVG FIX - CORRECT VERSION
(function() {
  console.log("?? Loading ULTIMATE SVG path fix...");
  
  // Patch setAttribute recursively
  function patchElement(element) {
    if (!element || element._svgPatched) return;
    
    const originalSetAttribute = element.setAttribute;
    element.setAttribute = function(name, value) {
      if (name === 'd' && typeof value === 'string') {
        // THE EXACT ERROR PATTERN
        if (value.includes('….7')) {
          console.warn('?? CRITICAL FIX APPLIED:', value.substring(0, 50));
          value = value.replace(/…\.7/g, '...0.7');
        }
        
        // Clean all path data
        value = value
          .replace(/\u2026/g, '...')
          .replace(/\.{4,}/g, '...')
          .replace(/(\.{3,})(\d)/g, '$1 $2')
          .replace(/[^\d\s\.,MmLlHhVvCcSsQqTtAaZz\-]/g, '');
      }
      return originalSetAttribute.call(this, name, value);
    };
    
    element._svgPatched = true;
  }
  
  // Function to start observing
  function startObserving() {
    if (!document.body) {
      // Body belum ready, coba lagi nanti
      setTimeout(startObserving, 50);
      return;
    }
    
    // Patch existing elements
    document.querySelectorAll('path').forEach(patchElement);
    
    // Observe new elements
    try {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'path') {
              patchElement(node);
            }
            if (node.querySelectorAll) {
              node.querySelectorAll('path').forEach(patchElement);
            }
          });
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      console.log("? ULTIMATE SVG fix activated (MutationObserver ready)");
    } catch (e) {
      console.error("? Failed to setup MutationObserver:", e);
    }
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving);
  } else {
    startObserving();
  }
  
  // Also patch any existing paths immediately
  if (document.body) {
    document.querySelectorAll('path').forEach(patchElement);
  }
  
  console.log("? ULTIMATE SVG fix loaded, waiting for DOM...");
})();
