import { EmptyPlaceholder } from "./empty-placeholder";

export function NoCourses() {
  return (
    <div className="mt-8">
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="warning" />
        <EmptyPlaceholder.Title>Você não está cadastrado em nenhum curso!</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Por favor, fale com um professor.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </div>
  )
}