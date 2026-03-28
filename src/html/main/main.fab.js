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
            bottom: 30px;
            left: 30px;
            z-index: 999999;
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-start;
            font-family: 'Inter', system-ui, sans-serif;
            margin: 0; padding: 0; box-sizing: border-box;
        }

        .custom-fab-main {
            width: 48px;
            height: 48px;
            border-radius: 12px; /* Matching the 12px card radius */
            background: #1a1a1a; /* Slate Surface */
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
            padding: 0;
            margin: 0;
        }

        .custom-fab-main:hover {
            background: #252525;
            border-color: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }

        /* Minimalist "X" / "+" transition */
        .fab-icon-plus {
            position: relative;
            width: 16px;
            height: 16px;
            transition: transform 0.3s ease;
        }
        .fab-icon-plus::before, .fab-icon-plus::after {
            content: '';
            position: absolute;
            background: currentColor;
            border-radius: 1px;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
        }
        .fab-icon-plus::before { width: 100%; height: 1.5px; }
        .fab-icon-plus::after { width: 1.5px; height: 100%; }

        .custom-fab-main.active .fab-icon-plus {
            transform: rotate(135deg); /* Smoother turn to 'X' */
        }
        
        .custom-fab-menu {
            display: none;
            flex-direction: column-reverse;
            margin-bottom: 12px;
            gap: 8px;
        }

        .custom-fab-menu.show { display: flex; }
        
        .custom-fab-item {
            padding: 8px 16px;
            background: rgba(20, 20, 20, 0.8); /* Glassmorphism */
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            cursor: pointer;
            white-space: nowrap;
            font-size: 13px;
            font-weight: 500;
            color: #a1a1a1; /* Matches adm-text-muted */
            transition: all 0.2s;
            animation: fabSlideIn 0.3s ease forwards;
        }

        @keyframes fabSlideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .custom-fab-item:hover { 
            background: #ffffff; 
            color: #000000;
            border-color: #ffffff;
            transform: translateX(4px);
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
    this._mainBtn.setAttribute("type", "button");

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
  },
};

export default FabMenu;
