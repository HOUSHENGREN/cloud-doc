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

  console.log(openedFileIDs, '88899998')
  const openedFiles = openedFileIDs.map(ID => {
    console.log('87898', files.find(file => file.id === ID) )
    return files.find(file => file.id === ID) 
  })
  const activeFile = files.find(file => file.id === activeFileID)

  const fileClick = fileID => {
    console.log('***fileId+++ ', fileID)
    setActiveFileID(fileID)
    // 防止重复打开同一个文件
    if(!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }

  const tabClick = id => {
    setActiveFileID(id)
  }

  const closeTab = id => {
    console.log('CLOST-TAB', id, openedFileIDs, openedFileIDs.filter(i => i !== id))
    const filterOpenFiles = openedFileIDs.filter(i => i !== id)
    setOpenedFileIDs(filterOpenFiles)

    // openedFileIDs.splice(0, openedFileIDs.length, ...openedFileIDs.filter(ID => ID !== id))
    // setOpenedFileIDs(openedFileIDs)

    console.log('openedid', openedFileIDs, files)

    if(id === activeFileID) {
      if(openedFileIDs.length) {
        console.log('openFileIDs', openedFileIDs)
        setActiveFileID(openedFileIDs[0])
      } else {
        setActiveFileID('')
      }
    }
  }

  const fileChange = (activeFileID, value) => {
    activeFile.body = value

    console.log('file change')

    if(!unsaveFileIDs.includes(activeFileID)) {
      setUnsaveFileIDs([...unsaveFileIDs, activeFileID])
    }
  }

  const fileDelete = id => {

    // setFiles([])
    // const filesCopy = 
    // files.splice(0, files.length, ...files.filter(file => file.id !== id))
    // 更新左侧的列表
    setFiles(files.filter(file => file.id !== id))
    // setFiles(files)
    
    // console.log('files', files)

    // 更新右侧的tab列表
    // if(openedFileIDs.includes(id)) {
      closeTab(id)
    // }

    console.log('files-filter', files, openedFileIDs)

  }
  
  return (
    <div className="App container-fluid px-0">
      <div className='row g-0'>
        <div className='col-3 left-pane px-0'>
          <FileSearch onFileSearch={(value) => console.log(666, value)} title='My document'></FileSearch>
          <FileList 
            files={files}
            onFileClick={fileClick}
            // onFileDelete={id => console.log('out file-delete', id)}
            onFileDelete={fileDelete}
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
                onTabClick={tabClick}
                onCloseTab={closeTab}
              ></TabList>
              <SimpleMDE
                key={activeFile && activeFileID} // 最好加上，早期版本，没有key无法正确切换文件
                value={activeFile && activeFile.body}
                onChange={value => { fileChange(activeFileID, value) }}
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
