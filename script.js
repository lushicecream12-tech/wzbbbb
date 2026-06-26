const elasticButtons = document.querySelectorAll(".elastic-button");
const appScreen = document.querySelector(".app-screen");
const moreMorph = document.querySelector(".more-morph");
const composeMorph = document.querySelector(".compose-morph");
const profileMorph = document.querySelector(".profile-morph");
const panelBackdrop = document.querySelector(".panel-backdrop");
const panelContent = document.querySelector(".panel-content");
const usersButton = document.querySelector("[data-users-open]");
const tutorialRestartButton = document.querySelector("[data-tutorial-restart]");
const usersList = document.querySelector(".users-list");
const postForm = document.querySelector(".post-form");
const postsFeed = document.querySelector(".posts-feed");
const notificationsFeed = document.querySelector(".notifications-feed");
const homePage = document.querySelector(".home-page");
const routePage = document.querySelector(".route-page");
const routeContent = document.querySelector(".route-content");
const notificationsPage = document.querySelector(".notifications-page");
const postFilterMorph = document.querySelector(".post-filter-morph");
const postFilterDragShell = document.querySelector(".post-filter-drag-shell");
const postFilterTrigger = document.querySelector(".post-filter-trigger");
const postFilterClose = document.querySelector(".post-filter-close");
const postSortButtons = document.querySelectorAll("[data-post-sort]");
const notificationDeleteMorph = document.querySelector(".notification-delete-morph");
const notificationDeleteTrigger = document.querySelector(".notification-delete-trigger");
const notificationDeleteClose = document.querySelector(".notification-delete-close");
const deleteAllNotificationsButton = document.querySelector("[data-delete-all-notifications]");
const selectNotificationsButton = document.querySelector("[data-select-notifications]");
const confirmSelectedNotificationsButton = document.querySelector("[data-confirm-selected-notifications]");
const composeMessage = document.querySelector(".compose-message");
const authTabs = document.querySelectorAll("[data-auth-mode]");
const authForms = document.querySelectorAll("[data-auth-form]");
const authPanel = document.querySelector(".auth-panel");
const authTabsWrap = document.querySelector(".auth-tabs");
const authFormWindow = document.querySelector(".auth-form-window");
const authTitle = document.querySelector(".auth-title");
const authMessage = document.querySelector(".auth-message");
const loggedPanel = document.querySelector(".logged-panel");
const loggedName = document.querySelector(".logged-name");
const logoutButton = document.querySelector(".logout-button");
const profileSettingsTrigger = document.querySelector(".profile-settings-trigger");
const profileSettingsPanel = document.querySelector(".profile-settings-panel");
const optimizationToggle = document.querySelector(".optimization-toggle");
const transparencySlider = document.querySelector(".transparency-slider");
const bottomDock = document.querySelector(".bottom-dock");
const scrollTopBubble = document.querySelector(".scroll-top-bubble");
const dockTabs = document.querySelectorAll("[data-dock-tab]");
const tutorialOverlay = document.querySelector(".tutorial-overlay");
const tutorialFocus = document.querySelector(".tutorial-focus");
const tutorialCard = document.querySelector(".tutorial-card");
const tutorialStepLabel = document.querySelector(".tutorial-step-label");
const tutorialTitle = document.querySelector("#tutorial-title");
const tutorialCopy = document.querySelector(".tutorial-copy");
const tutorialPrimary = document.querySelector("[data-tutorial-primary]");
const tutorialSecondary = document.querySelector("[data-tutorial-secondary]");
const tutorialSkip = document.querySelector(".tutorial-skip");

const tripRouteStops = [
  {
    place: "Przejazd (Polska → Serbia)",
    day: 1,
    date: "20 lipca",
    description: "Wyjazd z Polski i przejazd do Serbii.",
  },
  {
    place: "Nowy Sad",
    day: 2,
    date: "21 lipca",
    description: "Zwiedzanie miasta i twierdzy.",
  },
  {
    place: "Kanion Matka",
    day: 3,
    date: "22 lipca",
    description: "Rejs i zwiedzanie kanionu.",
  },
  {
    place: "Ochryda",
    day: 4,
    date: "23 lipca",
    description: "Zwiedzanie miasta i rejs po jeziorze.",
  },
  {
    place: "Veria",
    day: 5,
    date: "24 lipca",
    description: "Msza Święta i zwiedzanie.",
  },
  {
    place: "Meteory i Saloniki",
    day: 6,
    date: "25 lipca",
    description: "Zwiedzanie klasztorów i miasta.",
  },
  {
    place: "Morze Egejskie",
    day: 7,
    date: "26 lipca",
    description: "Odpoczynek i plażowanie.",
  },
  {
    place: "Skopje",
    day: 8,
    date: "27 lipca",
    description: "Zwiedzanie stolicy Macedonii.",
  },
  {
    place: "Smederewo",
    day: 9,
    date: "28 lipca",
    description: "Zwiedzanie twierdzy.",
  },
  {
    place: "Budapeszt",
    day: 10,
    date: "29 lipca",
    description: "Relaks w termach.",
  },
  {
    place: "Wiedeń",
    day: 11,
    date: "30 lipca",
    description: "Zwiedzanie i powrót do Polski.",
  },
];
const tripRouteStartDate = new Date(2026, 6, 20, 0, 0, 0);
const tripRouteDayMs = 24 * 60 * 60 * 1000;
const tripRouteCenterX = 180;
const tripRouteTopOffset = 38;
const tripRouteStartY = 92;
const tripRouteTurnGap = 220;
const tripRouteWave = 34;

const localUsersKey = "wakacje-z-bogiem-users";
const currentUserKey = "wakacje-z-bogiem-current-user";
const localPostsKey = "wakacje-z-bogiem-posts";
const notificationsReadKey = "wakacje-z-bogiem-notifications-read";
const dismissedNotificationsKey = "wakacje-z-bogiem-dismissed-notifications";
const tutorialSeenKey = "wakacje-z-bogiem-tutorial-seen";
const optimizationKey = "wakacje-z-bogiem-optimization";
const transparencyKey = "wakacje-z-bogiem-transparency";
const defaultAppSettings = Object.freeze({
  optimization: false,
  transparency: 50,
});
const dockCollapseThreshold = 55;
const dockExpandThreshold = 35;
const firebaseConfig = window.WZB_FIREBASE_CONFIG;
const firebaseBaseUrl = firebaseConfig?.databaseURL?.replace(/\/$/, "");
let useLocalDatabase = !firebaseBaseUrl;
let profileCloseTimer = null;
let activeDockIndex = 0;
let suppressDockClick = false;
let openPostPanel = null;
let lastLikedKey = "";
let lastDislikedKey = "";
let contrastFrame = 0;
let pendingDeletePostId = null;
let cachedNotifications = [];
let lastAppScrollTop = 0;
let dockExpandTimer = 0;
let dockCandyTimer = 0;
let dockTouchLightTimer = 0;
let scrollTopBubbleTimer = 0;
let tutorialStep = 0;
let notificationDeleteOpen = false;
let notificationSelectionMode = false;
let notificationDeleteCloseTimer = 0;
let notificationDeleteAnimationFrame = 0;
let postSortMode = "newest";
let postFilterAnimationFrame = 0;
let postFilterTargetOpen = false;
let postFilterIgnoreClickUntil = 0;
let settingsSaveTimer = 0;
let routePreviewDate = null;
let selectedNotificationIds = new Set();
const expandedPostTexts = new Set();
const clickSound = new Audio("./przycisk.mp3");
clickSound.preload = "auto";
clickSound.volume = 0.42;
const heartSound = new Audio("./serduszko.mp3");
heartSound.preload = "auto";
heartSound.volume = 0.5;

const normalizeAppSettings = (settings = {}) => {
  const transparency = Number(settings?.transparency);

  return {
    optimization: settings?.optimization === true,
    transparency: Math.max(0, Math.min(100, Number.isFinite(transparency) ? transparency : defaultAppSettings.transparency)),
  };
};

const readSessionUserForSettings = () => {
  try {
    return JSON.parse(localStorage.getItem(currentUserKey) || "null");
  } catch {
    return null;
  }
};

const getUserAppSettings = (user) =>
  normalizeAppSettings(user?.appSettings || user?.preferences?.appSettings || defaultAppSettings);

let activeAppSettings = getUserAppSettings(readSessionUserForSettings());

const optimizationEnabled = () => Boolean(activeAppSettings.optimization);

const shouldLockDockTextTone = () => Number(activeAppSettings.transparency || 0) > 50;

const applyOptimizationMode = (isEnabled) => {
  document.documentElement.classList.toggle("performance-mode", isEnabled);
  optimizationToggle.checked = isEnabled;
};

const interpolateSetting = (value, left, center, right) =>
  value <= 50
    ? left + (center - left) * (value / 50)
    : center + (right - center) * ((value - 50) / 50);

const applyTransparencyLevel = (rawValue) => {
  const value = Math.max(0, Math.min(100, Number(rawValue) || 0));
  const isOptimized = optimizationEnabled();
  const alphaMultiplier = isOptimized ? 0.54 : 1;
  const blurMultiplier = isOptimized ? 0.52 : 1;
  const optimizedAlpha = (number) => Math.max(0.004, number * alphaMultiplier);
  const optimizedBlur = (number) => Math.max(4, number * blurMultiplier);
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--dock-glass-alpha", optimizedAlpha(interpolateSetting(value, 0.014, 0.22, 0.58)).toFixed(3));
  rootStyle.setProperty("--modal-glass-strong-alpha", optimizedAlpha(interpolateSetting(value, 0.008, 0.7, 0.96)).toFixed(3));
  rootStyle.setProperty("--modal-glass-soft-alpha", optimizedAlpha(interpolateSetting(value, 0.004, 0.48, 0.88)).toFixed(3));
  rootStyle.setProperty("--surface-glass-alpha", optimizedAlpha(interpolateSetting(value, 0.016, 0.62, 0.94)).toFixed(3));
  rootStyle.setProperty("--control-glass-alpha", optimizedAlpha(interpolateSetting(value, 0.045, 1, 1)).toFixed(3));
  rootStyle.setProperty("--glass-blur", `${optimizedBlur(interpolateSetting(value, 4, 26, 48)).toFixed(1)}px`);
  rootStyle.setProperty("--glass-panel-blur", `${optimizedBlur(interpolateSetting(value, 5, 32, 58)).toFixed(1)}px`);
  rootStyle.setProperty("--glass-backdrop-blur", `${optimizedBlur(interpolateSetting(value, 3, 18, 38)).toFixed(1)}px`);
  rootStyle.setProperty("--glass-control-blur", `${optimizedBlur(interpolateSetting(value, 4, 20, 42)).toFixed(1)}px`);
  rootStyle.setProperty("--glass-shine", `rgba(255, 255, 255, ${optimizedAlpha(interpolateSetting(value, 0.045, 0.52, 0.68)).toFixed(3)})`);
  rootStyle.setProperty("--glass-shadow", `rgba(45, 136, 210, ${optimizedAlpha(interpolateSetting(value, 0.035, 0.2, 0.28)).toFixed(3)})`);
  rootStyle.setProperty("--glass-saturate", isOptimized ? "1.12" : "1.42");
  rootStyle.setProperty("--transparency-progress", `${value}%`);
  transparencySlider.value = String(value);
  transparencySlider.setAttribute(
    "aria-valuetext",
    value === 50 ? "Aktualne" : value < 50 ? "Bardziej przezroczyste" : "Mniej przezroczyste"
  );
};

const applyAppSettings = (settings) => {
  activeAppSettings = normalizeAppSettings(settings);
  applyOptimizationMode(activeAppSettings.optimization);
  applyTransparencyLevel(activeAppSettings.transparency);
  window.requestAnimationFrame(() => {
    if (typeof scheduleDockContrast === "function") {
      scheduleDockContrast();
    }
  });
};

let transparencyBubbleTimeout;

const animateTransparencySlider = () => {
  if (optimizationEnabled()) {
    return;
  }
  window.clearTimeout(transparencyBubbleTimeout);
  transparencySlider.classList.remove("is-bubbling");
  void transparencySlider.offsetWidth;
  transparencySlider.classList.add("is-bubbling");
  transparencyBubbleTimeout = window.setTimeout(() => {
    transparencySlider.classList.remove("is-bubbling");
  }, 690);
};

applyAppSettings(activeAppSettings);

appScreen.classList.add("app-entering");
window.requestAnimationFrame(() => {
  document.documentElement.dataset.appReady = "true";
});

const playButtonSound = () => {
  try {
    const sound = clickSound.cloneNode();
    sound.volume = clickSound.volume;
    const playPromise = sound.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  } catch {
    // Brak pliku dzwieku nie powinien blokowac klikniec.
  }
};

const playHeartSound = () => {
  try {
    const sound = heartSound.cloneNode();
    sound.volume = heartSound.volume;
    const playPromise = sound.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  } catch {
    // Brak pliku dzwieku serduszka nie powinien blokowac reakcji.
  }
};

const getRoutePoint = (index) => ({
  x: tripRouteCenterX + (index % 2 === 0 ? -tripRouteWave : tripRouteWave),
  y: tripRouteTopOffset + tripRouteStartY + index * tripRouteTurnGap,
});

const getRouteSvgHeight = () =>
  tripRouteTopOffset + tripRouteStartY * 2 + (tripRouteStops.length - 1) * tripRouteTurnGap;

const buildRoutePathData = () => {
  const first = getRoutePoint(0);
  let path = `M ${tripRouteCenterX} ${tripRouteTopOffset} C ${tripRouteCenterX} ${tripRouteTopOffset + 38}, ${first.x} ${Math.max(tripRouteTopOffset + 38, first.y - 54)}, ${first.x} ${first.y}`;

  for (let index = 1; index < tripRouteStops.length; index += 1) {
    const previous = getRoutePoint(index - 1);
    const next = getRoutePoint(index);
    const controlY = tripRouteTurnGap * 0.5;
    path += ` C ${previous.x} ${previous.y + controlY}, ${next.x} ${next.y - controlY}, ${next.x} ${next.y}`;
  }

  return path;
};

const getRouteActiveDate = () =>
  routePreviewDate instanceof Date && !Number.isNaN(routePreviewDate.getTime())
    ? routePreviewDate
    : new Date();

const getRouteBusPosition = (date = getRouteActiveDate()) => {
  const rawDayProgress = (date.getTime() - tripRouteStartDate.getTime()) / tripRouteDayMs;
  const maxSegment = tripRouteStops.length - 2;
  const segmentIndex = Math.max(0, Math.min(maxSegment, Math.floor(rawDayProgress)));
  const segmentProgress = Math.max(0, Math.min(1, rawDayProgress - segmentIndex));
  const from = getRoutePoint(segmentIndex);
  const to = getRoutePoint(segmentIndex + 1);

  if (rawDayProgress <= 0) {
    return { x: tripRouteCenterX, y: tripRouteTopOffset };
  }

  if (rawDayProgress >= tripRouteStops.length - 1) {
    return getRoutePoint(tripRouteStops.length - 1);
  }

  return {
    x: from.x + (to.x - from.x) * segmentProgress,
    y: from.y + (to.y - from.y) * segmentProgress,
  };
};

