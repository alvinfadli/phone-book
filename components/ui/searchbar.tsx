import { Input } from "./input";

export default function SearchBar({
  ...props
}: React.HTMLAttributes<HTMLInputElement>) {
  return <Input type="text" placeholder="Search contacts" {...props} />;
}
