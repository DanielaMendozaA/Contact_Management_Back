module.exports = {
    // Directorios que contienen los archivos de prueba
    roots: ['<rootDir>/src'],
  
    // Especifica que Jest debe usar `ts-jest` para compilar archivos TypeScript
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  
    // Extensiones de archivo que Jest debería reconocer
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  
    // Habilitar la cobertura de pruebas si es necesario
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  
    // Si estás usando alias en TypeScript, los mapeas aquí para que Jest los entienda
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
  
    // Directorio donde se guardarán los reportes de cobertura
    coverageDirectory: '<rootDir>/coverage',
  
    // Opcional: configura algunos logs adicionales para saber qué tests se están ejecutando
    verbose: true,
  };
  