const { exec } = require('child_process');
const fs = require('fs');

// 执行git log命令获取提交记录
exec('git log --pretty=format:"%h|%an|%s|%at"', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行Git命令时出错：${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Git命令执行错误：${stderr}`);
    return;
  }

  // 将输出保存为JSON文件
  const commitLogs = stdout.split('\n').map(line => {
    const [hash, author, message, timestamp] = line.split('|');
    const date = new Date(parseInt(timestamp) * 1000);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return { hash, author, message, date: formattedDate };
  });

  const json = JSON.stringify(commitLogs, null, 2);
  fs.writeFile('commit_logs.json', json, err => {
    if (err) {
      console.error(`保存JSON文件时出错：${err.message}`);
      return;
    }
    console.log('提交记录已保存为commit_logs.json文件');
  });
});