const getRouteStatusCopy = (date = getRouteActiveDate()) =>
  date.getTime() >= tripRouteStartDate.getTime()
    ? "Tutaj się właśnie znajdujemy!"
    : "Wyruszamy 20 lipca!";

const formatRouteDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatRouteTimeValue = (date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

const buildBusIcon = () => `
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path class="route-bus-main" d="M8.4 8.2c0-2 1.3-3.2 3.5-3.2h8.2c2.2 0 3.5 1.2 3.5 3.2v10.6c0 1.7-1.1 3-2.7 3.25v1.65c0 .72-.52 1.3-1.2 1.3h-.35c-.68 0-1.2-.58-1.2-1.3v-1.55h-4.3v1.55c0 .72-.52 1.3-1.2 1.3h-.35c-.68 0-1.2-.58-1.2-1.3v-1.65c-1.6-.25-2.7-1.55-2.7-3.25Z" />
    <path class="route-bus-window" d="M11.4 8.5h9.2" />
    <path class="route-bus-window" d="M11.05 12.1h9.9" />
    <path class="route-bus-window" d="M11.05 15.7h3.55" />
    <path class="route-bus-window" d="M17.4 15.7h3.55" />
    <circle cx="12.4" cy="19.2" r="1" />
    <circle cx="19.6" cy="19.2" r="1" />
  </svg>
`;

const buildRoutePinIcon = () => `
  <svg class="route-card-icon route-card-pin" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s6-5.15 6-11a6 6 0 0 0-12 0c0 5.85 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.35" />
  </svg>
`;

const buildRouteCalendarIcon = () => `
  <svg class="route-card-icon route-card-calendar" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 5.5h11A2.5 2.5 0 0 1 20 8v9.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5V8a2.5 2.5 0 0 1 2.5-2.5Z" />
    <path d="M8 3.8v3.4" />
    <path d="M16 3.8v3.4" />
    <path d="M4.5 9.2h15" />
    <path d="M8 12.5h.1" />
    <path d="M12 12.5h.1" />
    <path d="M16 12.5h.1" />
    <path d="M8 16h.1" />
    <path d="M12 16h.1" />
  </svg>
`;

const buildRouteSvg = () => {
  const height = getRouteSvgHeight();
  const markers = tripRouteStops
    .map((_, index) => {
      const point = getRoutePoint(index);
      return `
        <circle class="route-marker-outer" cx="${point.x}" cy="${point.y}" r="11" />
        <circle class="route-marker-inner" cx="${point.x}" cy="${point.y}" r="6.2" />
      `;
    })
    .join("");

  return `
    <svg class="route-path-svg" viewBox="0 0 360 ${height}" aria-hidden="true">
      <path class="route-path-line" pathLength="1000" d="${buildRoutePathData()}" />
      <path class="route-path-shine" pathLength="1000" d="${buildRoutePathData()}" />
      ${markers}
    </svg>
  `;
};

const updateRouteGallery = (gallery, index, { scroll = false } = {}) => {
  const track = gallery.querySelector("[data-route-photo-track]");
  const slides = gallery.querySelectorAll(".route-photo-slide");

  if (!track || !slides.length) {
    return;
  }

  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));

  if (scroll) {
    gallery.dataset.gallerySliding = "true";
    window.clearTimeout(gallery.gallerySlideTimer);
    track.scrollTo({
      left: nextIndex * track.clientWidth,
      behavior: "smooth",
    });
    gallery.gallerySlideTimer = window.setTimeout(() => {
      gallery.dataset.gallerySliding = "false";
      updateRouteGallery(gallery, Math.round(track.scrollLeft / (track.clientWidth || 1)));
    }, 720);
  }

  gallery.dataset.galleryIndex = String(nextIndex);
  gallery.querySelectorAll("[data-route-photo-dot]").forEach((dot, dotIndex) => {
    const isActive = dotIndex === nextIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const initializeRouteGalleries = () => {
  routeContent.querySelectorAll("[data-route-gallery]").forEach((gallery) => {
    if (gallery.dataset.galleryReady === "true") {
      return;
    }

    gallery.dataset.galleryReady = "true";
    const track = gallery.querySelector("[data-route-photo-track]");

    if (!track) {
      return;
    }

    let scrollFrame = 0;
    track.addEventListener("scroll", () => {
      if (gallery.dataset.gallerySliding === "true") {
        return;
      }

      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        updateRouteGallery(gallery, Math.round(track.scrollLeft / width));
      });
    }, { passive: true });

    updateRouteGallery(gallery, Number(gallery.dataset.galleryIndex || 0));
  });
};

const buildRouteStopMarkup = (stop, index) => {
  const point = getRoutePoint(index);
  const isPhotoLeft = index % 2 === 0;
  const images = [`./${stop.day}.1.png`, `./${stop.day}.2.png`];
  const photoMarkup = `
    <div class="route-photo-card" data-route-gallery data-gallery-index="0">
      <div class="route-photo-track" data-route-photo-track>
        ${images.map((src, imageIndex) => `
          <img class="route-photo-slide" src="${src}" alt="${stop.place} - zdjęcie ${imageIndex + 1}" draggable="false" />
        `).join("")}
      </div>
      <div class="route-photo-dots" aria-label="Wybierz zdjęcie">
        ${images.map((_, imageIndex) => `
          <button class="route-photo-dot${imageIndex === 0 ? " is-active" : ""}" type="button" data-route-photo-dot="${imageIndex}" aria-label="Pokaż zdjęcie ${imageIndex + 1}" aria-current="${imageIndex === 0 ? "true" : "false"}"></button>
        `).join("")}
      </div>
    </div>
  `;
  const cardMarkup = `
    <div class="route-info-card">
      <span class="route-card-row route-place-row">
        ${buildRoutePinIcon()}
        <span class="route-place">${stop.place}</span>
      </span>
      <span class="route-card-row route-date-row">
        ${buildRouteCalendarIcon()}
        <em>${stop.date}</em>
      </span>
      <strong>${stop.day} dzień wyjazdu</strong>
      <p>${stop.description}</p>
    </div>
  `;

  return `
    <article class="route-stop ${isPhotoLeft ? "photo-left" : "photo-right"}" style="top:${point.y - 68}px;">
      ${isPhotoLeft ? photoMarkup : cardMarkup}
      <span class="route-stop-spacer" aria-hidden="true"></span>
      ${isPhotoLeft ? cardMarkup : photoMarkup}
    </article>
  `;
};

const renderRoute = () => {
  if (!routeContent) {
    return;
  }

  const height = getRouteSvgHeight();
  const activeDate = getRouteActiveDate();
  const busPosition = getRouteBusPosition(activeDate);
  const stopsMarkup = tripRouteStops.map(buildRouteStopMarkup).join("");
  const previewDate = routePreviewDate || activeDate;
  const isAuthor = isAuthorUser(readCurrentUser());
  const routeToolsMarkup = isAuthor
    ? `
      <form class="route-preview-tools" data-route-preview-tools>
        <span>Podgląd trasy</span>
        <label>
          Data
          <input type="date" data-route-preview-date value="${formatRouteDateValue(previewDate)}" min="2026-07-01" max="2026-08-05" />
        </label>
        <label>
          Godzina
          <input type="time" data-route-preview-time value="${formatRouteTimeValue(previewDate)}" />
        </label>
        <button type="button" data-route-preview-reset>TERAZ</button>
      </form>
    `
    : "";

  routeContent.innerHTML = `
    ${routeToolsMarkup}
    <div
      class="route-timeline"
      style="--route-height:${height}px; --route-bus-x:${(busPosition.x - tripRouteCenterX).toFixed(2)}px; --route-bus-y:${busPosition.y.toFixed(2)}px;"
    >
      ${buildRouteSvg()}
      <button class="route-moving-bus" type="button" data-route-status aria-label="${getRouteStatusCopy(activeDate)}">
        ${buildBusIcon()}
        <span class="route-status-bubble" role="status">${getRouteStatusCopy(activeDate)}</span>
      </button>
      ${stopsMarkup}
    </div>
  `;

  initializeRouteGalleries();
};

document.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest("button");

    if (button) {
      if (button.closest(".heart-button")) {
        return;
      }

      if (!button.disabled) {
        playButtonSound();
      }
      return;
    }

    const roleButton = event.target.closest("[role='button']");
    const insideForm = event.target.closest("input, label, form, .auth-panel, .users-list");

    if (!roleButton || insideForm) {
      return;
    }

    playButtonSound();
  },
  true
);

const isInteractive = (target) =>
  Boolean(target.closest("button, input, label, form, .auth-panel, .compose-panel, .panel-option, .users-list, .post-card"));

routeContent?.addEventListener("click", (event) => {
  const routePhotoDot = event.target.closest("[data-route-photo-dot]");
  const button = event.target.closest("[data-route-status]");

  if (routePhotoDot) {
    const gallery = routePhotoDot.closest("[data-route-gallery]");
    updateRouteGallery(gallery, Number(routePhotoDot.dataset.routePhotoDot || 0), { scroll: true });
    return;
  }

  if (event.target.closest("[data-route-preview-reset]")) {
    routePreviewDate = null;
    renderRoute();
    return;
  }

  if (!button) {
    return;
  }

  button.classList.add("is-hint-open");
  window.clearTimeout(button.hintTimer);
  button.hintTimer = window.setTimeout(() => {
    button.classList.remove("is-hint-open");
  }, 3200);
});

routeContent?.addEventListener("change", (event) => {
  if (!event.target.closest("[data-route-preview-date], [data-route-preview-time]")) {
    return;
  }

  const dateInput = routeContent.querySelector("[data-route-preview-date]");
  const timeInput = routeContent.querySelector("[data-route-preview-time]");
  const dateValue = dateInput?.value || formatRouteDateValue(getRouteActiveDate());
  const timeValue = timeInput?.value || "00:00";
  const nextDate = new Date(`${dateValue}T${timeValue}:00`);

  if (Number.isNaN(nextDate.getTime())) {
    return;
  }

  routePreviewDate = nextDate;
  renderRoute();
});

routeContent?.addEventListener("submit", (event) => {
  if (!event.target.closest("[data-route-preview-tools]")) {
    return;
  }

  event.preventDefault();
});

const isCloseIcon = (target) => Boolean(target.closest(".close-icon, .profile-close-icon, .compose-close-icon"));

const getDockStep = () => {
  const firstTab = dockTabs[0];
  const secondTab = dockTabs[1];

  if (!firstTab || !secondTab) {
    return 0;
  }

  return secondTab.getBoundingClientRect().left - firstTab.getBoundingClientRect().left;
};

const pulseDockCandy = () => {
  if (!bottomDock.classList.contains("is-collapsed")) {
    return;
  }

  bottomDock.classList.remove("is-candy-pulsing");
  bottomDock.getBoundingClientRect();
  bottomDock.classList.add("is-candy-pulsing");
  window.setTimeout(() => bottomDock.classList.remove("is-candy-pulsing"), 1100);
};

const setScrollTopBubbleVisible = (isVisible) => {
  window.clearTimeout(scrollTopBubbleTimer);

  if (isVisible) {
    scrollTopBubble.classList.remove("is-hiding");
    scrollTopBubble.classList.add("is-visible");
    scrollTopBubble.setAttribute("aria-hidden", "false");
    scrollTopBubble.tabIndex = 0;
    return;
  }

  if (!scrollTopBubble.classList.contains("is-visible")) {
    scrollTopBubble.setAttribute("aria-hidden", "true");
    scrollTopBubble.tabIndex = -1;
    return;
  }

  scrollTopBubble.classList.add("is-hiding");
  scrollTopBubble.setAttribute("aria-hidden", "true");
  scrollTopBubble.tabIndex = -1;
  scrollTopBubbleTimer = window.setTimeout(() => {
    scrollTopBubble.classList.remove("is-visible", "is-hiding");
  }, 520);
};

const setDockCollapsed = (isCollapsed) => {
  const wasCollapsed = bottomDock.classList.contains("is-collapsed");
  window.clearTimeout(dockExpandTimer);
  if (isCollapsed) {
    bottomDock.classList.remove("is-expanding");
  }
  bottomDock.classList.toggle("is-collapsed", isCollapsed);
  setScrollTopBubbleVisible(isCollapsed);

  if (isCollapsed && !wasCollapsed) {
    window.clearInterval(dockCandyTimer);
    dockCandyTimer = window.setInterval(pulseDockCandy, 10000);
  } else if (!isCollapsed && wasCollapsed) {
    window.clearInterval(dockCandyTimer);
    bottomDock.classList.remove("is-candy-pulsing");
  }
};

const expandDock = () => {
  const wasCollapsed = bottomDock.classList.contains("is-collapsed");

  if (!wasCollapsed) {
    setScrollTopBubbleVisible(false);
    return;
  }

  setDockCollapsed(false);
  bottomDock.classList.add("is-expanding");
  window.clearTimeout(dockExpandTimer);
  dockExpandTimer = window.setTimeout(() => {
    bottomDock.classList.remove("is-expanding");
  }, 700);
};

const moveDockIndicator = (index, { animateDock = true, animateView = true } = {}) => {
  const clampedIndex = Math.max(0, Math.min(dockTabs.length - 1, index));
  const step = getDockStep();
  const previousIndex = activeDockIndex;
  const direction = Math.sign(clampedIndex - previousIndex);

  activeDockIndex = clampedIndex;
  appScreen.dataset.viewDirection = direction < 0 ? "back" : "forward";
  appScreen.classList.remove("view-switching");
  if (animateView) {
    appScreen.getBoundingClientRect();
    appScreen.classList.add("view-switching");
  }
  const nextView = clampedIndex === 3 ? "notifications" : clampedIndex === 2 ? "route" : "home";
  appScreen.dataset.view = nextView;
  homePage.setAttribute("aria-hidden", String(nextView !== "home"));
  routePage.setAttribute("aria-hidden", String(nextView !== "route"));
  notificationsPage.setAttribute("aria-hidden", String(nextView !== "notifications"));
  if (clampedIndex !== 3 && notificationDeleteOpen) {
    setNotificationDeleteOpen(false);
  }
  if (animateDock) {
    expandDock();
  } else {
    bottomDock.classList.remove("is-expanding", "is-candy-pulsing");
    setDockCollapsed(false);
  }

  if (nextView === "route") {
    renderRoute();
  }

  if (nextView === "notifications") {
    renderNotifications({ markRead: true });
  }

  bottomDock.style.setProperty("--dock-x", `${step * clampedIndex}px`);
  bottomDock.style.setProperty("--dock-drag-x", "0px");
  bottomDock.style.setProperty("--dock-wobble", "0px");
  bottomDock.style.setProperty("--dock-skew", "0deg");
  bottomDock.style.setProperty("--dock-scale-x", "1");
  bottomDock.style.setProperty("--dock-scale-y", "1");
  bottomDock.style.setProperty("--dock-origin-x", "center");
  dockTabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === clampedIndex;
    tab.classList.toggle("is-active", isActive);
    tab.toggleAttribute("aria-current", isActive);
  });

  if (animateView) {
    window.setTimeout(() => {
      appScreen.classList.remove("view-switching");
    }, 1750);
  }
};

