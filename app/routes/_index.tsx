import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    { name: "keywords", content: "Remix, React" },
  ];
};

export const loader = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data: { id: string; title: string; body: string; userId: string }[] =
    await response.json();

  return json({ blogs: data });
};

export default function Index() {
  const { blogs } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <div className="p-3 shadow-md rounded-sm" key={blog.id}>{blog.body}</div>
      ))}
    </div>
  );
}
