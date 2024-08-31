import React, { useState } from 'react';

function DragAndDropAreas({ onImagesConfirmed }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    onImagesConfirmed(files.reduce((acc, file, index) => {
      acc[`Image ${index + 1}`] = URL.createObjectURL(file);
      return acc;
    }, {}));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        border: `2px dashed ${dragging ? '#000' : '#ccc'}`,
        padding: '20px',
        textAlign: 'center',
        margin: '20px 0',
      }}
    >
      <p>Drag and drop images here, or click to select files.</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(Array.from(e.target.files))}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        Choose Files
      </label>
    </div>
  );
}

export default DragAndDropAreas;
