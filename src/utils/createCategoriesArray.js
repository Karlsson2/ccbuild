export default function createCategoriesArray(categoriesData) {
  // Create a nested array from the categories data
  // Each object in the array has four pertinent properties:
  // category_1, category_2, category_3, categoryid
  // Format the data to be used in the searchCategories function

  // Create an array to hold the nested arrays
  let nestedArrays = [];
  // Loop through the categoriesData array
  // begin with all categories in category_1, create one array for each UNIQUE category_1
  // ["belysning", "möbler", "vägg"] etc
  for (let i = 0; i < categoriesData.length; i++) {
    // Check if the category_1 is already in the nestedArrays
    let category1 = categoriesData[i].category_1;
    let category1Index = nestedArrays.findIndex(
      (element) => element[0] === category1
    );
    // If the category_1 is not found in the nestedArrays, add it
    if (category1Index === -1) {
      nestedArrays.push([category1]);
    }
  }
  // For each category in nestedArrays, find each unique value in category_2 with a matching category_1
  // add as a subarray to the category_1 array
  for (let i = 0; i < nestedArrays.length; i++) {
    let category1 = nestedArrays[i][0];
    let category2Array = [];
    for (let j = 0; j < categoriesData.length; j++) {
      if (categoriesData[j].category_1 === category1) {
        let category2 = categoriesData[j].category_2;
        category2Array.push([category2]);
      }
    }
    // Remove identical subarrays from ethe category2Array
    let uniqueCategory2Array = Array.from(
      new Set(category2Array.map(JSON.stringify)),
      JSON.parse
    );
    nestedArrays[i].push(uniqueCategory2Array);
  }

  // For each subarray in nestedArrays, find each unique category_3 with a matching category_2
  // add as a subarray to the category_2 array
  for (let i = 0; i < nestedArrays.length; i++) {
    let category1 = nestedArrays[i][0];
    let category2Array = nestedArrays[i][1];
    for (let j = 0; j < category2Array.length; j++) {
      let category2 = category2Array[j][0];
      let category3Array = [];
      for (let k = 0; k < categoriesData.length; k++) {
        if (
          categoriesData[k].category_1 === category1 &&
          categoriesData[k].category_2 === category2
        ) {
          let category3 = categoriesData[k].category_3;
          category3Array.push([category3, categoriesData[k].categoryid]);
        }
      }
      category2Array[j].push(category3Array);
    }
  }
  return nestedArrays;
}