const dockIndexFromPoint = (clientX) => {
  const rect = bottomDock.getBoundingClientRect();
  const step = rect.width / dockTabs.length;
  return Math.max(0, Math.min(dockTabs.length - 1, Math.floor((clientX - rect.left) / step)));
};

const setMenuOpen = (isOpen) => {
  appScreen.classList.toggle("menu-open", isOpen);
  moreMorph.setAttribute("aria-expanded", String(isOpen));
  panelContent.setAttribute("aria-hidden", String(!isOpen));

  if (!isOpen) {
    usersList.classList.remove("is-visible");
  }

  if (isOpen) {
    advanceTutorialWhen("menu-open");
  }
};

const setProfileOpen = (isOpen) => {
  window.clearTimeout(profileCloseTimer);

  if (isOpen) {
    const user = readCurrentUser();
    appScreen.classList.toggle("is-logged-in", Boolean(user));
    profileSettingsTrigger.hidden = !user;
    profileSettingsPanel.hidden = !user;
    setProfileSettingsOpen(false);
    appScreen.classList.remove("profile-closing");
    appScreen.classList.add("profile-open");
    profileMorph.setAttribute("aria-expanded", "true");
    advanceTutorialWhen("profile-open");
    return;
  }

  if (!appScreen.classList.contains("profile-open")) {
    appScreen.classList.remove("profile-closing");
    profileMorph.setAttribute("aria-expanded", "false");
    return;
  }

  appScreen.classList.add("profile-closing");
  profileMorph.setAttribute("aria-expanded", "false");
  profileMorph.getBoundingClientRect();

  window.requestAnimationFrame(() => {
    appScreen.classList.remove("profile-open");
  });

  profileCloseTimer = window.setTimeout(() => {
    appScreen.classList.remove("profile-closing");
  }, 1240);
};

const setProfileSettingsOpen = (isOpen) => {
  const shouldOpen = isOpen && (Boolean(readCurrentUser()) || isTutorialActive());
  profileMorph.dataset.profileView = shouldOpen ? "settings" : "account";
  profileSettingsTrigger.classList.toggle("is-active", shouldOpen);
  profileSettingsTrigger.setAttribute("aria-expanded", String(shouldOpen));
  loggedPanel.classList.toggle("is-settings-hidden", shouldOpen);
  profileSettingsPanel.classList.toggle("is-open", shouldOpen);
  profileSettingsPanel.setAttribute("aria-hidden", String(!shouldOpen));
  authTabsWrap.classList.toggle("is-settings-hidden", shouldOpen);
  authFormWindow.classList.toggle("is-settings-hidden", shouldOpen);
  authTitle.classList.toggle("is-settings-hidden", shouldOpen);
  authMessage.classList.toggle("is-settings-hidden", shouldOpen);

  if (shouldOpen) {
    advanceTutorialWhen("settings-open");
  }
};

const setComposeOpen = (isOpen) => {
  appScreen.classList.toggle("compose-open", isOpen);
  composeMorph.setAttribute("aria-expanded", String(isOpen));

  if (!isOpen) {
    composeMessage.textContent = "";
  }
};

const updateAuthorUi = () => {
  const user = readCurrentUser();
  const isAuthor = isAuthorUser(user);
  appScreen.classList.toggle("is-author", isAuthor);
  composeMorph.hidden = !isAuthor;

  if (!isAuthor) {
    setComposeOpen(false);
  }

  if (appScreen.dataset.view === "route") {
    renderRoute();
  }
};

const closePanels = () => {
  setMenuOpen(false);
  setProfileOpen(false);
  setComposeOpen(false);
};

const tutorialPointCount = 4;

const tutorialSteps = [
  {
    key: "intro",
    pointLabel: "Szkolenie",
    target: null,
    title: "Czas na Szkolenie!",
    copy: `Teraz w ${tutorialPointCount} punktach dowiesz się jak korzystać z bloga.`,
    primary: "Do dzieła",
  },
  {
    key: "more-press",
    pointLabel: `1 z ${tutorialPointCount}`,
    target: () => moreMorph,
    title: "Przycisk Więcej",
    copy: "Naciśnij, aby przejść do następnego kroku.",
    waitFor: "menu-open",
  },
  {
    key: "more-open",
    pointLabel: `1 z ${tutorialPointCount}`,
    target: () => moreMorph,
    title: "Więcej",
    copy:
      "Jeśli chcesz zobaczyć innych użytkowników, wystarczy nacisnąć przycisk Inni Użytkownicy, a jeśli w przyszłości będziesz chciał ponownie dowiedzieć się jak korzystać z bloga, naciśnij Pokaż Samouczek.",
    primary: "Następny Krok",
  },
  {
    key: "profile-press",
    pointLabel: `2 z ${tutorialPointCount}`,
    target: () => profileMorph,
    title: "Profil",
    copy: "Naciśnij przycisk, aby przejść do następnego kroku.",
    waitFor: "profile-open",
  },
  {
    key: "profile-open",
    pointLabel: `2 z ${tutorialPointCount}`,
    target: () => profileMorph,
    title: "Konto",
    copy: "Załóż konto, wybierając rejestrację. Możesz to zrobić później.",
    primary: "Następny Krok",
  },
  {
    key: "settings-press",
    pointLabel: `3 z ${tutorialPointCount}`,
    target: () => profileSettingsTrigger,
    title: "Ustawienia",
    copy: "Naciśnij, aby przejść do następnego kroku.",
    waitFor: "settings-open",
  },
  {
    key: "settings-open",
    pointLabel: `3 z ${tutorialPointCount}`,
    target: () => profileSettingsTrigger,
    title: "Ustawienia aplikacji",
    copy:
      "Możesz tu włączyć optymalizację aplikacji, jeśli masz słabszy telefon z systemem Android. Pomoże to korzystać z aplikacji bez zacinania. Niżej możesz ograniczyć lub zwiększyć przezroczystość suwakiem.",
    primary: "Następny Krok",
  },
  {
    key: "dock",
    pointLabel: `4 z ${tutorialPointCount}`,
    target: () => bottomDock,
    title: "Pasek nawigacji",
    copy:
      "To główne miejsce nawigacji blogiem. Na stronie głównej możesz śledzić aktualności, we wpisach czytać wpisy, na trasie śledzić postęp wycieczki, a w powiadomieniach sprawdzać, co nowego.",
    primary: "Rozumiem",
  },
];

const isTutorialActive = () => !tutorialOverlay.hidden;

const getTutorialStep = () => tutorialSteps[tutorialStep];

const positionTutorialFocus = () => {
  if (tutorialOverlay.hidden) {
    return;
  }

  const targetGetter = getTutorialStep()?.target;
  const target = typeof targetGetter === "function" ? targetGetter() : null;
  if (!target) {
    tutorialFocus.hidden = true;
    return;
  }

  tutorialFocus.hidden = false;
  const rect = target.getBoundingClientRect();
  const isDockStep = getTutorialStep()?.key === "dock";
  const padding = isDockStep ? 7 : 8;
  tutorialFocus.style.setProperty("--tutorial-x", `${rect.left - padding}px`);
  tutorialFocus.style.setProperty("--tutorial-y", `${rect.top - padding}px`);
  tutorialFocus.style.setProperty("--tutorial-width", `${rect.width + padding * 2}px`);
  tutorialFocus.style.setProperty("--tutorial-height", `${rect.height + padding * 2}px`);
  tutorialFocus.style.setProperty("--tutorial-radius", isDockStep ? "999px" : "1.45rem");
};

const renderTutorialStep = () => {
  const step = getTutorialStep();
  const isSettingsStep = step.key.startsWith("settings");

  if (isSettingsStep) {
    profileSettingsTrigger.hidden = false;
    profileSettingsPanel.hidden = false;
  }

  tutorialOverlay.dataset.step = String(tutorialStep);
  tutorialOverlay.dataset.tutorialStage = step.key;
  tutorialStepLabel.textContent = step.pointLabel;
  tutorialTitle.textContent = step.title;
  tutorialCopy.textContent = step.copy;
  tutorialPrimary.hidden = !step.primary;
  tutorialPrimary.textContent = step.primary || "";
  tutorialSecondary.hidden = true;

  window.requestAnimationFrame(positionTutorialFocus);
};

const goToTutorialStep = (stepKey, { delay = 0 } = {}) => {
  const nextIndex = tutorialSteps.findIndex((step) => step.key === stepKey);
  if (nextIndex < 0) {
    return;
  }

  window.setTimeout(() => {
    tutorialStep = nextIndex;
    renderTutorialStep();
  }, delay);
};

function advanceTutorialWhen(action) {
  if (!isTutorialActive()) {
    return;
  }

  const step = getTutorialStep();
  if (step?.waitFor !== action) {
    return;
  }

  const nextStep = tutorialSteps[tutorialStep + 1];
  if (nextStep) {
    goToTutorialStep(nextStep.key, { delay: 420 });
  }
}

const finishTutorial = ({ openLogin = false } = {}) => {
  localStorage.setItem(tutorialSeenKey, "true");
  tutorialOverlay.classList.remove("is-visible");
  appScreen.classList.remove("tutorial-open");
  window.setTimeout(() => {
    tutorialOverlay.hidden = true;
    tutorialOverlay.dataset.tutorialStage = "";
    setProfileSettingsOpen(false);
    if (openLogin) {
      closePanels();
      setProfileOpen(true);
    }
  }, 420);
};

const showTutorial = ({ force = false } = {}) => {
  if (!force && localStorage.getItem(tutorialSeenKey) === "true") {
    return;
  }

  tutorialStep = 0;
  closePanels();
  setProfileSettingsOpen(false);
  setDockCollapsed(false);
  tutorialOverlay.hidden = false;
  appScreen.classList.add("tutorial-open");
  renderTutorialStep();
  window.requestAnimationFrame(() => tutorialOverlay.classList.add("is-visible"));
};

tutorialPrimary.addEventListener("click", () => {
  const step = getTutorialStep();

  if (step.key === "intro") {
    goToTutorialStep("more-press");
    return;
  }

  if (step.key === "more-open") {
    setMenuOpen(false);
    goToTutorialStep("profile-press", { delay: 520 });
    return;
  }

  if (step.key === "profile-open") {
    goToTutorialStep("settings-press");
    return;
  }

  if (step.key === "settings-open") {
    setProfileSettingsOpen(false);
    setProfileOpen(false);
    goToTutorialStep("dock", { delay: 720 });
    return;
  }

  if (step.key === "dock") {
    finishTutorial();
    return;
  }
});

tutorialSecondary.addEventListener("click", () => {
  tutorialStep = Math.min(tutorialSteps.length - 1, tutorialStep + 1);
  renderTutorialStep();
});

tutorialSkip.addEventListener("click", () => finishTutorial());
window.addEventListener("resize", positionTutorialFocus);

tutorialRestartButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  showTutorial({ force: true });
});

const readLocalUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(localUsersKey) || "[]");
  } catch {
    return [];
  }
};

const writeLocalUsers = (users) => {
  localStorage.setItem(localUsersKey, JSON.stringify(users));
};

const readCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(currentUserKey) || "null");
  } catch {
    return null;
  }
};

const writeCurrentUser = (user) => {
  localStorage.setItem(currentUserKey, JSON.stringify(user));
};

const clearCurrentUser = () => {
  localStorage.removeItem(currentUserKey);
};

const readLocalPosts = () => {
  try {
    return JSON.parse(localStorage.getItem(localPostsKey) || "[]");
  } catch {
    return [];
  }
};

const readNotificationsReadMap = () => {
  try {
    return JSON.parse(localStorage.getItem(notificationsReadKey) || "{}");
  } catch {
    return {};
  }
};

const readNotificationsAt = (userId) => readNotificationsReadMap()[userId] || "";

const writeNotificationsAt = (userId, value = new Date().toISOString()) => {
  if (!userId) {
    return;
  }

  const readMap = readNotificationsReadMap();
  readMap[userId] = value;
  localStorage.setItem(notificationsReadKey, JSON.stringify(readMap));
};

const readLocalDismissedNotifications = () => {
  try {
    return JSON.parse(localStorage.getItem(dismissedNotificationsKey) || "{}");
  } catch {
    return {};
  }
};

const getDismissedNotifications = async (userId) => {
  if (!userId) {
    return {};
  }

  if (!useLocalDatabase && firebaseBaseUrl) {
    try {
      const response = await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/notificationDismissals/${encodeURIComponent(userId)}.json`);
      if (response.ok) {
        return (await response.json()) || {};
      }
    } catch {
      // Lokalny zapis zachowuje działanie przy chwilowym braku sieci.
    }
  }

  return readLocalDismissedNotifications()[userId] || {};
};

const saveDismissedNotifications = async (userId, dismissed) => {
  if (!userId) {
    return;
  }

  const localMap = readLocalDismissedNotifications();
  localMap[userId] = dismissed;
  localStorage.setItem(dismissedNotificationsKey, JSON.stringify(localMap));

  if (!useLocalDatabase && firebaseBaseUrl) {
    await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/notificationDismissals/${encodeURIComponent(userId)}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dismissed),
    }).catch(() => {});
  }
};

const writeLocalPosts = (posts) => {
  localStorage.setItem(localPostsKey, JSON.stringify(posts));
};

const fetchFirebaseUsers = async () => {
  if (useLocalDatabase || !firebaseBaseUrl) {
    return null;
  }

  const response = await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/users.json`);
  if (!response.ok) {
    throw new Error("Nie udalo sie pobrac uzytkownikow.");
  }

  const data = await response.json();
  return data ? Object.values(data) : [];
};

const saveFirebaseUser = async (user) => {
  if (useLocalDatabase || !firebaseBaseUrl) {
    return false;
  }

  const response = await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/users/${user.id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie zapisac uzytkownika.");
  }

  return true;
};

const fetchFirebasePosts = async () => {
  if (useLocalDatabase || !firebaseBaseUrl) {
    return null;
  }

  const response = await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/posts.json`);
  if (!response.ok) {
    throw new Error("Nie udalo sie pobrac postow.");
  }

  const data = await response.json();
  return data ? Object.values(data) : [];
};

const saveFirebasePost = async (post) => {
  if (useLocalDatabase || !firebaseBaseUrl) {
    return false;
  }

  const response = await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/posts/${post.id}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie zapisac postu.");
  }

  return true;
};

const deleteFirebasePost = async (postId) => {
  if (useLocalDatabase || !firebaseBaseUrl) {
    return false;
  }

  const response = await fetch(`${firebaseBaseUrl}/wakacjeZBogiem/posts/${postId}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie usunac postu.");
  }

  return true;
};

const getUsers = async () => {
  try {
    const firebaseUsers = await fetchFirebaseUsers();
    if (firebaseUsers) {
      return firebaseUsers;
    }
  } catch {
    authMessage.textContent = "Baza online jest chwilowo niedostepna. Uzywam danych lokalnych.";
  }

  return readLocalUsers();
};

