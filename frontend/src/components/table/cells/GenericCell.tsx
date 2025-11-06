export function GenericCell<T>({ value }: { value: T }) {
  return <div>{value?.toString()}</div>;
}
