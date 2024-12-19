import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';
import { useDropzone } from 'react-dropzone';
import { throttle } from 'lodash';


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
  '3. Vest': { left: 735, top: 710, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 710, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 710, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const attacker4CroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 695, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 695, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 695, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 695, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const defenderCroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 745, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 720, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 745, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 720, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const defender1CroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 745, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 745, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 720, width: 450, height: 120 },
  '5. Boots': { left: 735, top: 720, width: 450, height: 120 },
  '6. Skill': { left: 1610, top: 740, width: 230, height: 180 },
  '7. Cube': { left: 1685, top: 735, width: 100, height: 90 },
  '8. Dolls': { left: 710, top: 720, width: 200, height: 35 },
};

const defender2CroppingAreas = {
  '1. Portrait': { left: 650, top: 110, width: 900, height: 300 },
  '2. Visor': { left: 735, top: 745, width: 450, height: 120 },
  '3. Vest': { left: 735, top: 745, width: 450, height: 120 },
  '4. Armguard': { left: 735, top: 745, width: 450, height: 120 },
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

const attacker4TemplateLayout = {
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

const defender1TemplateLayout = {
  '1. Portrait': { x: 0, y: 0 },
  '2. Visor': { x: 0, y: 300 },
  '3. Vest': { x: 450, y: 300 },
  '4. Armguard': { x: 0, y: 420 },
  '5. Boots': { x: 450, y: 420 },
  '6. Skill': { x: 670, y: 0 },
  '7. Cube': { x: 800, y: 210 },
  '8. Dolls': { x: 600, y: 265 },
};

const defender2TemplateLayout = {
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
  const combinedImageCache = {};



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

  
  if (files.length > 8) {
    alert('You can only upload up to 8 images.');
    return;
  }
  
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
      currentMode === 'attacker4' ? attacker4CroppingAreas :
      currentMode === 'defender' ? defenderCroppingAreas :
      currentMode === 'defender1' ? defender1CroppingAreas :
      currentMode === 'defender2' ? defender2CroppingAreas :
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

  

  
  const combineImages = throttle(async () => {
    // Create a unique key based on the selected images and the current mode
    const cacheKey = `${currentMode}-${Object.keys(selectedImages).sort().join('-')}`;

    // Check if the combined image is already cached
    if (combinedImageCache[cacheKey]) {
        setCroppedImages((prev) => ({ ...prev, combined: combinedImageCache[cacheKey] }));
        return;
    }

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
        : currentMode === 'attacker4'
        ? attacker4TemplateLayout
        : currentMode === 'defender'
        ? defenderTemplateLayout
        : currentMode === 'defender1'
        ? defender1TemplateLayout
        : currentMode === 'defender2'
        ? defender2TemplateLayout
        : supporterTemplateLayout;

    const croppingAreas = currentMode === 'attacker1'
        ? attacker1CroppingAreas
        : currentMode === 'attacker2'
        ? attacker2CroppingAreas
        : currentMode === 'attacker3'
        ? attacker3CroppingAreas
        : currentMode === 'attacker4'
        ? attacker4CroppingAreas
        : currentMode === 'defender'
        ? defenderCroppingAreas
        : currentMode === 'defender1'
        ? defender1CroppingAreas
        : currentMode === 'defender2'
        ? defender2CroppingAreas
        : supporterCroppingAreas;

    let imagesProcessed = 0;

    drawOrder.forEach((key, index) => {
        if (croppedImages[key]) {
            const img = new Image();
            img.src = croppedImages[key];
            img.onload = () => {
                const layout = templateLayout[key];
                const cropArea = croppingAreas[key];

                // Draw the image on the canvas
                ctx.drawImage(img, layout.x, layout.y, cropArea.width, cropArea.height);

                // Add text annotations for specific regions
                if (index >= 1 && index <= 4) { // For 2. Visor, 3. Vest, 4. Armguard, 5. Boots
                    ctx.font = 'bold 20px Roboto';
                    ctx.fillStyle = 'red';
                    ctx.fillText(`${index + 0}`, layout.x + 10, layout.y + 30); // Adds text to the top left of the cropped area
                }

                // Increment the count of processed images
                imagesProcessed++;
                if (imagesProcessed >= drawOrder.length) {
                    const combinedImage = canvas.toDataURL();

                    // Cache the combined image
                    combinedImageCache[cacheKey] = combinedImage;

                    // Set the combined image
                    setCroppedImages((prev) => ({ ...prev, combined: combinedImage }));
                }
            };
        } else {
            // If image is missing, consider drawing a placeholder or skip
            const layout = templateLayout[key];
            ctx.fillStyle = 'white'; // Placeholder color
            ctx.fillRect(layout.x, layout.y, croppingAreas[key].width, croppingAreas[key].height);

            // Increment the count of processed images
            imagesProcessed++;
            if (imagesProcessed >= drawOrder.length) {
                const combinedImage = canvas.toDataURL();

                // Cache the combined image
                combinedImageCache[cacheKey] = combinedImage;

                // Set the combined image
                setCroppedImages((prev) => ({ ...prev, combined: combinedImage }));
            }
        }
    });
}, 300);


  
  
  
  
  
  
  
  
  // Reset cropping on mode change
  useEffect(() => {
    if (currentMode && Object.keys(selectedImages).length > 7) {
      confirmUpload();
    }
  }, [currentMode, confirmUpload, selectedImages]);
  
    
  useLayoutEffect(() => {
    // Check if at least one image is available
    if (Object.keys(croppedImages).length > 0) {
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
      <h1>MY NIKKE v.1.05</h1>
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
 <div className="mode-switch-wrapper">
  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('attacker1')}
      className={currentMode === 'attacker1' ? 'active' : ''}
    >
      A 3331
    </button>
    <p className="upload-instructions3">Alice</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('attacker2')}
      className={currentMode === 'attacker2' ? 'active' : ''}
    >
      A 3131
    </button>
    <p className="upload-instructions3">Emilia, Maid privaty, S.anis, Ein</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('attacker3')}
      className={currentMode === 'attacker3' ? 'active' : ''}
    >
      A 3311
    </button>
    <p className="upload-instructions3">Maxwell, Snowwhite</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('defender')}
      className={currentMode === 'defender' ? 'active' : ''}
    >
      D 2222
    </button>
    <p className="upload-instructions3">Crown</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('defender1')}
      className={currentMode === 'defender1' ? 'active' : ''}
    >
      D 1122
    </button>
    <p className="upload-instructions3">Cinderella</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('defender2')}
      className={currentMode === 'defender2' ? 'active' : ''}
    >
      D 3311
    </button>
    <p className="upload-instructions3">Cinderella 2</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('supporter')}
      className={currentMode === 'supporter' ? 'active' : ''}
    >
      S 1111
    </button>
    <p className="upload-instructions3">Liter, Asuka, S.Sukura</p>
  </div>

  <div className="mode-switch-item">
    <button
      onClick={() => handleModeSelection('attacker4')}
      className={currentMode === 'attacker4' ? 'active' : ''}
    >
      A 0000
    </button>
    <p className="upload-instructions3">Thai UI Asuka</p>
  </div>
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
          Upload all images at once in the order: Portrait, Visor, Vest, Armguard, Boots, Skill, Cube, Dolls.
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
      ready={() => {
        cropImage(key);
      }}
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


