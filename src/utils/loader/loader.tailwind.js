export async function loadTailwind() {
  if (document.getElementById("tailwind-cdn")) {
    console.log("Tailwind already loaded.");
    // document.removeChild(document.getElementById("tailwind-cdn"));
    document.getElementById("tailwind-cdn").remove();
    // document.head.appendChild(document.getElementById("tailwind-cdn"));
    // return Promise.resolve();
  }; // Avoid double loading

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "tailwind-cdn";
    script.src = "https://cdn.tailwindcss.com";

    script.onload = () => {
      console.log("Tailwind engine is ready.");
      // Optional: Configure your theme dynamically
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              // gamingRed: "#ff4500",
            },
          },
        },
      };
      resolve();
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });
}
