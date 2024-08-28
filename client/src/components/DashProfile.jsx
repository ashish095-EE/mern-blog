import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase'; // Ensure that this import is correctly set up
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  console.log(imageFileUploadingProgress,imageFileUploadError);

  const filePickerRef = useRef();

  const handleImageSelector = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Temporarily preview the selected image
    }
  };

  useEffect(() => {
    if (imageFile) {
      setImageFileUploadError(null);
      const uploadImage = async () => {
        const storage = getStorage(app); // Firebase storage setup
        const fileName = new Date().getTime() + imageFile.name; // Unique filename
        const storageRef = ref(storage, fileName); // Reference to storage
        const uploadTask = uploadBytesResumable(storageRef, imageFile); // Upload task
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // if (progress > 0 && progress < 100) {
              //   progress = Math.min(progress, snapshot.bytesTransferred / snapshot.totalBytes * 20); // Slow down the progress for testing
              // }
            setImageFileUploadingProgress(progress.toFixed(0)); // Update progress state
          },
          (error) => {
            console.error('Upload failed:', error); // Log the error to the console
            setImageFileUploadError('Image Upload Failed (File Size must be less than 2MB)');
            setImageFileUploadingProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL); // Set the final download URL after upload
            });
          }
        );
      };
  
      uploadImage();
    }
  }, [imageFile]);
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col' action=''>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageSelector}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              maxValue={100}
              className='h-8 w-8'
              styles={{
                root:{
                  width:"100%",
                  height:"100%",
                  position:"absolute",
                  top:"0",
                  left:"0",
                  
                  
                },
                path: {
                  stroke: `rgb (62,152,199, ${imageFileUploadingProgress/100})`
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full border-[lightgray] border-8 w-full h-full ${imageFileUploadingProgress && imageFileUploadingProgress<100 && 'opacity-60'}`}
          />
        </div>

        
         
        <div className='my-7 flex flex-col gap-4'>
          {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
          <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
          <TextInput
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}
          />
          <TextInput type='password' id='password' placeholder='password' />
        </div>

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>

      
    </div>
  );
}
