import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [productImage, setProductImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    old_price: "",
    new_price: "",
  });
  const returnBase64 = async (image) => {
    return !!image && typeof image === "object"
      ? await readAsDataURL(image)
      : { file: image };
  };
  function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        let type = file.type.split("/");
        resolve({
          file: fr.result,
          name: file.name,
          size: file.size,
          type: type[0],
        });
      };
      fr.readAsDataURL(file); //base64
    });
  }
  const handleImage = (e) => {
    setProductImage(e.target.files[0]);
  };
  const handleDetails = (key, val) => {
    setProductDetails((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const handleClick = async () => {
    const baseImage = await returnBase64(productImage);
    const product = {
      ...productDetails,
      image: baseImage.file,
    };
    let responseData;
    // let product = productDetails;
    let formData = new FormData();
    // formData.append("product", productImage);
    // await fetch("http://localhost:4000/upload", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     responseData = data;
    //   });
    // if (responseData.success) {
    //   product.image = responseData.image_url;
    //   console.log(product);
    // }
    await fetch("http://localhost:4000/addProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) =>
        data.success ? alert("Product Added") : alert("Failed")
      );
  };

  // const handleWheel = (e) => {
  //   e.preventDefault();
  // };
  return (
    <div className="add-product">
      <h2>To Add Products</h2>
      <div className="addProduct-fields">
        <p>Product Title</p>
        <input
          value={productDetails?.name}
          onChange={(e) => handleDetails(e.target.name, e.target.value)}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addProduct-flex">
        <div className="addProduct-fields">
          <p>Price</p>
          <input
            value={productDetails?.old_price}
            onChange={(e) => handleDetails(e.target.name, e.target.value)}
            type="number"
            name="old_price"
            placeholder="Type here"
            // onWheel={handleWheel}
          />
        </div>
        <div className="addProduct-fields">
          <p>Offer Price</p>
          <input
            value={productDetails?.new_price}
            onChange={(e) => handleDetails(e.target.name, e.target.value)}
            type="number"
            name="new_price"
            placeholder="Type here"
            // onWheel={handleWheel}
          />
        </div>
      </div>
      <div className="addProduct-flex">
        <div className="addProduct-fields">
          <p>Product Category</p>
          <select
            value={productDetails?.category}
            onChange={(e) => handleDetails(e.target.name, e.target.value)}
            name="category"
            className="addProduct-category"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addProduct-fields">
          <p>Product Image</p>
          <label htmlFor="file-input">
            <img
              src={
                productImage ? URL.createObjectURL(productImage) : upload_area
              }
              className="addProduct-img"
            />
          </label>
          <input
            onChange={handleImage}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
      </div>
      <div className="addProduct-btn-div">
        <button className="addProduct-btn" onClick={handleClick}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
