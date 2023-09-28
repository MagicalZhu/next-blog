import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { columns } from "@/components/fav/components/columns"
import { DataTable } from "@/components/fav/components/data-table"
import { taskSchema } from "@/mock/task/schema"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "mock/task/tasks.json")
  )
  const tasks = JSON.parse(data.toString())
  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <Tabs defaultValue="article">
        <TabsList className="mb-2 bg-slate-100">
          <TabsTrigger value="article" className="data-[state=active]:bg-white">收藏文章</TabsTrigger>
          <TabsTrigger value="man">关注的人</TabsTrigger>
        </TabsList>
        <TabsContent value="article">
          <DataTable data={tasks} columns={columns} />
        </TabsContent>
        <TabsContent value="man">In Process...</TabsContent>
      </Tabs>
    </>
  )
}
