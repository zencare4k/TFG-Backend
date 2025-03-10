import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'TFG-Backend',
    'sonar.sources': 'src',
    'sonar.language': 'js',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.login': 'sqa_b90013b821e1228490f33a775092b346a8c3a9ac',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info'
  }
}, () => process.exit());