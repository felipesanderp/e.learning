
interface EditUserPageProps {
  params: { userId: string }
}

export default async function EditUserPage({ params }:EditUserPageProps) {
  return (
    <h1>{params.userId}</h1>
  )
}