'use client'
import { apiCall } from '@/src/utils/apiCall';
import { use, useEffect } from 'react'
 
export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params);
  console.log(slug, 'sluggggggg')

  useEffect(()=>{
    if(!slug ) return;
  const verifyToken = async () =>{
      
    try {
         const response = await apiCall({
              method: 'GET',
              url: `http://localhost:8000/user/verify/${slug}`,
              body: {
              },
            });
            console.log(response, 'rrrrrrrrrrrrrr')
    } catch (error) {
        
    }
  }
  verifyToken();
  }, [slug])
 
  return (
    <div>
      <p>{slug}</p>
    </div>
  )
}