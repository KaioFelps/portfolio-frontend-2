import { Suspense } from "react";
import { Form } from "./form";
import { FormSkeleton } from "./skeleton";

export function BlogPostsFilterForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <Form />
    </Suspense>
  );
}
