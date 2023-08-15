import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import AuthNotFound from "../components/authNotfound.js";

export default function Home() {
  return (
    <div className="flex justify-center">
      <AuthNotFound/>
      
    </div>
  );
}
