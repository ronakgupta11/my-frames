
import { useState } from "react";
import { Button } from "flowbite-react";
function FileUpload({setHash,setPages}) {
  const [selectedFile, setSelectedFile] = useState();


  function generateUniqueFolderName() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let folderName = '';
    for (let i = 0; i < 7; i++) {
      folderName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return folderName;
  }
  

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    setPages(event.target.files.length)
  };

  const handleSubmission = async () => {
    try {
      console.log("submitting")
      const formData = new FormData();
      Array.from(selectedFile).forEach((file,idx) => {
        formData.append("file", file,`xyz/${idx}.png`);
      });
      const metadata = JSON.stringify({
        name: generateUniqueFolderName()
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYjhlODhjYi0wOGYzLTQ4NGUtYmY1Yy0yYzdmOThlNDQyZjEiLCJlbWFpbCI6Im1haWx0b3JvbmFrZ3VwdGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjcwNzNmNjE4OWZhNTNkZjJhMWFhIiwic2NvcGVkS2V5U2VjcmV0IjoiYTYyNjRkYjUyNjQyOTQyMjhmODA3NWZjYzk1MWJjNWUyM2JhYzllNDFlOWJjYzQwZDA1YTczMjViMzRhMTU1MiIsImlhdCI6MTcxMTIwNTYzOH0.n-SGvPinK6QWU4Q6tp5gljwu0-rJa6SETQi1fD1QRBg`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      console.log(resData);
      setHash(resData.IpfsHash)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <label className="form-label"> Choose File</label>
    <input
     type="file" accept="image/*" multiple 
      onChange={changeHandler}
    />
    <Button onClick={handleSubmission}>Submit</Button>
  </>
  );
}

export default FileUpload;
