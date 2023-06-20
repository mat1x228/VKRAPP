export default function compareUsers(user1, user2) {
  if (user1.rating === user2.rating) {
    const user1Categories = Object.keys(user1).filter(key => key !== 'user_id' && key !== 'rating' && key !== 'total_messages');
    const user2Categories = Object.keys(user2).filter(key => key !== 'user_id' && key !== 'rating' && key !== 'total_messages');

    if (user1Categories.length > user2Categories.length) {
      return -1;
    } else if (user1Categories.length < user2Categories.length) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return user1.rating - user2.rating;
  }
}