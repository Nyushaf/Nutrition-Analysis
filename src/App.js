import { useEffect, useState } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import LoaderPage from './LoaderPage';
import { Nutritions } from './Nutritions';


function App() {
  const myKey = "3c0a2d374f41dd7a43272c2798ea81ae";
  const myID = "773d9493";
  const [myNutrition, setMyNutrition] = useState();
  const [mySearch, setMySearch] = useState("");
  const [wordSubmitted, setWordSubmitted] = useState("100 gr avocado");
  const [myLoader, setMyLoader] = useState(false);

  const myIngredientSearch = (e) => {
    setMySearch(e.target.value);
  }
  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  const getData = async(ingredient) => {
    setMyLoader(true);
    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${myID}&app_key=${myKey}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingr: ingredient })
    })
    if (response.ok) {
      setMyLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setMyLoader(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingredient not found!',
      })
    }
  }

  useEffect(() => {
    if (wordSubmitted !== "") {
      let ingredient = wordSubmitted.split(/[,,;,\n,\r]/);
      getData(ingredient);
    }
  }, [wordSubmitted])


  return (
    <div>
      {myLoader && <LoaderPage/>}
      <div className='container'>
        <h1>Analyze your nutrition</h1>
      </div>
      <div className='container'>
        <form onSubmit={finalSearch}>
          <input onChange={myIngredientSearch} type="text" placeholder='Enter ingredient and qantity...' />
        </form>
      </div>
      <div className='container'>
          <button onClick={finalSearch}>Analyze</button>
      </div>
      <div>
        {myNutrition && Object.values(myNutrition.totalNutrients).map(({label, quantity, unit}, index) => (
          <div key = {index} className='container'>
            <Nutritions 
            label = {label}
            quantity = {quantity}
            unit = {unit} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
