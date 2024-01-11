const { initializeApp } = require ("firebase/app");
const { getFirestore, getDocs, collection } = require ( "firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDRxP5Fm9K9Rn2127SkPdvxBwsQZdn8f08",
  authDomain: "recipes-app-react-1d6d9.firebaseapp.com",
  databaseURL: "https://recipes-app-react-1d6d9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipes-app-react-1d6d9",
  storageBucket: "recipes-app-react-1d6d9.appspot.com",
  messagingSenderId: "1011116118001",
  appId: "1:1011116118001:web:3f0b1be7bd16bcc001be50"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Retrieve data from collection
// get link of each collection
const catCollectionRef = collection(db, "categories");
const recipesCollectionRef = collection(db, "recipes");
const ingredidientCollectionRef = collection(db, "ingredients");

const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(catCollectionRef);
    const categories = querySnapshot.docs.map((doc) => doc.data());
    console.log("Categories:", categories);
    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
  }
};
const getRecipes = async () => {
  try {
    const querySnapshot = await getDocs(recipesCollectionRef);
    const Recipes = querySnapshot.docs.map((doc) => doc.data()).map(
        (recipe) => {
          const nestedIngredients = recipe.ingredients.map(({ index, value }) => [index, value]);

          return {
            ...recipe,
            ingredients: nestedIngredients,
          }}
    );
    console.log("Recipes:", Recipes);
    return Recipes;
  } catch (error) {
    console.error("Error getting Recipes:", error);
  }
};
const getIngredients = async () => {
  try {
    const querySnapshot = await getDocs(ingredidientCollectionRef);
    const ingredients = querySnapshot.docs.map((doc) => doc.data());
    console.log("Ingredients:", ingredients);
    return ingredients;
  } catch (error) {
    console.error("Error getting Ingredients:", error);
  }
};

// Call the function to get collections
export const categories = await getCategories();
export const recipes = await getRecipes();
export const ingredients = await getIngredients();