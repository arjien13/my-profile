
  /*************       FOR GET ELEMENTS      ***********/
const createFolderButton = document.getElementById('create-folder-btn');
createFolderButton.style.cursor = 'pointer';

const foldersContainer = document.getElementById('folders-container');
 /*************       FOR GET ELEMENTS      ***********/


  /*************   FOR DISPLAY FOLDER     ***********/
function displayFolders() {
  const storedFolders = localStorage.getItem('folders');
  if (storedFolders) {
    const folders = JSON.parse(storedFolders).sort((a, b) => a.name.localeCompare(b.name));
    foldersContainer.innerHTML = ''; // Clear the container
foldersContainer.style.position = 'absolute';
foldersContainer.style.flexDirection = 'column';
foldersContainer.style.justifyContent = 'center';
foldersContainer.style.alignItems = 'center';
    folders.forEach((folder) => {
      const newFolder = document.createElement('div');
newFolder.style.width = '150px';
newFolder.style.height = '120px';
newFolder.style.background = 'url("folder.png") no-repeat';
newFolder.style.backgroundSize = '100% 100%';
newFolder.style.position = 'relative';
newFolder.style.cursor = 'pointer';

newFolder.addEventListener('mouseover', () => {
  newFolder.style.transform = 'scale(1.1)';
});

newFolder.addEventListener('mouseout', () => {
  newFolder.style.transform = 'scale(1)';
});

      newFolder.addEventListener('click', () => {
        openFolder(folder.name);
      });

      const folderName = document.createElement('div');
      folderName.textContent = folder.name;
      folderName.style.position = 'absolute';
      folderName.style.bottom = '30px';
      folderName.style.left = '10px';
      folderName.style.color = '#F5F5F5';
      newFolder.appendChild(folderName);
       /*************   FOR DISPLAY FOLDER     ***********/

       
      /************DELETE FOLDER MODAL********************************/
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.position = 'absolute';
      deleteButton.style.bottom = '10px';
      deleteButton.style.right = '10px';
      deleteButton.style.background = 'linear-gradient(to right, #FF0033, #660000)';
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
        
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent opening folder when clicking delete button
        if (confirm("Are you sure you want to delete this folder?")) {
          const storedFolders = localStorage.getItem('folders');
          const folders = JSON.parse(storedFolders);
          const index = folders.findIndex((f) => f.name === folder.name);
          if (index !== -1) {
            folders.splice(index, 1);
            localStorage.setItem('folders', JSON.stringify(folders));
          }
          foldersContainer.removeChild(newFolder); // Remove the folder
          displayFolders(); // Update the folder list
        }
      });

      newFolder.appendChild(deleteButton);
      foldersContainer.appendChild(newFolder);
    });
  }
}

/************ DELETE FOLDER MODAL************/

/************ CREATE FOLDER FUNCTION ********/
createFolderButton.addEventListener('click', () => {
  // Get the folder name from the user
  const folderName = prompt('Enter folder name:');
  if (folderName !== null && folderName !== '') {
    // Create a new folder object
    const newFolder = { name: folderName };
    const storedFolders = localStorage.getItem('folders');
    let folders = storedFolders ? JSON.parse(storedFolders) : [];
    folders.push(newFolder);
    folders.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('folders', JSON.stringify(folders));

    // Update the display
    displayFolders();
  }
});
displayFolders();
/************ CREATE FOLDER FUNCTION ********/