const getCurrentUserProfile = async () => {
  const currentUser = readCurrentUser();

  if (!currentUser) {
    return null;
  }

  if (currentUser.createdAt && currentUser.appSettings) {
    return currentUser;
  }

  const users = await getUsers().catch(() => []);
  const fullUser = users.find((user) => user.id === currentUser.id);

  if (fullUser) {
    const mergedUser = {
      ...currentUser,
      firstName: fullUser.firstName || currentUser.firstName,
      lastName: fullUser.lastName || currentUser.lastName,
      isAuthor: Boolean(fullUser.isAuthor || currentUser.isAuthor),
      createdAt: fullUser.createdAt || currentUser.createdAt || new Date().toISOString(),
      appSettings: getUserAppSettings(fullUser),
    };
    writeCurrentUser(mergedUser);
    return mergedUser;
  }

  const fallbackUser = {
    ...currentUser,
    createdAt: currentUser.createdAt || new Date().toISOString(),
    appSettings: getUserAppSettings(currentUser),
  };
  writeCurrentUser(fallbackUser);
  return fallbackUser;
};

const saveUser = async (user) => {
  if (await saveFirebaseUser(user).catch(() => false)) {
    return;
  }

  const users = readLocalUsers().filter((item) => item.id !== user.id);
  users.push(user);
  writeLocalUsers(users);
};

const persistCurrentUserAppSettings = (settings) => {
  const currentUser = readCurrentUser();

  if (!currentUser) {
    return;
  }

  const appSettings = normalizeAppSettings(settings);
  const updatedSessionUser = {
    ...currentUser,
    appSettings,
  };
  writeCurrentUser(updatedSessionUser);
  window.clearTimeout(settingsSaveTimer);
  settingsSaveTimer = window.setTimeout(async () => {
    const users = await getUsers().catch(() => []);
    const fullUser = users.find((user) => user.id === updatedSessionUser.id);

    if (!fullUser) {
      return;
    }

    await saveUser({
      ...fullUser,
      appSettings,
    });
  }, 420);
};

const getPosts = async () => {
  try {
    const firebasePosts = await fetchFirebasePosts();
    if (firebasePosts) {
      return firebasePosts;
    }
  } catch {
    // Jesli chmura chwilowo nie odpowiada, pokaz lokalne wpisy, ale probuj ponownie przy nastepnej operacji.
  }

  return readLocalPosts();
};

const savePost = async (post) => {
  if (await saveFirebasePost(post).catch(() => false)) {
    return;
  }

  const posts = readLocalPosts().filter((item) => item.id !== post.id);
  posts.push(post);
  writeLocalPosts(posts);
};

const deletePost = async (postId) => {
  const deletedOnline = await deleteFirebasePost(postId).catch(() => false);
  const posts = readLocalPosts().filter((item) => item.id !== postId);
  writeLocalPosts(posts);

  if (!deletedOnline && !posts.some((item) => item.id === postId)) {
    return false;
  }

  return deletedOnline;
};

const syncLocalPostsToFirebase = async () => {
  if (useLocalDatabase || !firebaseBaseUrl) {
    return;
  }

  const localPosts = readLocalPosts();
  if (!localPosts.length) {
    return;
  }

  const results = await Promise.all(localPosts.map((post) => saveFirebasePost(post).catch(() => false)));
  if (results.every(Boolean)) {
    writeLocalPosts([]);
  }
};

const normalize = (value) => value.trim().toLocaleLowerCase("pl-PL");

const userIdFor = (firstName, lastName = "") =>
  `${normalize(firstName)}-${normalize(lastName)}`.replace(/\s+/g, "-").replace(/^-|-$/g, "");

const isAuthorCredentials = (firstName, lastName, password) =>
  normalize(firstName) === "kacper" && normalize(lastName) === "czarnojan" && password === "qqwe1928ASq";

const isAuthorUser = (user) => Boolean(user?.isAuthor);

const hashPassword = async (password) => {
  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const sortUsers = (users) =>
  [...users].sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`, "pl"));

const renderUsers = async () => {
  const users = sortUsers(await getUsers());
  usersList.innerHTML = "";

  if (!users.length) {
    const empty = document.createElement("li");
    empty.textContent = "Brak użytkowników";
    usersList.append(empty);
    return;
  }

  users.forEach((user) => {
    const item = document.createElement("li");
    item.textContent = `${user.firstName} ${user.lastName}`.trim();
    usersList.append(item);
  });
};

const postPopularity = (post) =>
  Object.keys(post.likes || {}).length + (post.comments || []).length;

const sortPosts = (posts, mode = "newest") =>
  [...posts].sort((a, b) => {
    const newestFirst = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    if (mode === "oldest") {
      return -newestFirst;
    }

    if (mode === "popular") {
      return postPopularity(b) - postPopularity(a) || newestFirst;
    }

    return newestFirst;
  });

const currentUserDisplay = () => {
  const user = readCurrentUser();
  return user ? `${user.firstName} ${user.lastName || ""}`.trim() : "";
};

const postDateLabel = (value) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const relativeTimeLabel = (value) => {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));

  if (minutes < 60) {
    return `${minutes} min temu`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} godz. temu`;
  }

  const days = Math.floor(hours / 24);
  return `${days} dni temu`;
};

const likeDisplayName = (value) => {
  if (typeof value === "string") {
    return value;
  }

  return value?.name || "Użytkownik";
};

const createHeartButton = ({ isLiked, count, label, postId, commentId = "" }) => {
  const button = document.createElement("button");
  const likeKey = commentId ? `${postId}:${commentId}` : postId;
  button.className = `heart-button${isLiked ? " is-liked" : ""}${lastLikedKey === likeKey ? " is-popping" : ""}`;
  button.type = "button";
  button.dataset.postId = postId;
  button.dataset.commentId = commentId;
  button.dataset.likeTarget = commentId ? "comment" : "post";
  button.setAttribute("aria-label", label);

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M20.4 5.7c-1.8-1.9-4.6-1.8-6.4.1L12 7.9l-2-2.1c-1.8-1.9-4.6-2-6.4-.1-1.9 2-1.9 5.1.1 7.1L12 21l8.3-8.2c2-2 2-5.1.1-7.1Z");
  icon.append(path);

  const text = document.createElement("span");
  text.textContent = String(count);
  button.append(icon, text);
  return button;
};

const createDislikeButton = ({ isDisliked, count, postId }) => {
  const button = document.createElement("button");
  button.className = `dislike-button${isDisliked ? " is-disliked" : ""}${lastDislikedKey === postId ? " is-popping" : ""}`;
  button.type = "button";
  button.dataset.postId = postId;
  button.setAttribute("aria-label", "Reakcja w dół");

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M17 3v11M7.7 14H4.6a2 2 0 0 1-1.9-2.6l2.2-6.8A2 2 0 0 1 6.8 3H17v11h-2.6a2 2 0 0 0-1.8 1.1L9.4 21a2.1 2.1 0 0 1-3.9-1.4Z");
  const side = document.createElementNS("http://www.w3.org/2000/svg", "path");
  side.setAttribute("d", "M17 3h3v11h-3");
  icon.append(path, side);

  const text = document.createElement("span");
  text.textContent = String(count);
  button.append(icon, text);
  return button;
};

const createCommentButton = ({ count, postId, isOpen }) => {
  const button = document.createElement("button");
  button.className = `comment-toggle${isOpen ? " is-open" : ""}`;
  button.type = "button";
  button.dataset.postId = postId;
  button.dataset.commentToggle = "true";
  button.setAttribute("aria-label", "Komentarze");

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  const bubble = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bubble.setAttribute("d", "M4 5.5h16v11H9l-5 3.5Z");
  const dots = document.createElementNS("http://www.w3.org/2000/svg", "path");
  dots.setAttribute("d", "M8.2 11h.1M12 11h.1M15.8 11h.1");
  icon.append(bubble, dots);

  const text = document.createElement("span");
  text.textContent = String(count);
  button.append(icon, text);
  return button;
};

const likeNamesFor = (likes = {}) =>
  Object.values(likes)
    .map(likeDisplayName)
    .sort((a, b) => a.localeCompare(b, "pl"));

const setPostSocialPanel = (postId, type, isOpen = true) => {
  const card = Array.from(postsFeed.querySelectorAll(".post-card")).find((item) => item.dataset.postId === postId);

  if (!card) {
    return;
  }

  const modal = card.querySelector(".post-social-modal");
  const title = card.querySelector(".post-social-title");
  const commentButton = card.querySelector("[data-comment-toggle]");

  if (!modal || !title) {
    return;
  }

  if (!isOpen) {
    modal.classList.remove("is-open");
    commentButton?.classList.remove("is-open");
    return;
  }

  modal.classList.remove("is-comments", "is-likes");
  modal.classList.add(`is-${type}`);
  title.textContent = type === "likes" ? "Polubili post" : "Komentarze";
  commentButton?.classList.toggle("is-open", type === "comments");
  window.requestAnimationFrame(() => modal.classList.add("is-open"));
};

const userCanDeletePost = (user, post) =>
  isAuthorUser(user) && normalize(`${post.authorName || ""}`) === "kacper czarnojan";

const renderPostGalleryMotion = (gallery) => {
  const track = gallery.querySelector(".post-gallery-track");
  const slides = gallery.querySelectorAll(".post-gallery-slide");

  if (!track || !slides.length) {
    return;
  }

  const width = track.clientWidth || 1;
  const progress = track.scrollLeft / width;
  slides.forEach((slide, index) => {
    const offset = index - progress;
    const distance = Math.min(1, Math.abs(offset));
    const scale = 1 - distance * 0.038;
    const shift = Math.max(-1, Math.min(1, offset)) * distance * -1.8;
    slide.style.transform = `translate3d(${shift.toFixed(3)}%, 0, 0) scale(${scale.toFixed(4)})`;
    slide.style.filter = `brightness(${(1 - distance * 0.055).toFixed(3)}) saturate(${(1 - distance * 0.09).toFixed(3)})`;
    slide.style.opacity = String(1 - distance * 0.07);
  });
};

const stopPostGalleryAnimation = (gallery) => {
  window.cancelAnimationFrame(gallery.galleryAnimationFrame || 0);
  gallery.galleryAnimationFrame = 0;
  gallery.classList.remove("is-gliding");
};

const animatePostGalleryScroll = (gallery, targetLeft) => {
  const track = gallery.querySelector(".post-gallery-track");

  if (!track) {
    return;
  }

  stopPostGalleryAnimation(gallery);
  const startLeft = track.scrollLeft;
  const distance = targetLeft - startLeft;

  if (Math.abs(distance) < 1) {
    track.scrollLeft = targetLeft;
    renderPostGalleryMotion(gallery);
    return;
  }

  const duration = 980;
  const startedAt = performance.now();
  gallery.classList.add("is-gliding");

  const glide = (now) => {
    if (!gallery.isConnected) {
      stopPostGalleryAnimation(gallery);
      return;
    }

    const progress = Math.min(1, (now - startedAt) / duration);
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    track.scrollLeft = startLeft + distance * eased;
    renderPostGalleryMotion(gallery);

    if (progress < 1) {
      gallery.galleryAnimationFrame = window.requestAnimationFrame(glide);
      return;
    }

    track.scrollLeft = targetLeft;
    stopPostGalleryAnimation(gallery);
    renderPostGalleryMotion(gallery);
  };

  gallery.galleryAnimationFrame = window.requestAnimationFrame(glide);
};

const updatePostGallery = (gallery, index, { scroll = false, smooth = true } = {}) => {
  const track = gallery.querySelector(".post-gallery-track");
  const slides = gallery.querySelectorAll(".post-gallery-slide");

  if (!track || !slides.length) {
    return;
  }

  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  if (scroll) {
    const targetLeft = nextIndex * track.clientWidth;
    if (smooth) {
      animatePostGalleryScroll(gallery, targetLeft);
    } else {
      stopPostGalleryAnimation(gallery);
      track.scrollLeft = targetLeft;
      renderPostGalleryMotion(gallery);
    }
  }

  gallery.dataset.galleryIndex = String(nextIndex);
  gallery.querySelectorAll(".post-gallery-dot").forEach((dot, dotIndex) => {
    const isActive = dotIndex === nextIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const schedulePostGallery = (gallery) => {
  window.clearTimeout(gallery.autoAdvanceTimer);

  if (!gallery.isConnected || gallery.querySelectorAll(".post-gallery-slide").length < 2) {
    return;
  }

  gallery.autoAdvanceTimer = window.setTimeout(() => {
    if (!gallery.isConnected) {
      return;
    }

    if (gallery.dataset.galleryInteracting === "true") {
      schedulePostGallery(gallery);
      return;
    }

    const slides = gallery.querySelectorAll(".post-gallery-slide");
    const currentIndex = Number(gallery.dataset.galleryIndex || 0);
    updatePostGallery(gallery, (currentIndex + 1) % slides.length, { scroll: true });
    schedulePostGallery(gallery);
  }, 8000);
};

const initializePostGalleries = () => {
  postsFeed.querySelectorAll("[data-post-gallery]").forEach((gallery) => {
    if (gallery.dataset.galleryReady === "true") {
      return;
    }

    gallery.dataset.galleryReady = "true";
    const track = gallery.querySelector(".post-gallery-track");

    if (!track) {
      return;
    }

    let scrollFrame = 0;
    const finishInteraction = () => {
      gallery.dataset.galleryInteracting = "false";
      const width = track.clientWidth || 1;
      updatePostGallery(gallery, Math.round(track.scrollLeft / width));
      schedulePostGallery(gallery);
    };

    track.addEventListener("scroll", () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        updatePostGallery(gallery, Math.round(track.scrollLeft / width));
        renderPostGalleryMotion(gallery);
      });
    }, { passive: true });

    track.addEventListener("pointerdown", () => {
      stopPostGalleryAnimation(gallery);
      gallery.dataset.galleryInteracting = "true";
      window.clearTimeout(gallery.autoAdvanceTimer);
    });
    track.addEventListener("pointerup", finishInteraction);
    track.addEventListener("pointercancel", finishInteraction);
    track.addEventListener("touchend", finishInteraction, { passive: true });

    gallery.querySelectorAll(".post-gallery-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        gallery.dataset.galleryInteracting = "false";
        window.clearTimeout(gallery.autoAdvanceTimer);
        updatePostGallery(gallery, index, { scroll: true });
        schedulePostGallery(gallery);
      });
    });

    updatePostGallery(gallery, Number(gallery.dataset.galleryIndex || 0), {
      scroll: true,
      smooth: false,
    });
    schedulePostGallery(gallery);
  });
};

