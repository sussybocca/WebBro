let tabCount = 0;
let currentTab = null;
const tabs = [];
const tabContainer = document.getElementById('tabs');
const viewContainer = document.getElementById('view-container');

// Create a new tab
function newTab(url = 'https://example.com') {
  const id = tabCount++;
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.textContent = 'Tab ' + id;
  tab.onclick = () => switchTab(id);
  tabContainer.appendChild(tab);

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.width = '100%';
  iframe.style.height = 'calc(100vh - 60px)';
  iframe.style.border = 'none';
  iframe.dataset.id = id;
  viewContainer.appendChild(iframe);
  tabs.push({ id, tab, iframe });

  switchTab(id);
}

// Switch between tabs
function switchTab(id) {
  tabs.forEach(t => {
    t.tab.classList.remove('active');
    t.iframe.style.display = 'none';
  });

  const selected = tabs.find(t => t.id === id);
  if (selected) {
    selected.tab.classList.add('active');
    selected.iframe.style.display = 'block';
    currentTab = id;
  }
}

// Open URL in current tab or new tab if none exists
function openURL() {
  const urlField = document.getElementById('url');
  let url = urlField.value.trim();
  if (!/^https?:\/\//.test(url)) url = 'https://' + url;

  if (currentTab !== null) {
    const currentIframe = tabs.find(t => t.id === currentTab).iframe;
    currentIframe.src = url;
  } else {
    newTab(url);
  }
}

// Navigation controls
function nav(action) {
  if (currentTab === null) return;
  const iframe = tabs.find(t => t.id === currentTab).iframe;
  if (!iframe.contentWindow) return;

  switch(action) {
    case 'back':
      iframe.contentWindow.history.back();
      break;
    case 'forward':
      iframe.contentWindow.history.forward();
      break;
    case 'reload':
      iframe.contentWindow.location.reload();
      break;
  }
}

// ================================
// Window controls (emoji buttons)
// ================================
// Note: These only make sense in Electron. In a browser, you can't minimize/maximize windows programmatically.
// So for PWA, we can either hide these or use them as visual indicators only.

document.getElementById('minimize')?.addEventListener('click', () => alert('Minimize button (not available in browser)'));
document.getElementById('maximize')?.addEventListener('click', () => alert('Maximize button (not available in browser)'));
document.getElementById('close')?.addEventListener('click', () => alert('Close button (not available in browser)'));

// ================================
// Settings button
// ================================
document.getElementById('settings')?.addEventListener('click', () => {
  // Open settings as a modal or new tab
  const settingsTab = tabs.find(t => t.iframe.src.includes('settings.html'));
  if (settingsTab) {
    switchTab(settingsTab.id);
  } else {
    newTab('settings.html');
  }
});

// ================================
// Initial tab
// ================================
newTab();
