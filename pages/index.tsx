import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import MenuAppBar from '../src/components/nav'
import Slide from '../src/components/slide'

const BLOG_URL = 'http://localhost:3001'
const CONTENT_API_KEY = '52c5fdebbbd836dc7ab7f82e22'


type Post={

	title:string
	slug:string

}

async function getPosts() {
   
//curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"

const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,feature_image,slug,custom_excerpt`).then((res)=>res.json())


const posts = res.posts
// console.log(res);

return posts;
}

export const getStaticProps = async({params})=>{

const posts = await getPosts()

return {
  props: {posts}
}

}






const Home: React.FC<{ posts: Post[] }> = (props) => {
	 const { posts} = props
// console.log(posts.posts);
// const les=posts.posts
	return (
		<div>
		<MenuAppBar/> 
		<Slide />
		
		<div className={styles.container}>
			<ul>
				{posts.map((post,index) => {
					return <li key={post.slug}>
						<Link href="/post/[slug]" as={`/post/${post.slug}`}><a>{post.title}</a></Link>
						</li>
					})}
			</ul>
		</div>
		</div>
	)
}


export default Home