export function shorten(name: string): string {
    const index = name.indexOf(' ');
    if (index !== -1) {
        return name.substring(0, index);
    }
    return name;
}
