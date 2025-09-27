import { useState } from "react";
import {RecoilRoot, atom, useRecoilValue, useSetRecoilState} from 'recoil';

const counter = atom({
	key: "counter",
	default: 0
})

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

function Increase() {
  const setCount = useSetRecoilState(counter);
  function increase() {
    setCount((c) => c + 1);
  }

  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  );
}

function Decrease() {
  const setCount=useSetRecoilState(counter)
  function decrease() {
    setCount((c) => c - 1);
  }
  return (
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}

function CurrentCount(){
  const count=useRecoilValue(counter)
  return <div>
    HEllo
    {count}
  </div>
}

function Counter() {
  // const [count, setCount] = useState(0);
  return (
    <div>
      <CurrentCount />
      <Increase/>
      <Decrease/>
    </div>
  );
}

export default App;
