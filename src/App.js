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
import { useState } from 'react';

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsaveFileIDs, setUnsaveFileIDs] = useState([])

  const openedFiles = openedFileIDs.map(i => {
    return files.find(file => file.id === i.id)
  })
  const activeFile = files.find(file => file.id === activeFileID)

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
          <div className='btn-group row g-0'>
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
        <div className='col-9 right-pane px-0'>
          {
            !activeFile && 
            <div className='start-page'>
              选择或创建新的markdown文件
            </div>
          }
          {
            activeFile && 
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsaveFileIDs}
                onTabClick={id => { console.log('onTabClick', id)}}
                onCloseTab={id => { console.log('onCloseTab', id)}}
              ></TabList>
              <SimpleMDE
                value={activeFile && activeFile.body}
                onChange={value => { console.log('simpleMde', value); defaultFiles[1].body = value}}
                options={{
                  minHeight: '370px'
                }}   
              ></SimpleMDE>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
