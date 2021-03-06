module.exports = {
    apps: [{
      name: 'diploma',
      script: './index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-205-103-43.compute-1.amazonaws.com',
        key: '~/.ssh/diploma.pem',
        ref: 'origin/master',
        repo: 'https://github.com/Semenchuk1997/diploma-back.git',
        path: '/home/ubuntu/diploma/project/diploma-back',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }