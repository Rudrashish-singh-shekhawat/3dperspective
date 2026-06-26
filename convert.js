const fs = require('fs');

const htmlContent = fs.readFileSync('c:/Users/rudrashish/OneDrive/Desktop/code/site/gpt/final.html', 'utf8');

// Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
const css = styleMatch ? styleMatch[1] : '';

// Extract Body (excluding script)
let bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<script>/);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

// Extract Script
const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>[\s\S]*?<\/body>/);
let scriptContent = scriptMatch ? scriptMatch[1] : '';

// Remove tailwind config from script if present
scriptContent = scriptContent.replace(/tailwind\.config\s*=\s*\{[\s\S]*?theme:\s*\{[\s\S]*?\}\s*\};\s*/, '');

// Convert HTML to JSX
let jsx = bodyHtml
  .replace(/class=/g, 'className=')
  .replace(/stroke-width=/g, 'strokeWidth=')
  .replace(/stroke-linecap=/g, 'strokeLinecap=')
  .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
  .replace(/stroke-opacity=/g, 'strokeOpacity=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
  .replace(/style="display:\s*none;"/g, 'style={{ display: "none" }}')
  .replace(/style="height:\s*0px;"/g, 'style={{ height: "0px" }}')
  .replace(/style="width:\s*0px;\s*border-right-width:\s*0px;\s*border-right-style:\s*solid;"/g, 'style={{ width: "0px", borderRightWidth: "0px", borderRightStyle: "solid" }}')
  .replace(/style="width:\s*0px;\s*border-left-width:\s*0px;\s*border-left-style:\s*solid;"/g, 'style={{ width: "0px", borderLeftWidth: "0px", borderLeftStyle: "solid" }}')
  .replace(/oncontextmenu="return false;"/g, 'onContextMenu={(e) => e.preventDefault()}')
  .replace(/<input([^>]*[^/])>/g, '<input$1 />')
  .replace(/<br>/g, '<br />')
  .replace(/<circle([^>]*[^/])>/g, '<circle$1 />')
  .replace(/<rect([^>]*[^/])>/g, '<rect$1 />')
  .replace(/<polyline([^>]*[^/])>/g, '<polyline$1 />')
  .replace(/<path([^>]*[^/])>/g, '<path$1 />')
  .replace(/<img([^>]*[^/])>/g, '<img$1 />')
  .replace(/<\/main>/g, '</div></div></main>')
  .replace(/<\/div>\s*$/g, '');

// Process JS to be safe inside useEffect
let jsBody = `
    let animationId;
    try {
      ${scriptContent.replace(/requestAnimationFrame\(animate\)/g, 'animationId = requestAnimationFrame(animate)')}
    } catch(e) { console.error(e); }
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
`;

const reactComponent = `
import React, { useEffect, useRef } from 'react';
import './FourierStandalone.css';

export default function FourierStandalone() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

${jsBody}
  }, []);

  return (
    <div className="fourier-container w-full h-full overflow-hidden bg-surface text-ink font-sans antialiased">
      ${jsx}
    </div>
  );
}
`;

fs.writeFileSync('C:/Users/rudrashish/OneDrive/Desktop/code/portfolio/src/fourier/FourierStandalone.js', reactComponent);
fs.writeFileSync('C:/Users/rudrashish/OneDrive/Desktop/code/portfolio/src/fourier/FourierStandalone.css', css);
console.log('Conversion complete!');
