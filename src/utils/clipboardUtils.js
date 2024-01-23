import toast from "react-hot-toast";


const handleShareClick = (link) => {
    const shareLink = `http://localhost:3000/playquiz/${link}`;
    
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
  