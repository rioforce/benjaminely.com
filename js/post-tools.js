export function formatPostDate(date) {
    // The time portion does not matter but is required here to make the date parse correctly
    return new Date(`${date}T00:00:00`).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
}
