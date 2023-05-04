// import logo from './logo.svg';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-6 left-pane'>
          <FileSearch onFileSearch={(value) => console.log(666, value)} title='My document'></FileSearch>
          <FileList 
            files={defaultFiles}
            onFileClick={(id) => {console.log('777cli', id)}}
            onFileDelete={(id) => {console.log('777delete', id)}}
            onSaveEdit={(id, value) => {console.log('777edit', id, value)}}
          ></FileList>
        </div>
        <div className='col-6 left-pane'>55</div>
      </div>
    </div>
  );
}

export default App;
