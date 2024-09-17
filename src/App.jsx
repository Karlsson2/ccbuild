import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { supabase } from "./utils/supabase";

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: products, error } = await supabase
          .from("products")
          .select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched Products:", products);
          setProducts(products);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Products state:", products);
  }, [products]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Fetched Products:</h2>
        {products ? (
          products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <strong>ID:</strong> {product.id},<strong> Type:</strong>{" "}
                  {product.Type},<strong> Created At:</strong>{" "}
                  {new Date(product.created_at).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data found in the Products table.</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
