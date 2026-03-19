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
    console.log(`Loading script: ${src}`);
    const script = document.createElement("script");
    script.src = src;
    script.async = false; // Set a timeout - if it doesn't load in 10 seconds, fail it
    script.type = type || "text/javascript";
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

export async function loadImportMap(src) {
  const response = await fetch(src);
  const map = await response.json();

  const script = document.createElement("script");
  script.type = "importmap";
  script.textContent = JSON.stringify(map);

  document.head.appendChild(script);
  console.log("✅ Import map injected");
}

export async function loadTSX(src) {
  const response = await fetch(src);
  const code = await response.text();

  const transformed = Babel.transform(code, {
    filename: src,
    presets: [
      ["typescript", { jsxPragma: "React", jsxPragmaFrag: "React.Fragment" }],
      ["react", { runtime: "automatic" }], // 👈 automatic runtime keeps imports
    ],
    sourceType: "module",
  }).code;
  const script = document.createElement("script");
  script.type = "module";
  script.textContent = transformed;
  document.head.appendChild(script);

  console.log(`✅ Loaded TSX: ${src}`);
}
