export default function dateformator(date) {
    return date.toISOString().slice(0, 10);
}