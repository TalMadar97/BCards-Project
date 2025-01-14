export function isLiked(userId, likes) {
  return likes ? likes.includes(userId) : false;
}

export function searchCards(cards, searchText) {
  if (!Array.isArray(cards)) {
    return [];
  }

  if (!searchText || typeof searchText !== "string") {
    return cards;
  }

  searchText = searchText.toLowerCase();

  return cards.filter((card) => {
    if (!card || typeof card !== "object") {
      return false;
    }

    const { title = "", subtitle = "" } = card;

    return (
      title.toLowerCase().includes(searchText) ||
      subtitle.toLowerCase().includes(searchText)
    );
  });
}
