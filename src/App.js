// import logo from './logo.svg';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from 'react-simplemde-editor';
import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';

import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import defaultFiles from './utils/defaultFiles';
import TabList from './components/TabList';
import BottomBtn from './components/BottomBtn';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';
import fileHelper from './utils/fileHelper';

const { fs } = window.electron;
console.log('fs', fs);

// preload.js
const { remote, path } = window.electron;
const saveLocation = remote.app.getPath('documents');

console.log('saveLocation', saveLocation);

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsaveFileIDs, setUnsaveFileIDs] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const fileListNode = useRef();

  const openedFiles = openedFileIDs.map((ID) => {
    return files.find((file) => file.id === ID);
  });
  const activeFile = files.find((file) => file.id === activeFileID);

  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    // 防止重复打开同一个文件
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID]);
    }
  };

  const tabClick = (id) => {
    setActiveFileID(id);
  };

  const closeTab = (id) => {
    console.log(
      'CLOST-TAB',
      id,
      openedFileIDs,
      openedFileIDs.filter((i) => i !== id)
    );
    // const filterOpenFiles = openedFileIDs.filter(i => i !== id)
    // setOpenedFileIDs(filterOpenFiles)

    const filterOpenFiles = openedFileIDs.filter((i) => i !== id);

    openedFileIDs.splice(0, openedFileIDs.length, ...filterOpenFiles);
    setOpenedFileIDs(openedFileIDs);

    if (id === activeFileID) {
      // 前面splice 是保证这里openedFileIDs 是修改后的
      if (openedFileIDs.length) {
        setActiveFileID(openedFileIDs[openedFileIDs.length - 1]);
      } else {
        setActiveFileID('');
      }
    }
  };

  const fileChange = (activeFileID, value) => {
    activeFile.body = value;

    if (!unsaveFileIDs.includes(activeFileID)) {
      setUnsaveFileIDs([...unsaveFileIDs, activeFileID]);
    }
  };

  const fileDelete = (id) => {
    // setFiles([])
    // const filesCopy =
    // files.splice(0, files.length, ...files.filter(file => file.id !== id))
    // 更新左侧的列表
    setFiles(files.filter((file) => file.id !== id));
    // setFiles(files)

    // console.log('files', files)

    // 更新右侧的tab列表
    // if(openedFileIDs.includes(id)) {
    closeTab(id);
    // }

    console.log('files-filter', files, openedFileIDs);
  };

  const updateFileName = (id, title, { isNew }) => {
    if (isNew) {
      fileHelper
        .writeFile(
          path.join(saveLocation, `${title}.md`),
          files.find((i) => i.id === id).body
        )
        .then(() => {
          files.forEach((file) => {
            if (file.id === id) {
              file.title = title;
            }
          });
          setFiles(files);
        });
    } else {
      const preTitle = files.find((i) => i.id === id).title;
      fileHelper
        .renameFile(
          path.join(saveLocation, `${preTitle}.md`),
          path.join(saveLocation, `${title}.md`)
        )
        .then(() => {
          files.forEach((file) => {
            if (file.id === id) {
              file.title = title;
            }
          });
          setFiles(files);
        });
    }
    // files.forEach((file) => {
    //   if (file.id === id) {
    //     file.title = title;
    //   }
    // });
    // setFiles(files);
  };

  // save unsave file
  const saveCurrentFile = () => {
    fileHelper
      .writeFile(
        path.join(saveLocation, `${activeFile.title}.md`),
        activeFile.body
      )
      .then(() => {
        setUnsaveFileIDs(unsaveFileIDs.filter((id) => id !== activeFile.id));
      });
  };

  const fileSearch = (keyword) => {
    const newFiles = files.filter((file) => file.title.includes(keyword));
    setSearchedFiles(newFiles);
  };

  const fileListArr = searchedFiles.length ? searchedFiles : files;

  const createNewFile = () => {
    const item = {
      id: v4(),
      title: '',
      body: '## 请输入 markdown',
      createdAt: new Date().getTime(),
    };

    const newFiles = [...files, item];
    setFiles(newFiles);

    fileListNode.current.editBtnClick(item, { isNew: true }); // todo ? 没有用
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        <div className="col-3 left-pane px-0">
          <FileSearch onFileSearch={fileSearch} title="My document" />
          <FileList
            ref={fileListNode}
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={updateFileName}
          />
          <div className="btn-group row g-0">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary bnt-block"
                icon={faPlus}
                onBntClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success bnt-block"
                icon={faPlus}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-pane px-0">
          {!activeFile && (
            <div className="start-page">选择或创建新的markdown文件</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsaveFileIDs}
                onTabClick={tabClick}
                onCloseTab={closeTab}
              />
              <SimpleMDE
                key={activeFile && activeFileID} // 最好加上，早期版本，没有key无法正确切换文件
                value={activeFile && activeFile.body}
                onChange={(value) => {
                  fileChange(activeFileID, value);
                }}
                options={{
                  minHeight: '370px',
                }}
              />
              {/* todo 临时的保存按钮 */}
              <div className="col">
                <BottomBtn
                  text="保存"
                  colorClass="btn-success bnt-block"
                  icon={faSave}
                  onBntClick={saveCurrentFile}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
