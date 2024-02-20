import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = ({
    key,
    value,
    scroll = false,
  }: {
    key: string;
    value: string | number;
    scroll?: boolean;
  }) => {
    const currentQuery = qs.parse(searchParams.toString());

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...currentQuery,
          [key]: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url, { scroll });
  };

  return { handleClick };
};
