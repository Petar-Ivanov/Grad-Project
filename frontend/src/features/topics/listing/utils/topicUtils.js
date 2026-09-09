/* filtering and sorting topics based on UI state */
export const processTopics = ({
  topics,
  search,
  sortBy,
  sortOrder,
  category,
  sourceTab,
  currentUser,
}) => {
  // filtering
  let result = topics.filter((t) => {
    // Source Tab
    if (sourceTab === "my_topics" && t.owner !== currentUser) return false;
    if (sourceTab === "shared" && !t.isShared) return false;
    if (sourceTab === "public" && !t.isPublic) return false;

    // Category
    if (category !== "all" && t.category.toLowerCase() !== category.toLowerCase()) return false;

    // Search
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

  // sorting
  result.sort((a, b) => {
    let valA, valB;

    switch (sortBy) {
      case "alphabetical":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "created_at":
        valA = new Date(a.created_at).getTime();
        valB = new Date(b.created_at).getTime();
        break;
      case "updated_at":
        valA = new Date(a.edited_at).getTime();
        valB = new Date(b.edited_at).getTime();
        break;
      case "recently_visited":
        valA = new Date(a.last_visited_at || a.edited_at).getTime();
        valB = new Date(b.last_visited_at || b.edited_at).getTime();
        break;
      default:
        valA = 0;
        valB = 0;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return result;
};