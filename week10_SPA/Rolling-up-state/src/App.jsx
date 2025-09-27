//Context api
import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  return <CountContext.Provider value={{count, setCount}}>
    {children}
  </CountContext.Provider>
}

function Parent() {
  return (
    <CountContextProvider>
      <Incrase />
      <Decrease />
      <Value />
    </CountContextProvider>
  );
}

function Decrease() {
  const {count, setCount} = useContext(CountContext);
  return <button onClick={() => setCount(count - 1)}>Decrease</button>;
}

function Incrase() {
  const {count, setCount} = useContext(CountContext);
  return <button onClick={() => setCount(count + 1)}>Increase</button>;
}

function Value() {
  const {count} = useContext(CountContext);
  return <p>Count: {count}</p>;
}

// App Component
const App = () => {
  return <div>
    <Parent />
  </div>
};

export default App;














//Rolling up the state
// import { useState } from "react"

// function App() {

//   return (
//     <div>
//         <LightBulb/>

//     </div>
//   )
// }



// function LightBulb(){
//   const[bulbOn,setBulbOn]=useState(true);
//   return <div>
//     <BulbState bulbOn={bulbOn}/>
//     <ToggleBulbState bulbOn={bulbOn} setBulbOn={setBulbOn}/>
//   </div>
// }


// function BulbState({bulbOn}){
//   // const[bulbOn,setBulbOn]=useState(true);//toggle bulb need it but its difficult to pass this to toggle component so roll up to upper 
//   return <div>
//     {bulbOn?"Bubl on ":"Bulb off"}
//   </div>
// }

// function ToggleBulbState({bulbOn,setBulbOn}){

//   function toggle(){
//     setBulbOn(!bulbOn)
//   }
//   return <div>
//     <button onClick={toggle}>Toggle the bulb</button>
//   </div>
// }

// export default App
