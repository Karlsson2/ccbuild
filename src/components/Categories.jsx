import { useState, useEffect } from "react";
import createCategoriesArray from "../utils/createCategoriesArray";
import { supabase } from "../utils/supabase";
import searchCategories from "../utils/searchCategories";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import highlightMatch from "../utils/highlightMatch.jsx";

function Categories({
  setSelectedProductCategory,
  setSelectedCategoryId,
  setProductName,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesArr, setCategoriesArr] = useState(null);
  const [categoryStep, setCategoryStep] = useState(0);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [selectedCategory3, setSelectedCategory3] = useState(null);
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_CATEGORY_FOLDER;
  // for search:
  const [searchResult, setSearchResult] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // use effect for fetching categories from categories table
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let { data: categories, error } = await supabase
          .from("categories")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched categories:", categories);
          const nestedArrays = createCategoriesArray(categories);
          setCategoriesArr(nestedArrays);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    // If the search input is longer than 3 characters, search for categories
    // If the search input is longer than 3 characters, search for categories
    if (event.target.value.length > 3) {
      const searchResult = searchCategories(categoriesArr, event.target.value);
      //console.log("searchResult:", searchResult);
      setSearchResult(searchResult); // Save the search results
      setShowDropdown(true); // Show the dropdown when results are available
    } else {
      setShowDropdown(false); // Hide dropdown if search input is too short
    }
  };

  // Handle clicking outside search to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".search-box") === null) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selecting a category from the dropdown
  // category is a subsubcategory array, e.g. ["Pollare", 999]
  const handleCategorySelect = (category) => {
    setSearchTerm(""); // Clear the search term
    setSelectedCategoryId(category[1]);
    getCategoryRow(category[1]); // Fetch the category row in categories table
    setShowDropdown(false); // Hide dropdown after selection
    setSelectedProductCategory(null);
  };

  // Fetch the category row in categories table, and set all three levels of category
  const getCategoryRow = async (categoryId) => {
    try {
      let { data: category, error } = await supabase
        .from("categories")
        .select("*")
        .eq("categoryid", categoryId);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // Check if there is a third level of category
        if (category[0].category_3 !== "") {
          console.log("Fetched category:", category);
          setSelectedCategory1(category[0].category_1);
          setSelectedCategory2(category[0].category_2);
          setSelectedCategory3(category[0].category_3);
          setProductName(category[0].category_3);
          setCategoryStep(3);
        } else if (category[0].category_2 !== "") {
          console.log("Fetched category:", category);
          setSelectedCategory1(category[0].category_1);
          setSelectedCategory2(category[0].category_2);
          setSelectedCategory3(null);
          setProductName(category[0].category_2);
          setCategoryStep(2);
        }
        console.log("Will set selected category ID:", categoryId);
        setSelectedCategoryId(categoryId);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleCategory1Click = (e) => {
    const category1 = e.target.innerText;
    setSelectedCategory1(category1);
    setCategoryStep(1);
  };

  const handleCategory2Click = (e) => {
    const category2 = e.target.innerText;
    setSelectedCategory2(category2);
    setCategoryStep(2);
    setProductName(category2);
  };

  const handleCategory3Click = (e) => {
    const category3 = e.target.innerText;
    setSelectedCategory3(category3);
    setCategoryStep(3);
    setProductName(category3);
  };

  const handleHeader0Click = () => {
    setCategoryStep(0);
    setSelectedCategory1(null);
    setSelectedCategory2(null);
    setSelectedCategory3(null);
    setSelectedCategoryId(null);
    setProductName("");
  };

  const handleHeader1Click = () => {
    if (categoryStep > 1) {
      setCategoryStep(1);
      setSelectedCategory2(null);
      setSelectedCategory3(null);
      setSelectedCategoryId(null);
      setProductName(selectedCategory1);
    }
  };

  const handleHeader2Click = () => {
    if (categoryStep > 2) {
      setCategoryStep(2);
      setSelectedCategory3(null);
      setSelectedCategoryId(null);
      setProductName(selectedCategory2);
    }
  };

  // Use effect to set selectedCategoryId when necessary
  useEffect(() => {
    if (categoryStep === 2 && selectedCategory2) {
      categoriesArr.map((category) => {
        if (category[0] === selectedCategory1) {
          category[3].map((subcategory) => {
            if (subcategory[0] === selectedCategory2) {
              if (subcategory[1][0][0] === "") {
                console.log(
                  "Only one subcategory, setting selected category ID, line 144",
                  subcategory[1][0][1]
                );
                setSelectedCategoryId(subcategory[1][0][1]);
              }
              return subcategory[1].map((subsubcategory) => {
                if (subsubcategory[0] === selectedCategory3) {
                  console.log("Setting selected category ID, line 149");
                  setSelectedCategoryId(subsubcategory[1]);
                }
                return null;
              });
            }
            return null;
          });
        }
        return null;
      });
    }
    if (categoryStep === 3 && selectedCategory3) {
      categoriesArr.map((category) => {
        if (category[0] === selectedCategory1) {
          category[3].map((subcategory) => {
            if (subcategory[0] === selectedCategory2) {
              subcategory[1].map((subsubcategory) => {
                if (subsubcategory[0] === selectedCategory3) {
                  console.log("Setting selected category ID, line 168");
                  setSelectedCategoryId(subsubcategory[1]);
                }
                return null;
              });
            }
            return null;
          });
        }
        return null;
      });
    }
  }, [categoryStep, selectedCategory1, selectedCategory2, selectedCategory3]);

  return (
    <>
      {/* Search box */}
      <Form.Group controlId="formProductCategory" className="mb-4">
        <Form.Label className="create-prod">Produktkategori*</Form.Label>
        <p>Sök eller välj från kategorilistan.</p>
        <div className="search-box bg-gray border-gray br-8">
          <img
            src={`${baseUrl}/public/search.png`}
            alt="Sök"
            style={{ margin: "0 16px" }}
          />
          <Form.Control
            className="search-hide"
            type="text"
            value={searchTerm ? searchTerm : ""}
            onChange={handleSearchTermChange}
            placeholder="Sök kategorier..."
          />
          {/* Conditionally render the dropdown */}
          {showDropdown && searchResult.length > 0 && (
            <div className="dropdown-container">
              <ul className="dropdown-list">
                {searchResult.map((category) => {
                  const subCategories = category[3];
                  return subCategories.map((subcategory) => {
                    const subSubCategories = subcategory[1];
                    return subSubCategories.map((subsubcategory, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => handleCategorySelect(subsubcategory)}
                        >
                          {/* Highlight matching characters in category */}
                          {highlightMatch(category[0], searchTerm)}

                          <img
                            src={`${baseUrl}/public/blue_arrow_right.png`}
                            alt="Pil åt höger"
                          />
                          {/* Highlight matching characters in subcategory */}
                          {highlightMatch(subcategory[0], searchTerm)}

                          {subsubcategory[0] !== "" && (
                            <>
                              <img
                                src={`${baseUrl}/public/blue_arrow_right.png`}
                                alt="Pil åt höger"
                              />
                              {/* Highlight matching characters in subsubcategory */}
                              {highlightMatch(subsubcategory[0], searchTerm)}
                            </>
                          )}
                        </li>
                      );
                    });
                  });
                })}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
      {/* Status bar container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Container className="mb-3">
          <Row className="cat siblings-row justify-content-start">
            {/* First sibling */}
            <Col
              className={`cat sibling ${categoryStep === 0 ? "selected" : ""}`}
            >
              <div className="status-header" onClick={handleHeader0Click}>
                Kategorier
              </div>
              <div className="cat colored-box selected"></div>
            </Col>

            {/* Second sibling */}
            <Col
              className={`cat sibling ${categoryStep === 1 ? "selected" : ""}`}
            >
              <div className="status-header" onClick={handleHeader1Click}>
                {selectedCategory1 ? selectedCategory1 : ""}
              </div>
              <div className="cat colored-box"></div>
            </Col>

            {/* Third sibling */}
            <Col
              className={`cat sibling ${categoryStep === 2 ? "selected" : ""}`}
            >
              <div className="status-header" onClick={handleHeader2Click}>
                {selectedCategory2 ? selectedCategory2 : ""}
              </div>
              <div className="cat colored-box"></div>
            </Col>

            {/* Fourth sibling */}
            <Col
              className={`cat sibling ${categoryStep === 3 ? "selected" : ""}`}
            >
              <div className="status-header">
                {selectedCategory3 ? selectedCategory3 : ""}
              </div>
              <div className="cat colored-box"></div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Category buttons container */}

      <div
        style={{
          height: "204px",
          overflowY: "scroll",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          alignContent: "flex-start",
          marginBottom: "54px",
        }}
      >
        {/* If categoryStep = 0, then display */}
        {categoryStep === 0 && categoriesArr != null && (
          <>
            {categoriesArr.map((category, index) => (
              //   index 2 is the id, index 1 is the image, index 0 is the category name
              <Button
                className="category-btn"
                variant="primary"
                key={`${category[2]}${index}`}
                onClick={handleCategory1Click}
              >
                <Image
                  src={`${baseUrl}${bucketFolder}${category[1]}`}
                  alt={category[0]}
                  width={20}
                  height={"auto"}
                />
                {category[0]}
                <Image
                  src={`${baseUrl}${bucketFolder}arrow_forward.png`}
                  alt={`Välj`}
                />
              </Button>
            ))}
          </>
        )}

        {/* If categoryStep = 1, then display subcategories of selectedCategory1 */}
        {categoryStep === 1 && (
          <>
            {categoriesArr.map((category) => {
              if (category[0] === selectedCategory1) {
                return category[3].map((subcategory) => (
                  <Button
                    className="category-btn"
                    variant="primary"
                    key={subcategory[1]}
                    onClick={handleCategory2Click}
                  >
                    {subcategory[0]}
                    <Image
                      src={`${baseUrl}${bucketFolder}arrow_forward.png`}
                      alt={`Välj`}
                    />
                  </Button>
                ));
              }
            })}
          </>
        )}

        {/* If categoryStep = 2, then display subcategories of selectedCategory2 */}
        {categoryStep === 2 && (
          <>
            {categoriesArr.map((category) => {
              if (category[0] === selectedCategory1) {
                return category[3].map((subcategory) => {
                  if (subcategory[0] === selectedCategory2) {
                    // If subcategory[1] only contains empty strings, return a single button
                    if (subcategory[1][0][0] === "") {
                      return (
                        <Button
                          style={{ cursor: "default" }}
                          className="selected-category-btn"
                          key={subcategory[1]}
                          onClick={null}
                        >
                          {selectedCategory2}
                        </Button>
                      );
                    }
                    return subcategory[1].map((subsubcategory) => (
                      <Button
                        className="category-btn"
                        variant="primary"
                        key={subsubcategory[1]}
                        onClick={handleCategory3Click}
                      >
                        {subsubcategory[0]}
                      </Button>
                    ));
                  }
                  return null;
                });
              }
              return null;
            })}
          </>
        )}
        {/* If categoryStep = 3, then display a single button with selectedCategory3 as content */}
        {categoryStep === 3 && (
          <>
            <Button
              className="selected-category-btn"
              onClick={null}
              style={{ cursor: "default" }}
            >
              {selectedCategory3}
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default Categories;
