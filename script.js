const toggleButton = document.getElementById('toggle-dark-mode');

// set dark mode based on URL
function initializeTheme() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Light Mode';
    }
}

// toggles dark mode and update URL
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
        updateURL('dark');
    } else {
        toggleButton.textContent = 'Dark Mode';
        updateURL(null);
    }
}

// update the URL without reloading
function updateURL(theme) {
    const url = new URL(window.location.href);
    if (theme) {
        url.searchParams.set('theme', theme);
    } else {
        url.searchParams.delete('theme');
    }
    window.history.replaceState(null, '', url);
}


initializeTheme();
toggleButton.addEventListener('click', toggleDarkMode);
