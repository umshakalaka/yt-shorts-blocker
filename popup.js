const toggle = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

chrome.storage.sync.get(['enabled'], (result) => {
  const enabled = result.enabled !== false; 
  toggle.checked = enabled;
  updateStatus(enabled);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  updateStatus(enabled);

  chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.reload(tab.id);
    });
  });
});

function updateStatus(enabled) {
  if (enabled) {
    statusText.className = 'status-indicator';
    statusText.innerHTML = '<div class="dot"></div> Shorts are being blocked';
  } else {
    statusText.className = 'status-indicator off';
    statusText.innerHTML = '<div class="dot"></div> Blocker is disabled';
  }
}
