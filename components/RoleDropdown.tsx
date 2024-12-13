"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { useUser } from "@/app/context/UserContext";
import { Button } from "./ui/button";

const RoleDropdown: React.FC = () => {
  const { user, setUser } = useUser();
  const roles = ["admin", "user", "guest"];

  const handleRoleChange = (role: string) => {
    setUser({ ...user, role });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="btn">Role: {user.role}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Role</DropdownMenuLabel>
        {roles.map((role) => (
          <DropdownMenuItem key={role} onClick={() => handleRoleChange(role)}>
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleDropdown;
