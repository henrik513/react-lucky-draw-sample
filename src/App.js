import './App.css';
import { CountDown } from './components/CountDown/CountDown';
import { Participant } from './components/Participant/Participant';

function App() {
  return (
      <div className="App">
        <CountDown className="inputContainer" />
        <Participant />
      </div>
  );
}

export default App;
