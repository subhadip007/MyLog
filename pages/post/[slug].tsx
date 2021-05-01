
import Link from 'next/link';
const BLOG_URL = 'http://localhost:3001'
const CONTENT_API_KEY = '52c5fdebbbd836dc7ab7f82e22'
import { useRouter } from 'next/router'
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


type Post={
    title: string,
    html: string,
    slug:string
}


const Post: React.FC<{post: Post}>=(props)=>{


    const { post }=props
console.log(post)
    const router=useRouter()

    if(router.isFallback){
        return <h1>Loading...</h1>
    }

    return (<div className={styles.container}>
        <Link href='/'><a>Go back</a></Link>
        <h1>My blog Post</h1>
        <div dangerouslySetInnerHTML={{ __html:post.html}}></div>
        </div>
    )
}

export default Post;