const renderPosts = async ({ animateSocialPanel = true } = {}) => {
  const galleryPositions = new Map(
    Array.from(postsFeed.querySelectorAll(".post-card")).map((card) => [
      card.dataset.postId,
      Number(card.querySelector("[data-post-gallery]")?.dataset.galleryIndex || 0),
    ])
  );
  const posts = sortPosts(await getPosts(), postSortMode);
  const user = readCurrentUser();
  postsFeed.innerHTML = "";

  if (!posts.length) {
    const empty = document.createElement("p");
    empty.className = "posts-empty";
    empty.textContent = "Tu pojawią się pierwsze wpisy z wakacji.";
    postsFeed.append(empty);
    return;
  }

  posts.forEach((post, postIndex) => {
    const card = document.createElement("article");
    const galleryImages = (post.images || []).slice(0, 8);
    card.className = `post-card${galleryImages.length ? "" : " is-mini-post"}`;
    card.dataset.postId = post.id;
    card.style.setProperty("--item-index", String(Math.min(postIndex, 7)));

    const header = document.createElement("header");
    header.className = "post-header";

    const avatar = document.createElement("span");
    avatar.className = "post-avatar";
    avatar.textContent = "KC";

    const meta = document.createElement("span");
    meta.className = "post-meta";
    const author = document.createElement("strong");
    author.textContent = post.authorName || "Kacper Czarnojan";
    if (normalize(author.textContent) === "kacper czarnojan") {
      const badge = document.createElement("em");
      badge.className = "author-badge";
      badge.textContent = "AUTOR BLOGA";
      author.append(badge);
    }
    const time = document.createElement("span");
    time.textContent = postDateLabel(post.createdAt);
    meta.append(author, time);
    header.append(avatar, meta);

    if (userCanDeletePost(user, post)) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "post-delete-button";
      deleteButton.type = "button";
      deleteButton.dataset.deletePostOpen = post.id;
      deleteButton.setAttribute("aria-label", "Usuń post");
      deleteButton.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7h14" />
          <path d="M9 7V5.4h6V7" />
          <path d="M8 10v8" />
          <path d="M12 10v8" />
          <path d="M16 10v8" />
          <path d="M7 7l.8 13h8.4L17 7" />
        </svg>
      `;
      header.append(deleteButton);
    }

    const title = document.createElement("h2");
    title.textContent = post.title;
    title.title = post.title;

    const contentText = String(post.content || "").trim();
    const postCopy = document.createElement("div");
    postCopy.className = `post-copy${expandedPostTexts.has(post.id) ? " is-expanded" : ""}`;
    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = contentText;
    postCopy.append(content);
    if (contentText.length > 70) {
      const contentToggle = document.createElement("button");
      contentToggle.className = "post-content-toggle";
      contentToggle.type = "button";
      contentToggle.dataset.togglePostText = post.id;
      contentToggle.textContent = expandedPostTexts.has(post.id) ? "Zwiń tekst" : "Rozwiń tekst";
      contentToggle.setAttribute("aria-expanded", String(expandedPostTexts.has(post.id)));
      postCopy.append(contentToggle);
    }

    const hashtags = document.createElement("p");
    hashtags.className = "post-hashtags";
    hashtags.textContent = (post.hashtags || []).join(" ");

    const gallery = document.createElement("div");
    gallery.className = "post-gallery";
    gallery.dataset.postGallery = "true";
    gallery.dataset.galleryInteracting = "false";
    const galleryTrack = document.createElement("div");
    galleryTrack.className = "post-gallery-track";
    const galleryIndex = Math.max(
      0,
      Math.min(galleryImages.length - 1, galleryPositions.get(post.id) || 0)
    );
    gallery.dataset.galleryIndex = String(galleryIndex);
    galleryImages.forEach((src, imageIndex) => {
      const img = document.createElement("img");
      img.className = "post-gallery-slide";
      img.src = src;
      img.alt = `Zdjęcie ${imageIndex + 1} z ${galleryImages.length}`;
      galleryTrack.append(img);
    });
    gallery.append(galleryTrack);

    if (galleryImages.length > 1) {
      const dots = document.createElement("div");
      dots.className = "post-gallery-dots";
      dots.setAttribute("aria-label", "Wybierz zdjęcie");
      galleryImages.forEach((_, imageIndex) => {
        const dot = document.createElement("button");
        dot.className = `post-gallery-dot${imageIndex === 0 ? " is-active" : ""}`;
        dot.type = "button";
        dot.setAttribute("aria-label", `Pokaż zdjęcie ${imageIndex + 1}`);
        dot.setAttribute("aria-current", imageIndex === 0 ? "true" : "false");
        dots.append(dot);
      });
      gallery.append(dots);
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";
    const openType = openPostPanel?.postId === post.id ? openPostPanel.type : "";
    const isCommentsOpen = openType === "comments";
    const isLikesOpen = openType === "likes";
    actions.append(
      createHeartButton({
        isLiked: Boolean(user && post.likes?.[user.id]),
        count: Object.keys(post.likes || {}).length,
        label: "Polub post",
        postId: post.id,
      }),
      createDislikeButton({
        isDisliked: Boolean(user && post.dislikes?.[user.id]),
        count: Object.keys(post.dislikes || {}).length,
        postId: post.id,
      }),
      createCommentButton({
        count: (post.comments || []).length,
        postId: post.id,
        isOpen: isCommentsOpen,
      })
    );

    const socialModal = document.createElement("div");
    socialModal.className = `post-social-modal ${openType ? `is-${openType}` : ""}${openType && !animateSocialPanel ? " is-open" : ""}`;
    if (openType && animateSocialPanel) {
      socialModal.dataset.pendingOpen = "true";
    }
    const modalTitle = document.createElement("span");
    modalTitle.className = "post-social-title";
    modalTitle.textContent = isLikesOpen ? "Polubili post" : "Komentarze";
    const modalClose = document.createElement("button");
    modalClose.className = "post-social-close";
    modalClose.type = "button";
    modalClose.dataset.closePostPanel = "true";
    modalClose.setAttribute("aria-label", "Zamknij");
    socialModal.append(modalTitle, modalClose);

    const likesList = document.createElement("div");
    likesList.className = "likes-list";
    const likeNames = likeNamesFor(post.likes);
    if (!likeNames.length) {
      const empty = document.createElement("span");
      empty.className = "social-empty";
      empty.textContent = "Jeszcze nikt nie polubił tego posta.";
      likesList.append(empty);
    } else {
      likeNames.forEach((nameText) => {
        const item = document.createElement("span");
        item.className = "like-person";
        item.textContent = nameText;
        likesList.append(item);
      });
    }

    const comments = document.createElement("div");
    comments.className = "comments-list";
    (post.comments || []).forEach((comment) => {
      const row = document.createElement("div");
      row.className = "comment-row";
      const body = document.createElement("span");
      body.className = "comment-body";
      const name = document.createElement("strong");
      name.textContent = comment.userName;
      const text = document.createElement("span");
      text.textContent = comment.text;
      body.append(name, text);
      row.append(
        body,
        createHeartButton({
          isLiked: Boolean(user && comment.likes?.[user.id]),
          count: Object.keys(comment.likes || {}).length,
          label: "Polub komentarz",
          postId: post.id,
          commentId: comment.id,
        })
      );
      comments.append(row);
    });

    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    commentForm.dataset.postId = post.id;
    const input = document.createElement("input");
    input.name = "comment";
    input.placeholder = user ? "Napisz komentarz..." : "Zaloguj się, aby komentować";
    input.disabled = !user;
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Wyślij";
    button.disabled = !user;
    commentForm.append(input, button);
    socialModal.append(likesList, comments, commentForm);

    const deleteConfirm = document.createElement("div");
    deleteConfirm.className = `delete-confirm${pendingDeletePostId === post.id ? " is-open" : ""}`;
    deleteConfirm.innerHTML = `
      <button class="delete-close" type="button" data-delete-cancel aria-label="Zamknij"></button>
      <span class="delete-title">Czy chcesz trwale usunąć ten post, Kacpi?</span>
      <span class="delete-slider" data-delete-slider data-post-id="${post.id}">
        <span class="delete-slider-fill"></span>
        <span class="delete-slider-label">Przesuń, aby usunąć</span>
        <span class="delete-slider-thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7h14" />
            <path d="M9 7V5.4h6V7" />
            <path d="M8 10v8" />
            <path d="M12 10v8" />
            <path d="M16 10v8" />
            <path d="M7 7l.8 13h8.4L17 7" />
          </svg>
        </span>
      </span>
    `;

    card.append(header, title);
    if (contentText) {
      card.append(postCopy);
    }
    if (hashtags.textContent) {
      card.append(hashtags);
    }
    if (galleryImages.length) {
      card.append(gallery);
    }
    card.append(actions, socialModal, deleteConfirm);
    postsFeed.append(card);
  });

  window.requestAnimationFrame(() => {
    document.querySelectorAll(".post-social-modal[data-pending-open]").forEach((modal) => {
      modal.classList.add("is-open");
      modal.removeAttribute("data-pending-open");
    });
  });
  initializePostGalleries();
  window.setTimeout(scheduleDockContrast, 0);
};

const buildNotifications = async (user) => {
  if (!user) {
    return [];
  }

  const accountCreatedAt = new Date(user.createdAt || 0).getTime();
  const posts = sortPosts(await getPosts());
  const items = [];

  posts.forEach((post) => {
    const postCreatedAt = new Date(post.createdAt).getTime();
    if (postCreatedAt >= accountCreatedAt) {
      items.push({
        id: `post:${post.id}`,
        createdAt: post.createdAt,
        type: "post",
        actor: post.authorName || "Kacper Czarnojan",
        title: "Nowy wpis na blogu",
        detail: `${post.authorName || "Kacper Czarnojan"} wstawił(a) post pod tytułem „${post.title}”.`,
      });
    }

    (post.comments || []).forEach((comment) => {
      if (comment.userId !== user.id) {
        return;
      }

      Object.entries(comment.likes || {}).forEach(([likerId, likerValue]) => {
        if (likerId === user.id) {
          return;
        }

        const likedAt = typeof likerValue === "object" && likerValue?.createdAt ? likerValue.createdAt : comment.createdAt || post.createdAt;
        if (new Date(likedAt).getTime() < accountCreatedAt) {
          return;
        }

        items.push({
          id: `like:${post.id}:${comment.id}:${likerId}`,
          createdAt: likedAt,
          type: "like",
          actor: likeDisplayName(likerValue),
          title: "Ktoś polubił Twój komentarz",
          detail: `${likeDisplayName(likerValue)} polubił(a) twój komentarz.`,
        });
      });
    });
  });

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const updateNotificationsBadge = async () => {
  const user = await getCurrentUserProfile();
  const notificationsTab = document.querySelector(".notifications-tab");

  if (!notificationsTab || !user) {
    notificationsTab?.classList.remove("has-unread");
    return;
  }

  const lastReadAt = new Date(readNotificationsAt(user.id) || 0).getTime();
  const dismissed = await getDismissedNotifications(user.id);
  const items = (cachedNotifications.length ? cachedNotifications : await buildNotifications(user)).filter((item) => !dismissed[item.id]);
  const hasUnread = items.some((item) => new Date(item.createdAt).getTime() > lastReadAt);
  notificationsTab.classList.toggle("has-unread", hasUnread && activeDockIndex !== 3);
};

const renderNotifications = async ({ markRead = false } = {}) => {
  const user = await getCurrentUserProfile();
  notificationsFeed.innerHTML = "";

  if (!user) {
    cachedNotifications = [];
    const loginNotice = document.createElement("p");
    loginNotice.className = "notifications-empty";
    loginNotice.textContent = "Zaloguj się, aby móc otrzymywać powiadomienia.";
    notificationsFeed.append(loginNotice);
    await updateNotificationsBadge();
    return;
  }

  const dismissed = await getDismissedNotifications(user.id);
  const items = (await buildNotifications(user)).filter((item) => !dismissed[item.id]);
  cachedNotifications = items;

  if (markRead) {
    writeNotificationsAt(user.id);
  }

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "notifications-empty";
    empty.textContent = "Nie masz jeszcze nowych powiadomień.";
    notificationsFeed.append(empty);
    await updateNotificationsBadge();
    return;
  }

  const lastReadAt = new Date(readNotificationsAt(user.id) || 0).getTime();

  items.forEach((item, itemIndex) => {
    const row = document.createElement("article");
    row.className = `notification-card notification-${item.type}`;
    row.dataset.notificationId = item.id;
    row.style.setProperty("--item-index", String(Math.min(itemIndex, 9)));
    row.classList.toggle("is-unread", new Date(item.createdAt).getTime() > lastReadAt && !markRead);
    row.classList.toggle("is-selected", selectedNotificationIds.has(item.id));

    const icon = document.createElement("span");
    icon.className = "notification-icon";
    icon.innerHTML =
      item.type === "like"
        ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 5.7c-1.8-1.9-4.6-1.8-6.4.1L12 7.9l-2-2.1c-1.8-1.9-4.6-2-6.4-.1-1.9 2-1.9 5.1.1 7.1L12 21l8.3-8.2c2-2 2-5.1.1-7.1Z"/></svg>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.8h8.2l2.8 2.8v11.6h-11z"/><path d="M14.7 4.8v3h2.8"/><path d="M8.8 12h6.4"/><path d="M8.8 15.4h5"/></svg>`;

    const body = document.createElement("span");
    body.className = "notification-body";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const detail = document.createElement("span");
    detail.textContent = item.detail;
    const time = document.createElement("time");
    time.dateTime = item.createdAt;
    time.textContent = relativeTimeLabel(item.createdAt);
    body.append(title, detail, time);
    const selector = document.createElement("button");
    selector.className = "notification-selector";
    selector.type = "button";
    selector.dataset.notificationSelect = item.id;
    selector.setAttribute("aria-label", "Wybierz powiadomienie");
    selector.setAttribute("aria-pressed", String(selectedNotificationIds.has(item.id)));
    selector.classList.toggle("is-selected", selectedNotificationIds.has(item.id));
    row.append(selector, icon, body);
    notificationsFeed.append(row);
  });

  await updateNotificationsBadge();
};

