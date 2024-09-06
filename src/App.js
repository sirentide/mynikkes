import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';
import { useDropzone } from 'react-dropzone';

const attacker1CroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 735, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 735, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 735, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 710, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const attacker2CroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 735, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 710, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 735, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 710, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const attacker3CroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 735, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 735, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 710, width: 450, height: 120 },
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


const attacker1TemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 0, y: 420 },
  '5. Boots': { x: 450, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const attacker2TemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 0, y: 420 },
  '5. Boots': { x: 450, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const attacker3TemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 0, y: 420 },
  '5. Boots': { x: 450, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const defenderTemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 0, y: 420 },
  '5. Boots': { x: 450, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const supporterTemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 0, y: 420 },
  '5. Boots': { x: 450, y: 420 },
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


  const handleModeSelection = (mode) => {
    setCurrentMode(mode);
    setIsImagesConfirmed(false);
    setCroppedImages({});
    
    // Reset cropper instances and start cropping again
    if (Object.keys(selectedImages).length > 0) {
      Object.keys(selectedImages).forEach((key) => {
        if (cropperRefs.current[key]?.cropper) {
          cropperRefs.current[key]?.cropper.reset(); // Reset each cropper instance
        }
      });
    }
  };
  
  
  
  
  

  // Handle individual image upload via file input or drag-and-drop
  const handleImageUpload = (file, key) => {
    if (!currentMode) {
      alert('Please select a mode before uploading images.');
      return;
    }
  
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImages((prev) => ({
        ...prev,
        [key]: imageURL,
      }));
    }
  };
  
  const handleAllInOneUpload = (event) => {
    if (!currentMode) {
      alert('Please select a mode before uploading images.');
      return;
    }
  
    const files = event.target.files;
    const images = {};
  
    Object.keys(attacker1CroppingAreas).forEach((key, index) => {
      if (files[index]) {
        images[key] = URL.createObjectURL(files[index]);
      }
    });
  
    setSelectedImages(images);
    setIsIndividualUpload(false);
    setIsImagesConfirmed(true); // Automatically confirm images
  };
  
  
  
  
  

  
  
  
  

  const cropImage = useCallback((key) => {
    const cropper = cropperRefs.current[key]?.cropper;
    
    if (!cropper) {
      console.error(`Cropper instance for ${key} is not available`);
      return;
    }
    
    const cropArea = (currentMode === 'attacker1' ? attacker1CroppingAreas : 
      currentMode === 'attacker2' ? attacker2CroppingAreas :
      currentMode === 'attacker3' ? attacker3CroppingAreas :
      currentMode === 'defender' ? defenderCroppingAreas :
      supporterCroppingAreas)[key];
    
      if (cropArea) {
        cropper.setData({
          x: cropArea.left,
          y: cropArea.top,
          width: cropArea.width,
          height: cropArea.height,
        });
      
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
          const cropped = croppedCanvas.toDataURL();
          setCroppedImages((prev) => ({
            ...prev,
            [key]: cropped,
          }));
        } else {
          console.error(`Failed to get cropped canvas for ${key}`);
        }
      } else {
        console.error(`No crop area defined for ${key}`);
      }
    }, [currentMode]);
  
  
  
  // Confirmation to proceed with cropping
  const confirmUpload = useCallback(() => {
    if (!currentMode) {
      alert('Please select a mode before uploading images.');
      return;
    }
  
    setIsImagesConfirmed(true);
    // Trigger cropping for all images again
    Object.keys(selectedImages).forEach((key) => cropImage(key));
  }, [currentMode, selectedImages, cropImage]); // Added cropImage here

  

  
    const combineImages = useCallback(() => {
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
  
    const templateLayout = currentMode === 'attacker1'
      ? attacker1TemplateLayout
      : currentMode === 'attacker2'
      ? attacker2TemplateLayout
      : currentMode === 'attacker3'
      ? attacker3TemplateLayout
      : currentMode === 'defender'
      ? defenderTemplateLayout
      : supporterTemplateLayout;
  
    const croppingAreas = currentMode === 'attacker1'
      ? attacker1CroppingAreas
      : currentMode === 'attacker2'
      ? attacker2CroppingAreas
      : currentMode === 'attacker3'
      ? attacker3CroppingAreas
      : currentMode === 'defender'
      ? defenderCroppingAreas
      : supporterCroppingAreas;
  
    let imagesLoaded = 0;
  
    drawOrder.forEach((key, index) => {
      if (croppedImages[key]) {
        const img = new Image();
        img.src = croppedImages[key];
        img.onload = () => {
          const layout = templateLayout[key];
          const cropArea = croppingAreas[key];
  
          ctx.drawImage(img, layout.x, layout.y, cropArea.width, cropArea.height);
  
          if (index >= 1 && index <= 4) {
            ctx.font = 'bold 20px Roboto';
            ctx.fillStyle = 'red';
            ctx.fillText(`${index + 0}`, layout.x + 10, layout.y + 30);
          }
  
          imagesLoaded++;
          if (imagesLoaded >= drawOrder.length) {
            const combinedImage = canvas.toDataURL();
            setCroppedImages((prev) => ({ ...prev, combined: combinedImage }));
          }
        };
      } else {
        imagesLoaded++;
        if (imagesLoaded >= drawOrder.length) {
          const combinedImage = canvas.toDataURL();
          setCroppedImages((prev) => ({ ...prev, combined: combinedImage }));
        }
      }
    });
  }, [currentMode, croppedImages]);
  
  
  // Reset cropping on mode change
  useEffect(() => {
    if (currentMode && Object.keys(selectedImages).length > 0) {
      confirmUpload();
    }
  }, [currentMode, confirmUpload, selectedImages]);

  useEffect(() => {
    if (Object.keys(croppedImages).length === Object.keys(attacker1CroppingAreas).length) {
      combineImages();
    }
  }, [croppedImages, combineImages]);
   

  
  useEffect(() => {
    if (Object.keys(croppedImages).length === Object.keys(attacker1CroppingAreas).length) {
      combineImages();
    }
  }, [croppedImages, combineImages]);
  
    
    
  useEffect(() => {
    if (Object.keys(croppedImages).length === Object.keys(attacker1CroppingAreas).length) {
      combineImages();
    }
  }, [croppedImages, combineImages]);
  
    
  useLayoutEffect(() => {
    if (Object.keys(croppedImages).length === Object.keys(attacker1CroppingAreas).length) {
      combineImages();
    }
  }, [croppedImages, combineImages]);


  // Reset all states to initial
  const resetAll = () => {
    setSelectedImages({});
    setCroppedImages({});
    setIsImagesConfirmed(false);
    setIsIndividualUpload(true);
    setCurrentMode('');
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
    <header className="App-header">
      <h1>MY NIKKE v.1.02</h1>
      <p>Capture the screenshots of your Nikke profile in 1920x1080 resolution (only supported resolution at the moment)</p>
    </header>

    <div className="cropped-images-preview">
  {croppedImages.combined ? (
    <div>
      <img src={croppedImages.combined} alt="Combined Preview" />
      
    </div>
  ) : (
    <p>Please select a crop method before uploading images.</p>
  )}
</div>

 {/* Mode selection buttons */}
 <div className="mode-switch">

          <button
  onClick={() => handleModeSelection('attacker1')}
  className={currentMode === 'attacker1' ? 'active' : ''}
>
  A 3331
</button>
<button
  onClick={() => handleModeSelection('attacker2')}
  className={currentMode === 'attacker2' ? 'active' : ''}
>
  A 3131
</button>
<button
  onClick={() => handleModeSelection('attacker3')}
  className={currentMode === 'attacker3' ? 'active' : ''}
>
  A 3311
</button>
<button
  onClick={() => handleModeSelection('defender')}
  className={currentMode === 'defender' ? 'active' : ''}
>
  D 2222
</button>
<button
  onClick={() => handleModeSelection('supporter')}
  className={currentMode === 'supporter' ? 'active' : ''}
>
  S 1111
</button>

          <p className="upload-instructions2">3331 for Alice</p>
          <p className="upload-instructions3">3131 for Emilia, Maid privaty, S.anis(?), etc.</p>
          <p className="upload-instructions3">3311 for Ein(?), etc.</p>
          <p className="upload-instructions3">2222 for Crown</p>
          <p className="upload-instructions3">1111 for Liter Asuka</p>
        </div>

    {!isImagesConfirmed ? (
      <>
        {/* Upload options */}
        
        <div className="upload-options">
          <button onClick={() => setIsIndividualUpload(true)} disabled={!currentMode}>Individual Upload</button>
          <button onClick={() => setIsIndividualUpload(false)} style={{ marginLeft: '10px' }} disabled={!currentMode}>
            All-in-One Upload
          </button>
        </div>

        {!currentMode ? (
  <div className="mode-selection-warning">
    
  </div>
  
) : (
  <>
    

    {isIndividualUpload ? (
      <div className="upload-sections">
        {Object.keys(attacker1CroppingAreas).map((key) => (
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

    {Object.keys(selectedImages).length > 0 && (
      <button onClick={confirmUpload} className="confirm-button">
        Confirm Upload
      </button>
    )}
  </>
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



<button onClick={resetAll} className="reset-button">Start Over</button>

        </>
      )}
    </div>
  );
}



export default App;


