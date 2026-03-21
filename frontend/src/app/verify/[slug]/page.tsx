'use client'
import { authService } from '@/src/services/auth.service';
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
         const response = await authService.verifyEmail(slug);
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