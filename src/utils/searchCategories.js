// Function to search for a term in the categories array
// and return the entire hierarchy with matching terms and their parents
export default function searchCategories(categories, searchTerm) {
  let result = [];

  for (let i = 0; i < categories.length; i++) {
    // Start searching from the top level
    if (categories[i][0].toLowerCase().includes(searchTerm.toLowerCase())) {
      result.push(categories[i]);
    } else {
      searchSubCategories();
    }
    // searchSubCategories();
    // searchSubSubCategories();

    // Search the second level
    function searchSubCategories() {
      const subCategories = categories[i][1];
      for (let j = 0; j < subCategories.length; j++) {
        if (
          subCategories[j][0].toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          // If there is a hit, push the parent and the matching term and its subcategories to result
          result.push([categories[i][0], [subCategories[j]]]);
        } else {
          searchSubSubCategories(subCategories, j);
        }
      }
    }

    //Search the third level
    function searchSubSubCategories(subCategories, j) {
      const subSubCategories = subCategories[j][1];
      for (let k = 0; k < subSubCategories.length; k++) {
        //If subSubCategories[k][0] is empty string "", skip it
        if (subSubCategories[k][0] === "") {
          continue;
        }
        // If subSubCategories[k][0] includes the searchTerm, add it to the result
        if (
          subSubCategories[k][0]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          // If there is a hit, return an array with the parent and the entire subSubCategory
          // which will be an array with the matching term AND an id
          result.push([
            categories[i][0],
            [subCategories[j][0], [subSubCategories[k]]],
          ]);
        }
      }
    }
  }

  // Remove duplicates from results
  let uniqueIds = [];
  for (let i = 0; i < result.length; i++) {
    let lastSubArray = result[i][result[i].length - 1];
    let id = lastSubArray[lastSubArray.length - 1];
    if (uniqueIds.includes(id)) {
      result.splice(i, 1);
    } else {
      uniqueIds.push(id);
    }
  }

  return result;
}
