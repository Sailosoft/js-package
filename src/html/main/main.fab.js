/**
 * FAB Menu Module - Centered Icon Version
 */
const FabMenu = {
  _container: null,
  _mainBtn: null,
  _menu: null,

  _injectStyles() {
    if (document.getElementById("custom-fab-styles")) return;

    const style = document.createElement("style");
    style.id = "custom-fab-styles";
    style.textContent = `
        .custom-fab-container {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 999999;
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-start;
            font-family: -apple-system, system-ui, sans-serif;
            margin: 0; padding: 0; box-sizing: border-box;
        }

        .custom-fab-container *, .custom-fab-container *::before, .custom-fab-container *::after {
            box-sizing: border-box;
        }

        .custom-fab-main {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #818cf8;
            color: white;
            border: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 0; /* Critical reset */
            margin: 0;
            overflow: hidden;
        }

        /* Using a CSS-drawn plus for perfect centering */
        .fab-icon-plus {
            position: relative;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .fab-icon-plus::before, .fab-icon-plus::after {
            content: '';
            position: absolute;
            background: currentColor;
            border-radius: 2px;
        }
        .fab-icon-plus::before { width: 100%; height: 2px; }
        .fab-icon-plus::after { width: 2px; height: 100%; }

        .custom-fab-main.active { 
            transform: rotate(45deg); 
            background: #4b4b55; 
        }
        
        .custom-fab-menu {
            display: none;
            flex-direction: column-reverse;
            margin-bottom: 15px;
            gap: 10px;
            padding: 0;
            margin-left: 0;
        }

        .custom-fab-menu.show { display: flex; }
        
        .custom-fab-item {
            padding: 10px 18px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 20px;
            cursor: pointer;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            font-size: 14px;
            font-weight: 500;
            color: #333;
            transition: all 0.2s;
            line-height: 1.4;
        }

        .custom-fab-item:hover { 
            background: #f8f9fa; 
            transform: translateX(5px);
            border-color: #007bff;
        }
    `;
    document.head.appendChild(style);
  },

  _init() {
    if (this._container || !document.body) return;

    this._injectStyles();

    this._container = document.createElement("div");
    this._container.className = "custom-fab-container";

    this._mainBtn = document.createElement("button");
    this._mainBtn.className = "custom-fab-main";
    this._mainBtn.setAttribute('type', 'button');
    
    // Create a perfectly centered plus icon using CSS bars
    const icon = document.createElement("div");
    icon.className = "fab-icon-plus";
    this._mainBtn.appendChild(icon);

    this._menu = document.createElement("div");
    this._menu.className = "custom-fab-menu";

    this._container.appendChild(this._mainBtn);
    this._container.appendChild(this._menu);
    document.body.appendChild(this._container);

    this._mainBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggle();
    };

    document.addEventListener("click", (e) => {
      if (this._container && !this._container.contains(e.target)) this.close();
    });
  },

  toggle() {
    this._menu.classList.toggle("show");
    this._mainBtn.classList.toggle("active");
  },

  close() {
    this._menu?.classList.remove("show");
    this._mainBtn?.classList.remove("active");
  },

  addItem(text, callback) {
    if (!this._container) this._init();

    const item = document.createElement("div");
    item.className = "custom-fab-item";
    item.innerText = text;
    item.onclick = (e) => {
      e.stopPropagation();
      callback();
      this.close();
    };
    this._menu.appendChild(item);
  }
};

export default FabMenu;