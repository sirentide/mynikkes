import React, { useState, useRef, useCallback } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';
import { useDropzone } from 'react-dropzone';

const attackerCroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 735, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 710, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 735, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 710, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const defenderCroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 720, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 720, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 720, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 720, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const attackerTemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 450, y: 420 },
  '5. Boots': { x: 0, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const defenderTemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 450, y: 420 },
  '5. Boots': { x: 0, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const supporterCroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 710, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 710, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 710, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 710, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const supporterTemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 450, y: 420 },
  '5. Boots': { x: 0, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const FIXED_CANVAS_WIDTH = 900;
const FIXED_CANVAS_HEIGHT = 540;

function App() {
  const [selectedImages, setSelectedImages] = useState({});
  const [croppedImages, setCroppedImages] = useState({});
  const [isImagesConfirmed, setIsImagesConfirmed] = useState(false);
  const [isIndividualUpload, setIsIndividualUpload] = useState(true);
  const [currentMode, setCurrentMode] = useState('');
  const cropperRefs = useRef({});

  // Handle individual image upload via file input or drag-and-drop
  const handleImageUpload = (file, key) => {
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImages((prev) => ({
        ...prev,
        [key]: imageURL,
      }));
    }
  };

  // Handler for file input change (all-in-one upload)
  const handleAllInOneUpload = (event) => {
    const files = event.target.files;
    const images = {};

    Object.keys(attackerCroppingAreas).forEach((key, index) => {
      if (files[index]) {
        images[key] = URL.createObjectURL(files[index]);
      }
    });

    setSelectedImages(images);
    setIsIndividualUpload(false);
  };

  // Confirmation to proceed with cropping
  const confirmUpload = () => {
    if (!currentMode) {
      alert('Please select a mode before uploading images.');
      return;
    }
    setIsImagesConfirmed(true);
    Object.keys(selectedImages).forEach((key) => cropImage(key));
  };

  // Crop images based on predefined cropping areas
  const cropImage = useCallback((key) => {
    const cropper = cropperRefs.current[key]?.cropper;
    if (cropper) {
      const cropArea = currentMode === 'attacker'
        ? attackerCroppingAreas[key]
        : currentMode === 'defender'
        ? defenderCroppingAreas[key]
        : supporterCroppingAreas[key];
      
      cropper.setData({
        x: cropArea.left,
        y: cropArea.top,
        width: cropArea.width,
        height: cropArea.height,
      });
    
      const cropped = cropper.getCroppedCanvas().toDataURL();
      setCroppedImages((prev) => ({
        ...prev,
        [key]: cropped,
      }));
    }
  }, [currentMode]);

  const combineImages = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = FIXED_CANVAS_WIDTH;
    canvas.height = FIXED_CANVAS_HEIGHT;

    const drawOrder = [
      '1. Portrait',
      '2. Visor',
      '3. Vest',
      '4. Armguard',
      '5. Boots',
      '6. Skill',
      '7. Cube',
      '8. Dolls',
    ];

    const layout = currentMode === 'attacker'
      ? attackerTemplateLayout
      : currentMode === 'defender'
      ? defenderTemplateLayout
      : supporterTemplateLayout;

    drawOrder.forEach((key, index) => {
      const img = new Image();
      img.src = croppedImages[key];
      img.onload = () => {
        const position = layout[key];
        const cropArea = currentMode === 'attacker'
          ? attackerCroppingAreas[key]
          : currentMode === 'defender'
          ? defenderCroppingAreas[key]
          : supporterCroppingAreas[key];
        ctx.drawImage(img, position.x, position.y, cropArea.width, cropArea.height);

        if (index >= 1 && index <= 4) {
          ctx.font = 'bold 20px Roboto';
          ctx.fillStyle = 'red';
          ctx.fillText(`${index}`, position.x + 10, position.y + 30);
        }

        if (key === '8. Dolls') {
          const combinedImage = canvas.toDataURL();
          setCroppedImages((prev) => ({ ...prev, combined: combinedImage }));
        }
      };
    });
  };

  // Reset all states to initial
  const resetAll = () => {
    setSelectedImages({});
    setCroppedImages({});
    setIsImagesConfirmed(false);
    setIsIndividualUpload(true);
    setCurrentMode('');
    cropperRefs.current = {};
  };

  // Component for individual upload sections with drag-and-drop
  const UploadSection = ({ keyName }) => {
    const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleImageUpload(acceptedFiles[0], keyName);
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: 'image/*',
      multiple: false,
    });

    return (
      <div className="upload-section">
        <h3>{keyName}</h3>
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select</p>
          )}
        </div>
        {selectedImages[keyName] && (
          <div className="thumbnail">
            <img src={selectedImages[keyName]} alt={`${keyName} Preview`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>MY NIKKE</h1>

      {!isImagesConfirmed ? (
        <>
          {/* Upload options */}
          <div className="upload-options">
            <button onClick={() => setIsIndividualUpload(true)}>Individual Upload</button>
            <button onClick={() => setIsIndividualUpload(false)} style={{ marginLeft: '10px' }}>
              All-in-One Upload
            </button>
          </div>

          {isIndividualUpload ? (
            <div className="upload-sections">
              {Object.keys(attackerCroppingAreas).map((key) => (
                <UploadSection key={key} keyName={key} />
              ))}
            </div>
          ) : (
            <div className="all-in-one-upload">
              <label htmlFor="all-in-one-upload" className="upload-label">
                All-in-One Upload:
              </label>
              <input
                id="all-in-one-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleAllInOneUpload}
                className="upload-input"
              />
              <p className="upload-instructions">
                Upload all images at once in the order: Portrait, Skill, Cube, Visor, Vest, Armguard, Boots, Dolls.
              </p>
            </div>
          )}

          {/* Mode selection buttons */}
      <div className="mode-switch">
        <button onClick={() => setCurrentMode('attacker')} className={currentMode === 'attacker' ? 'active' : ''}>
          Attacker
        </button>
        <button onClick={() => setCurrentMode('defender')} className={currentMode === 'defender' ? 'active' : ''}>
          Defender
        </button>
        <button onClick={() => setCurrentMode('supporter')} className={currentMode === 'supporter' ? 'active' : ''}>
          Supporter
        </button>
      </div>

          {Object.keys(selectedImages).length > 0 && (
            <button onClick={confirmUpload} className="confirm-button">
              Confirm Upload
            </button>
          )}
        </>
      ) : (
        <>
          {Object.keys(selectedImages).map((key) => (
            <div key={key} style={{ display: 'none' }}>
              <Cropper
                src={selectedImages[key]}
                style={{ height: 1080, width: 1920 }}
                aspectRatio={NaN}
                guides={false}
                ref={(el) => (cropperRefs.current[key] = el)}
                ready={() => cropImage(key)}
              />
            </div>
          ))}

          <div className="cropped-images-preview">
            {croppedImages.combined ? (
              <div className="cropped-image">
                <h3>Combined Image ({currentMode.charAt(0).toUpperCase() + currentMode.slice(1)})</h3>
                <img src={croppedImages.combined} alt="Combined" />
              </div>
            ) : (
              <button onClick={combineImages} className="combine-button">
                Combine Images
              </button>
            )}
          </div>

          <button onClick={resetAll} style={{ marginTop: '20px' }}>
            Reset
          </button>
        </>
      )}
    </div>
  );
}

export default App;
