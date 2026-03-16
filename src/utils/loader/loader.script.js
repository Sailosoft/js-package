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
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
