export default function compareUsers(user1, user2) {
  if (user1.rating === user2.rating) {
    const categories = ["indecency", "insult", "threat"];

    const user1Total = categories.reduce((total, category) => total + user1[category], 0);
    const user2Total = categories.reduce((total, category) => total + user2[category], 0);

    if (user1Total > user2Total) {
      return -1;
    } else if (user1Total < user2Total) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return user1.rating - user2.rating;
  }
}