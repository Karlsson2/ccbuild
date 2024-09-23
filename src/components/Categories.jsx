import { useState, useEffect } from "react";
import createCategoriesArray from "../utils/createCategoriesArray";
import { supabase } from "../utils/supabase";
import searchCategories from "../utils/searchCategories";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";

function Categories({
  selectedProductCategory,
  setSelectedProductCategory,
  setSelectedCategoryId,
}) {
  const [categoriesArr, setCategoriesArr] = useState(null);
  const [categoryStep, setCategoryStep] = useState(0);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [selectedCategory3, setSelectedCategory3] = useState(null);
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_CATEGORY_FOLDER;

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
          // Test the searchCategories function
          // const searchResult = searchCategories(nestedArrays, "tavel");
          //console.log("searchResult:", searchResult);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedProductCategory(event.target.value);
    // If the search input is longer than 4 characters, search for categories
    if (event.target.value.length > 4) {
      const searchResult = searchCategories(categoriesArr, event.target.value);
      //setCategoriesArr(searchResult);
      console.log("searchResult:", searchResult);
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
  };

  const handleCategory3Click = (e) => {
    const category3 = e.target.innerText;
    setSelectedCategory3(category3);
    setCategoryStep(3);
  };

  // Use effect to set selectedCategoryId when necessary
  useEffect(() => {
    if (categoryStep === 2 && selectedCategory2) {
      categoriesArr.map((category) => {
        if (category[0] === selectedCategory1) {
          category[3].map((subcategory) => {
            if (subcategory[0] === selectedCategory2) {
              if (subcategory[1][0][0] === "") {
                setSelectedCategoryId(subcategory[1]);
              }
              return subcategory[1].map((subsubcategory) => {
                if (subsubcategory[0] === selectedCategory3) {
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
            value={selectedProductCategory ? selectedProductCategory : ""}
            onChange={handleCategoryChange}
            placeholder="Sök kategorier..."
          />
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
        <Container className="my-5">
          <Row className="cat siblings-row justify-content-start">
            {/* First sibling */}
            <Col
              className={`cat sibling ${categoryStep === 0 ? "selected" : ""}`}
            >
              <div className="status-header">Kategorier</div>
              <div className="cat colored-box selected"></div>
            </Col>

            {/* Second sibling */}
            <Col
              className={`cat sibling ${categoryStep === 1 ? "selected" : ""}`}
            >
              <div className="status-header">
                {selectedCategory1 ? selectedCategory1 : ""}
              </div>
              <div className="cat colored-box"></div>
            </Col>

            {/* Third sibling */}
            <Col
              className={`cat sibling ${categoryStep === 2 ? "selected" : ""}`}
            >
              <div className="status-header">
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
