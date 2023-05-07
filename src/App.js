// import logo from './logo.svg';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import BottomBtn from './components/BottomBtn'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TabList from './components/TabList';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className='row g-0'>
        <div className='col-3 left-pane px-0'>
          <FileSearch onFileSearch={(value) => console.log(666, value)} title='My document'></FileSearch>
          <FileList 
            files={defaultFiles}
            onFileClick={(id) => {console.log('777cli', id)}}
            onFileDelete={(id) => {console.log('777delete', id)}}
            onSaveEdit={(id, value) => {console.log('777edit', id, value)}}
          ></FileList>
          <div className='row g-0'>
            <div className='col'>
              <BottomBtn
                text='新建'
                colorClass='btn-primary bnt-block'
                icon={faPlus}
              ></BottomBtn>
            </div>
            <div className='col'>
              <BottomBtn
                text='导入'
                colorClass='btn-success bnt-block'
                icon={faPlus}
              ></BottomBtn>
            </div>
          </div>
        </div>
        <div className='col-9 left-pane px-0'>
          <TabList
            files={defaultFiles}
            activeId='1'
            unsaveIds={['1', '2']}
            onTabClick={id => { console.log('onTabClick', id)}}
            onCloseTab={id => { console.log('onCloseTab', id)}}
          ></TabList>
          <SimpleMDE
            value={defaultFiles[1].body}
            onChange={value => { console.log('simpleMde', value); defaultFiles[1].body = value}}
            options={{
              minHeight: '370px'
            }}   
          ></SimpleMDE>
        </div>
      </div>
    </div>
  );
}

export default App;
