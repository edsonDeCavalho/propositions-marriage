const path = require('path');

module.exports = {
  apps: [
    {
      name: 'version1',
      cwd: path.resolve(__dirname, 'version1'),
      script: './start-preview.sh',
      interpreter: 'bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: path.resolve(__dirname, 'logs/version1-error.log'),
      out_file: path.resolve(__dirname, 'logs/version1-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
    {
      name: 'version2',
      cwd: path.resolve(__dirname, 'version2'),
      script: './start-preview.sh',
      interpreter: 'bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: path.resolve(__dirname, 'logs/version2-error.log'),
      out_file: path.resolve(__dirname, 'logs/version2-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
    {
      name: 'version3',
      cwd: path.resolve(__dirname, 'version3'),
      script: './start-preview.sh',
      interpreter: 'bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: path.resolve(__dirname, 'logs/version3-error.log'),
      out_file: path.resolve(__dirname, 'logs/version3-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
    {
      name: 'version4',
      cwd: path.resolve(__dirname, 'version4'),
      script: './start-preview.sh',
      interpreter: 'bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: path.resolve(__dirname, 'logs/version4-error.log'),
      out_file: path.resolve(__dirname, 'logs/version4-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};

