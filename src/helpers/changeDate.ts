export function formatDateTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}