/************ OPEN FOLDER FUNCTION **********/
function openFolder(folderName) {
    const storedFolders = localStorage.getItem('folders');
    const folders = JSON.parse(storedFolders);
    const folder = folders.find((f) => f.name === folderName);
  
    const folderContents = document.createElement('div');
    folderContents.style.position = 'fixed';
    folderContents.style.top = '0';
    folderContents.style.left = '0';
    folderContents.style.width = '100%';
    folderContents.style.height = '100%';
    folderContents.style.background = 'rgba(0, 0, 0, 0.5)';
    folderContents.style.display = 'flex';
    folderContents.style.justifyContent = 'center';
    folderContents.style.alignItems = 'center';
    folderContents.style.zIndex = '1';
/************ OPEN FOLDER FUNCTION **********/
    
    
  /************ FOR CLOSE BUTTON IN OPEN FOLDER **********/
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'rgba(255, 105, 97, 0.2)';
    closeButton.style.color = 'white';
    closeButton.style.padding = '10px 20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.border = 'none';
    closeButton.style.boxShadow = 'none';
    closeButton.style.width = '80px'; // Set width
    closeButton.style.height = '40px'; // Set height

    closeButton.addEventListener('mouseover', () => {
      closeButton.style.background = 'rgba(255, 105, 97, 0.2)';
      closeButton.style.transform = 'scale(1.1)';
    });
    closeButton.addEventListener('mouseout', () => {
      closeButton.style.background = 'rgba(255, 105, 97, 0.2)';
      closeButton.style.transform = 'scale(1)';
    });
    closeButton.addEventListener('click', () => {
      document.body.removeChild(folderContents);
    });
  /************ FOR CLOSE BUTTON IN OPEN FOLDER **********/


  /************    FOR DISPLAY PHOTOS   **********/
    const contentsContainer = document.createElement('div');
    contentsContainer.style.display = 'grid';
    contentsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    contentsContainer.style.gridTemplateRows = 'repeat(4, 1fr)';
    contentsContainer.style.gap = '10px';
    contentsContainer.style.overflowY = 'auto';
    contentsContainer.style.height = '440px'; 
    contentsContainer.style.scrollbarWidth = 'thin';
    contentsContainer.style.scrollbarColor = '#6b7273rgb(32, 32, 32)';
    contentsContainer.style.overflowY = 'hidden';
    contentsContainer.style.overflowX = 'hidden'; // Add this line
    contentsContainer.style.overflowY = 'hidden'; // Add this line
    contentsContainer.style.overflowY = 'auto';
    /************    FOR DISPLAY PHOTOS   **********/


    /************  FOR EMPTY FOLDER MODAL   **********/
if (!folder.photos || folder.photos.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.textContent = 'This Folder is Empty';
      emptyMessage.style.fontFamily = 'cursive';
      emptyMessage.style.fontSize = '24px';
      emptyMessage.style.color = '#fff';
      contentsContainer.appendChild(emptyMessage);
      /************  FOR EMPTY FOLDER MODAL   **********/


     /************  FOR UPLOAD PHOTO BUTTONS   **********/
      const uploadButton = document.createElement('button');
      uploadButton.textContent = 'Upload Photos';
      uploadButton.style.background = '#929692';
      uploadButton.style.color = '#fff';
      uploadButton.style.border = 'none';
      uploadButton.style.padding = '10px 20px';
      uploadButton.style.borderRadius = '5px';
      uploadButton.style.cursor = 'pointer';
      
      uploadButton.addEventListener('click', () => {
        const uploadInput = document.createElement('input');
        uploadInput.type = 'file';
        uploadInput.multiple = true;
        uploadInput.accept = 'image/*';
  
        uploadInput.addEventListener('change', (e) => {
          const files = e.target.files;
          const storedFolders = localStorage.getItem('folders');
          const folders = JSON.parse(storedFolders);
          const folder = folders.find((f) => f.name === folderName);
  
          for (const file of files) {
            const reader = new FileReader();
            reader.onload = () => {
              const photoUrl = reader.result;
              if (!folder.photos) {
                folder.photos = [];
              }
              folder.photos.push(photoUrl);
              localStorage.setItem('folders', JSON.stringify(folders));
  
              const photoElement = document.createElement('img');
              photoElement.src = photoUrl;
              photoElement.style.width = '150px';
              photoElement.style.height = '150px';
              photoElement.style.objectFit = 'cover';
              photoElement.style.borderRadius = '10px';
              photoElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
              photoElement.style.transition = 'transform 0.2s ease-in-out';
              photoElement.style.cursor = 'pointer';
              photoElement.style.margin = '5px';
              photoElement.style.height = '100%';
              photoElement.style.display = 'block';
             
              contentsContainer.appendChild(photoElement);
            };
  
            reader.readAsDataURL(file);
          }
        });
  
        uploadInput.click();
      });

      contentsContainer.appendChild(uploadButton);
    } else {
      folder.photos.forEach((photo) => {
        const photoElement = document.createElement('img');
        photoElement.src = photo;
        photoElement.style.width = '100px';
        photoElement.style.height = '100px';
        photoElement.style.objectFit = 'cover';
        photoElement.style.borderRadius = '10px';
        photoElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        photoElement.style.transition = 'transform 0.2s ease-in-out';
        photoElement.style.cursor = 'pointer';
      
        photoElement.addEventListener('mouseover', () => {
          photoElement.style.transform = 'scale(1.1)';
          photoElement.style.zIndex = '1';
        });
        
        photoElement.addEventListener('mouseout', () => {
          photoElement.style.transform = 'scale(1)';
          photoElement.style.zIndex = '0';
        });
      /************  FOR UPLOAD PHOTO BUTTONS   **********/
        
      
      /************  FOR ClICKING THE PHOTOS   **********/
        photoElement.addEventListener('click', () => {
          const originalPhotoView = document.createElement('div');
          originalPhotoView.style.position = 'fixed';
          originalPhotoView.style.top = '0';
          originalPhotoView.style.left = '0';
          originalPhotoView.style.width = '100%';
          originalPhotoView.style.height = '100%';
          originalPhotoView.style.background = 'rgba(0, 0, 0, 0.5)';
          originalPhotoView.style.display = 'flex';
          originalPhotoView.style.justifyContent = 'center';
          originalPhotoView.style.alignItems = 'center';
          originalPhotoView.style.zIndex = '1';
      
          const originalPhoto = document.createElement('img');
          originalPhoto.src = photoElement.src;
          originalPhoto.style.maxWidth = '90%';
          originalPhoto.style.maxHeight = '90%';
          originalPhoto.style.objectFit = 'contain';
      /************  FOR ClICKING THE PHOTOS   **********/

      
      /************  FOR CLOSE BUTTON IN CLICKING PHOTO  **********/
          const closeButton = document.createElement('button');
          closeButton.textContent = 'Close';
          closeButton.style.position = 'absolute';
          closeButton.style.top = '10px';
          closeButton.style.right = '10px';
          closeButton.style.background = 'rgba(255, 105, 97, 0.2)';
          closeButton.style.color = 'white';
          closeButton.style.padding = '10px 20px';
          closeButton.style.cursor = 'pointer';
          closeButton.style.border = 'none';
          closeButton.style.boxShadow = 'none';
          closeButton.style.width = '80px'; 
          closeButton.style.height = '40px'; 

closeButton.addEventListener('mouseover', () => {
  closeButton.style.background = 'rgba(255, 105, 97, 0.2)';
  closeButton.style.transform = 'scale(1.1)';
});

closeButton.addEventListener('mouseout', () => {
  closeButton.style.background = 'rgba(255, 105, 97, 0.2)';
  closeButton.style.transform = 'scale(1)';
});

closeButton.addEventListener('click', () => {
  document.body.removeChild(folderContents);
});
/************  FOR CLOSE BUTTON IN CLICKING PHOTO  **********/


/************       FOR DELETE PHOTO BUTTON       **********/
          const deleteButton = document.createElement('button');
          deleteButton.style.display = 'flex';
          deleteButton.style.justifyContent = 'center';
          deleteButton.style.alignItems = 'center';
          deleteButton.textContent = 'Delete';
          deleteButton.style.position = 'absolute';
          deleteButton.style.top = '50px';
          deleteButton.style.right = '10px';
          deleteButton.style.background = 'rgba(255, 105, 97, 0.2)';
          deleteButton.style.color = 'white';
          deleteButton.style.padding = '10px 20px'; 
          deleteButton.style.cursor = 'pointer';
          deleteButton.style.width = '80px';
          deleteButton.style.height = '40px';
          deleteButton.style.border = 'none';
          deleteButton.style.boxShadow = 'none';
          deleteButton.style.width = '80px'; 
          deleteButton.style.height = '40px'; 
          
        deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.background = 'rgba(255, 105, 97, 0.2)';
            deleteButton.style.transform = 'scale(1.1)';
          });
          
        deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.background = 'rgba(255, 105, 97, 0.2)';
            deleteButton.style.transform = 'scale(1)';
          });
/************         FOR DELETE PHOTO BUTTON       **********/


/************       FOR DELETE MODAL CONFIRMATION     **********/
           deleteButton.addEventListener('click', () => {
            
            const modalOverlay = document.createElement('div');
            modalOverlay.style.position = 'fixed';
            modalOverlay.style.top = '0';
            modalOverlay.style.left = '0';
            modalOverlay.style.width = '100%';
            modalOverlay.style.height = '100%';
            modalOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
            modalOverlay.style.zIndex = '1000';
          
            const confirmDialog = document.createElement('div');
            confirmDialog.style.position = 'absolute';
            confirmDialog.style.top = '50%';
            confirmDialog.style.left = '50%';
            confirmDialog.style.transform = 'translate(-50%, -50%)';
            confirmDialog.style.background = 'rgba(50, 50, 50, 0.5)'; 
            confirmDialog.style.color = '#fff'; 
            confirmDialog.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
            confirmDialog.style.padding = '20px';
            confirmDialog.style.textAlign = 'center';
            confirmDialog.style.width = '300px';
          
            const message = document.createElement('p');
            message.textContent = 'Are you sure you want to delete this Photo?';
          
            const yesButton = document.createElement('button');
            yesButton.textContent = 'Yes';
            yesButton.style.background = 'linear-gradient(to right, #660000, #8B0A0A)';
            yesButton.style.padding = '10px 20px';
            yesButton.style.fontSize = '15px';
            yesButton.style.border = 'none';
            yesButton.style.color = '#fff';
           yesButton.style.cursor = 'pointer';
           
           yesButton.addEventListener('mouseover', () => {
            yesButton.style.background = 'linear-gradient(to right, #8B0A0A, #CC0000)';
            yesButton.style.transform = 'scale(1.1)';
          });
          
          yesButton.addEventListener('mouseout', () => {
            yesButton.style.background = 'linear-gradient(to right, #660000, #8B0A0A)';
            yesButton.style.transform = 'scale(1)';
          });

            const noButton = document.createElement('button');
            noButton.textContent = 'No';
            noButton.style.background = 'linear-gradient(to right, #333333, #555555)';
            noButton.style.padding = '10px 20px';
            noButton.style.fontSize = '15px';
            noButton.style.border = 'none';
            noButton.style.color = '#fff';
            noButton.style.cursor = 'pointer';

            noButton.addEventListener('mouseover', () => {
              noButton.style.background = 'linear-gradient(to right, #555555, #777777)';
              noButton.style.transform = 'scale(1.1)';
            });
            
            noButton.addEventListener('mouseout', () => {
              noButton.style.background = 'linear-gradient(to right, #333333, #555555)';
              noButton.style.transform = 'scale(1)';
            });

            confirmDialog.appendChild(message);
            confirmDialog.appendChild(yesButton);
            confirmDialog.appendChild(noButton);
          
            modalOverlay.appendChild(confirmDialog);
            document.body.appendChild(modalOverlay);
          
            yesButton.addEventListener('click', () => {
              const storedFolders = localStorage.getItem('folders');
              const folders = JSON.parse(storedFolders);
              const folder = folders.find((f) => f.name === folderName);
              const photoIndex = folder.photos.indexOf(photoElement.src);
              if (photoIndex !== -1) {
                folder.photos.splice(photoIndex, 1);
                localStorage.setItem('folders', JSON.stringify(folders));
              }
              photoElement.remove();
              modalOverlay.remove();
              location.reload(); // Reload the page
            });
          
            noButton.addEventListener('click', () => {
              modalOverlay.remove();
            });
          });
      
          closeButton.addEventListener('click', () => {
            document.body.removeChild(originalPhotoView);
          });
      
          originalPhotoView.appendChild(originalPhoto);
          originalPhotoView.appendChild(closeButton);
          originalPhotoView.appendChild(deleteButton);
          document.body.appendChild(originalPhotoView);
        });
      
        contentsContainer.appendChild(photoElement);
      });
  /************       FOR DELETE MODAL CONFIRMATION     **********/
        
    
  /*************       FOR ADD MORE PHOTOS BUTTON     ***********/
