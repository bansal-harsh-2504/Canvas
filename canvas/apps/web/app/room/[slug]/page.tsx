import ChatRoom from "../../../components/ChatRoom";

export default async function({params}: {
  params: {
    slug: string
  }
}) {

  const slug = (await params).slug;
  return (
    <>
      <div>
        <ChatRoom slug={slug}  />
      </div>
    </>
  );
}
