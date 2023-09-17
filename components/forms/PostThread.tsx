"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { usePathname, useRouter} from "next/navigation"

import { ThreadValidation } from "@/lib/validations/thread"
import { createThread } from "@/lib/actions/thread.actions"

interface Props {
    userId: string
}

function PostThread({userId}: Props){
    const router = useRouter()
    const pathname = usePathname()
    
      const form = useForm({
          resolver: zodResolver(ThreadValidation),
          defaultValues: {
            thread: "", 
             accountId: userId
          }
      })

      const onSubmit = async(values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId, 
            communityId: null, 
            path: pathname
        })

        router.push("/")
      }

    return (
        <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5` flex flex-col justify-start gap-5 mt-5">
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-primary-500" type="submit">
                Create Thread
            </Button>
            </form>
        </Form>
        </>

    )
}

export default PostThread