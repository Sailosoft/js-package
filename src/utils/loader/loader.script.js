export async function loadScript(src, type) {
  if (type === "systemjs-importmap") {
    // 1. Fetch the JSON file manually
    const response = await fetch(src);

    const map = await response.json();

    System.addImportMap(map);
    return Promise.resolve();
  }

  // Standard script loading for .js files
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    script.async = false; // Set a timeout - if it doesn't load in 10 seconds, fail it
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    const timeout = setTimeout(() => {
      reject(new Error(`Script timeout: ${src}`));
    }, 10000);

    script.onload = () => {
      clearTimeout(timeout);
      console.log(`✅ Loaded: ${src}`);
      resolve();
    };

    script.onerror = (err) => {
      clearTimeout(timeout);
      console.error(`❌ Failed: ${src}`);
      reject(err);
    };

    document.head.appendChild(script);
  });
}
