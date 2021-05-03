
import { Splide, SplideSlide } from 'splide-nextjs/react-splide';
import React,{useState, useEffect} from 'react';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
const BLOG_URL = 'http://localhost:3001'
const CONTENT_API_KEY = '52c5fdebbbd836dc7ab7f82e22'




async function getPosts() {
   
    //curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
    
    const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=featured,feature_image,title`).then((res)=>res.json())
    
    
     const featured_posts = res.posts.filter(post=> post.featured==true)
    //   console.log(featured_posts);
    
    return featured_posts;
    }
    

    



const  Slide =  ()=>{
   
   
    const [x, setPosts] = useState([]);

    useEffect(() => {
  
      (async () => {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      })();
  
    }, []); 
   
return(

    <Splide>
 {x.map((post,index)=>{

     return(
 
  <SplideSlide key={index}>
   <img src={`${post.feature_image}`} alt="feature Image "/>
  </SplideSlide>)})}
  
</Splide>
)
}

export default Slide;