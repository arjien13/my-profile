 // Get the video folders container element
 const videoFoldersContainer = document.getElementById('video-folders-container');

 // Get the create folder button element
 const createFolderButton = document.getElementById('video-create-folder-btn');
 createFolderButton.addEventListener('mouseover', () => {
  createFolderButton.style.transform = 'scale(1.1)';
  createFolderButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
});

createFolderButton.addEventListener('mouseout', () => {
  createFolderButton.style.transform = 'scale(1)';
  createFolderButton.style.boxShadow = 'none';
});
 
 
 // Get the videos container element
 const videosContainer = document.getElementById('video-videos-container');
 
 // Initialize the video folders array
 let videoFolders = [];
 
 // Load the video folders from local storage
 if (localStorage.getItem('videoFolders')) {
 videoFolders = JSON.parse(localStorage.getItem('videoFolders'));
 }
 
 // *********************************************
 // ********** DISPLAY FOLDERS FUNCTION **********
 // *********************************************
 function displayVideoFolders() {
 videoFoldersContainer.innerHTML = '';
 videoFolders.forEach((folder, index) => {
 const folderElement = document.createElement('div');
 folderElement.style.background = 'url("folder.png") no-repeat';
 folderElement.style.backgroundSize = '100% 100%';
 folderElement.style.width = '150px';
 folderElement.style.height = '120px';
 folderElement.style.position = 'relative';
 folderElement.style.cursor = 'pointer';
 
 // Add event listeners for hover effect
 folderElement.addEventListener('mouseover', () => {
  folderElement.style.transform = 'scale(1.1)';
});

folderElement.addEventListener('mouseout', () => {
  folderElement.style.transform = 'scale(1)';
});
 
 const folderNameElement = document.createElement('div');
 folderNameElement.textContent = folder.name;
 folderNameElement.style.position = 'absolute';
 folderNameElement.style.bottom = '30px';
 folderNameElement.style.left = '10px';
 folderNameElement.style.color = '#F5F5F5';
 
 folderElement.appendChild(folderNameElement);
 
 const deleteButton = document.createElement('button');
 deleteButton.textContent = 'Delete';
 deleteButton.style.position = 'absolute';
 deleteButton.style.bottom = '10px';
 deleteButton.style.right = '10px';
 deleteButton.style.color = 'white';
 deleteButton.style.background = 'rgba(139, 0, 0, 0.7)'; 
 deleteButton.style.border = 'none'
 
 deleteButton.addEventListener('click', () => {
 if (confirm('Are you sure you want to delete this folder?')) {
 videoFolders.splice(index, 1);
 localStorage.setItem('videoFolders', JSON.stringify(videoFolders));
 displayVideoFolders();
 }
 });
 
 folderElement.appendChild(deleteButton);
 
 folderElement.addEventListener('click', (e) => {
 if (e.target !== deleteButton) {
 if (folder.videos.length === 0) {
 const emptyFolderModal = document.createElement('div');
 emptyFolderModal.style.position = 'fixed';
  emptyFolderModal.style.top = '0';
  emptyFolderModal.style.left = '0';
  emptyFolderModal.style.width = '100%';
  emptyFolderModal.style.height = '100%';
  emptyFolderModal.style.background = 'rgba(0, 0, 0, 0.7)';
  emptyFolderModal.style.display = 'flex';
  emptyFolderModal.style.flexDirection = 'column';
  emptyFolderModal.style.justifyContent = 'center';
  emptyFolderModal.style.paddingBottom = '20px';
  emptyFolderModal.style.alignItems = 'center';  // Add this line
  
  document.body.appendChild(emptyFolderModal);
 emptyFolderModal.innerHTML = `
 <h2>This folder is empty.</h2>
 <button id="upload-videos-button">Upload Videos</button>
 <button id="close-button" style="position: absolute; top: 10px; right: 10px;">Close</button>
 `;
 document.body.appendChild(emptyFolderModal);
 
 const closeButton = document.getElementById('close-button');
 closeButton.textContent = 'Close';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.right = '10px';
closeButton.style.width = '80px'; // Set the width
closeButton.style.height = '40px'; // Set the height
closeButton.style.background = 'linear-gradient(to right, #FF0033, #660000)';
closeButton.style.color = 'white';
closeButton.style.border = '3px solid #000';
closeButton.style.cursor = 'pointer';

// Add hover effect
closeButton.addEventListener('mouseover', () => {
  closeButton.style.transform = 'scale(1.1)';
  closeButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

closeButton.addEventListener('mouseout', () => {
  closeButton.style.transform = 'scale(1)';
  closeButton.style.boxShadow = 'none';
});
 
 
 closeButton.addEventListener('click', () => {
 emptyFolderModal.remove();
 });
 
 const uploadVideosButton = document.getElementById('upload-videos-button');
 uploadVideosButton.addEventListener('click', () => {
  const videoInput = document.createElement('input');
  videoInput.type = 'file';
  videoInput.accept = 'video/*';
  videoInput.multiple = true;

  videoInput.addEventListener('change', () => {
    const selectedVideos = videoInput.files;
    const videoUrls = [];

    for (const video of selectedVideos) {
      const videoUrl = URL.createObjectURL(video);
      videoUrls.push(videoUrl);
    }

    folder.videos = videoUrls; // Store the video URLs
    localStorage.setItem('videoFolders', JSON.stringify(videoFolders));
    emptyFolderModal.remove();
    displayVideoFolders();
  });

  emptyFolderModal.appendChild(videoInput);
});
 } else {
 const videoModal = document.createElement('div');
 videoModal.style.display = 'grid';
  videoModal.style.gridTemplateColumns = 'repeat(4, 1fr)';
 videoModal.style.display = 'flex';
 videoModal.style.justifyContent = 'center';
 videoModal.style.alignItems = 'center';
 videoModal.style.position = 'fixed';
 videoModal.style.top = '0';
 videoModal.style.left = '0';
 videoModal.style.width = '100%';
 videoModal.style.height = '100%';
 videoModal.style.background = 'rgba(0, 0, 0, 0.5)';
 videoModal.innerHTML = `
 
 <button id="close-button" style="position: absolute; top: 10px; right: 10px;">Close</button>
 <button id="add-more-videos-button" style="position: absolute; bottom: 10px; right: 10px;">Add More Videos</button>
 `;
 document.body.appendChild(videoModal);
 
 const closeButton = document.getElementById('close-button');
 closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'linear-gradient(to right, #FF0033, #660000)';
    closeButton.style.color = 'white';
    closeButton.style.border = '3px solid #000';
    closeButton.style.padding = '10px 20px';
    closeButton.style.cursor = 'pointer';

    // Add hover effect
closeButton.addEventListener('mouseover', () => {
  closeButton.style.transform = 'scale(1.1)';
  closeButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
});

closeButton.addEventListener('mouseout', () => {
  closeButton.style.transform = 'scale(1)';
  closeButton.style.boxShadow = 'none';
});

closeButton.addEventListener('click', () => {
  videoModal.remove();
});

 closeButton.addEventListener('click', () => {
 videoModal.remove();
 });
 
 const addMoreVideosButton = document.getElementById('add-more-videos-button');
 addMoreVideosButton.style.position = 'absolute';
addMoreVideosButton.style.bottom = '10px';
addMoreVideosButton.style.left = '50%';
addMoreVideosButton.style.transform = 'translateX(-51%)';
addMoreVideosButton.style.width = '150px'; // Replace 150px with your desired width
addMoreVideosButton.style.left = '50.6%';
addMoreVideosButton.style.width = '129px'; // Increase the width
addMoreVideosButton.style.height = '41px'; // Increase the height
addMoreVideosButton.style.border = '3px solid black';
addMoreVideosButton.style.background = 'linear-gradient(to right, #666666, #999999)';
addMoreVideosButton.style.transformOrigin = 'center';
addMoreVideosButton.style.cursor = 'pointer';

//Hover effects
addMoreVideosButton.addEventListener('mouseover', () => {
  addMoreVideosButton.style.zoom = '1.05';
});

addMoreVideosButton.addEventListener('mouseout', () => {
  addMoreVideosButton.style.zoom = '1';
});
 
 
 addMoreVideosButton.addEventListener('click', () => {
  const videoInput = document.createElement('input');
  videoInput.type = 'file';
  videoInput.accept = 'video/*';
  videoInput.multiple = true;
  videoInput.style.position = 'absolute';
  videoInput.style.bottom = '100px';
  
  videoInput.style.transform = 'translateX(-50%)';
  videoInput.style.textAlign = 'center';
  videoInput.style.left = '52.5%';
  videoModal.appendChild(videoInput);
 
 videoInput.addEventListener('change', () => {
 const selectedVideos = videoInput.files;
 const videoUrls = [];
 
 for (const video of selectedVideos) {
 const videoUrl = URL.createObjectURL(video);
 videoUrls.push(videoUrl);
 }
 
 folder.videos.push(...videoUrls);
 localStorage.setItem('videoFolders', JSON.stringify(videoFolders));
 videoModal.remove();
 displayVideoFolders();
 });
 
 videoModal.appendChild(videoInput);
 });
 
 // ...
 
 folder.videos.forEach((video, index) => {
 const videoElement = document.createElement('video');
 videoElement.width = 320;
 videoElement.height = 240;
 videoElement.controls = true;
 
 const blob = new Blob([video], { type: 'video/mp4' });
 const videoUrl = URL.createObjectURL(blob);
 const sourceElement = document.createElement('source');
 sourceElement.src = videoUrl;
 sourceElement.type = 'video/mp4';
 videoElement.appendChild(sourceElement);
 
 videoElement.load();
 
 videoModal.appendChild(videoElement);
 });
 }
 }
 });
 
 videoFoldersContainer.appendChild(folderElement);
 });
 }
 
 // Add an event listener to the create folder button
 createFolderButton.addEventListener('click', () => {
 const folderName = prompt('Enter a name for the new folder:');
 if (folderName !== null && folderName !== '') {
 const newFolder = {
 name: folderName,
 videos: []
 };
 videoFolders.push(newFolder);
 localStorage.setItem('videoFolders', JSON.stringify(videoFolders));
 displayVideoFolders();
 }
 });
 
 // Call the displayVideoFolders function to display the folders
 displayVideoFolders();