const setNotificationDeleteOpen = (isOpen) => {
  if (notificationDeleteOpen === isOpen && !notificationDeleteAnimationFrame) {
    return;
  }

  notificationDeleteOpen = isOpen;
  window.clearTimeout(notificationDeleteCloseTimer);
  window.cancelAnimationFrame(notificationDeleteAnimationFrame);
  const panel = notificationDeleteMorph.querySelector(".notification-delete-panel");
  const icon = notificationDeleteMorph.querySelector(".notification-delete-icon");
  const currentRect = notificationDeleteMorph.getBoundingClientRect();
  const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const compactSize = 2.9 * rootSize;
  const targetWidth = isOpen ? Math.min(window.innerWidth - 40, 20 * rootSize) : compactSize;
  const targetHeight = isOpen ? 10.8 * rootSize : compactSize;
  const startPanelOpacity = Number(panel.style.opacity || getComputedStyle(panel).opacity || 0);
  const targetPanelOpacity = isOpen ? 1 : 0;
  const duration = isOpen ? 920 : 900;
  const startedAt = performance.now();

  notificationsPage.classList.toggle("delete-panel-closing", !isOpen);
  notificationsPage.classList.toggle("delete-panel-open", isOpen);
  notificationDeleteTrigger.setAttribute("aria-expanded", String(isOpen));

  if (!isOpen) {
    notificationSelectionMode = false;
    selectedNotificationIds.clear();
    notificationsPage.classList.remove("is-selecting-notifications");
    confirmSelectedNotificationsButton.hidden = true;
    selectNotificationsButton.hidden = false;
    notificationsFeed.querySelectorAll(".notification-card").forEach((card) => {
      card.classList.remove("is-selected");
      const selector = card.querySelector(".notification-selector");
      selector?.classList.remove("is-selected");
      selector?.setAttribute("aria-pressed", "false");
    });
    notificationDeleteCloseTimer = window.setTimeout(() => {
      notificationsPage.classList.remove("delete-panel-closing");
    }, 1020);
  } else {
    notificationsPage.classList.remove("delete-panel-closing");
  }

  const animate = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    const contentProgress = isOpen
      ? Math.max(0, Math.min(1, (progress - 0.2) / 0.8))
      : Math.max(0, Math.min(1, progress / 0.54));
    const contentEased = contentProgress * contentProgress * (3 - 2 * contentProgress);
    const bubble = Math.sin(progress * Math.PI);
    const width = currentRect.width + (targetWidth - currentRect.width) * eased;
    const height = currentRect.height + (targetHeight - currentRect.height) * eased;
    const panelOpacity = startPanelOpacity + (targetPanelOpacity - startPanelOpacity) * contentEased;

    notificationDeleteMorph.style.width = `${width.toFixed(2)}px`;
    notificationDeleteMorph.style.height = `${height.toFixed(2)}px`;
    notificationDeleteMorph.style.borderRadius = `${(16 + (isOpen ? 7.2 : 0) * eased).toFixed(2)}px`;
    notificationDeleteMorph.style.transform = `scale(${(1 + bubble * 0.018).toFixed(4)}, ${(1 - bubble * 0.06).toFixed(4)})`;
    panel.style.opacity = String(panelOpacity);
    panel.style.transform = `translateY(${((1 - panelOpacity) * 11.2).toFixed(2)}px) scale(${(0.94 + panelOpacity * 0.06).toFixed(4)})`;
    notificationDeleteClose.style.opacity = String(panelOpacity);
    notificationDeleteClose.style.transform = `scale(${(0.72 + panelOpacity * 0.28).toFixed(4)}) rotate(${((1 - panelOpacity) * -8).toFixed(2)}deg)`;
    icon.style.opacity = String(1 - panelOpacity);
    icon.style.transform = `scale(${(1 - panelOpacity * 0.28).toFixed(4)}) rotate(${(-8 * panelOpacity).toFixed(2)}deg)`;

    if (progress < 1) {
      notificationDeleteAnimationFrame = window.requestAnimationFrame(animate);
      return;
    }

    notificationDeleteMorph.style.width = `${targetWidth.toFixed(2)}px`;
    notificationDeleteMorph.style.height = `${targetHeight.toFixed(2)}px`;
    notificationDeleteMorph.style.transform = "scale(1)";
    panel.style.opacity = String(targetPanelOpacity);
    panel.style.transform = isOpen ? "translateY(0) scale(1)" : "translateY(11.2px) scale(0.94)";
    notificationDeleteClose.style.opacity = isOpen ? "1" : "0";
    notificationDeleteClose.style.transform = isOpen ? "scale(1) rotate(0deg)" : "scale(0.72) rotate(-8deg)";
    icon.style.opacity = isOpen ? "0" : "1";
    icon.style.transform = isOpen ? "scale(0.72) rotate(-8deg)" : "scale(1) rotate(0deg)";
    notificationDeleteAnimationFrame = 0;
  };

  notificationDeleteAnimationFrame = window.requestAnimationFrame(animate);
};

const deleteVisibleNotifications = async (ids) => {
  const user = await getCurrentUserProfile();
  if (!user || !ids.length) {
    return;
  }

  const dismissed = await getDismissedNotifications(user.id);
  ids.forEach((id) => {
    dismissed[id] = new Date().toISOString();
  });
  await saveDismissedNotifications(user.id, dismissed);
  cachedNotifications = cachedNotifications.filter((item) => !ids.includes(item.id));
  selectedNotificationIds.clear();
  setNotificationDeleteOpen(false);
  window.setTimeout(() => {
    renderNotifications({ markRead: activeDockIndex === 3 });
  }, 1020);
};

const setPostFilterOpen = (isOpen) => {
  if (postFilterTargetOpen === isOpen && !postFilterAnimationFrame) {
    return;
  }

  postFilterTargetOpen = isOpen;
  window.cancelAnimationFrame(postFilterAnimationFrame);
  const panel = postFilterMorph.querySelector(".post-filter-panel");
  const currentWidth = postFilterMorph.getBoundingClientRect().width;
  const compactWidth = 2.85 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const expandedWidth = Math.min(window.innerWidth - 40, 22 * parseFloat(getComputedStyle(document.documentElement).fontSize));
  const targetWidth = isOpen ? expandedWidth : compactWidth;
  const startOpacity = Number(getComputedStyle(panel).opacity || 0);
  const targetOpacity = isOpen ? 1 : 0;
  const duration = isOpen ? 820 : 720;
  const startedAt = performance.now();

  postFilterMorph.classList.toggle("is-open", isOpen);
  postFilterTrigger.setAttribute("aria-expanded", String(isOpen));

  const animate = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    const panelProgress = isOpen
      ? Math.max(0, Math.min(1, (progress - 0.16) / 0.84))
      : Math.max(0, Math.min(1, progress / 0.64));
    const panelEased = panelProgress * panelProgress * (3 - 2 * panelProgress);
    const panelVisibility = startOpacity + (targetOpacity - startOpacity) * panelEased;
    const width = currentWidth + (targetWidth - currentWidth) * eased;
    const bubble = Math.sin(progress * Math.PI);

    postFilterMorph.style.width = `${width.toFixed(2)}px`;
    postFilterMorph.style.borderRadius = `${(16 + (isOpen ? 5.6 : 0) * eased).toFixed(2)}px`;
    postFilterMorph.style.transform = `scale(${(1 + bubble * 0.018).toFixed(4)}, ${(1 - bubble * 0.055).toFixed(4)})`;
    panel.style.opacity = String(panelVisibility);
    panel.style.transform = `translateX(${((1 - panelVisibility) * -11.2).toFixed(2)}px) scaleX(${(0.82 + panelVisibility * 0.18).toFixed(4)})`;
    postFilterTrigger.style.opacity = "1";
    postFilterTrigger.style.transform = `translateY(-50%) scale(${(1 + bubble * 0.055).toFixed(4)}, ${(1 - bubble * 0.04).toFixed(4)})`;

    if (progress < 1) {
      postFilterAnimationFrame = window.requestAnimationFrame(animate);
      return;
    }

    postFilterMorph.style.width = `${targetWidth.toFixed(2)}px`;
    postFilterMorph.style.transform = "scale(1)";
    panel.style.opacity = String(targetOpacity);
    panel.style.transform = isOpen ? "translateX(0) scaleX(1)" : "translateX(-11.2px) scaleX(0.82)";
    postFilterTrigger.style.opacity = "1";
    postFilterTrigger.style.transform = "translateY(-50%) scale(1)";
    postFilterAnimationFrame = 0;
  };

  postFilterAnimationFrame = window.requestAnimationFrame(animate);
};

postFilterTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  if (Date.now() < postFilterIgnoreClickUntil) {
    event.preventDefault();
    return;
  }
  setPostFilterOpen(true);
});

postFilterClose.addEventListener("click", (event) => {
  event.stopPropagation();
  if (Date.now() < postFilterIgnoreClickUntil) {
    event.preventDefault();
    return;
  }
  setPostFilterOpen(false);
});

postSortButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.stopPropagation();
    if (Date.now() < postFilterIgnoreClickUntil) {
      event.preventDefault();
      return;
    }
    postSortMode = button.dataset.postSort;
    postSortButtons.forEach((option) => {
      option.classList.toggle("is-active", option === button);
    });
    postsFeed.classList.add("is-filtering");
    await renderPosts({ animateSocialPanel: false });
    window.requestAnimationFrame(() => {
      postsFeed.classList.remove("is-filtering");
    });
  });
});

postFilterMorph.addEventListener("pointerdown", (event) => {
  if (event.button !== undefined && event.button !== 0) {
    return;
  }

  const pointerId = event.pointerId;
  const startX = event.clientX;
  const startY = event.clientY;
  let moved = false;
  let dragStarted = false;
  let frame = 0;
  const current = { x: 0, y: 0, scaleX: 1, scaleY: 1, skew: 0 };
  const target = { x: 0, y: 0, scaleX: 1, scaleY: 1, skew: 0 };

  const animateDrag = () => {
    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;
    current.scaleX += (target.scaleX - current.scaleX) * 0.13;
    current.scaleY += (target.scaleY - current.scaleY) * 0.13;
    current.skew += (target.skew - current.skew) * 0.13;
    postFilterDragShell.style.transform =
      `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) ` +
      `skewX(${current.skew.toFixed(2)}deg) ` +
      `scale(${current.scaleX.toFixed(4)}, ${current.scaleY.toFixed(4)})`;
    frame = window.requestAnimationFrame(animateDrag);
  };

  const move = (moveEvent) => {
    if (moveEvent.pointerId !== pointerId) {
      return;
    }

    const deltaX = moveEvent.clientX - startX;
    const deltaY = moveEvent.clientY - startY;
    const distance = Math.hypot(deltaX, deltaY);

    if (!dragStarted && distance <= 10) {
      return;
    }

    if (!dragStarted) {
      dragStarted = true;
      moved = true;
      postFilterDragShell.classList.remove("is-returning");
      postFilterDragShell.classList.add("is-dragging");
      frame = window.requestAnimationFrame(animateDrag);
    }

    const pull = Math.min(1, distance / 48);
    const horizontal = Math.abs(deltaX) / (Math.abs(deltaX) + Math.abs(deltaY) + 1);
    target.x = Math.max(-9, Math.min(9, deltaX * 0.11));
    target.y = Math.max(-6, Math.min(6, deltaY * 0.09));
    target.scaleX = 1 + pull * (0.13 * horizontal - 0.045 * (1 - horizontal));
    target.scaleY = 1 + pull * (0.11 * (1 - horizontal) - 0.05 * horizontal);
    target.skew = Math.max(-5, Math.min(5, deltaX * 0.07));
  };

  const finish = (finishEvent) => {
    if (finishEvent.pointerId !== pointerId) {
      return;
    }

    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", finish);
    window.removeEventListener("pointercancel", finish);
    if (dragStarted) {
      window.cancelAnimationFrame(frame);
      postFilterDragShell.classList.remove("is-dragging");
      postFilterDragShell.classList.add("is-returning");
      window.requestAnimationFrame(() => {
        postFilterDragShell.style.transform = "translate3d(0, 0, 0) skewX(0deg) scale(1)";
      });
      window.setTimeout(() => {
        postFilterDragShell.classList.remove("is-returning");
        postFilterDragShell.style.transform = "";
      }, 540);
    }

    if (moved) {
      postFilterIgnoreClickUntil = Date.now() + 220;
    }
  };

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", finish);
  window.addEventListener("pointercancel", finish);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".post-filter-morph")) {
    setPostFilterOpen(false);
  }
});

notificationDeleteTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  setNotificationDeleteOpen(true);
});

notificationDeleteClose.addEventListener("click", (event) => {
  event.stopPropagation();
  setNotificationDeleteOpen(false);
});

deleteAllNotificationsButton.addEventListener("click", async (event) => {
  event.stopPropagation();
  const user = await getCurrentUserProfile();
  if (!user) {
    setNotificationDeleteOpen(false);
    setProfileOpen(true);
    return;
  }

  const visibleItems = cachedNotifications.length ? cachedNotifications : await buildNotifications(user);
  await deleteVisibleNotifications(visibleItems.map((item) => item.id));
});

selectNotificationsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  notificationSelectionMode = true;
  selectedNotificationIds.clear();
  notificationsPage.classList.add("is-selecting-notifications");
  selectNotificationsButton.hidden = true;
  confirmSelectedNotificationsButton.hidden = false;
  confirmSelectedNotificationsButton.disabled = true;
});

confirmSelectedNotificationsButton.addEventListener("click", async (event) => {
  event.stopPropagation();
  await deleteVisibleNotifications([...selectedNotificationIds]);
});

notificationsFeed.addEventListener("click", (event) => {
  const selector = event.target.closest("[data-notification-select]");
  if (!selector || !notificationSelectionMode) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  const id = selector.dataset.notificationSelect;
  if (selectedNotificationIds.has(id)) {
    selectedNotificationIds.delete(id);
  } else {
    selectedNotificationIds.add(id);
  }
  selector.classList.toggle("is-selected", selectedNotificationIds.has(id));
  selector.setAttribute("aria-pressed", String(selectedNotificationIds.has(id)));
  selector.closest(".notification-card")?.classList.toggle("is-selected", selectedNotificationIds.has(id));
  confirmSelectedNotificationsButton.disabled = selectedNotificationIds.size === 0;
});

const setView = async (view) => {
  appScreen.dataset.view = view;
  homePage.setAttribute("aria-hidden", String(view !== "home"));
  routePage.setAttribute("aria-hidden", String(view !== "route"));
  notificationsPage.setAttribute("aria-hidden", String(view !== "notifications"));

  if (view === "route") {
    renderRoute();
  }

  if (view === "notifications") {
    await renderNotifications({ markRead: true });
  }
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });

const fileToPostImage = async (file) => {
  const dataUrl = await fileToDataUrl(file);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", reject, { once: true });
    image.src = dataUrl;
  });

  const maxSide = 760;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.68);
};

const setAuthMode = (mode) => {
  authPanel.dataset.authMode = mode;
  profileMorph.dataset.authMode = mode;
  authFormWindow.hidden = false;
  authTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.authMode === mode));
  authMessage.textContent = "";
};

const setLoggedView = (user) => {
  const isLogged = Boolean(user);

  appScreen.classList.toggle("is-logged-in", isLogged);
  loggedPanel.hidden = !isLogged;
  authTitle.hidden = isLogged;
  authTabsWrap.hidden = isLogged;
  authFormWindow.hidden = isLogged;
  authForms.forEach((form) => {
    form.hidden = isLogged;
  });

  if (isLogged) {
    applyAppSettings(getUserAppSettings(user));
    profileMorph.removeAttribute("data-auth-mode");
    profileSettingsTrigger.hidden = false;
    profileSettingsPanel.hidden = false;
    setProfileSettingsOpen(false);
    loggedName.textContent = `Witaj na blogu, ${user.firstName}.`;
    authMessage.textContent = "";
    updateAuthorUi();
    renderPosts();
    renderNotifications();
    return;
  }

  applyAppSettings(defaultAppSettings);
  profileSettingsTrigger.hidden = true;
  profileSettingsPanel.hidden = true;
  setProfileSettingsOpen(false);
  setAuthMode("register");
  updateAuthorUi();
  renderPosts();
  renderNotifications();
};

