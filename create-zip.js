const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const sourceDir = 'github-upload';
const outputFile = 'roadmap-dashboard-upload.zip';

// Create output stream
const output = fs.createWriteStream(outputFile);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for events
output.on('close', function() {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  const sizeInKB = (archive.pointer() / 1024).toFixed(1);
  console.log('✅ ZIP file created successfully!');
  console.log(`📦 File: ${outputFile}`);
  console.log(`📏 Size: ${sizeInKB} KB (${sizeInMB} MB)`);
  console.log(`📁 Total bytes: ${archive.pointer()}`);
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files from github-upload directory
archive.directory(sourceDir, false);

// Finalize the archive
archive.finalize();
