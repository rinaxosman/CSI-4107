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

// calendar stuff
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    // Generate lecture dates dynamically
    const startDate = new Date('2025-01-06');
    const endDate = new Date('2025-04-07');
    const readingWeekStart = new Date('2025-02-16');
    const readingWeekEnd = new Date('2025-02-22');
    const excludedDates = ['2025-02-28']; // Exclude midterm exam date
    const specialDates = { '2025-02-26': 'Midterm Revision @MRT 118, 1:00 PM - 2:20 PM' }; // Special event
    const lectures = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];

        // Add special event for February 26
        if (specialDates[dateString]) {
            lectures.push({
                title: specialDates[dateString],
                start: dateString,
                classNames: 'lecture-event'
            });
            continue; // Skip further processing for this date
        }

        // Skip lectures during reading week
        if (d >= readingWeekStart && d <= readingWeekEnd) continue;

        // Skip specific excluded dates (e.g., exam dates)
        if (excludedDates.includes(dateString)) continue;

        if (d.getDay() === 2) { // Wednesday
            lectures.push({
                title: 'Lecture @MRT 118, 1:00 PM - 2:20 PM',
                start: dateString,
                classNames: 'lecture-event'
            });
        } else if (d.getDay() === 4) { // Friday
            lectures.push({
                title: 'Lecture @CBY C03, 11:30 AM - 12:50 PM',
                start: dateString,
                classNames: 'lecture-event'
            });
        }
    }

    // Initialize the calendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            { title: 'Assignment 1', start: '2025-02-09', classNames: 'assignment-event' },
            { title: 'Reading Week', start: '2025-02-16', end: '2025-02-23', classNames: 'exam-event' },
            { title: 'Midterm Exam', start: '2025-02-28', classNames: 'exam-event' },
            { title: 'Assignment 2', start: '2025-03-30', classNames: 'assignment-event' },
            { title: 'Final Exam Period', start: '2025-04-08', end: '2025-04-26', classNames: 'exam-event' },
            ...lectures // Add lectures to the calendar
        ]
    });

    calendar.render();
});


initializeTheme();
toggleButton.addEventListener('click', toggleDarkMode);
