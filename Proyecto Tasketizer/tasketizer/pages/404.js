import React from 'react'
import { useRouter } from "next/router";
import { useEffect } from 'react';
export default function redireccion() {
    const router = useRouter();

useEffect(()=>{
     
    router.push("/");
  
});
  return (
    <div>redireccion...</div>
  )
}
