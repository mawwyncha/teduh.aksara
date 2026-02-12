// vite-svg-fix-plugin.js - ULTIMATE FIX
export default function svgFixPlugin() {
  return {
    name: 'svg-fix',
    
    transform(code, id) {
      // Process ALL .tsx files, even dynamically loaded ones
      if (id.endsWith('.tsx')) {
        let fixed = code;
        let changed = false;
        
        // CRITICAL FIX: The exact error pattern
        if (fixed.includes('….7')) {
          console.log('?? Found critical error in:', id.split('/').pop());
          fixed = fixed.replace(/…\.7/g, '...0.7');
          changed = true;
        }
        
        // Fix all variants
        const fixes = [
          [/…\.7/g, '...0.7'],           // ….7 ? ...0.7
          [/\u2026\.7/g, '...0.7'],       // …\.7 ? ...0.7
          [/\.{4,}7/g, '...0.7'],         // ....7 ? ...0.7
          [/\.{4,}/g, '...'],            // 4+ dots ? 3 dots
          [/\u2026/g, '...'],            // ellipsis ? 3 dots
          [/(\.{3,})(\d)/g, '$1 $2'],    // ...7 ? ... 7
        ];
        
        fixes.forEach(([pattern, replacement]) => {
          const before = fixed;
          fixed = fixed.replace(pattern, replacement);
          if (before !== fixed) {
            console.log(`  ? Fixed pattern: ${pattern} in ${id.split('/').pop()}`);
            changed = true;
          }
        });
        
        if (changed) {
          return fixed;
        }
      }
      return null;
    },
    
    // Handle hot module replacement
    handleHotUpdate({ file, read, server }) {
      if (file.endsWith('.tsx')) {
        console.log('?? Hot update detected:', file.split('/').pop());
        return server.transformRequest(file);
      }
    }
  };
}
