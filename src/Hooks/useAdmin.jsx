import { useQuery } from "@tanstack/react-query";

const useAdmin = (email) => {
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users/admin/${email}`);
      const data = await res.json();
      return data?.isAdmin;
    },
  });

  return [isAdmin, isLoading];
};

export default useAdmin;
