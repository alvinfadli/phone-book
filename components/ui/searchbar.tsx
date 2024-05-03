import { Input } from "./input";

interface SearchBarProps {
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <Input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search contacts"
    />
  );
}
