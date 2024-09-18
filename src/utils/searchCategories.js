// Function to search for a term in the categories array
// and return the entire hierarchy with matching terms and their parents
export default function searchCategories(categories, searchTerm) {
  let result = [];
  // Start searching from the top level
  for (let i = 0; i < categories.length; i++) {
    // check categories[i][0] includes the searchTerm
    if (categories[i][0].includes(searchTerm)) {
      result.push(categories[i]);
    }

    // If the searchTerm is not found in the top level, search the next level
    if (!categories[i][0].includes(searchTerm)) {
      const subCategories = categories[i][1];
      for (let j = 0; j < subCategories.length; j++) {
        if (subCategories[j][0].includes(searchTerm)) {
          // If there is a hit, return an array with the parent and the matching term
          result.push([categories[i][0], [subCategories[j]]]);
        } else if (!subCategories[j][0].includes(searchTerm)) {
          // If the searchTerm is not found in the current level, search the next level
          const subSubCategories = subCategories[j][1];
          for (let k = 0; k < subSubCategories.length; k++) {
            if (subSubCategories[k].includes(searchTerm)) {
              // If there is a hit, return an array with the parent and the matching term
              result.push([
                categories[i][0],
                [subCategories[j][0], [subSubCategories[k]]],
              ]);
            }
          }
        }
      }
    }
  }
  return result;
}

const categories = [
  [
    "belysning",
    [
      [
        "interiörarmatur",
        ["takarmatur", "väggarmatur", "spotlight", "kristallkrona"],
      ],
      ["exteriörarmatur", ["fasadbelysning", "markbelysning"]],
    ],
  ],
  [
    "möbler",
    [
      ["bord", ["köksbord", "matbord", "bord"]],
      ["väggmöbler", ["köksstol", "matstol", "kontorsstol"]],
    ],
  ],
  [
    "vägg",
    [
      ["färg", ["vit", "grå", "svart"]],
      ["material", ["gips", "betong", "tegel"]],
    ],
  ],
];

// Example usage
const result = searchCategories(categories, "kök");
console.log("searchCategories result", result);
