import toast from "react-hot-toast";


const handleShareClick = (shareQuizId) => {
  
  const url = `http://localhost:3000/playquiz/${shareQuizId}`;
    navigator.clipboard
      .writeText(url)
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
  