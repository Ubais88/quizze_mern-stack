import toast from "react-hot-toast";


const handleShareClick = (shareLink) => {
    
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };
  
  export default handleShareClick;
  