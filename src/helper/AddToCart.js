import summaryApi from "../common";
import { toast } from "react-toastify";

// The function accepts productId and quantity as arguments
export const AddToCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  console.log("prodcutID",productId);
  // Check if token exists
  if (!token) {
    toast.error("login require plese login");
    return;
  }
  try {
    const response = await fetch(summaryApi.addToCart.url, {
      method: summaryApi.addToCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
      },
      body: JSON.stringify({
        productId, // Send productId from the function argument
        quantity,  // Send quantity from the function argument
      }),
    });

    const data = await response.json();
    console.log(data);
    console.log(data);
    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.error("login require plese login");
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error(error);
  }
};

export default AddToCart;
