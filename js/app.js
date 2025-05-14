// Notifications dropdown

const notificationDropdownBtn = document.getElementById(
  'notificationDropdownBtn'
);
const notificationList = document.getElementById('notificationList');
const notificationWrapper = document.querySelector('.notification-wrapper');
const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');

// Sample notifications data
const notifications = [
  {
    id: 1,
    message: 'Dawn Wood liked your photo',
    timestamp: 'Today',
    read: false,
  },
  {
    id: 2,
    message: 'Check out our new dashboard features!',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: 3,

    message: 'Please update your contact information',
    timestamp: 'Yesterday',
    read: true,
  },
];

// Populate notifications
populateNotifications(notifications);

// Toggle dropdown on button click
notificationDropdownBtn.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (notificationList.classList.contains('visible')) {
    fadeOut(notificationList);
  } else {
    fadeIn(notificationList);
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
  if (
    !e.target.closest('#notificationDropdownBtn') &&
    !e.target.closest('#notificationList')
  ) {
    if (notificationList.classList.contains('visible')) {
      fadeOut(notificationList);
    }
  }
});

// Fade in function
function fadeIn(element) {
  element.style.display = 'block';
  setTimeout(() => {
    element.classList.add('visible');
  }, 10);
}

// Fade out function
function fadeOut(element) {
  element.classList.remove('visible');
  setTimeout(() => {
    if (!element.classList.contains('visible')) {
      element.style.display = 'none';
    }
  }, 250);
}

// Function to populate notifications
function populateNotifications(notifications) {
  notificationWrapper.innerHTML = '';

  if (notifications.length === 0) {
    const noNotifications = document.createElement('div');
    noNotifications.className = 'notification-item';
    noNotifications.textContent = 'No notifications available';
    notificationWrapper.appendChild(noNotifications);
    return;
  }

  notifications.forEach((notification) => {
    const notificationItem = document.createElement('div');
    notificationItem.className = 'notification-item';
    if (!notification.read) {
      notificationItem.classList.add('unread');
    }
    notificationItem.dataset.id = notification.id;

    const notificationMessage = document.createElement('p');
    notificationMessage.className = 'notification-message';
    notificationMessage.textContent = notification.message;

    const timestamp = document.createElement('p');
    timestamp.className = 'timestamp';
    timestamp.textContent = notification.timestamp;

    notificationItem.appendChild(notificationMessage);
    notificationItem.appendChild(timestamp);

    // Mark as read when clicked
    notificationItem.addEventListener('click', function (e) {
      e.stopPropagation();
      const id = this.dataset.id;
      markAsRead(id);
      this.classList.remove('unread');
    });

    notificationWrapper.appendChild(notificationItem);
  });
}
// Function to mark a notification as read
function markAsRead(id) {
  // Update local data
  const notificationIndex = notifications.findIndex((a) => a.id == id);
  if (notificationIndex !== -1) {
    notifications[notificationIndex].read = true;
  }
}

// ---------------------------------
// Alert Banner
// ---------------------------------
const alertBanner = document.getElementById('alert');

// Create the html for the banner
alertBanner.innerHTML = `<div class='alert-banner'>
  <p><span class='fw-bold'>Alert:</span> You have <span class='fw-bold'>6</span> overdue tasks to complete</p>
  <i class="fa-solid fa-xmark alert-banner-close"></i>
  </div>`;

// Dismiss alert
alertBanner.addEventListener('click', (e) => {
  const element = e.target;
  if (element.classList.contains('alert-banner-close')) {
    alertBanner.style.animation = 'fadeOut .5s ease forwards';
  }
});

// ---------------------------------
// Message User
// ---------------------------------

const users = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];

const userField = document.getElementById('userField');
const messageField = document.getElementById('messageField');
const messageSend = document.getElementById('messageSend');

// Create autocomplete container
const autocompleteResults = document.createElement('div');
autocompleteResults.className = 'autocomplete-results';
document
  .querySelector('.autocomplete-wrapper')
  .appendChild(autocompleteResults);

let userSelected = false;

