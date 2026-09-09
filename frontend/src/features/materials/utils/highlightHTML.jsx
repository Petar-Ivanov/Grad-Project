
export function highlightHTML(htmlString, searchTerm) {
  if (!searchTerm.trim()) return htmlString;

  // escaping special characters
  const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  
  // escaping html tags
  const regex = new RegExp(`(?<!<[^>]*)${escapedSearch}(?![^<]*>)`, "gi");

  return htmlString.replace(
    regex,
    (match) => `<mark class="bg-yellow-200 text-slate-900  dark:bg-yellow-400">${match}</mark>`
  );
}