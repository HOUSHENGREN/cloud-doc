// import logo from './logo.svg';
import FileSearch from './components/FileSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-3 bg-danger left-pane'>
          <FileSearch onFileSearch={() => console.log(666)} title='My document'>2</FileSearch>
        </div>
        <div className='col-9 left-pane'>55</div>
      </div>
    </div>
  );
}

export default App;