elasticButtons.forEach((button) => {
  let startX = 0;
  let startY = 0;
  let pointerId = null;
  let maxMove = 0;
  let releaseTimer = null;

  const reset = () => {
    window.clearTimeout(releaseTimer);
    button.classList.remove("is-pressing");
    button.classList.add("is-releasing");

    window.requestAnimationFrame(() => {
      button.style.setProperty("--stretch-x", "1");
      button.style.setProperty("--stretch-y", "1");
      button.style.setProperty("--shift-x", "0px");
      button.style.setProperty("--shift-y", "0px");
      button.style.setProperty("--origin-x", "center");
      button.style.setProperty("--origin-y", "center");
    });

    releaseTimer = window.setTimeout(() => {
      button.classList.remove("is-releasing");
      maxMove = 0;
    }, 760);

    pointerId = null;
  };

  button.addEventListener("pointerdown", (event) => {
    if (optimizationEnabled()) {
      button.style.setProperty("--stretch-x", "1");
      button.style.setProperty("--stretch-y", "1");
      button.style.setProperty("--shift-x", "0px");
      button.style.setProperty("--shift-y", "0px");
      return;
    }

    if (
      (button === moreMorph && appScreen.classList.contains("menu-open")) ||
      (button === profileMorph && appScreen.classList.contains("profile-open")) ||
      (button === composeMorph && appScreen.classList.contains("compose-open"))
    ) {
      return;
    }

    pointerId = event.pointerId;
    maxMove = 0;
    startX = event.clientX;
    startY = event.clientY;
    window.clearTimeout(releaseTimer);
    button.classList.remove("is-releasing");
    button.classList.add("is-pressing");
    button.style.setProperty("--stretch-x", "1.025");
    button.style.setProperty("--stretch-y", "0.976");
    button.style.setProperty("--shift-x", "0px");
    button.style.setProperty("--shift-y", "0px");
    button.style.setProperty("--origin-x", "center");
    button.style.setProperty("--origin-y", "center");
    button.setPointerCapture(event.pointerId);
  });

  button.addEventListener("pointermove", (event) => {
    if (optimizationEnabled()) {
      return;
    }

    if (event.pointerId !== pointerId || !button.classList.contains("is-pressing")) {
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const distance = Math.min(Math.hypot(deltaX, deltaY), 42);
    const isOptimized = optimizationEnabled();
    const pull = Math.min(distance / (isOptimized ? 420 : 220), isOptimized ? 0.065 : 0.19);
    const total = absX + absY || 1;
    const xWeight = absX / total;
    const yWeight = absY / total;
    const stretchX = 1 + pull * xWeight - pull * 0.46 * yWeight;
    const stretchY = 1 + pull * yWeight - pull * 0.46 * xWeight;

    maxMove = Math.max(maxMove, Math.hypot(deltaX, deltaY));

    const maxShift = isOptimized ? 2.5 : 7;
    const shiftRatio = isOptimized ? 0.035 : 0.1;
    button.style.setProperty("--shift-x", `${Math.max(-maxShift, Math.min(maxShift, deltaX * shiftRatio))}px`);
    button.style.setProperty("--shift-y", `${Math.max(-maxShift, Math.min(maxShift, deltaY * shiftRatio))}px`);
    button.style.setProperty("--origin-x", deltaX >= 0 ? "left" : "right");
    button.style.setProperty("--origin-y", deltaY >= 0 ? "top" : "bottom");
    button.style.setProperty("--stretch-x", stretchX.toFixed(3));
    button.style.setProperty("--stretch-y", stretchY.toFixed(3));
  });

  button.addEventListener("pointerup", (event) => {
    if (event.pointerId === pointerId) {
      reset();
    }
  });

  button.addEventListener("pointercancel", (event) => {
    if (event.pointerId === pointerId) {
      reset();
    }
  });

  button.addEventListener("lostpointercapture", (event) => {
    if (event.pointerId === pointerId) {
      reset();
    }
  });

  button.addEventListener("click", (event) => {
    if (maxMove > 8) {
      event.preventDefault();
      event.stopPropagation();
      maxMove = 0;
      return;
    }

    if (button === moreMorph && isCloseIcon(event.target)) {
      setMenuOpen(false);
      return;
    }

    if (button === moreMorph && !appScreen.classList.contains("menu-open")) {
      setProfileOpen(false);
      setComposeOpen(false);
      setMenuOpen(true);
      return;
    }

    if (button === profileMorph && isCloseIcon(event.target)) {
      setProfileOpen(false);
      return;
    }

    if (button === composeMorph && isCloseIcon(event.target)) {
      setComposeOpen(false);
      return;
    }

    if (button === moreMorph && !isInteractive(event.target)) {
      setProfileOpen(false);
      setComposeOpen(false);
      setMenuOpen(!appScreen.classList.contains("menu-open"));
    }

    if (button === profileMorph && !isInteractive(event.target)) {
      setMenuOpen(false);
      setComposeOpen(false);
      setProfileOpen(!appScreen.classList.contains("profile-open"));
    }

    if (button === composeMorph && !isInteractive(event.target)) {
      setMenuOpen(false);
      setProfileOpen(false);
      setComposeOpen(!appScreen.classList.contains("compose-open"));
    }
  });

  button.addEventListener("keydown", (event) => {
    if (isInteractive(event.target)) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }
  });
});

panelBackdrop.addEventListener("click", closePanels);

usersButton.addEventListener("click", async (event) => {
  event.stopPropagation();
  await renderUsers();
  usersList.classList.toggle("is-visible");
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.stopPropagation();
    setAuthMode(tab.dataset.authMode);
  });
});

authForms.forEach((form) => {
  form.addEventListener("click", (event) => event.stopPropagation());

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(form);
    const mode = form.dataset.authForm;
    const firstName = formData.get("firstName").trim();
    const lastName = formData.get("lastName")?.trim() || "";
    const password = formData.get("password");
    const users = await getUsers();

    if (mode === "register") {
      const passwordRepeat = formData.get("passwordRepeat");
      const consentAccepted = formData.get("consent") === "on";

      if (password !== passwordRepeat) {
        authMessage.textContent = "Hasła nie są takie same.";
        return;
      }

      if (!consentAccepted) {
        authMessage.textContent = "Zaakceptuj warunki użytkowania i politykę RODO.";
        return;
      }

      const id = userIdFor(firstName, lastName);
      if (users.some((user) => user.id === id)) {
        authMessage.textContent = "Taki użytkownik już istnieje.";
        return;
      }

      await saveUser({
        id,
        firstName,
        lastName,
        passwordHash: await hashPassword(password),
        isAuthor: isAuthorCredentials(firstName, lastName, password),
        createdAt: new Date().toISOString(),
        consentAcceptedAt: new Date().toISOString(),
        appSettings: defaultAppSettings,
      });

      const currentUser = {
        id,
        firstName,
        lastName,
        isAuthor: isAuthorCredentials(firstName, lastName, password),
        createdAt: new Date().toISOString(),
        consentAcceptedAt: new Date().toISOString(),
        appSettings: defaultAppSettings,
      };
      writeCurrentUser(currentUser);
      setLoggedView(currentUser);
      form.reset();
      await renderUsers();
      return;
    }

    const passwordHash = await hashPassword(password);
    const user = users.find(
      (item) =>
        normalize(item.firstName) === normalize(firstName) &&
        normalize(item.lastName || "") === normalize(lastName) &&
        item.passwordHash === passwordHash
    );

    if (!user && isAuthorCredentials(firstName, lastName, password)) {
      const id = userIdFor(firstName, lastName);
      const authorUser = {
        id,
        firstName,
        lastName,
        passwordHash,
        isAuthor: true,
        createdAt: new Date().toISOString(),
        appSettings: defaultAppSettings,
      };
      await saveUser(authorUser);
      writeCurrentUser({
        id,
        firstName,
        lastName,
        isAuthor: true,
        createdAt: authorUser.createdAt,
        appSettings: defaultAppSettings,
      });
      setLoggedView(authorUser);
      form.reset();
      await renderUsers();
      return;
    }

    if (!user) {
      authMessage.textContent = "Nieprawidłowe imię, nazwisko lub hasło.";
      return;
    }

    const currentUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAuthor: isAuthorCredentials(firstName, lastName, password) || Boolean(user.isAuthor),
      createdAt: user.createdAt || new Date().toISOString(),
      appSettings: getUserAppSettings(user),
    };
    writeCurrentUser(currentUser);
    setLoggedView(currentUser);
  });
});

logoutButton.addEventListener("click", (event) => {
  event.stopPropagation();
  clearCurrentUser();
  setLoggedView(null);
  authMessage.textContent = "Wylogowano.";
});

profileSettingsTrigger.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});

profileSettingsTrigger.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setProfileSettingsOpen(!profileSettingsPanel.classList.contains("is-open"));
});

profileSettingsPanel.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});

profileSettingsPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

optimizationToggle.addEventListener("change", () => {
  const nextSettings = {
    ...activeAppSettings,
    optimization: optimizationToggle.checked,
  };
  applyAppSettings(nextSettings);
  persistCurrentUserAppSettings(nextSettings);
});

transparencySlider.addEventListener("input", () => {
  const nextSettings = {
    ...activeAppSettings,
    transparency: Number(transparencySlider.value),
  };
  applyAppSettings(nextSettings);
  persistCurrentUserAppSettings(nextSettings);
  animateTransparencySlider();
});

transparencySlider.addEventListener("pointerdown", animateTransparencySlider);

postForm.addEventListener("click", (event) => event.stopPropagation());

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const user = readCurrentUser();

  if (!isAuthorUser(user)) {
    composeMessage.textContent = "Tylko autor może dodawać posty.";
    return;
  }

  const formData = new FormData(postForm);
  const files = formData
    .getAll("images")
    .filter((file) => file instanceof File && file.size > 0)
    .slice(0, 8);

  composeMessage.textContent = "Dodaję post...";
  let images = [];
  try {
    images = await Promise.all(files.map(fileToPostImage));
  } catch {
    composeMessage.textContent = "Nie udało się przygotować zdjęć.";
    return;
  }
  const hashtags = String(formData.get("hashtags") || "")
    .split(/\s+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

  try {
    await savePost({
      id: `post-${Date.now()}`,
      title: String(formData.get("title") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      hashtags,
      images,
      authorId: user.id,
      authorName: `${user.firstName} ${user.lastName}`.trim(),
      likes: {},
      dislikes: {},
      comments: [],
      createdAt: new Date().toISOString(),
    });
  } catch {
    composeMessage.textContent = "Nie udało się zapisać posta.";
    return;
  }

  postForm.reset();
  composeMessage.textContent = "Post dodany.";
  setComposeOpen(false);
  await renderPosts({ animateSocialPanel: false });
  await renderNotifications({ markRead: activeDockIndex === 3 });
});

postsFeed.addEventListener("click", async (event) => {
  const textToggle = event.target.closest("[data-toggle-post-text]");
  const deleteOpen = event.target.closest("[data-delete-post-open]");
  const deleteCancel = event.target.closest("[data-delete-cancel]");
  const closePostPanel = event.target.closest("[data-close-post-panel]");
  const commentToggle = event.target.closest("[data-comment-toggle]");
  const heartButton = event.target.closest(".heart-button");
  const dislikeButton = event.target.closest(".dislike-button");

  if (textToggle) {
    event.preventDefault();
    event.stopPropagation();
    const postId = textToggle.dataset.togglePostText;
    const copy = textToggle.closest(".post-copy");
    const isExpanded = !copy.classList.contains("is-expanded");
    copy.classList.toggle("is-expanded", isExpanded);
    textToggle.textContent = isExpanded ? "Zwiń tekst" : "Rozwiń tekst";
    textToggle.setAttribute("aria-expanded", String(isExpanded));
    if (isExpanded) {
      expandedPostTexts.add(postId);
    } else {
      expandedPostTexts.delete(postId);
    }
    return;
  }

  if (deleteOpen) {
    event.preventDefault();
    event.stopPropagation();
    pendingDeletePostId = deleteOpen.dataset.deletePostOpen;
    openPostPanel = null;
    await renderPosts();
    return;
  }

  if (deleteCancel) {
    event.preventDefault();
    event.stopPropagation();
    pendingDeletePostId = null;
    await renderPosts();
    return;
  }

  if (closePostPanel) {
    event.preventDefault();
    event.stopPropagation();
    const postId = closePostPanel.closest(".post-card")?.dataset.postId;
    openPostPanel = null;
    if (postId) {
      setPostSocialPanel(postId, "comments", false);
    }
    return;
  }

  if (commentToggle) {
    event.preventDefault();
    event.stopPropagation();
    const isSamePanel = openPostPanel?.postId === commentToggle.dataset.postId && openPostPanel.type === "comments";
    openPostPanel = isSamePanel ? null : { postId: commentToggle.dataset.postId, type: "comments" };
    pendingDeletePostId = null;
    setPostSocialPanel(commentToggle.dataset.postId, "comments", !isSamePanel);
    return;
  }

  if (!heartButton && !dislikeButton) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  const user = readCurrentUser();

  if (!user) {
    setMenuOpen(false);
    setComposeOpen(false);
    setProfileOpen(true);
    return;
  }

  if (heartButton?.dataset.likeTarget === "post") {
    openPostPanel = { postId: heartButton.dataset.postId, type: "likes" };
    pendingDeletePostId = null;
    setPostSocialPanel(heartButton.dataset.postId, "likes", true);

    const wasLiked = heartButton.classList.contains("is-liked");
    const count = heartButton.querySelector("span");
    heartButton.classList.toggle("is-liked", !wasLiked);
    heartButton.classList.toggle("is-popping", !wasLiked);
    if (count) {
      count.textContent = String(Math.max(0, Number(count.textContent || 0) + (wasLiked ? -1 : 1)));
    }
    if (!wasLiked) {
      const likesList = heartButton.closest(".post-card")?.querySelector(".likes-list");
      likesList?.querySelector(".social-empty")?.remove();
      if (likesList) {
        const person = document.createElement("span");
        person.className = "like-person";
        person.textContent = currentUserDisplay();
        likesList.append(person);
      }
      const dislike = heartButton.closest(".post-card")?.querySelector(".dislike-button");
      if (dislike?.classList.contains("is-disliked")) {
        dislike.classList.remove("is-disliked");
        const dislikeCount = dislike.querySelector("span");
        if (dislikeCount) {
          dislikeCount.textContent = String(Math.max(0, Number(dislikeCount.textContent || 0) - 1));
        }
      }
      playHeartSound();
      lastLikedKey = heartButton.dataset.postId;
    } else {
      const likesList = heartButton.closest(".post-card")?.querySelector(".likes-list");
      Array.from(likesList?.querySelectorAll(".like-person") || [])
        .find((person) => person.textContent === currentUserDisplay())
        ?.remove();
    }
  }

  if (dislikeButton) {
    const wasDisliked = dislikeButton.classList.contains("is-disliked");
    const count = dislikeButton.querySelector("span");
    dislikeButton.classList.toggle("is-disliked", !wasDisliked);
    dislikeButton.classList.toggle("is-popping", !wasDisliked);
    if (count) {
      count.textContent = String(Math.max(0, Number(count.textContent || 0) + (wasDisliked ? -1 : 1)));
    }

    if (!wasDisliked) {
      const heart = dislikeButton.closest(".post-card")?.querySelector(".heart-button[data-like-target='post']");
      if (heart?.classList.contains("is-liked")) {
        heart.classList.remove("is-liked", "is-popping");
        const heartCount = heart.querySelector("span");
        if (heartCount) {
          heartCount.textContent = String(Math.max(0, Number(heartCount.textContent || 0) - 1));
        }
      }
      lastDislikedKey = dislikeButton.dataset.postId;
    }
  }

  const reactionButton = heartButton || dislikeButton;
  const posts = await getPosts();
  const post = posts.find((item) => item.id === reactionButton.dataset.postId);

  if (!post) {
    return;
  }

  if (heartButton?.dataset.likeTarget === "comment") {
    const comment = (post.comments || []).find((item) => item.id === heartButton.dataset.commentId);

    if (!comment) {
      return;
    }

    comment.likes = comment.likes || {};
    if (comment.likes[user.id]) {
      delete comment.likes[user.id];
    } else {
      comment.likes[user.id] = {
        name: currentUserDisplay(),
        createdAt: new Date().toISOString(),
      };
      playHeartSound();
      lastLikedKey = `${post.id}:${comment.id}`;
    }
  } else if (heartButton) {
    post.likes = post.likes || {};
    post.dislikes = post.dislikes || {};
    if (post.likes[user.id]) {
      delete post.likes[user.id];
    } else {
      post.likes[user.id] = currentUserDisplay();
      delete post.dislikes[user.id];
    }
    openPostPanel = { postId: post.id, type: "likes" };
    pendingDeletePostId = null;
  } else {
    post.dislikes = post.dislikes || {};
    post.likes = post.likes || {};
    const wasDisliked = Boolean(post.dislikes[user.id]);
    if (wasDisliked) {
      delete post.dislikes[user.id];
    } else {
      post.dislikes[user.id] = currentUserDisplay();
      delete post.likes[user.id];
      lastDislikedKey = post.id;
    }
  }

  await savePost(post);
  await renderPosts({ animateSocialPanel: false });
  await renderNotifications({ markRead: activeDockIndex === 3 });
  window.setTimeout(() => {
    lastLikedKey = "";
    lastDislikedKey = "";
  }, 520);
});

