export default function convertMinutesToHHMM(minutes) {
    // Convert minutes to hours and minutes
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    // Format hours and minutes
    var formattedHours = hours < 10 ? '0' + hours : hours;
    var formattedMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

    // Concatenate hours and minutes with ':'
    return formattedHours + ':' + formattedMinutes;
}