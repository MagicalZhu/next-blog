"use client";
import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel"
import { useState } from "react";
import { defaultValue } from "./default-value";

export default function Home() {
  const [value, setValue] = useState<JSONContent>(defaultValue);
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Editor initialValue={value} onChange={setValue}/>
    </main>
  )
}