const addMoreButton = document.createElement('button');

addMoreButton.textContent = 'Add More Photos';
addMoreButton.style.display = 'flex';
addMoreButton.style.justifyContent = 'center';
addMoreButton.style.alignItems = 'center';
addMoreButton.style.fontFamily = 'arial';
addMoreButton.style.color = '#F5F5F5';
addMoreButton.style.padding = '10px 20px';
addMoreButton.style.cursor = 'pointer';
addMoreButton.style.height = '40px';
addMoreButton.style.position = 'absolute';
addMoreButton.style.bottom = '210px';
addMoreButton.style.left = '50.2%';
addMoreButton.style.transform = 'translateX(-44%)';
addMoreButton.style.background = 'rgba(0, 0, 0, 0.7)'; 
addMoreButton.style.border = 'none'; 
addMoreButton.style.boxShadow = 'none';

addMoreButton.addEventListener('mouseover', () => {
  addMoreButton.style.background = 'rgba(0, 0, 0, 0.9)'; 
  addMoreButton.style.transform = 'translateX(-44%) scale(1.1)';
});

addMoreButton.addEventListener('mouseout', () => {
  addMoreButton.style.transform = 'translateX(-44%)';
  addMoreButton.style.background = 'rgba(0, 0, 0, 0.7)'; 
});

