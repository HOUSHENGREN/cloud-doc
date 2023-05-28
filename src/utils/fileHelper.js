const fs = window.electron.fs.promises; // 用promise的方式返回；如果直接require('fs')就是回调的方式获取数据

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8' });
  },
  // 新增/写入文件
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: 'utf8' });
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath);
  },
  deleteFile: (path) => {
    return fs.unlink(path);
  },
};

export default fileHelper;
