
import Link from 'next/link';
const BLOG_URL = 'http://localhost:3001'
const CONTENT_API_KEY = '52c5fdebbbd836dc7ab7f82e22'
import { useRouter } from 'next/router'
import { useState } from 'react';
import styles from '../../styles/Home.module.css'

async function getPost(slug: string){
    const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
    ).then((res)=>res.json())


const posts = res.posts
// console.log(res);

return posts[0];
}



export const getStaticProps = async({params})=>{

    const post = await getPost(params.slug)
    
    return  {props: {post}}
    
    }
export const getStaticPaths=()=>{
    return {
        paths: [],
        fallback: true
    }
}

    
    




// <script>
//     /**
//     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
//     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    
  
    
//     (function() { // DON'T EDIT BELOW THIS LINE
//     var d = document, s = d.createElement('script');
//     s.src = 'https://mylog-1.disqus.com/embed.js';
//     s.setAttribute('data-timestamp', +new Date());
//     (d.head || d.body).appendChild(s);
//     })();
// </script>
// <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>


type Post={
    title: string,
    html: string,
    slug:string
}


const Post: React.FC<{post: Post}>=(props)=>{


    const { post }=props
    const [ enableLoadComments, setEnableLoadComments ]= useState<boolean>(true)
// console.log(post)
    const router=useRouter()

    if(router.isFallback){
        return <h1>Loading...</h1>
    }

function loadComments(){
    //    setEnableLoadComments(false)    //!fix this issue
    (window as any).disqus_config = function () {
        this.page.url = window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = post.slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };


        const script= document.createElement('script')
        script.src= 'https://mylog-1.disqus.com/embed.js'
        script.setAttribute('data-timestamp',Date.now().toString())

        document.body.appendChild(script)

    }


    return (<div className={styles.container}>
        <Link href='/'><a>Go back</a></Link>
        <h1>My blog Post</h1>
        <div dangerouslySetInnerHTML={{ __html:post.html}}></div>
        {enableLoadComments && ( <p className={styles.goback} onClick={loadComments}>
            Load Comments
        </p>)}

        <div id="disqus_thread"></div>
        
        </div>
    )
}

export default Post;