contentsContainer.style.display = 'grid'; 
contentsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';

        addMoreButton.addEventListener('click', () => {
          const uploadInput = document.createElement('input');
          uploadInput.type = 'file';
          uploadInput.multiple = true;
          uploadInput.accept = 'image/*';
    
          uploadInput.addEventListener('change', (e) => {
            const files = e.target.files;
            const storedFolders = localStorage.getItem('folders');
            const folders = JSON.parse(storedFolders);
            const folder = folders.find((f) => f.name === folderName);
    
            for (const file of files) {
              const reader = new FileReader();
              reader.onload = () => {
                const photoUrl = reader.result;
                folder.photos.push(photoUrl);
                localStorage.setItem('folders', JSON.stringify(folders));
    
                const photoElement = document.createElement('img');
                photoElement.src = photoUrl;
                photoElement.style.width = '150px';
                photoElement.style.height = '150px';
                photoElement.style.objectFit = 'cover';
                photoElement.style.borderRadius = '10px';
                photoElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
                photoElement.style.transition = 'transform 0.2s ease-in-out';
                photoElement.style.cursor = 'pointer';
    
                contentsContainer.appendChild(photoElement);
              };
              reader.readAsDataURL(file);
            }
          });
    
          uploadInput.click();
        });
    
        contentsContainer.appendChild(addMoreButton);
      }
    
      folderContents.appendChild(closeButton);
      folderContents.appendChild(contentsContainer);
      document.body.appendChild(folderContents);
    }
  /*************       FOR ADD MORE PHOTOS BUTTON     ***********/
    