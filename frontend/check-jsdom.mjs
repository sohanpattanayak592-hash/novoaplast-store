import jsdom from 'jsdom';
const { JSDOM } = jsdom;

JSDOM.fromURL("https://novoplast-store.vercel.app/", {
  runScripts: "dangerously",
  resources: "usable",
  pretendToBeVisual: true
}).then(dom => {
  dom.window.addEventListener('error', event => {
    console.error("Global Error:", event.message, event.filename, event.lineno, event.colno, event.error);
  });
  
  dom.window.addEventListener('unhandledrejection', event => {
    console.error("Unhandled Rejection:", event.reason);
  });

  const originalConsoleError = dom.window.console.error;
  dom.window.console.error = (...args) => {
    console.error("Console Error:", ...args);
    originalConsoleError(...args);
  };

  setTimeout(() => {
    console.log("Root content after 5s:", dom.window.document.getElementById('root')?.innerHTML);
  }, 5000);
}).catch(e => console.error("JSDOM Error:", e));
