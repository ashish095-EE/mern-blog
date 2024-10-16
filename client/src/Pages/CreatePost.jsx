import { Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-3 font-semibold">
            Create a New Post
        </h1>

        <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type="text" placeholder="Title" required id="title" className="flex-1" />
                <Select>
                    <option>Select an Option</option>
                    <option>Sports</option>
                    <option>Travel</option>
                    <option>Pilosohical</option>

                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept="image/*" />
                <Button gradientDuoTone='purpleToPink'  size='sm' outline>Upload Image</Button>
                
            </div>

            <ReactQuill theme="snow" placeholder="Write Something....." className="h-72"/>

        </form>
        
      
    </div>
  )
}

export default CreatePost
