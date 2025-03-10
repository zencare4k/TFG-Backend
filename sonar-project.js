import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'TFG-Backend',
    'sonar.sources': 'src',
    'sonar.language': 'js',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.login': 'sqp_2f16f83143e4c0d65301946b0a24f19373d95b1b',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info'
  }
}, () => process.exit());