export const mainTemplateItem = ({
  appName,
  icon,
  appKey,
  description
}) => html`<div
      class="neo-raised neo-tile rounded-xl p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300"
      onclick="launchApp('${appKey}')"
    >
      <div class="flex justify-between items-start">
        <span
          class="material-symbols-outlined text-4xl text-primary"
          data-icon="${icon}"
          >${icon}</span
        >
        <button
          class="neo-raised neo-button text-[10px] font-bold px-2 py-1 rounded text-on-surface-variant hover:text-primary"
          onclick="
            event.stopPropagation();
            setDefault(${appKey});
          "
        >
          SET DEFAULT
        </button>
      </div>
      <div>
        <h3 class="text-on-surface font-semibold text-lg">${appName}</h3>
        <p class="text-on-surface-variant text-xs">${description}</p>
      </div>
    </div>`;