postsFeed.addEventListener("pointerdown", (event) => {
  const slider = event.target.closest("[data-delete-slider]");
  if (!slider) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  const postId = slider.dataset.postId;
  const thumb = slider.querySelector(".delete-slider-thumb");
  const fill = slider.querySelector(".delete-slider-fill");
  const rect = slider.getBoundingClientRect();
  const max = Math.max(1, rect.width - thumb.getBoundingClientRect().width - 8);
  let completed = false;

  slider.setPointerCapture(event.pointerId);
  slider.classList.add("is-sliding");

  const setProgress = (clientX) => {
    const raw = Math.max(0, Math.min(max, clientX - rect.left - 4));
    const progress = raw / max;
    thumb.style.setProperty("--delete-slide-x", `${raw.toFixed(2)}px`);
    fill.style.setProperty("--delete-slide-progress", `${(progress * 100).toFixed(1)}%`);

    if (progress > 0.92 && !completed) {
      completed = true;
      slider.classList.add("is-complete");
    }
  };

  const finish = async (finishEvent) => {
    if (finishEvent.pointerId !== event.pointerId) {
      return;
    }

    slider.releasePointerCapture(event.pointerId);
    slider.removeEventListener("pointermove", move);
    slider.removeEventListener("pointerup", finish);
    slider.removeEventListener("pointercancel", finish);
    slider.classList.remove("is-sliding");

    if (completed) {
      await deletePost(postId);
      pendingDeletePostId = null;
      openPostPanel = null;
      await renderPosts();
      await renderNotifications({ markRead: activeDockIndex === 3 });
      return;
    }

    thumb.style.setProperty("--delete-slide-x", "0px");
    fill.style.setProperty("--delete-slide-progress", "0%");
  };

  const move = (moveEvent) => {
    if (moveEvent.pointerId === event.pointerId) {
      setProgress(moveEvent.clientX);
    }
  };

  setProgress(event.clientX);
  slider.addEventListener("pointermove", move);
  slider.addEventListener("pointerup", finish);
  slider.addEventListener("pointercancel", finish);
});

postsFeed.addEventListener("submit", async (event) => {
  const form = event.target.closest(".comment-form");

  if (!form) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  const user = readCurrentUser();

  if (!user) {
    setMenuOpen(false);
    setComposeOpen(false);
    setProfileOpen(true);
    return;
  }

  const input = form.elements.comment;
  const text = input.value.trim();

  if (!text) {
    return;
  }

  const posts = await getPosts();
  const post = posts.find((item) => item.id === form.dataset.postId);

  if (!post) {
    return;
  }

  post.comments = post.comments || [];
  post.comments.push({
    id: `comment-${Date.now()}`,
    userId: user.id,
    userName: currentUserDisplay(),
    text,
    likes: {},
    createdAt: new Date().toISOString(),
  });

  input.value = "";
  await savePost(post);
  await renderPosts({ animateSocialPanel: false });
  await renderNotifications({ markRead: activeDockIndex === 3 });
});

dockTabs.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    event.stopPropagation();

    if (suppressDockClick) {
      event.preventDefault();
      return;
    }

    if (bottomDock.classList.contains("is-collapsed")) {
      event.preventDefault();
      expandDock();
      return;
    }

    setMenuOpen(false);
    setProfileOpen(false);
    setComposeOpen(false);
    const direction =
      Math.sign(index - activeDockIndex) || (appScreen.dataset.viewDirection === "back" ? -1 : 1);
    const isOptimized = optimizationEnabled();
    moveDockIndicator(index);
    bottomDock.dataset.motionDirection = direction < 0 ? "left" : "right";
    bottomDock.style.setProperty("--dock-click-shift", `${direction * (isOptimized ? 2 : 6.5)}px`);
    bottomDock.style.setProperty("--dock-click-return-shift", `${direction * (isOptimized ? -0.7 : -2.4)}px`);
    bottomDock.style.setProperty("--dock-click-skew", `${direction * (isOptimized ? 1.1 : 4.6)}deg`);
    bottomDock.style.setProperty("--dock-click-return-skew", `${direction * (isOptimized ? -0.4 : -2)}deg`);
    bottomDock.classList.remove("is-switching");
    bottomDock.getBoundingClientRect();
    bottomDock.classList.add("is-switching");
    window.setTimeout(() => {
      bottomDock.classList.remove("is-switching");
    }, 760);
  });
});

bottomDock.addEventListener("pointerdown", (event) => {
  if (bottomDock.classList.contains("is-collapsed")) {
    expandDock();
    return;
  }

  bottomDock.classList.remove("is-expanding", "is-candy-pulsing");
  const dockRect = bottomDock.getBoundingClientRect();
  bottomDock.style.setProperty("--dock-touch-x", `${event.clientX - dockRect.left}px`);
  bottomDock.classList.remove("is-touch-light");
  bottomDock.getBoundingClientRect();
  bottomDock.classList.add("is-touch-light");
  window.clearTimeout(dockTouchLightTimer);
  dockTouchLightTimer = window.setTimeout(() => {
    bottomDock.classList.remove("is-touch-light");
  }, 920);

  const tab = event.target.closest("[data-dock-tab]");

  if (!tab && !event.target.closest(".dock-indicator")) {
    return;
  }

  const startX = event.clientX;
  const startIndex = activeDockIndex;
  const step = getDockStep() || 1;
  let startClientX = event.clientX;
  let animationFrame = 0;
  let moved = false;
  let dragVisualStarted = false;
  const current = { shift: 0, wobble: 0, skew: 0, stretch: 1, squeeze: 1 };
  const target = { shift: 0, wobble: 0, skew: 0, stretch: 1, squeeze: 1 };

  const animateDrag = () => {
    current.shift += (target.shift - current.shift) * 0.14;
    current.wobble += (target.wobble - current.wobble) * 0.12;
    current.skew += (target.skew - current.skew) * 0.12;
    current.stretch += (target.stretch - current.stretch) * 0.16;
    current.squeeze += (target.squeeze - current.squeeze) * 0.16;

    bottomDock.style.setProperty("--dock-drag-x", `${current.shift.toFixed(2)}px`);
    bottomDock.style.setProperty("--dock-wobble", `${current.wobble.toFixed(2)}px`);
    bottomDock.style.setProperty("--dock-skew", `${current.skew.toFixed(2)}deg`);
    bottomDock.style.setProperty("--dock-scale-x", current.stretch.toFixed(3));
    bottomDock.style.setProperty("--dock-scale-y", current.squeeze.toFixed(3));

    animationFrame = window.requestAnimationFrame(animateDrag);
  };

  bottomDock.setPointerCapture(event.pointerId);

  const onPointerMove = (moveEvent) => {
    if (moveEvent.pointerId !== event.pointerId) {
      return;
    }

    const pointerDistance = Math.abs(moveEvent.clientX - startX);
    if (pointerDistance < 5) {
      return;
    }

    moved = true;
    if (!dragVisualStarted) {
      dragVisualStarted = true;
      bottomDock.classList.add("is-dragging");
      bottomDock.setPointerCapture(event.pointerId);
      animationFrame = window.requestAnimationFrame(animateDrag);
    }
    const maxShift = step * (dockTabs.length - 1 - startIndex);
    const minShift = -step * startIndex;
    const shift = Math.max(minShift, Math.min(maxShift, moveEvent.clientX - startX));
    target.shift = shift;
    const delta = moveEvent.clientX - startClientX;
    const direction = Math.sign(delta) || 1;
    const motion = Math.min(1, 0.22 + Math.abs(delta) / 28);
    const isOptimized = optimizationEnabled();
    target.wobble = direction * motion * (isOptimized ? 0.28 : 1.15);
    target.skew = direction * motion * (isOptimized ? 0.22 : 0.95);
    target.stretch = 1 + motion * (isOptimized ? 0.01 : 0.11);
    target.squeeze = 1 - motion * (isOptimized ? 0.008 : 0.065);
    bottomDock.dataset.motionDirection = direction < 0 ? "left" : "right";
    bottomDock.style.setProperty("--dock-origin-x", direction < 0 ? "right" : "left");
    startClientX = moveEvent.clientX;
  };

  const finish = (finishEvent) => {
    if (finishEvent.pointerId !== event.pointerId) {
      return;
    }

    bottomDock.classList.remove("is-dragging");
    window.cancelAnimationFrame(animationFrame);
    bottomDock.removeEventListener("pointermove", onPointerMove);
    bottomDock.removeEventListener("pointerup", finish);
    bottomDock.removeEventListener("pointercancel", finish);
    moveDockIndicator(moved ? dockIndexFromPoint(finishEvent.clientX) : Array.from(dockTabs).indexOf(tab), {
      animateDock: !moved,
    });

    if (moved) {
      suppressDockClick = true;
      window.setTimeout(() => {
        suppressDockClick = false;
      }, 0);
    }
  };

  bottomDock.addEventListener("pointermove", onPointerMove);
  bottomDock.addEventListener("pointerup", finish);
  bottomDock.addEventListener("pointercancel", finish);
});

bottomDock.addEventListener("click", (event) => {
  if (suppressDockClick) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (bottomDock.classList.contains("is-collapsed")) {
    event.preventDefault();
    event.stopPropagation();
    expandDock();
  }
});

scrollTopBubble.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setScrollTopBubbleVisible(false);

  window.setTimeout(() => {
    expandDock();
    appScreen.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    lastAppScrollTop = 0;
  }, 170);
});

window.addEventListener("resize", () => {
  moveDockIndicator(activeDockIndex, { animateDock: false, animateView: false });
});

const getPageScrollTop = () =>
  Math.max(
    appScreen.scrollTop || 0,
    window.scrollY || 0,
    document.documentElement.scrollTop || 0,
    document.body.scrollTop || 0
  );

const handleDockAutoCollapse = () => {
  const currentScrollTop = getPageScrollTop();
  const delta = currentScrollTop - lastAppScrollTop;
  const isHome = appScreen.dataset.view !== "notifications";
  const hasOpenPanel =
    appScreen.classList.contains("menu-open") ||
    appScreen.classList.contains("profile-open") ||
    appScreen.classList.contains("compose-open");

  if (!isHome || hasOpenPanel || currentScrollTop < dockExpandThreshold) {
    expandDock();
    lastAppScrollTop = currentScrollTop;
    return;
  }

  if (delta > 1 && currentScrollTop > dockCollapseThreshold) {
    setDockCollapsed(true);
  }

  if (delta < -1) {
    expandDock();
  }

  setScrollTopBubbleVisible(
    bottomDock.classList.contains("is-collapsed")
  );
  lastAppScrollTop = currentScrollTop;
};

const imageLooksDark = (image, viewportX, viewportY) => {
  if (!image?.complete || !image.naturalWidth || !image.naturalHeight) {
    return false;
  }

  try {
    const rect = image.getBoundingClientRect();
    if (
      viewportX < rect.left ||
      viewportX > rect.right ||
      viewportY < rect.top ||
      viewportY > rect.bottom
    ) {
      return false;
    }

    const scale = Math.max(
      rect.width / image.naturalWidth,
      rect.height / image.naturalHeight
    );
    const renderedWidth = image.naturalWidth * scale;
    const renderedHeight = image.naturalHeight * scale;
    const cropX = (renderedWidth - rect.width) / 2;
    const cropY = (renderedHeight - rect.height) / 2;
    const sourceX = (viewportX - rect.left + cropX) / scale;
    const sourceY = (viewportY - rect.top + cropY) / scale;
    const sampleWidth = Math.max(2, image.naturalWidth * 0.045);
    const sampleHeight = Math.max(2, image.naturalHeight * 0.045);
    const canvas = document.createElement("canvas");
    canvas.width = 3;
    canvas.height = 3;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(
      image,
      Math.max(0, sourceX - sampleWidth / 2),
      Math.max(0, sourceY - sampleHeight / 2),
      sampleWidth,
      sampleHeight,
      0,
      0,
      3,
      3
    );
    const pixels = context.getImageData(0, 0, 3, 3).data;
    let luminance = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      luminance +=
        pixels[index] * 0.299 +
        pixels[index + 1] * 0.587 +
        pixels[index + 2] * 0.114;
    }

    return luminance / 9 < 58;
  } catch {
    return false;
  }
};

const updateDockContrast = () => {
  if (shouldLockDockTextTone()) {
    dockTabs.forEach((tab) => tab.classList.remove("is-on-dark"));
    return;
  }

  dockTabs.forEach((tab) => {
    const rect = tab.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.55;
    const elements = document.elementsFromPoint(x, y).filter((element) => !bottomDock.contains(element));
    const image = elements.find((element) => element.tagName === "IMG");
    const isDark = image ? imageLooksDark(image, x, y) : false;

    tab.classList.toggle("is-on-dark", isDark);
  });
};

const scheduleDockContrast = () => {
  window.cancelAnimationFrame(contrastFrame);
  contrastFrame = window.requestAnimationFrame(updateDockContrast);
};

window.addEventListener(
  "scroll",
  () => {
    scheduleDockContrast();
    handleDockAutoCollapse();
  },
  { passive: true }
);
appScreen.addEventListener(
  "scroll",
  () => {
    scheduleDockContrast();
    handleDockAutoCollapse();
  },
  { passive: true }
);
window.addEventListener("resize", scheduleDockContrast);

moveDockIndicator(0, { animateDock: false, animateView: false });
getCurrentUserProfile()
  .then((user) => setLoggedView(user))
  .catch(() => setLoggedView(readCurrentUser()));
renderUsers();
syncLocalPostsToFirebase()
  .then(renderPosts)
  .catch(renderPosts)
  .finally(() => {
    window.setTimeout(() => appScreen.classList.remove("app-entering"), 2200);
  });
scheduleDockContrast();
window.setTimeout(showTutorial, 2600);
