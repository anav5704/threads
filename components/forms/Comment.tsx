"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { usePathname, useRouter} from "next/navigation"
import { CommentValidation } from "@/lib/validations/thread"
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions"
import Image from "next/image"

interface Props { 
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
}

function Comment({threadId, currentUserImg, currentUserId }:  Props){
    const pathname = usePathname()
    
      const form = useForm({
          resolver: zodResolver(CommentValidation),
          defaultValues: {
            thread: ""
          }
      })

      const onSubmit = async(values: z.infer<typeof CommentValidation>) => {
        console.log(values.thread)
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

        form.reset()
      }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 w-full">
                    <FormLabel>
                        <Image src={currentUserImg.toString()} alt="profile image" width={48} height={48} className="rounded-full object-cover"/>
                    </FormLabel>
                  <FormControl className="border-none bg-transparent">
                    <Input type="text" {...field} placeholder="Place a comment" className="no-focus text-light-1 outline-none"/>
                  </FormControl>
\                </FormItem>
              )}
            />
            <Button className="comment-form_btn" type="submit">
                Reply
            </Button>
            </form>
        </Form>
    )
}

export default Comment