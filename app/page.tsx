"use client";
import React from "react";
import { redirect } from "next/navigation";


const Page = () => {
  redirect("/Signup"); 
  // instantly sends users to Signup
}


export default Page;
