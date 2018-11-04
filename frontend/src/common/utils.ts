export const slugify = (name: string) : string => {
    return name.toLowerCase().split(" ").map(s => s.replace(/\W/g, '')).join("-");
}