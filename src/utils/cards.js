export function isLiked(userId, likes) {
  return likes ? likes.includes(userId) : false;
}
