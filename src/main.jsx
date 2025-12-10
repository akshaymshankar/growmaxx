import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Debug: Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<div style="color: #FF7A5C; padding: 40px; background: #050505; font-family: monospace; min-height: 100vh;"><h1>❌ Root element not found!</h1><p>Check index.html for &lt;div id="root"&gt;&lt;/div&gt;</p></div>';
} else {
  console.log('✅ Root element found, mounting React...');
  
  // Show a loading message immediately
  rootElement.innerHTML = '<div style="color: #BFFF00; padding: 40px; background: #050505; font-family: monospace; text-align: center; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;"><h1>🔄 Loading React...</h1><p style="color: #888;">If this message doesn\'t disappear, React failed to mount.</p></div>';
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ React app mounted successfully!');
  } catch (error) {
    console.error('❌ Failed to render app:', error);
    rootElement.innerHTML = `
      <div style="padding: 40px; color: #BFFF00; background: #050505; font-family: monospace; min-height: 100vh;">
        <h1 style="color: #FF7A5C;">❌ Error Loading App</h1>
        <pre style="color: #fff; background: #111; padding: 20px; border-radius: 8px; overflow-x: auto;">${error.toString()}</pre>
        <pre style="color: #888; background: #111; padding: 20px; border-radius: 8px; overflow-x: auto; margin-top: 10px;">${error.stack}</pre>
      </div>
    `;
  }
}
