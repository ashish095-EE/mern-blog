/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase'; // Ensure that this import is correctly set up
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import{updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutSuccess} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const[formData, setFormData] = useState({});
  const[imageFileUploading, setImageFileUploading] = useState(false);
  const[updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [userUpdateError, setUserUpdateError]= useState(null);
  const[showModels, setShowModels] = useState(false);
  

  

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
        setImageFileUploading(true);
        setImageFileUploadError(null)
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
            setImageFileUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL); // Set the final download URL after upload
              setFormData({...formData, profilePicture: downloadURL }); // Update form data with the uploaded image URL
              setImageFileUploading(false);
              setImageFileUploadingProgress(null);
            });
          }
        );
      };
  
      uploadImage();
    }
  
  }, [imageFile]);

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  
  const handleSubmit = async (e) =>{
    
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUserUpdateError(null);
    if(Object.keys(formData).length===0){
      setUserUpdateError("Please Update at least one field");
      return;
    }
    if(imageFileUploading){
      setUserUpdateError("Please wait while image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data  = await res.json();

      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUserUpdateError(data.message);
        
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile Updated Successfully");
        
        
      }


      
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUserUpdateError(error.message);
      
    }
  };

  const deleteUserOnClick = async () =>{
    setShowModels(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data  = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }
      else{
        dispatch(deleteUserSuccess(data));
        
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      
    }

  }; 

  const handelSignout = async () =>{
    try {
      const res = await fetch(`/api/user/signout`,{
        method: 'POST',
      })
      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signOutSuccess());
      }
      
    } catch (error) {
      console.error(error);
      
    }
    
  }
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col' action='' onSubmit={handleSubmit}>
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
          <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
          <TextInput
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username} onChange={handleChange}
          />
          <TextInput type='password' id='password' placeholder='password' />
        </div>

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>

        {currentUser.isAdmin && (
            <Link to={'/create-post'}>
              <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full mt-3'>
                Create A Post

              </Button>
            
            </Link>
          )
        }
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={()=> setShowModels(true)}>Delete Account</span>
        <span className='cursor-pointer' onClick={handelSignout}>Sign Out</span>
      </div>

      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}

        </Alert>
      )}
       {userUpdateError && (
        <Alert color='failure' className='mt-5'>
          {userUpdateError}

        </Alert>
      )}
      <Modal show ={showModels}
      onClose={()=> setShowModels(false)}
      popup
      size='md'>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-5 text-gray-500' />
            <h3 className='font-semibold mb-5 text-lg m-4 text-gray-500 dark:text-gray-500'>Are You sure you want to Delete The Account?</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={deleteUserOnClick}>Yes,I am Sure</Button>
              <Button color='success' onClick={()=>setShowModels(false)}>No,Cancel</Button>
            </div>

          </div>
        </ModalBody>

      </Modal>
      


      
    </div>
  );
}
