//Used  to populate dropdowns in Items.jsx
export const statuses = [
  "Välj",
  "Inventerad",
  "Inventerad - i byggnad",
  "Inventerad - i lager/förråd",
  "Mängdad",
  "Mängdad - i byggnad",
  "Mängdad - i lager/förråd",
  "På rekonditionering",
  "I lager",
  "Bevarad (slutstatus)",
  "Återbrukad i projektet (slutstatus)",
  "Återbrukad inom organisationen (slutstatus)",
  "Återbrukad externt av annan aktör (slutstatus)",
  "Avfallshanterad (slutstatus)",
];

export const marketPlaces = [
  "Välj",
  "Ej publicerad",
  "Publicerad som intern annons",
  "Publicerad som extern annons",
  "Reserverad",
  "Såld",
  "Avpublicerad",
  "Automatiskt publicerad",
];

export const demountabilities = [
  "Välj",
  "Enkel att demontera/demontering krävs ej",
  "Demonteringsbar men specialverktyg kan krävas",
  "Begränsad demonterbarhet",
];

export const accessibilities = [
  "Välj",
  "Lätt åtkomlig",
  "Åtkomlig men planering och specialverktyg kan krävas",
  "Begränsad åtkomlighet",
];

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
    "möbler",
    [
      ["bord", ["köksbord", "matbord", "bord"]],
      ["väggmöbler", ["köksstol", "matstol", "kontorsstol"]],
    ],
  ],
];

// Function to search for a term in the categories array
// and return the entire hierarchy with matching terms and their parents
function searchCategoriesWithHierarchy(categories, searchTerm) {
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
        } else {
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

// Example usage
const result = searchCategoriesWithHierarchy(categories, "vägg");
console.log("Search result", result);
