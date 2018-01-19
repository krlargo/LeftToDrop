import {
  rootRef,
  itemsRef,
  upvotedItemsRef,
  downvotedItemsRef
} from '../firebase/references';

export const toggleUpvoteItem = (itemID, userID, value) => dispatch => {
  upvotedItemsRef.child(userID).update({ [itemID]: value });
  //toggleItemVote(itemID, userID, value, 'upvotes', 'upvotedItems');
};

export const toggleDownvoteItem = (itemID, userID, value) => dispatch => {
  downvotedItemsRef.child(userID).update({ [itemID]: value });
  //toggleItemVote(itemID, userID, value, 'downvotes', 'downvotedItems');
};

/*const toggleItemVote = (itemID, userID, value, itemSubpath, rootPath) => {
  itemsRef.child(itemID + '/' + itemSubpath).transaction(oldCount => {
    // Generate incremented/decremented value
    const newCount = (oldCount || 0) + (value ? 1 : -1);

    // Create new data object
    let updatedVoteData = {};
    updatedVoteData[rootPath + '/' + userID + '/' + itemID] = value;
    updatedVoteData['items/' + itemID + '/' + itemSubpath] = newCount;

    // Execute deep-path update
    rootRef.update(updatedVoteData, error => {
      if (error) {
        console.log('Failed to vote for item: ', error);
      }
    });
  });
};
*/
