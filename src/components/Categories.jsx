import { useState, useEffect } from "react";
import searchCategories from "../utils/searchCategories";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

function Categories({ categoriesArr }) {
  const [categoryStep, setCategoryStep] = useState(0);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [selectedCategory3, setSelectedCategory3] = useState(null);
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const bucketFolder = import.meta.env.VITE_SUPABASE_CATEGORY_FOLDER;

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

  return (
    <>
      {/* Status bar container */}
      <Container
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
      </Container>

      {/* Category buttons container */}
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {/* If categoryStep = 0, then display */}
        {categoryStep === 0 && (
          <>
            {categoriesArr.map((category) => (
              //   index 2 is the id, index 1 is the image, index 0 is the category name
              <Button
                variant="primary"
                key={category[2]}
                onClick={handleCategory1Click}
                style={{
                  backgroundColor: "var(--category-bg-gray)",
                  borderColor: "var(--category-border-gray)",
                  borderRadius: "32px",
                  color: "var(--category-text-black)",
                  padding: "8px, 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fonWeight: "regular",
                }}
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
                    variant="primary"
                    key={subcategory[1]}
                    onClick={handleCategory2Click}
                    style={{
                      backgroundColor: "var(--category-bg-gray)",
                      borderColor: "var(--category-border-gray)",
                      borderRadius: "32px",
                      color: "var(--category-text-black)",
                      padding: "8px, 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fonWeight: "regular",
                    }}
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
                    if (
                      subcategory[1].every(
                        (subsubcategory) => subsubcategory[0] === ""
                      )
                    ) {
                      return (
                        <Button
                          variant="primary"
                          key={subcategory[1]}
                          onClick={null}
                          style={{
                            backgroundColor: "var(--status-green)",
                            borderColor: "var(--status-green)",
                            borderRadius: "32px",
                            color: "white",
                            padding: "8px, 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "16px",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fonWeight: "regular",
                          }}
                        >
                          {selectedCategory2}
                        </Button>
                      );
                    }
                    return subcategory[1].map((subsubcategory) => (
                      <Button
                        variant="primary"
                        key={subsubcategory[1]}
                        onClick={handleCategory3Click}
                        style={{
                          backgroundColor: "var(--category-bg-gray)",
                          borderColor: "var(--category-border-gray)",
                          borderRadius: "32px",
                          color: "var(--category-text-black)",
                          padding: "8px, 16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "16px",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fonWeight: "regular",
                        }}
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
              variant="primary"
              onClick={null}
              style={{
                backgroundColor: "var(--status-green)",
                borderColor: "var(--status-green)",
                borderRadius: "32px",
                color: "white",
                padding: "8px, 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fonWeight: "regular",
              }}
            >
              {selectedCategory3}
            </Button>
          </>
        )}
      </Container>
    </>
  );
}

export default Categories;
