import { RenderUsersProps } from "./RenderUsers";

export default function FilterUsers({
  AllUsers,
  setUsers,
}: {
  AllUsers: RenderUsersProps["users"];
  setUsers: React.Dispatch<React.SetStateAction<RenderUsersProps["users"]>>;
}) {
  const filterCustomers = () => {
    setUsers(AllUsers);
    setUsers((prev) => prev.filter((user) => user.role === "CUSTOMER"));
  };
  const filterOwners = () => {
    setUsers(AllUsers);
    setUsers((prev) => prev.filter((user) => user.role === "OWNER"));
  };

  return (
    <div className="flex gap-1 w-full justify-end">
      <button
        className="px-4 py-1 border border-neutral-400 rounded-md"
        onClick={() => setUsers(AllUsers)}
      >
        All
      </button>
      <button
        className="px-4 py-1 border border-neutral-400 rounded-md"
        onClick={filterCustomers}
      >
        Customers
      </button>
      <button
        className="px-4 py-1 border border-neutral-400 rounded-md"
        onClick={filterOwners}
      >
        Owners
      </button>
    </div>
  );
}
