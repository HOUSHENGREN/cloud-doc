// const path = window.require('path');
const fs = window.require('fs').promises; // 用promise的方式返回；如果直接require('fs')就是回调的方式获取数据

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8' });
  },
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

// const testPath = path.join(__dirname, 'helper.js');

// fileHelper.readFile(testPath).then((data) => {
//   console.log('435436', data);
// });

// const testWriteFile = path.join(__dirname, 'testWr.md')
// const renameF = path.join(__dirname, 'rename.md');

// fileHelper.deleteFile(renameF).then(() => {
//   console.log('写入成功');
// });
