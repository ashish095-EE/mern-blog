import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useNavigate } from "react-router-dom";
function CreatePost() {
    const navigate = useNavigate();
    const[file,setFile] = useState(null);
    const[imageUploadingProgress,setImageUploadingProgress] = useState(null);
    const[imageUploadingError,setImageUploadingError] = useState(null);
    const [formData,setFormData]= useState({});
    const [publishError,setPublishError] = useState(null);

    

    const handelUploading = async () =>{
        try {
            if(!file){
                setImageUploadingError("Please Select an Image to Upload");
                return;

            } 
            setImageUploadingError(null);

            const storage = getStorage(app);
            const fileName  = new Date().getTime() + '-'+file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = 
                    (snapshot.bytesTransferred/snapshot.totalBytes) *100;

                    setImageUploadingProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadingError('Image upload failed');
                    setImageUploadingProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadingError(null);
                        setImageUploadingProgress(null);
                        setFormData({...formData, image:downloadURL});
                    })
                }

            );
            
        } catch (error) {
            setImageUploadingError("Image upload failed")
            console.log(error);
            
        }
    }

    const handelSubmit = async (e) =>{
        e.preventDefault();
        setPublishError(null);
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if(!res.ok){
                setPublishError(data.message);
            }
            if(res.ok){
                navigate(`/post/${data.slug}`)
                setPublishError(null);
            }

            
        } catch (error) {
            setPublishError("Something Went wrong");
            
        }
    }
    
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-3 font-semibold">
            Create a New Post
        </h1> 

        <form action="" className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between" >
                <TextInput type="text" placeholder="Title" required id="title" className="flex-1" onChange={(e)=>setFormData({...formData,title:e.target.value}) } />
                <Select onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                    <option>Select an Option</option>
                    <option>Sports</option>
                    <option>Travel</option>
                    <option>Pilosohical</option>

                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                <Button gradientDuoTone='purpleToPink'  size='sm' outline onClick={handelUploading}
                disabled ={imageUploadingProgress}
                >
                    {
                        imageUploadingProgress? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadingProgress} text={`${imageUploadingProgress || 0}%`} />

                            </div>
                            
                        ) : (
                            "Upload Image"
                            
                        )
                    }

                </Button>
                
            </div>
            {imageUploadingError && <Alert color="failure">{imageUploadingError}</Alert>}

            {formData.image && (
                <img src={formData.image} alt="upload" className="h-72 w-full object-cover" />
            )}

            <ReactQuill theme="snow" placeholder="Write Something....." className="h-72" onChange={(value) => {
                setFormData({ ...formData, content: value });
            }}/>

            <Button
              type='submit'
              gradientDuoTone='purpleToPink'
              className='w-full mt-8'>
                Publish

            </Button>

            {publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>}

        </form>
        
      
    </div>
  )
}

export default CreatePost
