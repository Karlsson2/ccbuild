import {
  fetchImage,
  uploadProjectImage,
  uploadProductImage,
  saveImgPathToDb,
} from "../utils/handleSupabaseImage";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { egenskaperPollare } from "../utils/constants";

export default function CreateProduct({
  handleCloseCreateProduct,
  project_id,
  projectName,
}) {
  const [category_id, setCategoryId] = useState("");
  const [product_name, setProductName] = useState("");
  const [aesthetic, setAesthetic] = useState("");
  const [image, setImage] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [own_id, setOwnId] = useState("");
  const [description, setDescription] = useState("");

  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [diameter, setDiameter] = useState("");
  const [thickness, setThickness] = useState("");
  const [measurementWeight, setMeasurementWeight] = useState("");
  const [weight, setWeight] = useState("");

  const [manufacturer, setManufacturer] = useState("");
  const [article_number, setArticleNumber] = useState("");
  const [manufacturing_year, setManufacturingYear] = useState("");
  const [purchase_year, setPurchaseYear] = useState("");
  const [gtin, setGtin] = useState("");
  const [rsk, setRsk] = useState("");
  const [enr, setEnr] = useState("");
  const [bsab, setBsab] = useState("");
  const [bkfour, setBkfour] = useState("");

  const [purchase_price, setPurchasePrice] = useState("");
  const [external_price, setExternalPrice] = useState("");
  const [internal_price, setInternalPrice] = useState("");
  const [local_collection, setLocalCollection] = useState(false);
  const [suggest_price, setSuggestPrice] = useState(false);
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [post_city, setPostCity] = useState("");
  const [can_send, setCanSend] = useState(false);
  const [comment, setComment] = useState("");
  const [contact_person, setContactPerson] = useState("");

  const [selectedAttributes, setSelectedAttributes] = useState({});

  const handleRadioChange = (attribute, option) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: option,
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      await uploadProjectImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.from("products").insert([
      {
        project_id,
        product_name,
        category_id,
        aesthetic,
        image_url: image ? await uploadProjectImage(image) : null,
        functionality,
        description,
        own_id,
        material,
        color,
        measurement,
        width,
        height,
        depth,
        diameter,
        thickness,
        measurementWeight,
        weight,
        manufacturer,
        article_number,
        manufacturing_year,
        purchase_year,
        gtin,
        rsk,
        enr,
        bsab,
        bkfour,
        purchase_price,
        external_price,
        internal_price,
        local_collection,
        suggest_price,
        address,
        postcode,
        post_city,
        can_send,
        comment,
        contact_person,
        ...selectedAttributes,
      },
    ]);
    if (error) {
      console.error("Error inserting project: ", error);
    } else {
      console.log("Project successfully inserted");
      handleCloseCreateProduct();
    }
  };

  return (
    <div className="full-screen-form d-flex justify-content-center align-items-center">
      <Container>
        <Row>
          <Col>
            <form className="form col" onSubmit={handleSubmit}>
              <h2>Generell information</h2>
              <Row>
                <Col>
                  <label>Projekt</label>
                  <input type="hidden" name="project_id" value={project_id} />
                  {/* Read-only input to display the projectName */}
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={projectName}
                    readOnly
                  />
                </Col>
                <Col>
                  <label>Produkt Namn</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="product_name"
                    placeholder="Produktnamn"
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>HuvudKategori</label>
                  <select
                    className="form-control mb-3"
                    id="category_id"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="" disabled>
                      Välj en Kategori
                    </option>
                    <option value="100003">
                      Belysning &gt; ExteriörArmatur &gt; Pollare
                    </option>
                    <option value="100004">
                      Belysning &gt; ExteriörArmatur &gt; Lyktstolpe
                    </option>
                  </select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Estetisk Värdering</label>
                  <select
                    className="form-control mb-3"
                    id="aesthetic"
                    value={aesthetic}
                    onChange={(e) => setAesthetic(e.target.value)}
                  >
                    <option value="" disabled>
                      Välj stjärnor
                    </option>

                    <option value="1">⭐ 1 Star</option>
                    <option value="2">⭐ 2 Stars</option>
                    <option value="3">⭐ 3 Stars</option>
                    <option value="4">⭐ 4 Stars</option>
                    <option value="5">⭐ 5 Stars</option>
                  </select>
                </Col>
                <Col>
                  <label>Funktionalitet</label>
                  <select
                    className="form-control mb-3"
                    id="functionality"
                    value={functionality}
                    onChange={(e) => setFunctionality(e.target.value)}
                  >
                    {" "}
                    <option value="" disabled>
                      Välj stjärnor
                    </option>
                    <option value="1">⭐ 1 Star</option>
                    <option value="2">⭐ 2 Stars</option>
                    <option value="3">⭐ 3 Stars</option>
                    <option value="4">⭐ 4 Stars</option>
                    <option value="5">⭐ 5 Stars</option>
                  </select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Eget ID-nummer</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="own_id"
                    placeholder="Eget ID-nummer"
                    value={own_id}
                    onChange={(e) => setOwnId(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Produkt Beskrivning</label>
                  <textarea
                    type="textarea"
                    className="form-control mb-3"
                    id="description"
                    placeholder="Skriv en liten beskrivning av produkten..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ height: "100px" }}
                  ></textarea>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <label>Produkt bild</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="form-control"
                  />
                </Col>
              </Row>

              <h2>Produkt Information</h2>
              <Row>
                <Col>
                  <label>Material</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="material"
                    placeholder="Materiale"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Färg</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="color"
                    placeholder="Färg"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Enhet Mått</label>
                  <select
                    className="form-control mb-3"
                    id="contact_person"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                  >
                    <option value="mm">mm</option>

                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Bredd</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="width"
                    placeholder="Bredd"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Höjd</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="height"
                    placeholder="Höjd"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Djup</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="depth"
                    placeholder="Djup"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Diameter</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="diameter"
                    placeholder="Diameter"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Tjocklek</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="thickness"
                    placeholder="Tjocklek"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Enhet Vikt</label>
                  <select
                    className="form-control mb-3"
                    id="contact_person"
                    value={measurementWeight}
                    onChange={(e) => setMeasurementWeight(e.target.value)}
                  >
                    <option value="g">g</option>

                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                  </select>
                </Col>
                <Col>
                  <label>Vikt</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="weight"
                    placeholder="Vikt"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Producent</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="manufacturer"
                    placeholder="Producent"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Artikelnummer</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="article_number"
                    placeholder="Artikelnummer"
                    value={article_number}
                    onChange={(e) => setArticleNumber(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Produktionsår</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="manufacturing_year"
                    placeholder="Produktionsår"
                    value={manufacturing_year}
                    onChange={(e) => setManufacturingYear(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Indköpsår</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="purchase_year"
                    placeholder="Indköpsår"
                    value={purchase_year}
                    onChange={(e) => setPurchaseYear(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>GTIN</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="gtin"
                    placeholder="GTIN"
                    value={gtin}
                    onChange={(e) => setGtin(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>RSK</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="rsk"
                    placeholder="RSK"
                    value={rsk}
                    onChange={(e) => setRsk(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>ENR</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="enr"
                    placeholder="ENR"
                    value={enr}
                    onChange={(e) => setEnr(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>BSAB</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="bsab"
                    placeholder="BSAB"
                    value={bsab}
                    onChange={(e) => setBsab(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>BK04</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="bkfour"
                    placeholder="BK04"
                    value={bkfour}
                    onChange={(e) => setBkfour(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Fil</label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control"
                  />
                </Col>
                {/* write a function to deal with uploading the files */}
              </Row>
              <h2>Egenskaper</h2>
              <Row>
                {category_id == "100003" ? (
                  egenskaperPollare.map(([attribute, options], index) => (
                    <Row key={index}>
                      <legend>{attribute}</legend>
                      <Col style={{ display: "flex", gap: "1rem" }}>
                        {options.map((option, idx) => (
                          <div key={idx}>
                            <input
                              type="radio"
                              id={`${attribute}-${option}`}
                              name={attribute}
                              value={option}
                              defaultChecked={idx === 0}
                              onChange={() =>
                                handleRadioChange(attribute, option)
                              }
                            />
                            <label
                              style={{ marginLeft: "1rem" }}
                              htmlFor={`${attribute}-${option}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  ))
                ) : (
                  <Col>
                    <div>
                      Det finns inga specifika egenskaper för vald produkttyp
                    </div>
                  </Col>
                )}
              </Row>

              <h2>Marknadsplats</h2>
              <Row>
                <Col>
                  <label>Inköpspris</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="purchase_price"
                    placeholder="Inköpspris"
                    value={purchase_price}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Externt pris</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="external_price"
                    placeholder="Externt pris"
                    value={external_price}
                    onChange={(e) => setExternalPrice(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Internt pris</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="internalPrice"
                    placeholder="Internt pris"
                    value={internal_price}
                    onChange={(e) => setInternalPrice(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Kan hämtas på plats </label>
                  <input
                    type="checkbox"
                    id="local_collection"
                    checked={local_collection}
                    onChange={(e) => setLocalCollection(e.target.checked)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Låt köparen föreslå pris</label>
                  <input
                    type="checkbox"
                    id="suggest_price"
                    checked={suggest_price}
                    onChange={(e) => setSuggestPrice(e.target.checked)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Adress</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="adress"
                    placeholder="Adress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Postnummer</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="postcode"
                    placeholder="Postnummer"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Ort</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="post_city"
                    placeholder="Ort"
                    value={post_city}
                    onChange={(e) => setPostCity(e.target.value)}
                  />
                </Col>
                <Col>
                  <label>Kan skickas med frakt</label>
                  <input
                    type="checkbox"
                    id="can_send"
                    checked={can_send}
                    onChange={(e) => setCanSend(e.target.checked)}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Kommentar</label>
                  <textarea
                    className="form-control"
                    placeholder="Kommentar..."
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ height: "100px" }}
                  ></textarea>
                </Col>
              </Row>

              <Row>
                <Col>
                  <label>Kontaktperson</label>
                  <select
                    className="form-control mb-3"
                    id="contact_person"
                    value={contact_person}
                    onChange={(e) => setContactPerson(e.target.value)}
                  >
                    <option value="" disabled>
                      Välj KontaktPerson
                    </option>

                    <option value="Marie Kalmnäs">Marie Kalmnäs</option>
                  </select>
                </Col>
              </Row>

              <Row>
                <Stack direction="horizontal" gap={3}>
                  <Button type="submit" className="btn btn-primary mb-2 ml-2">
                    Submit
                  </Button>

                  <Button
                    type="button"
                    className="btn btn-secondary mb-2 ml-2"
                    onClick={handleCloseCreateProduct}
                  >
                    Close
                  </Button>
                </Stack>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