userField.addEventListener('input', function () {
  const value = this.value.trim();
  userSelected = false;

  autocompleteResults.innerHTML = '';
  if (!value) {
    autocompleteResults.style.display = 'none';
    return;
  }

  // Match user names
  const matches = users.filter((user) =>
    user.toLowerCase().includes(value.toLowerCase())
  );

  if (matches.length > 0) {
    autocompleteResults.style.display = 'block';
    matches.forEach((match) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'autocomplete-item';

      const matchLower = match.toLowerCase();
      const valueLower = value.toLowerCase();
      const startIndex = matchLower.indexOf(valueLower);

      if (startIndex >= 0) {
        const endIndex = startIndex + value.length;
        itemDiv.innerHTML =
          match.substring(0, startIndex) +
          '<span class="highlight">' +
          match.substring(startIndex, endIndex) +
          '</span>' +
          match.substring(endIndex);
      } else {
        itemDiv.textContent = match;
      }

      // Add event listener to selection
      itemDiv.addEventListener('click', function () {
        userField.value = match;
        autocompleteResults.style.display = 'none';
        userSelected = true;
      });
      autocompleteResults.appendChild(itemDiv);
    });
  } else {
    // Show no matches found
    autocompleteResults.style.display = 'block';
    const noMatch = document.createElement('div');
    noMatch.className = 'autocomplete-item';
    noMatch.textContent = 'No users found';
    autocompleteResults.appendChild(noMatch);
  }
});

// Close autocomplete when clicking outside
document.addEventListener('click', function (e) {
  if (e.target !== userField && e.target !== autocompleteResults) {
    autocompleteResults.style.display = 'none';
  }
});

// Message validation on send
messageSend.addEventListener('click', function (e) {
  e.preventDefault();

  const userValue = userField.value.trim();
  const messageValue = messageField.value.trim();

  if (userValue === '' && messageValue === '') {
    alert('Please select a user and enter a message.');
    return;
  }
  if (userValue === '' || !userSelected) {
    alert('Please select a valid user.');
    return;
  }
  if (messageValue === '') {
    alert('Please enter a message.');
    return;
  }

  // Success message
  alert(`Message sent to ${userValue}!`);

  // Reset the form
  userField.value = '';
  messageField.value = '';
  userSelected = false;
});

// Prevent form submission on enter key
document
  .querySelector('.widget-container')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && e.target.id !== 'messageField') {
      e.preventDefault();
    }
  });

const form = document.querySelector('.settings-form');
const emailToggle = document.querySelector(
  '.toggle:nth-child(1) input[type="checkbox"]'
);
const profileToggle = document.querySelector(
  '.toggle:nth-child(2) input[type="checkbox"]'
);
const timezoneSelect = document.getElementById('timezone');
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

// Default settings
const defaultSettings = {
  emailNotifications: false,
  publicProfile: false,
  timezone: '',
};

// Load local storage or defaults
loadSettings();

// Enable cancel button when settings changed
function checkForChanges() {
  const currentSettings = {
    emailNotifications: emailToggle.checked,
    publicProfile: profileToggle.checked,
    timezone: timezoneSelect.value,
  };

  let savedSettings =
    JSON.parse(localStorage.getItem('userSettings')) || defaultSettings;

  // Check for setting changes
  const hasChanges =
    currentSettings.emailNotifications !== savedSettings.emailNotifications ||
    currentSettings.publicProfile !== savedSettings.publicProfile ||
    currentSettings.timezone !== savedSettings.timezone;

  // Enable/disable cancel button
  cancelButton.disabled = !hasChanges;
  cancelButton.dataset.button = hasChanges ? 'active' : 'disabled';
}

// Add change listeners to form elements
emailToggle.addEventListener('change', checkForChanges);
profileToggle.addEventListener('change', checkForChanges);
timezoneSelect.addEventListener('change', checkForChanges);

// Save button event listener
saveButton.addEventListener('click', function (e) {
  e.preventDefault();

  // Create settings
  const settings = {
    emailNotifications: emailToggle.checked,
    publicProfile: profileToggle.checked,
    timezone: timezoneSelect.value,
  };

  // Save to local storage
  localStorage.setItem('userSettings', JSON.stringify(settings));
});

// Cancel button event listener
cancelButton.addEventListener('click', function () {
  // Clear local storage
  localStorage.removeItem('userSettings');

  // Reset
  resetToDefaults();

  // Disable button
  this.disabled = true;
  this.dataset.button = 'disabled';
});

// Load settings from local storage
function loadSettings() {
  const savedSettings = JSON.parse(localStorage.getItem('userSettings'));

  if (savedSettings) {
    emailToggle.checked = savedSettings.emailNotifications;
    profileToggle.checked = savedSettings.publicProfile;
    timezoneSelect.value = savedSettings.timezone;

    // Enable cancel button is saved settings exist
    cancelButton.disabled = false;
    cancelButton.dataset.button = 'active';
  } else {
    resetToDefaults();

    // Initial disable setting
    cancelButton.disabled = true;
    cancelButton.dataset.button = 'disabled';
  }
}

// Reset to default values
function resetToDefaults() {
  emailToggle.checked = defaultSettings.emailNotifications;
  profileToggle.checked = defaultSettings.publicProfile;
  timezoneSelect.value = defaultSettings.timezone;
}
